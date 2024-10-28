import React from 'react';
import { cn } from '@/lib/utils'; // Assuming a utility function for classnames
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

// Define textarea variants using class-variance-authority
const textareaVariants = cva(
  'w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default: ['border-input', 'focus:ring-primary'],
        error: ['border-red-500', 'focus:ring-red-500'],
        success: ['border-green-500', 'focus:ring-green-500'],
      },
      size: {
        default: '',
        sm: 'py-1 text-sm',
        lg: 'py-3 text-lg',
      },
      rounded: {
        default: '',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

// Textarea component
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const Comp = props.asChild ? Slot : 'textarea';
  return (
    <Comp
      ref={ref}
      className={cn(textareaVariants(props), className)}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
