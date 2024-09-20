import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useRef, useState } from 'react';
import { initializeCloudinaryWidget } from '../lib/cloudinary';

const FormFields = ({ methods, passportImage, setPassportImage, signatureImage, setSignatureImage }) => {
  const uploadPassportWidget = useRef();
  const uploadSignatureWidget = useRef();

  const initializeWidgets = () => {
    uploadPassportWidget.current = initializeCloudinaryWidget((url) => setPassportImage(url));
    uploadSignatureWidget.current = initializeCloudinaryWidget((url) => setSignatureImage(url));
  };

  useState(initializeWidgets, []);

  return (
    <>
      <FormField
        control={methods.control}
        name="FirstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="LastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="Gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Bro.">Brother</SelectItem>
                <SelectItem value="Sis.">Sister</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="ID Printed"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID Printed</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID Printed status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="Phone Number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input {...field} type="tel" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="Email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="Marital Status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marital Status</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="Address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="Nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nationality</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="LGA"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LGA</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormItem>
        <FormLabel>Passport</FormLabel>
        <FormControl>
          <div>
            <Button type="button" onClick={() => uploadPassportWidget.current.open()}>
              Upload Passport
            </Button>
            {passportImage && <img src={passportImage} alt="Passport" className="mt-2 w-32 h-32 object-cover" />}
          </div>
        </FormControl>
      </FormItem>
      <FormItem>
        <FormLabel>Signature</FormLabel>
        <FormControl>
          <div>
            <Button type="button" onClick={() => uploadSignatureWidget.current.open()}>
              Upload Signature
            </Button>
            {signatureImage && <img src={signatureImage} alt="Signature" className="mt-2 w-64 h-32 object-contain" />}
          </div>
        </FormControl>
      </FormItem>
    </>
  );
};

const MemberForm = ({ member, onClose, onSubmit }) => {
  const methods = useForm({
    defaultValues: member || {
      'member ID': '',
      'ID Printed': 'false',
      'Gender': '',
      'FirstName': '',
      'LastName': '',
      'Phone Number': '',
      'Email': '',
      'Marital Status': '',
      'Address': '',
      'Nationality': '',
      'LGA': '',
    },
  });

  const [passportImage, setPassportImage] = useState(member?.Passport?.[0]?.url || null);
  const [signatureImage, setSignatureImage] = useState(member?.Signature?.[0]?.url || null);

  const handleSubmit = async (data) => {
    try {
      if (passportImage) {
        data.Passport = [{ url: passportImage }];
      }
      if (signatureImage) {
        data.Signature = [{ url: signatureImage }];
      }
      if (onSubmit) {
        await onSubmit(data);
        if (onClose) onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        <FormFields
          methods={methods}
          passportImage={passportImage}
          setPassportImage={setPassportImage}
          signatureImage={signatureImage}
          setSignatureImage={setSignatureImage}
        />
        <Button type="submit" className="w-full">
          {member ? 'Update' : 'Create'} Member
        </Button>
      </form>
    </Form>
  );
};

export default MemberForm;
