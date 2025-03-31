'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRefundSchema, createRefundSchemaType } from 'schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormWrapper from './form-wrapper';

const CreateRefundForm = () => {
  const form = useForm<createRefundSchemaType>({
    resolver: zodResolver(createRefundSchema),
    defaultValues: {
      refundID: '',
      userID: '',
      hotelID: '',
      amount: 0,
      refundReason: '',
      refundStatus: 'Initiated', // Default status can be any of the enum values
      message: '',
      assignedStaff: '',
      serviceDepartment: '',
      dateAndTime: '' // You might want to set a default date-time string if needed
    }
  });

  const onSubmit = (data: createRefundSchemaType) => {
    console.log(data);
    form.reset();
  };

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full relative h-full max-w-4xl mx-auto p-4 sm:px-6 md:px-8 rounded-lg"
        >
          {/* Main Grid: Two Sides */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Left Side */}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="refundID"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Refund ID
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userID"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      User ID
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hotelID"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Hotel ID
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Amount
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="refundReason"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      REfund Reason
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Refund Status */}
              <FormField
                control={form.control}
                name="refundStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700 pt-1">
                      Refund Status
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {[
                            'Initiated',
                            'In-Progress',
                            'Completed',
                            'Rejected'
                          ].map((value) => (
                            <div
                              key={value}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={value} id={value} />
                              <label
                                htmlFor={value}
                                className="text-xs text-gray-700 capitalize"
                              >
                                {value}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-center md:items-start space-y-8">
              {/* Create Code */}
              <FormField
                control={form.control}
                name="assignedStaff"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Assigned Staff
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceDepartment"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Service Department
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceDepartment"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Date & Time
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            {' '}
            <Button
              type="submit"
              className="w-28 md:ml-24 sm:w-auto bg-[#A07D3D] text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default CreateRefundForm;
