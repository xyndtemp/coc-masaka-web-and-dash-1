import { toast } from 'sonner';

const cloudName = import.meta.env.VITE_CLOUD_NAME;

export const initializeCloudinaryWidget = (callback, options = {}) => {
  return new Promise((resolve, reject) => {
    if (typeof window.cloudinary === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      script.onload = () => createWidget(callback, options, resolve);
      script.onerror = () => {
        toast.error('Failed to load Cloudinary widget');
        reject(new Error('Failed to load Cloudinary widget'));
      };
      document.body.appendChild(script);
    } else {
      createWidget(callback, options, resolve);
    }
  });
};

const createWidget = (callback, options, resolve) => {
  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: options.uploadPreset,
      sources: ["local", "camera"],
      multiple: false,
      maxFiles: 1,
      maxFileSize: options.maxFileSize,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        callback(result.info.secure_url);
      }
      if (error) {
        console.error('Cloudinary Upload Error:', error);
        toast.error('Failed to upload image');
      }
    }
  );
  resolve(widget);
};
