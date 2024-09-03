import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMember, updateMember } from '../lib/airtable';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from './ui/form';

const MemberForm = ({ member, onClose }) => {
  const queryClient = useQueryClient();
  const methods = useForm({
    defaultValues: member || {
      Name: '',
      Email: '',
      Birthday: '',
    },
  });

  const mutation = useMutation({
    mutationFn: member ? updateMember : createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      onClose();
    },
  });

  const onSubmit = (data) => {
    if (member) {
      mutation.mutate([member.id, data]);
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          name="Email"
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