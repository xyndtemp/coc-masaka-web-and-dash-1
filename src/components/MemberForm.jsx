import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ImageUpload from './ImageUpload';

const MemberForm = ({ member, onClose, onSubmit }) => {
  const methods = useForm({
    defaultValues: member || {
      'member ID': '',
      'ID Printed': 'false',
      'Gender': '',
      'FirstName': '',
      'LastName': '',
      'Phone Number': '',
      'Email': '',
      'Marital Status': '',
      'Address': '',
      'Nationality': '',
      'LGA': '',
      'Passport': null,
      'Signature': null,
    },
  });

  const handleSubmit = async (data) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
        if (onClose) onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        <FormFields methods={methods} />
        <ImageUploadFields methods={methods} />
        <Button type="submit" className="w-full">
          {member ? 'Update' : 'Create'} Member
        </Button>
      </form>
    </Form>
  );
};

const FormFields = ({ methods }) => (
  <>
    <FormField
      control={methods.control}
      name="FirstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="LastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="Gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gender</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Bro.">Brother</SelectItem>
              <SelectItem value="Sis.">Sister</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="ID Printed"
      render={({ field }) => (
        <FormItem>
          <FormLabel>ID Printed</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select ID Printed status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="Phone Number"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
            <Input {...field} type="tel" />
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
      name="Marital Status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Marital Status</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="Address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="Nationality"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nationality</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="LGA"
      render={({ field }) => (
        <FormItem>
          <FormLabel>LGA</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  </>
);

const ImageUploadFields = ({ methods }) => (
  <>
    <FormField
      control={methods.control}
      name="Passport"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Passport</FormLabel>
          <FormControl>
            <ImageUpload
              value={field.value}
              onImageChange={(info) => field.onChange(info.secure_url)}
              uploadText="Attach a Passport"
              editText="Change Passport"
              uploadPreset="member_passports"
              croppingAspectRatio={1}
            />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="Signature"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Signature</FormLabel>
          <FormControl>
            <ImageUpload
              value={field.value}
              onImageChange={(info) => field.onChange(info.secure_url)}
              uploadText="Attach a Signature"
              editText="Change Signature"
              uploadPreset="member_signatures"
              croppingAspectRatio={3}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </>
);

export default MemberForm;