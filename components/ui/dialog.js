"use client";

import React, { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-gray-800/75 backdrop-blur-sm",
        "data-[state=open]:animate-fadeIn",
        className
      )}
      {...rest}
    />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
          "w-full max-w-lg bg-white shadow-xl duration-200",
          "data-[state=open]:animate-fadeIn rounded-lg border border-gray-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
          className
        )}
        {...rest}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4 rounded-md p-1 text-gray-400 opacity-70",
            "transition-opacity hover:opacity-100 focus:outline-none focus:ring-2",
            "focus:ring-secondary focus:ring-offset-2 disabled:pointer-events-none"
          )}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 px-6 py-4 border-b border-gray-200",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex items-center justify-end space-x-3 border-t border-gray-200",
      "px-6 py-4",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-xl font-heading font-semibold text-gray-900 leading-none tracking-tight",
        className
      )}
      {...rest}
    />
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-gray-500 leading-normal", className)}
      {...rest}
    />
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogBody = ({ className, ...props }) => (
  <div className={cn("px-6 py-4", className)} {...props} />
);
DialogBody.displayName = "DialogBody";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
};
