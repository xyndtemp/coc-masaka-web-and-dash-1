import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from './ui/form';

const MemberForm = ({ member, onClose, onSubmit }) => {
  const methods = useForm({
    defaultValues: member || {
      Name: '',
      email: '', // Changed from Email to email
      Birthday: '',
    },
  });

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
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
        <Button type="submit" className="mt-4">
          {member ? 'Update' : 'Create'} Member
        </Button>
      </form>
    </FormProvider>
  );
};

export default MemberForm;