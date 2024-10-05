import { Cloudinary } from "@cloudinary/url-gen";
import defaultConfig from '@/config/default.json';

const cld = new Cloudinary({cloud: {cloudName: defaultConfig.cloudinary.cloudName}});

export const uploadToCloudinary = async (dataUrl) => {
  const formData = new FormData();
  formData.append('file', dataUrl);
  formData.append('upload_preset', defaultConfig.cloudinary.uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cld.config().cloud.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};