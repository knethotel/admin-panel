'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import dummyHotelData from '../../../../app/static/company-panel/HotelManagement';
import { useForm } from 'react-hook-form';
import {
  CreateHotelIdFormSchema,
  CreateHotelIdFormSchemaType,
  serviceOptions
} from '../../../../schema/company-panel';
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
          className="flex flex-col px-8 gap-8 justify-center pt-8 items-center"
        >
          {/* Rendering Image when available and File uploader when not */}
          {mode === 'view' && hotel?.hotelImageUrl ? (
            <div className="h-32 w-32">
              <Image
                src={hotel.hotelImageUrl}
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
                  <div className="flex items-center w-full">
                    <FormControl>
                      <div
                        className="relative h-32 w-32 2xl:h-36 2xl:w-36 rounded-lg bg-[#F6EEE0] hover:drop-shadow-xl duration-200"
                        onDrop={(e) => {
                          if (mode === 'view') return;
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
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
                            field.onChange(file);
                          }
                        }}
                        onDragOver={(e) => {
                          if (mode === 'view') return;
                          e.preventDefault();
                        }}
                      >
                        <div className="h-full w-full flex items-center justify-center relative">
                          {preview ? (
                            <>
                              <Image
                                src={preview}
                                alt="Hotel preview"
                                height={576}
                                width={576}
                                className="object-cover rounded-lg h-full w-full"
                              />
                              {mode !== 'view' && (
                                <label
                                  htmlFor="fileUpload"
                                  className="absolute inset-0 flex justify-center items-center cursor-pointer bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity rounded-lg"
                                  aria-label="Reupload hotel image"
                                >
                                  <PiCameraThin className="text-white w-12 h-12 opacity-70" />
                                </label>
                              )}
                            </>
                          ) : (
                            mode !== 'view' && (
                              <label
                                htmlFor="fileUpload"
                                className="absolute inset-0 flex justify-center items-center cursor-pointer"
                                aria-label="Upload hotel image"
                              >
                                <PiCameraThin className="text-black w-12 h-44 opacity-30" />
                              </label>
                            )
                          )}
                        </div>
                        {mode !== 'view' && (
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
                                field.onChange(file);
                              } else {
                                setPreview(null);
                                field.onChange(undefined);
                              }
                            }}
                            className="hidden"
                            id="fileUpload"
                          />
                        )}
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
            <div className="flex flex-col gap-3 justify-center items-start">
              <FormField
                control={form.control}
                name="hotelID"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center">
                    <FormLabel className="w-full sm:w-32 text-sm font-medium text-black">
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
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-black rounded-md border-none outline-none focus:ring-0 text-sm"
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
                    <FormLabel className="w-full sm:w-32 text-sm font-medium text-black">
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
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-black rounded-md border-none outline-none focus:ring-0 text-sm"
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
                    <FormLabel className="w-full sm:w-32 text-sm font-medium text-black">
                      Address
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value}
                          disabled={!isEnabled}
                          placeholder="Enter address"
                          className="w-full placeholder:opacity-65 h-16 px-2 py-1 bg-[#F6EEE0] text-black rounded-md border-none outline-none focus:ring-0 text-sm resize-none"
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
                    <FormLabel className="w-full sm:w-32 text-sm font-medium text-black">
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
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-black rounded-md border-none outline-none focus:ring-0 text-sm"
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
                    <FormLabel className="w-full sm:w-32 text-sm font-medium text-black">
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
                          className="w-full placeholder:opacity-65 h-8 px-2 py-1 bg-[#F6EEE0] text-black rounded-md border-none outline-none focus:ring-0 text-sm"
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
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Label */}
              <label className="w-full sm:w-32 text-sm font-medium text-black pt-1">
                Services
              </label>

              {/* Services Grid */}
              <div className="w-full">
                <div className="grid grid-cols-3 gap-x-4">
                  {serviceOptions.map((service, index) => (
                    <div key={service} className="flex items-center mb-2">
                      <span className="text-sm text-black capitalize px-2 py-1 bg-lightbrown rounded cursor-pointer hover:bg-fadedCream transition">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="subscriptionPlan"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <FormLabel className="w-full mb-5 text-nowrap sm:w-32 text-sm font-medium text-black">
                      Subscription Plan
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={field.value}
                          disabled={!isEnabled}
                          className="w-fit placeholder:opacity-65 mb-1 h-8 bg-transparent bg-lightbrown text-black rounded-md border-none outline-none focus:ring-0 text-sm"
                        />
                        {/* ****Hardcoded for now**** */}
                      </FormControl>
                      <span className="text-sm min-h-8 text-goldenBrown ml-2">
                        INR- 2999/month
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <Button type="submit" className="btn-primary">
              Save
            </Button>
            {isSubmitting && 'Saving...'}
            {submitStatus === 'success' && (
              <p className="text-green-600 text-sm ml-4">
                Form submitted successfully!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 text-sm ml-4">
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
