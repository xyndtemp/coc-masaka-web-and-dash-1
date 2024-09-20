import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { initializeCloudinaryWidget } from '../lib/cloudinary';

const ImageUpload = ({ value, onImageChange, uploadPreset, uploadText, editText, maxFileSize }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    initializeCloudinaryWidget((result) => {
      setIsUploading(false);
      onImageChange(result);
    }, { uploadPreset, maxFileSize }).then(setWidget);
  }, [onImageChange, uploadPreset, maxFileSize]);

  const handleUpload = () => {
    setIsUploading(true);
    if (widget) {
      widget.open();
    } else {
      console.error('Cloudinary widget is not initialized');
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {value && <img src={value} alt="Uploaded" className="w-32 h-32 object-cover mb-2" />}
      <Button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {value ? editText : uploadText}
      </Button>
    </div>
  );
};

export default ImageUpload;