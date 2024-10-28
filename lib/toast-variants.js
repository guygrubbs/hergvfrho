// lib/toast-variants.js

import { cn } from '@/lib/utils';

export const toastVariants = ({ variant = "default" }) =>
  cn(
    "p-4 rounded-lg shadow-md transition-transform transform-gpu",
    {
      default: "bg-gray-800 text-white",
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      warning: "bg-yellow-500 text-black",
      info: "bg-blue-500 text-white",
    }[variant]
  );
