'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import dummyHotelData from '../../../../app/static/super-admin-panel/HotelManagement';
import { useForm } from 'react-hook-form';
import {
  CreateHotelIdFormSchema,
  CreateHotelIdFormSchemaType,
  serviceOptions,
  ServiceType
} from '../../../../schema/super-admin-panel';
import { zodResolver } from '@hookform/resolvers/zod';
import FormWrapper from './form-wrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Image from 'next/image';
import { PiCameraThin } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

type Props = {
  hotelID?: string;
  isEnabled?: boolean;
  mode: string;
};

const CreateHotelIdForm = ({ hotelID, isEnabled, mode }: Props) => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const getHotelDetails = (hotelID: string | undefined) => {
    if (hotelID) {
      return dummyHotelData.find((hotel) => hotel.hotelID === hotelID);
    } else {
      return null;
    }
  };
  const hotel = getHotelDetails(hotelID);

  const form = useForm<CreateHotelIdFormSchemaType>({
    resolver: zodResolver(CreateHotelIdFormSchema),
    defaultValues: {
      hotelID: hotel?.hotelID || '',
      hotelImageUrl: hotel?.hotelImageUrl || '',
      hotelImageFile: hotel?.hotelImageFile || undefined,
      hotelName: hotel?.hotelName || '',
      address: hotel?.address || '',
      services: hotel?.services || [],
      subscriptionPlan: hotel?.subscriptionPlan || '',
      subscriptionPrice: hotel?.subscriptionPrice || 0,
      contactNo: hotel?.contactNo || '',
      email: hotel?.email || ''
    }
  });

  const onSubmit = (data: CreateHotelIdFormSchemaType) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      setSubmitStatus('success');
    } catch (error) {
      console.log('Error occured: ', error);
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
          className="flex flex-col px-8 gap-8 justify-center pt-8 items-center"
        >
          {/* Rendering Image when available and File uploader when not */}
          {mode === 'view' && hotel?.hotelImageUrl ? (
            <div className="h-32 w-32">
              <Image
                src={hotel.hotelImageUrl} // Using Image component correctly
                alt={hotel.hotelName || 'Hotel Image'}
                height={176}
                width={176}
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="hotelImageFile"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center tracking-wide">
                  <FormLabel className="w-full text-center sm:w-32 text-sm opacity-60 text-coffee">
                    Hotel Image
                  </FormLabel>
                  <div className="flex items-center w-full">
                    <FormControl>
                      <div
                        className="relative h-32 w-32 rounded-lg bg-[#F6EEE0] p-2"
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
                            <Image
                              src={preview} // Using Image component here as well
                              alt="Coupon preview"
                              height={476}
                              width={476}
                              className="object-cover rounded-lg"
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
          )}
          <div className="w-full flex justify-between items-center gap-4">
            {/* Left part */}
            <div className="flex flex-col gap-3 justify-center items-center">
              <FormField
                control={form.control}
                name="hotelID"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Hotel ID
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={field.value}
                          disabled={!isEnabled}
                          placeholder="Enter hotel ID"
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
                name="hotelName"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Hotel Name
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={field.value}
                          disabled={!isEnabled}
                          placeholder="Enter hotel Name"
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
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Address
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value}
                          disabled={!isEnabled}
                          placeholder="Enter address"
                          className="w-full placeholder:opacity-65 h-16 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {/* Right part */}
            <div className="flex flex-col gap-3 justify-center items-center">
              <FormField
                control={form.control}
                name="contactNo"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Contact
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={field.value}
                          disabled={!isEnabled}
                          placeholder="Enter contact number"
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
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={field.value}
                          disabled={!isEnabled}
                          placeholder="Enter email"
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
          <div className="flex flex-col gap-4 justify-center items-start w-full">
            {/* Services options */}
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row gap-2">
                  <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700 pt-1">
                    Services
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <div className="flex flex-wrap xl:w-[650px] gap-2">
                        {serviceOptions.map((value) => (
                          <div
                            key={value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              disabled={!isEnabled}
                              checked={field.value.includes(value)} // No need for ?. since services is required
                              onCheckedChange={(checked) => {
                                let newValue: ServiceType[] = field.value; // field.value is always ServiceType[]
                                if (checked) {
                                  newValue = [...newValue, value];
                                } else {
                                  newValue = newValue.filter(
                                    (item) => item !== value
                                  );
                                }
                                field.onChange(newValue);
                              }}
                              id={value}
                            />
                            <label
                              htmlFor={value}
                              className="text-xs text-gray-700 capitalize"
                            >
                              {value}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscriptionPlan"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center">
                  <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                    Subscription Plan
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        disabled={!isEnabled}
                        placeholder="Enter plan name"
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
              name="subscriptionPrice"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center">
                  <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                    Subscription Price
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value}
                        disabled={!isEnabled}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="Enter plan name"
                        className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-gray-900 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] mt-1" />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-start items-center">
            <Button
              type="submit"
              className="w-28 h-8 md:ml-24 sm:w-auto bg-[#A07D3D] text-white hover:bg-[#8c6b33] px-6 rounded-md text-xs"
            >
              Save
            </Button>
            {isSubmitting && 'Saving...'}
            {submitStatus === 'success' && (
              <p className="text-green-600 text-xs ml-4">
                Form submitted successfully!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 text-xs ml-4">
                An error occurred. Please try again.
              </p>
            )}
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default CreateHotelIdForm;
