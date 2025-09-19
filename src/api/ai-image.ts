import type { Image2imageResponse, Text2imageResponse } from "@/types/ai-image";
import axios from "@/axios/ai-image-service";

export const AIImageApi = {
  text2image(options: {
    prompt: string;
    n: number;
    size: string;
    seed: number;
    negative_prompt: string;
  }): Promise<Text2imageResponse> {
    return axios({
      url: "/api/image-synthesis/text2image",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: options,
    }) as Promise<Text2imageResponse>;
  },
  image2image(options: {
    imageBase64: string;
    prompt: string;
    seed: number;
    negative_prompt: string;
  }) {
    return axios({
      url: "/api/image-synthesis/image2image",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: options,
    }) as Promise<Image2imageResponse>;
  },
};
