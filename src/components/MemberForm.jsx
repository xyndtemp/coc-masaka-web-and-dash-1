import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form } from './ui/form';
import FormFields from './members/FormFields';
import ImageUploadFields from './members/ImageUploadFields';
import SignatureCanvas from './SignatureCanvas';

const MemberForm = ({ member, onClose, onSubmit }) => {
  const [pendingUploads, setPendingUploads] = useState({});
  const methods = useForm({
    defaultValues: member ? {
      ...member,
      // Convert Cloudinary URLs back to the expected format for the form
      'Passport': member.Passport ? [{
        url: member.Passport,
        filename: 'passport.png'
      }] : null,
      'Signature': member.Signature ? [{
        url: member.Signature,
        filename: 'signature.png'
      }] : null,
    } : {
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
      'Date of Birth': '',
      'Date of Baptism': '',
      'Passport': null,
      'Signature': null,
    },
  });

  const handleImageSelect = (field, info) => {
    setPendingUploads(prev => ({
      ...prev,
      [field]: info
    }));
  };

  const handleSubmit = async (data) => {
    // Include any pending uploads in the submission
    const formData = {
      ...data,
      ...pendingUploads,
      // Convert the Cloudinary image data to URLs for submission
      'Passport': data.Passport?.[0]?.url || null,
      'Signature': data.Signature?.[0]?.url || null,
    };

    try {
      if (onSubmit) {
        await onSubmit(formData);
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
        <ImageUploadFields methods={methods} onImageSelect={handleImageSelect} />
        <SignatureCanvas methods={methods} />
        <Button type="submit" className="w-full">
          {member ? 'Update' : 'Create'} Member
        </Button>
      </form>
    </Form>
  );
};

export default MemberForm;