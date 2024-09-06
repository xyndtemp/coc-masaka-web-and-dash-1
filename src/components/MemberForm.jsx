
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

const MemberForm = ({ member, onClose, onSubmit }) => {
  const methods = useForm({
    defaultValues: member || {
      Name: '',
      email: '',
      Birthday: '',
    },
  });

  const handleSubmit = async (data) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
        toast.success('Member saved successfully');
        if (onClose) onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save member');
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={methods.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="Birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          {member ? 'Update' : 'Create'} Member
        </Button>
      </form>
    </Form>
  );
};

export default MemberForm;