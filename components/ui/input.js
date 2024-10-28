import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

// Define input variants using class-variance-authority
const inputVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
      width: {
        default: 'w-full',
        auto: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
      width: 'default',
    },
  }
);

// Input component
const Input = React.forwardRef(({ className, icon, ...props }, ref) => {
  const Comp = props.asChild ? Slot : 'input';
  return (
    <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-3 flex items-center">
          {icon}
        </span>
      )}
      <Comp
        ref={ref}
        className={cn(
          inputVariants(props),
          icon ? 'pl-10' : '',
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
