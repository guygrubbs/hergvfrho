import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea'; // Adjust the import path if necessary
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/toaster';

const formSchema = z.object({
  companyName: z.string().nonempty('Company Name is required'),
  problem: z.string().optional(),
  solution: z.string().optional(),
  // Add more fields as necessary
});

export default function PitchDeckForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      problem: '',
      solution: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({ title: 'Submission successful', description: 'Your form has been submitted.' });
      form.reset();
    } catch (error) {
      toast({ title: 'Submission failed', description: 'An error occurred during submission.', variant: 'error' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="companyName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="problem"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="solution"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </Form>
  );
}
