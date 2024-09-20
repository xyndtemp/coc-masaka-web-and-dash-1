import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

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

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
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
