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
      // Convert file to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      // Create a temporary preview URL
      const previewUrl = URL.createObjectURL(file);
      
      onImageChange([{
        url: base64, // Send base64 to Airtable
        filename: file.name,
        type: file.type,
        size: file.size,
        previewUrl // Use this for preview only
      }]);
    } catch (error) {
      console.error('Error handling file:', error);
      alert('Failed to process file. Please try again.');
    } finally {
      setIsSelecting(false);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent modal from closing
    setIsSelecting(true);
    fileInputRef.current?.click();
  };

  return (
    <div className='center-align' onClick={e => e.stopPropagation()}>
      {value && (
        <img 
          src={Array.isArray(value) ? value[0].previewUrl || value[0].url : value}
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