export type ToastType = "success" | "danger" | "alert";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}
