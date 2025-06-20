import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuid } from "uuid";

interface FileState {
  id?: string;
  type?: string;
  name?: string;
  /* 状态 0 下载中 1 下载完成 2 下载失败 */
  state?: number;
  /* 进度 0-100 */
  progress?: number;
  /* 开始时间 */
  date?: number;
}

export const useFileStore = defineStore("file", () => {
  const dialog = ref(false);
  const items = ref<FileState[]>([]);

  const create = (data: FileState) => {
    dialog.value = true;
    const id = uuid();
    items.value.push({
      id,
      type: data.type,
      name: data.name,
      state: 0,
      progress: 0,
      date: new Date().getTime(),
    });
    return id;
  };

  const update = (data: FileState) => {
    dialog.value = true;
    const item = items.value.find((item) => item.id == data.id);
    if (item && item.state != 2) {
      item.progress = data.progress;
      item.state = data.state;
    }
  };

  return { dialog, items, create, update };
});
