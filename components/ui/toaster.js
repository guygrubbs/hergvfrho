"use client";

import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';
import { toastVariants } from '@/lib/toast-variants';

const Toaster = ({ className, ...props }) => {
  return (
    <Toast.Provider swipeDirection="right">
      <div className={cn("toaster group", className)}>
        <Toast.Viewport className="toast-viewport" />
      </div>
    </Toast.Provider>
  );
};

export { Toaster };
