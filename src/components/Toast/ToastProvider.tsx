"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ToastOptions } from "./types";
import { ToastItem } from "./ToastItem";

interface Toast {
  id: string;
  message: string;
  type: "success" | "danger" | "alert";
  position: ToastOptions["position"];
  duration: number;
}

interface ToastContextType {
  toast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const toast = useCallback((message: string, options?: ToastOptions) => {
    const id = crypto.randomUUID();

    const newToast: Toast = {
      id,
      message,
      type: options?.type ?? "success",
      position: options?.position ?? "top-right",
      duration: options?.duration ?? 4000,
    };

    setItems((prev) => [...prev, newToast]);

    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {items.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
