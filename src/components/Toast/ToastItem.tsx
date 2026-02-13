import { ToastPosition, ToastType } from "./types";

interface Props {
  id: string;
  message: string;
  type: ToastType;
  position: ToastPosition;
}

const colors = {
  success: "bg-emerald-500",
  danger: "bg-red-500",
  alert: "bg-amber-500",
};

const positionStyles: Record<ToastPosition, string> = {
  "top-left": "top-6 left-6",
  "top-right": "top-6 right-6",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-6 left-6",
  "bottom-right": "bottom-6 right-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
};

export function ToastItem({ message, type, position }: Props) {
  return (
    <div
      className={`fixed z-[9999] ${positionStyles[position]} animate-fade-in`}
    >
      <div
        className={`${colors[type]} text-white px-5 py-3 rounded-xl shadow-xl backdrop-blur-md`}
      >
        {message}
      </div>
    </div>
  );
}
