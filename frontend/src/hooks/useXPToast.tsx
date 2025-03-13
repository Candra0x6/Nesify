"use client";

import {
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import XPNotification, {
  XPNotificationProps,
} from "@/components/xp/xp-notification";

type XPToastType = "xp" | "achievement" | "level-up";

type ToastOptions = {
  message?: string;
  xp?: number;
  autoClose?: boolean;
  autoCloseTime?: number;
};

type ToastContextType = {
  showToast: (type: XPToastType, title: string, options?: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const XPToastProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastProps, setToastProps] = useState<XPNotificationProps>({
    type: "xp",
    title: "",
    message: "",
    show: false,
    onClose: () => {},
  });

  const showToast = useCallback(
    (type: XPToastType, title: string, options?: ToastOptions) => {
      const defaultMessages = {
        xp: "You earned XP for completing a mission.",
        achievement: "You've unlocked a new achievement.",
        "level-up": "Congratulations! You've reached a new level.",
      };

      setToastProps({
        type,
        title,
        message: options?.message || defaultMessages[type],
        xp: options?.xp,
        show: true,
        onClose: () => setIsVisible(false),
        autoClose: options?.autoClose,
        autoCloseTime: options?.autoCloseTime,
      });
      setIsVisible(true);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <XPNotification
        {...toastProps}
        show={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </ToastContext.Provider>
  );
};

export const useXPToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useXPToast must be used within an XPToastProvider");
  }

  return context.showToast;
};

// Example usage:
// 1. Wrap your app with XPToastProvider in layout or root component
// const showToast = useXPToast()
// 2. Call the toast function wherever needed:
//    showToast("xp", "XP Earned!", { xp: 20 })
//    showToast("achievement", "New Badge!", { message: "You earned the coding wizard badge" })
//    showToast("level-up", "Level Up!", { autoCloseTime: 10000 })
