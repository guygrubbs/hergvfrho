import React from 'react';
import { Input } from '@/components/ui/input';
import { Toaster, AppToaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const formVariants = cva('space-y-6', {
  variants: {
    size: {
      sm: 'space-y-4',
      lg: 'space-y-8',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

const Form = React.forwardRef(({ children, className, onSubmit, size, ...props }, ref) => (
  <form
    ref={ref}
    onSubmit={onSubmit}
    className={cn(formVariants({ size }), className)}
    {...props}
  >
    {children}
  </form>
));

Form.displayName = 'Form';

const FormField = ({ label, error, children }) => (
  <div className="form-field space-y-2">
    {label && <label className="block text-sm font-medium">{label}</label>}
    {children}
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const FormInput = React.forwardRef(({ label, error, ...props }, ref) => (
  <FormField label={label} error={error}>
    <Input ref={ref} {...props} />
  </FormField>
));

FormInput.displayName = 'FormInput';

export { Form, FormInput, AppToaster };
