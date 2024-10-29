"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';
import { toastVariants } from '@/lib/toast-variants';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const Toaster = ({ className, toastOptions, ...props }) => { // Changed: Handling toastOptions
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts((prevToasts) => [...prevToasts, { id: Date.now(), ...toast }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      <Toast.Provider swipeDirection="right">
        <div className={cn("toaster group", className)} {...props}> 
          <Toast.Viewport className="toast-viewport" />
          {toasts.map(({ id, title, description, variant = 'default' }) => (
            <Toast.Root key={id} className={cn(toastVariants[variant])} {...toastOptions}> {/* Corrected usage */}
              <Toast.Title>{title}</Toast.Title>
              <Toast.Description>{description}</Toast.Description>
              <Toast.Close onClick={() => removeToast(id)}>Close</Toast.Close>
            </Toast.Root>
          ))}
        </div>
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export { Toaster };
