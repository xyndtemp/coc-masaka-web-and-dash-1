import defaultConfig from "config/default.json";

export const getCloudinaryImage = (imageSlug: string) => {
  return `//${defaultConfig.cloudinary.cdnPrefix}/c_crop,g_custom/${imageSlug}`;
};
