import React, { ReactNode, useState } from 'react';
// import { Loader2 } from 'lucide-react';
// import { UploadCloud } from 'lucide-react';
import UploadWidget from './UploadWidget';
import { getCloudinaryImage } from '../helpers/image';
import defaultConfig from '@/config/default.json';

type Props = {
  value?: string;
  onImageChange: (info: cloudinary.ResultInfoSuccess) => void;
  editText?: string;
  uploadText?: string;
  children?: React.ReactNode;
  imageSx?: string;
  placeholder: ReactNode | string;
  uploadPreset: string;
  croppingAspectRatio?: number;
  maxFileSize?: number;
};

const ImageUpload = ({
  value,
  onImageChange,
  editText = 'Edit',
  uploadText = 'Upload',
  children,
  uploadPreset,
  croppingAspectRatio = 1.0,
  maxFileSize,
  }: Props) => {
    const imageSrc = value ? getCloudinaryImage(value) : '';

    return(
      <div className='center-align'>
      <img 
        src={imageSrc}
        alt="Uploaded Image"
        className='align-center m-1 w-full h-auto'
      />
      <UploadWidget
        file={value}
        onChange={onImageChange}
        clientAllowedFormats={['jpeg', 'jpg']}
        croppingAspectRatio={croppingAspectRatio}
        minImageWidth={500}
        minImageHeight={500}
        croppingShowDimensions
        uploadPreset={defaultConfig.cloudinary.uploadPreset}
        text={value ? editText : uploadText}
        maxFileSize={maxFileSize}
      />
      </div>
    );
  
};

export default ImageUpload;
