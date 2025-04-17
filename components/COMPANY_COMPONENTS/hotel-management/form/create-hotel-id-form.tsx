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
import { apiCall } from '@/lib/axios';

type Props = {
  hotelID?: string;
  isEnabled?: boolean;
  mode: string;
};

const CreateHotelIdForm = ({ hotelID, isEnabled = true, mode }: Props) => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getHotelDetails = (hotelID: string | undefined) => {
    if (hotelID) {
      return dummyHotelData.find((hotel) => hotel.hotelID === hotelID);
    }
    return null;
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
      subscriptionPlan: hotel?.subscriptionPlan || 'Standard',
      subscriptionPrice: hotel?.subscriptionPrice || 2999,
      contactNo: hotel?.contactNo || '',
      email: hotel?.email || ''
    }
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = async (data: CreateHotelIdFormSchemaType) => {
    console.log('is submitting');
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const formData = new FormData();
      formData.append('name', data.hotelName);
      formData.append('address', data.address);
      formData.append('email', data.email);
      formData.append('phoneNo', data.contactNo);
      formData.append('subscriptionPlan', data.subscriptionPlan);
      formData.append('subscriptionPrice', data.subscriptionPrice.toString());
      if (data.services && data.services.length > 0) {
        formData.append('services', JSON.stringify(data.services));
      }
      if (data.hotelImageFile) {
        formData.append('image', data.hotelImageFile);
      }

      const response = await apiCall(
        'POST',
        'api/superAdmin/hotel/add-hotel',
        formData
      );
      console.log('API response:', response);
      setSubmitStatus('success');
      form.reset();
      router.push('/hotels'); // Navigate to hotels list after success
    } catch (error: any) {
      console.error('Error occurred during API call:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCancel = () => {
    form.reset(); // Reset form to initial values
    setPreview(null); // Clear image preview
    router.push('/hotels'); // Navigate back to hotels list
  };

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col px-8 gap-8 justify-center pt-8 items-center"
        >
          {/* Image Upload */}
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
                          disabled={mode === 'view' || !isEnabled}
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
                          disabled={mode === 'view' || !isEnabled}
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
                          disabled={mode === 'view' || !isEnabled}
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
            <div className="flex flex-col gap-3 justify-center items-start">
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
                          disabled={mode === 'view' || !isEnabled}
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
                          type="email"
                          {...field}
                          disabled={mode === 'view' || !isEnabled}
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
            {/* Services */}
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-black">
                    Services
                  </FormLabel>
                  <div className="grid grid-cols-3 gap-x-4">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center mb-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service)}
                            onCheckedChange={(checked) => {
                              const updatedServices = checked
                                ? [...(field.value || []), service]
                                : (field.value || []).filter(
                                    (s) => s !== service
                                  );
                              field.onChange(updatedServices);
                            }}
                            disabled={mode === 'view' || !isEnabled}
                          />
                        </FormControl>
                        <FormLabel className="ml-2 text-sm text-black capitalize">
                          {service}
                        </FormLabel>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <FormField
                control={form.control}
                name="subscriptionPlan"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center">
                    <FormLabel className="w-full sm:w-32 text-sm font-medium text-black">
                      Subscription Plan
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={mode === 'view' || !isEnabled}
                          className="w-fit placeholder:opacity-65 h-8 bg-[#F6EEE0] text-black rounded-md border-none outline-none focus:ring-0 text-sm"
                        />
                      </FormControl>
                      <span className="text-sm text-goldenBrown ml-2">
                        INR- 2999/month
                      </span>
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex justify-start items-center gap-4">
            <Button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting || mode === 'view'}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || mode === 'view'}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            {submitStatus === 'success' && (
              <p className="text-green-600 text-sm">
                Form submitted successfully!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 text-sm">
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
