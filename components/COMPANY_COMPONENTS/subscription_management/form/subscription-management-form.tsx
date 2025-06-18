
'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormWrapper from './form-wrapper';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import apiCall from '@/lib/axios';

// ✅ ZOD Schema
const SubscriptionManagementFormSchema = z.object({
  planName: z.string().min(1, 'Plan name is required'),
  planDuration: z.preprocess(val => Number(val), z.number()),
  planType: z.string().min(1, 'Plan type is required'),
  description: z.string().min(1, 'Description is required'),
  cost: z.union([z.string(), z.number()]).transform(Number)
});

type SubscriptionManagementFormSchemaType = z.infer<typeof SubscriptionManagementFormSchema>;

interface Props {
  mode?: 'add' | 'edit' | 'view';
  uniqueId?: string;
  id?: string;
}

const SubscriptionManagementForm: React.FC<Props> = ({ id, mode = 'view' }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubscriptionManagementFormSchemaType>({
    resolver: zodResolver(SubscriptionManagementFormSchema),
    defaultValues: {
      planName: '',
      planDuration: 0,
      planType: '',
      description: '',
      cost: 0
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if ((mode === 'edit' || mode === 'view') && id) {
        try {
          const res = await apiCall('GET', `/api/subscription/${id}`);
          const data = res?.data;

          if (data) {
            form.reset({
              planName: data.planName,
              planDuration: Number(data.planDuration),
              planType: data.planType,
              description: data.description,
              cost: Number(data.cost)
            });
          }
        } catch (error) {
          console.error('Error fetching subscription:', error);
        }
      }
    };

    fetchData();
  }, [mode, id, form]);

  const onSubmit = async (formData: SubscriptionManagementFormSchemaType) => {
    setIsSubmitting(true);
    try {
      await apiCall('POST', '/api/subscription', formData);
      router.back();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 py-7 px-2"
        >
          <div className="flex flex-row gap-8">
            {/* Left Column */}
            <div className="w-1/2 flex flex-col gap-6">
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
                        disabled={mode === 'view' || isSubmitting}
                        {...field}
                        placeholder="Enter Plan Name"
                        className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 text-xs 2xl:text-sm border-none rounded-md focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </FormItem>
                )}
              />

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
                        disabled={mode === 'view' || isSubmitting}
                        {...field}
                        placeholder="Enter Description"
                        className="w-full h-44 min-h-[80px] p-2 bg-[#F6EEE0] text-gray-900 text-xs 2xl:text-sm border-none rounded-md resize-y focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column */}
            <div className="w-1/2 flex flex-col gap-6">
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
                          type="number"
                          disabled={mode === 'view' || isSubmitting}
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter Plan Duration"
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 text-xs 2xl:text-sm border-none rounded-md focus:ring-0"
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
                          disabled={mode === 'view' || isSubmitting}
                          type="text"
                          {...field}
                          placeholder="Enter Plan Type"
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 text-xs 2xl:text-sm border-none rounded-md focus:ring-0"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </FormItem>
                  )}
                />
              </div>

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
                        disabled={mode === 'view' || isSubmitting}
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter Cost"
                        className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 text-xs 2xl:text-sm border-none rounded-md focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </FormItem>
                )}
              />
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
            {mode !== 'view' && (
              <Button
                type="submit"
                className="bg-[#A07D3D] h-8 px-2 text-sm text-white hover:text-black hover:outline hover:outline-black"
                disabled={isSubmitting}
              >
                Save
              </Button>
            )}
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default SubscriptionManagementForm;
