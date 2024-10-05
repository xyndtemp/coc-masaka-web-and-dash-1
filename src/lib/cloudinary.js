import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({cloud: {cloudName: 'your_cloud_name'}});

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset');

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
