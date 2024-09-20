import { Cloudinary } from "@cloudinary/url-gen";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const apiKey = import.meta.env.VITE_CLOUD_API_KEY;
const apiSecret = import.meta.env.VITE_CLOUD_API_SECRET;

const cld = new Cloudinary({
  cloud: {
    cloudName,
  },
  url: {
    secure: true,
  },
});

export const initializeCloudinaryWidget = (callback) => {
  return window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: "ml_default",
      sources: ["local", "camera"],
      multiple: false,
      maxFiles: 1,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        callback(result.info.secure_url);
      }
    }
  );
};

export const CloudinaryImage = ({ publicId, alt, width, height }) => {
  const myImage = cld.image(publicId).resize(fill().width(width).height(height));
  const imageUrl = myImage.toURL();
  
  return {
    src: imageUrl,
    alt: alt,
    width: width,
    height: height
  };
};

export default cld;
