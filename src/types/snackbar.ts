export interface SnackbarOptions {
  title: string;
  type: "error" | "info" | "success" | "warning";
  text?: string | null;
  timeout?: number | null;
}

export interface SnackbarStore {
  snackbar: boolean;
  type: "error" | "info" | "success" | "warning";
  title: string;
  text?: string | null;
  timeout?: number | null;
  start: (options: SnackbarOptions) => void;
}
