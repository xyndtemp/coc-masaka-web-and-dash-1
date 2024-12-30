import React, { useRef, useState } from 'react';
import { Button } from './ui/button';

const ImageUpload = ({
  value,
  onImageChange,
  editText = 'Edit',
  uploadText = 'Upload',
  maxFileSize = 1024 * 1024 * 1024,
}) => {
  const fileInputRef = useRef();
  const [isSelecting, setIsSelecting] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setIsSelecting(false);
      return;
    }

    if (file.size > maxFileSize) {
      alert('File size exceeds the maximum limit of 1GB');
      setIsSelecting(false);
      return;
    }

    try {
      // Create a URL for the selected file
      const url = URL.createObjectURL(file);
      onImageChange({ file, url });
    } catch (error) {
      console.error('Error handling file:', error);
      alert('Failed to process file. Please try again.');
    } finally {
      setIsSelecting(false);
    }
  };

  const handleClick = () => {
    setIsSelecting(true);
    fileInputRef.current?.click();
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
        onClick={(e) => {
          // Prevent the modal from closing when clicking the input
          e.stopPropagation();
        }}
      />
      <Button 
        onClick={handleClick}
        className="mt-2"
        disabled={isSelecting}
      >
        {value ? editText : uploadText}
      </Button>
    </div>
  );
};

export default ImageUpload;