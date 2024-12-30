import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import SelectFields from "./SelectFields";
import DateFields from "./DateFields";

const FormFields = ({ methods }) => (
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
    
    <SelectFields methods={methods} />
    <DateFields methods={methods} />

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
  </>
);

export default FormFields;