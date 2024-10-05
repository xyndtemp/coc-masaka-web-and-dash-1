import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { cloudinary } from "@/overrides/cloudinary.override";

const OtherUpload = () => {

    const myImage = cloudinary.image('');


    return (
        <div>
           <CloudinaryUploadWidget  />
        </div>
    );
};

export default OtherUpload;
