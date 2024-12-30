import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import ImageUpload from "../ImageUpload";

const ImageUploadFields = ({ methods, onImageSelect }) => (
  <>
    <FormField
      control={methods.control}
      name="Passport"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Passport</FormLabel>
          <FormControl>
            <ImageUpload
              value={field.value}
              onImageChange={(info) => {
                onImageSelect("Passport", info);
                field.onChange(info);
              }}
              uploadText="Attach a Passport"
              editText="Change Passport"
              uploadPreset="member_passports"
              croppingAspectRatio={1}
            />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="Signature"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Signature</FormLabel>
          <FormControl>
            <ImageUpload
              value={field.value}
              onImageChange={(info) => {
                onImageSelect("Signature", info);
                field.onChange(info);
              }}
              uploadText="Attach a Signature"
              editText="Change Signature"
              uploadPreset="member_signatures"
              croppingAspectRatio={3}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </>
);

export default ImageUploadFields;