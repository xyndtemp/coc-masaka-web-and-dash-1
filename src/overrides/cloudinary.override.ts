import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import defaultConfig from '@/config/default.json';

export const cloudinary = new Cloudinary({
    cloud: {
        cloudName: defaultConfig.cloudinary.cloudName
    }
});

export const getCloudinaryImage = (image: string) => {
    return cloudinary.image(image);
};

export const uploadToCloudinary = (image: string) => {
