import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from './ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { generateEmailTemplate } from '../lib/cpanelEmailService';

const EmailModal = ({ onClose, onSend }) => {
  const [activeTab, setActiveTab] = useState('edit');
  const form = useForm({
    defaultValues: {
      subject: '',
      content: '',
    },
  });

  const onSubmit = (data) => {
    const htmlContent = generateEmailTemplate(data.content);
    onSend({ ...data, html: htmlContent });
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ReactQuill theme="snow" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="border p-4 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: generateEmailTemplate(form.watch('content')) }} />
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Send Email</Button>
        </div>
      </form>
    </Form>
  );
};

export default EmailModal;