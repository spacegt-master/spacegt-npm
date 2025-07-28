import type { SnackbarOptions } from "@/types/snackbar";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSnackbarStore = defineStore("snackbar", () => {
  const snackbar = ref(false);

  // success
  const type = ref();

  const title = ref();

  const text = ref();

  const timeout = ref();

  const start = (options: SnackbarOptions) => {
    type.value = options.type;
    title.value = options.title;
    text.value = options.text;

    timeout.value = options.timeout || 2000;
    snackbar.value = true;
  };

  return {
    snackbar,
    type,
    title,
    text,
    timeout,
    start,
  };
});

export const snackbar = (options: SnackbarOptions) => {
  const snackbarStore = useSnackbarStore();
  return snackbarStore.start(options);
};
