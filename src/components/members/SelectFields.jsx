import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const SelectFields = ({ methods }) => (
  <>
    <FormField
      control={methods.control}
      name="Gender"
      rules={{ required: "Gender is required" }}
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
      rules={{ required: "ID Printed status is required" }}
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
      name="Marital Status"
      rules={{ required: "Marital Status is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Marital Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  </>
);

export default SelectFields;