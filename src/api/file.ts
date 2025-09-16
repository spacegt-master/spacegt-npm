import { useFileStore } from "@/stores/file";
import axios from "@/axios/file-service";
// This file provides an API for file operations such as upload, download, and delete.
import { snackbar } from "@/stores/snackbar";
import { v4 as uuid } from "uuid";

export const FileApi = {
  filePath: import.meta.env.VITE_APP_FILE_URL,

  async upload(file: any, path: string, hide: boolean = false) {
    let fileStore: any;
    let id: any;
    if (!hide) {
      fileStore = useFileStore();
      id = fileStore.create({ type: "upload", name: file.name });
    }
    try {
      let sts = false;
      try {
        sts = await isSTSEnabled();
      } catch (e) {}
      if (sts) {
        try {
          const signature = (await get_post_signature_for_oss_upload(
            path
          )) as any;
          const id = uuid();
          const key = `${path}/${id}.${getFileExtension(file.name)}`;
          await ossWebUpload(signature.host, file, path, {
            success_action_status: "200",
            policy: signature.policy,
            "x-oss-signature": signature.signature,
            "x-oss-signature-version": "OSS4-HMAC-SHA256",
            "x-oss-credential": signature.x_oss_credential,
            "x-oss-date": signature.x_oss_date,
            "x-oss-security-token": signature.security_token,
            key,
          });
          return {
            id,
            name: file.name,
            size: file.size,
            suffix: getFileExtension(file.name),
            url: key,
          };
        } catch (e) {
          console.error(e);
          snackbar({
            title: "文件上传失败",
            type: "error",
            text: undefined,
            timeout: undefined,
          });
        }
      } else {
        try {
          return await axios({
            method: "post",
            url: "/upload",
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: false,
            data: { file, path },
            onUploadProgress(event: any) {
              if (!hide) {
                fileStore.update({
                  id,
                  progress: event.progress * 100,
                  state: 0,
                });
              }
            },
          });
        } catch (error) {
          snackbar({
            title: String(error),
            type: "error",
            text: undefined,
            timeout: undefined,
          });

          if (!hide) {
            fileStore.update({ id, progress: 100, state: 2 });
          }
        }
      }
    } finally {
      if (!hide) {
        fileStore.update({ id, progress: 100, state: 1 });
      }
    }
  },
  download(url: string) {
    return axios({
      method: "get",
      url: "/download/" + url,
      responseType: "blob",
      withCredentials: false,
    });
  },
  downloadTxt(url: string) {
    return axios({
      method: "get",
      url: "/download/" + url,
      responseType: "text",
      withCredentials: false,
    });
  },
  ppt2image(file: any) {
    return axios({
      method: "post",
      url: "/ppt/ppt2image",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
      data: {
        file,
      },
    });
  },
  delete(url: string) {
    return axios({
      method: "post",
      url: "/delete/" + url,
      withCredentials: false,
    });
  },
  html2docx(html: string) {
    return axios({
      method: "post",
      url: "/pandoc/html2docx",
      data: html,
    });
  },
};

function isSTSEnabled(): Promise<boolean> {
  return axios({
    url: "/sts",
  });
}

function get_post_signature_for_oss_upload(upload_dir: string) {
  return axios({
    method: "get",
    url: "/get_post_signature_for_oss_upload",
    params: {
      upload_dir,
    },
  });
}

function ossWebUpload(
  host: string,
  file: File,
  dir: string,
  options: {
    success_action_status: string;
    policy: string;
    "x-oss-signature": string;
    "x-oss-signature-version": string;
    "x-oss-credential": string;
    "x-oss-date": string;
    "x-oss-security-token": string;
    key: string;
  }
) {
  return axios({
    method: "post",
    url: host,
    headers: { "Content-Type": "multipart/form-data" },
    data: {
      ...options,
      file,
    },
  });
}

function getFileExtension(fileName: string) {
  return fileName.slice(fileName.lastIndexOf(".") + 1);
}
