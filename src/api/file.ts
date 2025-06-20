import { useFileStore } from "@/stores/file";
import axios from "@/axios/file-service";
// This file provides an API for file operations such as upload, download, and delete.
import { snackbar } from "@/stores/snackbar";

export const FileApi = {
  filePath: import.meta.env.VITE_APP_FILE_RESOURCE + "/",

  async upload(file: any, path: string, hide: boolean = false) {
    let fileStore: any;
    let id: any;
    if (!hide) {
      fileStore = useFileStore();
      id = fileStore.create({ type: "upload", name: file.name });
    }
    try {
      try {
        return await axios({
          method: "post",
          url: import.meta.env.VITE_APP_FILE_SERVER + "/upload",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
          data: {
            file,
            path,
          },
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
    } finally {
      if (!hide) {
        fileStore.update({ id, progress: 100, state: 1 });
      }
    }
  },
  download(url: string) {
    return axios({
      method: "get",
      url: import.meta.env.VITE_APP_FILE_SERVER + "/download/" + url,
      responseType: "blob",
      withCredentials: false,
    });
  },
  downloadTxt(url: string) {
    return axios({
      method: "get",
      url: import.meta.env.VITE_APP_FILE_SERVER + "/download/" + url,
      responseType: "text",
      withCredentials: false,
    });
  },
  ppt2image(file: any) {
    return axios({
      method: "post",
      url: import.meta.env.VITE_APP_FILE_SERVER + "/ppt/ppt2image",
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
      url: import.meta.env.VITE_APP_FILE_SERVER + "/delete/" + url,
      withCredentials: false,
    });
  },
};
