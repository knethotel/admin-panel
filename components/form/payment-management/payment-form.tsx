'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, paymentSchemaType } from 'schema';
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
import { Checkbox } from '@/components/ui/checkbox'; // Added Checkbox import
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormWrapper from './form-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const PaymentForm = () => {
  const router = useRouter();

  const form = useForm<paymentSchemaType>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      category: 'category1',
      validityFrom: '',
      validityTo: '',
      usageLimit: '',
      perUserLimit: '',
      minimumSpent: '',
      couponStatus: 'active',
      redemption: 'automatic',
      stackable: false,
      createCode: '',
      termsAndConditions: ''
    }
  });

  const onSubmit = (data: paymentSchemaType) => {
    console.log(data);
    form.reset();
  };

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-auto max-w-4xl mx-auto hide-scrollbar p-4 sm:px-6 md:px-8 rounded-lg"
        >
          {/* Main Grid: Two Sides */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Left Side */}
            <div className="flex flex-col gap-3">
              {/* Category */}
              <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                  Select Category
                </FormLabel>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#FAF6EF]">
                            {[
                              'category1',
                              'category2',
                              'category3',
                              'category4',
                              'category5'
                            ].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px] mt-1" />
                      </>
                    )}
                  />
                </div>
              </FormItem>

              {/* Validity */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                    Validity
                  </FormLabel>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <FormField
                      control={form.control}
                      name="validityFrom"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Input
                                  type="text"
                                  value={
                                    field.value
                                      ? format(new Date(field.value), 'PPP')
                                      : ''
                                  }
                                  placeholder="From"
                                  className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 cursor-pointer text-xs"
                                  readOnly
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    field.onChange(
                                      date?.toISOString().split('T')[0]
                                    )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage className="text-[10px] mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="validityTo"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Input
                                  type="text"
                                  value={
                                    field.value
                                      ? format(new Date(field.value), 'PPP')
                                      : ''
                                  }
                                  placeholder="To"
                                  className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 cursor-pointer text-xs"
                                  readOnly
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    field.onChange(
                                      date?.toISOString().split('T')[0]
                                    )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage className="text-[10px] mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Limits */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                        Usage Limit
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
                  name="perUserLimit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                        Per User Limit
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
                  name="minimumSpent"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                        Minimum Spent
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

              {/* Coupon Status */}
              <FormField
                control={form.control}
                name="couponStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700 pt-1">
                      Coupon Status
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {['active', 'expired', 'disabled'].map((value) => (
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

              {/* Redemption */}
              <FormField
                control={form.control}
                name="redemption"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700 pt-1">
                      Redemption
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {['automatic', 'manual entry', 'promo code'].map(
                            (value) => (
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
                            )
                          )}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Stackable - Changed to Checkbox */}
              <FormField
                control={form.control}
                name="stackable"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Stackable
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-[#F6EEE0] border-gray-300 data-[state=checked]:bg-[#A07D3D] data-[state=checked]:border-[#A07D3D]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Right Side */}
            <div className="space-y-28">
              {/* Create Code */}
              <FormField
                control={form.control}
                name="createCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Create Code
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

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="termsAndConditions"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700 pt-1">
                      Terms and Conditions
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full h-32 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 resize-y text-xs"
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
            <Button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto bg-[#EFE9DF] text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-md text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#A07D3D] text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default PaymentForm;
