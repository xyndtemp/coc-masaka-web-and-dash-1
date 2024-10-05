import { Cloudinary } from "@cloudinary/url-gen";
import defaultConfig from "config/default.json";

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: defaultConfig.cloudinary.cloudName,
  },
});

export const getCloudinaryImage = (image: string) => {
  return cloudinary.image(image);
};
