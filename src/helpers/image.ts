import defaultConfig from '../config/default.json';


export const getCloudinaryImage = (logoSlug: string) => {
    return `//${defaultConfig.cloudinary.cdnPrefix}/c_crop,g_custom/${logoSlug}`;
};
