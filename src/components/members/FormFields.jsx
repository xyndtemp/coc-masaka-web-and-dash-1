import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
      name="Date of Birth"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date of Birth</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="Date of Baptism"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date of Baptism</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
    <FormField
      control={methods.control}
      name="Marital Status"
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