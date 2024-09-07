import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { generateEmailTemplate } from '../lib/emailService';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

const BulkEmailModal = ({ onClose, onSend }) => {
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
          <ScrollArea className="h-[400px] overflow-y-auto">
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
          </ScrollArea>
        </Tabs>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Send Bulk Email</Button>
        </div>
      </form>
    </Form>
  );
};

export default BulkEmailModal;