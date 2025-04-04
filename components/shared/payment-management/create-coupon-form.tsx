'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCouponSchema, createCouponSchemaType } from 'schema';
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
import { PiCameraThin } from 'react-icons/pi';

const CreateCouponForm = ({ onClose }: { onClose: () => void }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const form = useForm<createCouponSchemaType>({
    resolver: zodResolver(createCouponSchema),
    defaultValues: {
      category: 'Percentage Coupons',
      validityFrom: '',
      validityTo: '',
      usageLimit: '',
      discountPercentage: '',
      discountAmount: undefined,
      minimumSpent: '',
      couponStatus: 'active',
      redemption: 'automatic',
      stackable: false,
      createCode: '',
      termsAndConditions: '',
      couponImage: undefined
    }
  });

  const selectedCouponCategory = form.watch('category');

  const onSubmit = (data: createCouponSchemaType) => {
    console.log(data);
    form.reset();
    onClose();
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
                            <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 py-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['Percentage Coupons', 'Fixed Amount Coupons'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
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
                {selectedCouponCategory === 'Percentage Coupons' && (
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                          Discount (%)
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
                )}
                {selectedCouponCategory === 'Fixed Amount Coupons' && (
                  <FormField
                    control={form.control}
                    name="discountAmount"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                          Discount in Amount
                        </FormLabel>
                        <div className="w-full">
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value ?? ''} // Handle undefined/null
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              } // Convert string to number
                              className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                )}
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
            <div className="flex flex-col items-center md:items-start space-y-8">
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
              <FormField
                control={form.control}
                name="couponImage"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Coupon Image
                    </FormLabel>
                    <div className="flex items-center w-full">
                      <FormControl>
                        <div
                          className="relative h-44 w-44 rounded-lg bg-[#F6EEE0] p-2"
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              field.onChange(file);
                              if (preview) URL.revokeObjectURL(preview);
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <div className="h-full w-full flex items-center justify-center">
                            {preview && (
                              <img
                                src={preview}
                                alt="Coupon preview"
                                className="h-full w-full object-cover rounded-lg"
                              />
                            )}
                          </div>
                          {!preview && (
                            <label
                              htmlFor="fileUpload"
                              className="absolute inset-0 flex justify-center items-center cursor-pointer"
                              aria-label="Upload coupon image"
                            >
                              <PiCameraThin className="text-black w-12 h-44 opacity-30" />
                            </label>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (!file.type.startsWith('image/')) {
                                  alert('Please upload an image file.');
                                  return;
                                }
                                if (file.size > 5 * 1024 * 1024) {
                                  alert('File size exceeds 5MB.');
                                  return;
                                }
                                if (preview) URL.revokeObjectURL(preview);
                                const imageUrl = URL.createObjectURL(file);
                                setPreview(imageUrl);
                              } else {
                                setPreview(null);
                              }
                              field.onChange(file);
                            }}
                            className="hidden"
                            id="fileUpload"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
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
              <Button
                type="submit"
                className="w-28 md:ml-24 sm:w-auto bg-[#A07D3D] text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
              >
                Save Changes
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3"></div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default CreateCouponForm;
