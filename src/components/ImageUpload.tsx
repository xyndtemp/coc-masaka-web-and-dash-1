import React, { useRef } from 'react';
import { Button } from './ui/button';
import { handleFileUpload } from '../lib/fileUpload';

type Props = {
  value?: string;
  onImageChange: (info: any) => void;
  editText?: string;
  uploadText?: string;
  children?: React.ReactNode;
  imageSx?: string;
  placeholder?: React.ReactNode | string;
  uploadPreset?: string;
  croppingAspectRatio?: number;
  maxFileSize?: number;
};

const ImageUpload = ({
  value,
  onImageChange,
  editText = 'Edit',
  uploadText = 'Upload',
  maxFileSize = 1024 * 1024 * 1024, // 1GB max as per Airtable docs
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxFileSize) {
      alert('File size exceeds the maximum limit of 1GB');
      return;
    }

    try {
      const attachmentInfo = await handleFileUpload(file);
      onImageChange(attachmentInfo);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className='center-align'>
      {value && (
        <img 
          src={value}
          alt="Uploaded Image"
          className='align-center m-1 w-full h-auto'
        />
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <Button 
        onClick={() => fileInputRef.current?.click()}
        className="mt-2"
      >
        {value ? editText : uploadText}
      </Button>
    </div>
  );
};

export default ImageUpload;