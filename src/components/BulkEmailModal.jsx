import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from './ui/form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BulkEmailModal = ({ onClose, onSend }) => {
  const form = useForm({
    defaultValues: {
      subject: '',
      content: '',
    },
  });

  const onSubmit = (data) => {
    onSend(data);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email subject" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <div className="h-[300px] overflow-y-auto">
                  <ReactQuill theme="snow" {...field} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Send Bulk Email</Button>
        </div>
      </form>
    </Form>
  );
};

export default BulkEmailModal;