'use client';
import React, { useState } from 'react';
import {
  SubscriptionManagementFormSchema,
  SubscriptionManagementFormSchemaType
} from 'schema/company-panel';
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
  data?: Partial<SubscriptionManagementFormSchemaType>;
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

const SubscriptionManagementForm: React.FC<Props> = ({
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
  const defaultValues = data ? { ...dummyData, ...data } : dummyData;

  const form = useForm<SubscriptionManagementFormSchemaType & FieldValues>({
    resolver: zodResolver(SubscriptionManagementFormSchema),
    defaultValues: {
      subscriptionID: defaultValues.subscriptionID || '',
      planName: defaultValues.planName || '',
      planDuration: defaultValues.planDuration || '',
      planType: defaultValues.planType || '',
      description: defaultValues.description || '',
      status: defaultValues.status || '',
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
          className="flex flex-col gap-8 py-7 px-2"
        >
          {/* Main Container for Two Parts */}
          <div className="flex flex-row gap-8">
            {/* First Part */}
            <div className="w-1/2 flex flex-col gap-6">
              {/* Subscription ID and Plan Name */}
              <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name="subscriptionID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Subscription ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Subscription ID"
                          disabled={mode === 'view'}
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="planName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Plan Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Plan Name"
                          disabled={mode === 'view'}
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start w-full">
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter Description"
                        disabled={mode === 'view'}
                        className="w-full h-44 placeholder:opacity-65 min-h-[80px] p-2 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm resize-y"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Second Part */}
            <div className="w-1/2 flex flex-col gap-6">
              {/* Plan Duration and Plan Type */}
              <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name="planDuration"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Plan Duration
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Plan Duration"
                          disabled={mode === 'view'}
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="planType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Plan Type
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Plan Type"
                          disabled={mode === 'view'}
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Status and Cost */}
              <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={mode === 'view'}
                        >
                          <SelectTrigger className="w-full text-left bg-[#F6EEE0] hover:text-black border-opacity-45 text-black h-8 text-xs 2xl:text-sm">
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
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Cost
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Enter Cost"
                          disabled={mode === 'view'}
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Payment Type */}
          <div className="flex w-full items-center justify-start">
            <div className="flex flex-col items-start">
              <span className="text-xs 2xl:text-sm font-medium">
                Payment Type
              </span>
              <span className="text-xs 2xl:text-sm opacity-60">
                Auto Renewal
              </span>
            </div>
          </div>

          {/* Buttons */}
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
              disabled={isSubmitting}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default SubscriptionManagementForm;

// Example usage with dummy data (for testing)
const ExampleParentComponent: React.FC = () => {
  return (
    <SubscriptionManagementForm
      subscriptionID="SUB123"
      mode="edit"
      data={dummyData}
    />
  );
};

export { ExampleParentComponent };
