import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { uploadToVercelBlob } from '../lib/vercelBlob';
import { uploadToFirebase } from '../lib/firebaseStorage';
import { uploadToCloudinary } from '../lib/cloudinary';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ImageUpload = ({ value, onImageChange, uploadText, editText }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('direct');
  const [url, setUrl] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      let imageUrl;
      switch (uploadMethod) {
        case 'firebase':
          imageUrl = await uploadToFirebase(file);
          break;
        case 'cloudinary':
          imageUrl = await uploadToCloudinary(file);
          break;
        case 'vercel':
          imageUrl = await uploadToVercelBlob(file);
          break;
        default:
          imageUrl = URL.createObjectURL(file);
      }
      onImageChange(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlUpload = () => {
    if (url) {
      onImageChange(url);
      setUrl('');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {value && <img src={value} alt="Uploaded" className="w-32 h-32 object-cover mb-2" />}
      <Select value={uploadMethod} onValueChange={setUploadMethod}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select upload method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="direct">Direct Upload</SelectItem>
          <SelectItem value="firebase">Firebase Storage</SelectItem>
          <SelectItem value="cloudinary">Cloudinary</SelectItem>
          <SelectItem value="vercel">Vercel Blob</SelectItem>
          <SelectItem value="url">URL</SelectItem>
        </SelectContent>
      </Select>
      {uploadMethod === 'url' ? (
        <div className="flex space-x-2">
          <Input
            type="url"
            placeholder="Enter image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleUrlUpload} disabled={!url}>Upload URL</Button>
        </div>
      ) : (
        <Button as="label" htmlFor="file-upload" disabled={isUploading}>
          {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {value ? editText : uploadText}
        </Button>
      )}
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
