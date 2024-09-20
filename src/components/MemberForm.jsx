import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import SignatureCanvas from 'react-signature-canvas';
import { useRef, useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { v4 as uuidv4 } from 'uuid';
import Barcode from 'react-barcode';

const FormFields = ({ methods, signatureRef, passportImage, setPassportImage }) => (
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
      name="L.G.A"
      render={({ field }) => (
        <FormItem>
          <FormLabel>L.G.A</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormItem>
      <FormLabel>Passport</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPassportImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </FormControl>
    </FormItem>
    {passportImage && (
      <img src={passportImage} alt="Passport" className="w-32 h-32 object-cover mt-2" />
    )}
    <div>
      <FormLabel>Signature</FormLabel>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{width: 300, height: 150, className: 'border border-gray-300'}}
      />
      <Button type="button" onClick={() => signatureRef.current.clear()} className="mt-2">Clear Signature</Button>
    </div>
  </>
);

const MemberForm = ({ member, onClose, onSubmit }) => {
  const methods = useForm({
    defaultValues: member || {
      'member ID': '',
      'ID Printed': 'false',
      'Gender': '',
      'FirstName': '',
      'LastName': '',
      'barcode': '',
      'Phone Number': '',
      'Email': '',
      'Marital Status': '',
      'Address': '',
      'Nationality': '',
      'L.G.A': '',
    },
  });

  const signatureRef = useRef();
  const [passportImage, setPassportImage] = useState(member?.Passport?.[0]?.url || null);

  const handleSubmit = async (data) => {
    try {
      if (signatureRef.current) {
        const signatureDataUrl = signatureRef.current.toDataURL();
        data.Signature = [{ url: signatureDataUrl }];
      }
      if (passportImage) {
        data.Passport = [{ url: passportImage }];
      }
      if (!data['member ID']) {
        data['member ID'] = uuidv4();
      }
      data.barcode = data['member ID'];
      if (onSubmit) {
        await onSubmit(data);
        toast.success('Member saved successfully');
        if (onClose) onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save member');
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        <ScrollArea className="h-[60vh] pr-4">
          <FormFields methods={methods} signatureRef={signatureRef} passportImage={passportImage} setPassportImage={setPassportImage} />
          <div className="mt-4">
            <FormLabel>Barcode</FormLabel>
            <Barcode value={member?.['member ID'] || 'New Member'} />
          </div>
        </ScrollArea>
        <Button type="submit" className="w-full">
          {member ? 'Update' : 'Create'} Member
        </Button>
      </form>
    </Form>
  );
};

export default MemberForm;
