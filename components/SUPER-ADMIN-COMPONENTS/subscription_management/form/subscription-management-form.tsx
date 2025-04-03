'use client';
import React, { useState } from 'react';

import {
  SubscriptionManagementFormSchema,
  SubscriptionManagementFormSchemaType
} from 'schema/super-admin-panel';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import FormWrapper from './form-wrapper';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Define the props type, including the new data prop
type Props = {
  subscriptionID?: string;
  mode?: string;
  data?: Partial<SubscriptionManagementFormSchemaType>; // Partial to allow incomplete data
};

// Dummy data for testing
const dummyData: SubscriptionManagementFormSchemaType = {
  subscriptionID: 'SUB123',
  planName: 'Premium Plan',
  planDuration: '12 months',
  planType: 'Monthly',
  description: 'A premium subscription with full access.',
  status: 'Active',
  cost: 99.99
};

const SubscriptionManagemetForm: React.FC<Props> = ({
  subscriptionID,
  mode,
  data
}) => {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use prop data if provided, otherwise fall back to dummy data
  const defaultValues = data
    ? { ...dummyData, ...data } // Merge dummy data with prop data, prioritizing prop data
    : dummyData;

  const form = useForm<SubscriptionManagementFormSchemaType & FieldValues>({
    resolver: zodResolver(SubscriptionManagementFormSchema),
    defaultValues: {
      subscriptionID: defaultValues.subscriptionID || '',
      planName: defaultValues.planName || '',
      planDuration: defaultValues.planDuration || '',
      planType: defaultValues.planType || '',
      description: defaultValues.description || '',
      status: defaultValues.status || '', // Fallback to 'Active' if status is missing
      cost: defaultValues.cost || 0
    }
  });

  const onSubmit = (formData: SubscriptionManagementFormSchemaType) => {
    setIsSubmitting(true);
    try {
      console.log(formData);
      setSubmitStatus('success');
    } catch (error) {
      console.log('Error occurred: ', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
    form.reset();
  };

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 items-center py-7 px-2"
        >
          <div className="w-full flex justify-between">
            <FormField
              control={form.control}
              name="subscriptionID"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                    Subscription ID
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        placeholder="Enter Subscription ID"
                        disabled
                        className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planName"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                    Plan Name
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        placeholder="Enter Plan Name"
                        disabled
                        className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planDuration"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                    Plan Duration
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        placeholder="Enter Plan Duration"
                        disabled
                        className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planType"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                    Plan Type
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        placeholder="Enter Plan Type"
                        disabled
                        className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-start items-start gap-12">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700 pt-1">
                      Description
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value}
                          placeholder="Enter Description"
                          disabled
                          className="w-full h-44 placeholder:opacity-65 min-h-[80px] p-2 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs resize-y"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2 flex items-start justify-between">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Status
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-48 text-left bg-[#F6EEE0] hover:text-black border-opacity-45 text-black">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {['Active', 'Inactive', 'Cancelled', 'Expired'].map(
                              (status, index) => (
                                <SelectItem key={index} value={status}>
                                  {status}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start mt-3">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Cost
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value}
                          placeholder="Enter Cost"
                          disabled
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Payment Type -- dummy data for now */}
          <div className="flex w-full items-center justify-start">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium">Payment Type</span>
              <span className="text-xs opacity-60">Auto Renewal</span>
            </div>
          </div>
          <div className="flex items-center justify-start w-full pt-6 gap-3">
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-[#EFE9DF] h-8 px-2 text-sm hover:outline hover:outline-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#A07D3D] h-8 px-2 text-sm text-white hover:text-black hover:outline hover:outline-black"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default SubscriptionManagemetForm;

// Example usage with dummy data (for testing)
const ExampleParentComponent: React.FC = () => {
  return (
    <SubscriptionManagemetForm
      subscriptionID="SUB123"
      mode="edit"
      data={dummyData} // Pass dummy data via prop
    />
  );
};

export { ExampleParentComponent };
