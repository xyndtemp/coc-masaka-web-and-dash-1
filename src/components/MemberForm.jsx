import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMember, updateMember } from '../lib/airtable';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from './ui/form';

const MemberForm = ({ member, onClose }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: member || {},
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...register('Name')} />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField>
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...register('Email')} type="email" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField>
        <FormItem>
          <FormLabel>Birthday</FormLabel>
          <FormControl>
            <Input {...register('Birthday')} type="date" />
          </FormControl>
        </FormItem>
      </FormField>
      <Button type="submit" className="mt-4">
        {member ? 'Update' : 'Create'} Member
      </Button>
    </Form>
  );
};

export default MemberForm;