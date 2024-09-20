import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { uploadToVercelBlob } from '../lib/vercelBlob';

const ImageUpload = ({ value, onImageChange, uploadText, editText }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadToVercelBlob(file);
      onImageChange(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {value && <img src={value} alt="Uploaded" className="w-32 h-32 object-cover mb-2" />}
      <Button as="label" htmlFor="file-upload" disabled={isUploading}>
        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {value ? editText : uploadText}
      </Button>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUpload;
