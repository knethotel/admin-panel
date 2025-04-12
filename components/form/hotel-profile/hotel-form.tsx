'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelSchema, HotelSchemaType } from 'schema';
import { Upload } from 'lucide-react';
import { CiCamera } from 'react-icons/ci';
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
import { Switch } from '@/components/ui/switch';
import FormWrapper from './form-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const HotelForm = () => {
  const router = useRouter();

  // Refs for file inputs
  const roomImageRef = useRef<HTMLInputElement>(null);
  const hotelLicenseImageRef = useRef<HTMLInputElement>(null);
  const legalBusinessLicenseImageRef = useRef<HTMLInputElement>(null);
  const touristLicenseImageRef = useRef<HTMLInputElement>(null);
  const tanNumberImageRef = useRef<HTMLInputElement>(null);
  const dataPrivacyGdprImageRef = useRef<HTMLInputElement>(null);
  const logoImageRef = useRef<HTMLInputElement>(null);
  const additionalImageRef = useRef<HTMLInputElement>(null); // New ref for additional image

  // State for image previews
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: string | null;
  }>({
    logoImage: null,
    additionalImage: null, // New key for additional image
    roomImage: null,
    hotelLicenseImage: null,
    legalBusinessLicenseImage: null,
    touristLicenseImage: null,
    tanNumberImage: null,
    dataPrivacyGdprImage: null
  });

  const form = useForm<HotelSchemaType>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      hotelName: '',
      number: '',
      email: '',
      completeAddress: '',
      hotelCategory: '5 Star',
      city: 'Delhi',
      country: 'India',
      state: 'Maharashtra',
      pinCode: '',
      roomTypes: 'Single',
      roomImage: undefined,
      features: 'Balcony View',
      numberOfRooms: 1,
      checkInTime: '',
      checkOutTime: '',
      servingDepartments: 'Housekeeping',
      totalStaff: 1,
      hotelLicenseCertifications: '',
      hotelLicenseImage: undefined,
      legalBusinessLicense: '',
      legalBusinessLicenseImage: undefined,
      touristLicense: '',
      touristLicenseImage: undefined,
      tanNumber: '',
      tanNumberImage: undefined,
      dataPrivacyGdprCompliances: '',
      dataPrivacyGdprImage: undefined,
      internetConnectivity: false,
      softwareCompatibility: false
    }
  });

  const onSubmit = (data: HotelSchemaType) => {
    console.log('Hotel Data:', data);
    form.reset();
    setImagePreviews({
      logoImage: null,
      additionalImage: null, // Reset additional image preview
      roomImage: null,
      hotelLicenseImage: null,
      legalBusinessLicenseImage: null,
      touristLicenseImage: null,
      tanNumberImage: null,
      dataPrivacyGdprImage: null
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    fieldOnChange?: (file: File | undefined) => void
  ) => {
    const file = e.target.files?.[0];
    if (fieldOnChange) {
      fieldOnChange(file);
    }
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({ ...prev, [fieldName]: previewUrl }));
    } else {
      setImagePreviews((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement | null>) => {
    ref.current?.click();
  };

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3 bg-inherit mx-auto"
        >
          <div className="flex gap-4">
            {/* Logo Uploader */}
            <FormField
              control={form.control}
              name="logoImage"
              render={({ field }) => (
                <FormItem className="w-fit relative">
                  <FormLabel className="text-coffee font-medium">
                    Upload Logo <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-100"
                      onClick={() => triggerFileInput(logoImageRef)}
                    >
                      {imagePreviews.logoImage ? (
                        <img
                          src={imagePreviews.logoImage}
                          alt="Logo Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                      )}
                    </div>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={logoImageRef}
                        onChange={(e) =>
                          handleImageChange(e, 'logoImage', field.onChange)
                        }
                        className="hidden"
                      />
                    </FormControl>
                    <Upload
                      className={`absolute left-20 z-20 h-3 w-3 2xl:h-4 2xl:w-4 ${
                        imagePreviews.logoImage
                          ? 'text-black cursor-pointer'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() =>
                        imagePreviews.logoImage &&
                        triggerFileInput(logoImageRef)
                      }
                    />
                  </div>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            {/* Additional Image Uploader */}
            <FormItem className="w-fit relative">
              <FormLabel className="text-coffee font-medium">
                Upload Image <span className="text-red-500">*</span>
              </FormLabel>
              <div className="flex items-center gap-2">
                <div
                  className="w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-100"
                  onClick={() => triggerFileInput(additionalImageRef)}
                >
                  {imagePreviews.additionalImage ? (
                    <img
                      src={imagePreviews.additionalImage}
                      alt="Additional Image Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  ref={additionalImageRef}
                  onChange={(e) => handleImageChange(e, 'additionalImage')}
                  className="hidden"
                />
                <Upload
                  className={`absolute left-20 z-20 h-3 w-3 2xl:h-4 2xl:w-4 ${
                    imagePreviews.additionalImage
                      ? 'text-black cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={() =>
                    imagePreviews.additionalImage &&
                    triggerFileInput(additionalImageRef)
                  }
                />
              </div>
              {/* Optionally add a FormMessage if you want to display validation errors */}
              <FormMessage className="text-[10px]" />
            </FormItem>
          </div>
          <div className="w-full flex flex-col gap-6">
            {/* Chunk 1: Basic Hotel Info */}
            <div className="flex flex-col gap-4 2xl:gap-5 bg-[#FAF6EF] shadow-custom p-6 2xl:p-8 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="hotelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Hotel Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter hotel name"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="completeAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Complete Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter address"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hotelCategory"
                  render={({ field }) => (
                    <FormItem className="w-fit">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Hotel Category <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-coffee">
                            {['3 Star', '4 Star', '5 Star', '7 Star'].map(
                              (value) => (
                                <SelectItem
                                  key={value}
                                  value={value}
                                  className="text-white"
                                >
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        City <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {['Delhi', 'Mumbai', 'Bangalore', 'Chennai'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Country <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {['India', 'United States', 'United Kingdom'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        State <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              'Maharashtra',
                              'Karnataka',
                              'Tamil Nadu',
                              'Delhi'
                            ].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Pincode <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pincode"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Chunk 2: Room Details */}
            <div className="flex flex-col gap-4 2xl:gap-5 bg-[#FAF6EF] shadow-custom p-6 2xl:p-8 rounded-lg">
              <div className="flex gap-5 w-fit">
                <FormField
                  control={form.control}
                  name="roomTypes"
                  render={({ field }) => (
                    <FormItem className="w-40">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Room Types <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            {['Single', 'Double', 'Twin', 'Deluxe'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomImage"
                  render={({ field }) => (
                    <FormItem className="w-fit relative">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Room Image <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-100"
                          onClick={() => triggerFileInput(roomImageRef)}
                        >
                          {imagePreviews.roomImage ? (
                            <img
                              src={imagePreviews.roomImage}
                              alt="Room Preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                          )}
                        </div>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            ref={roomImageRef}
                            onChange={(e) =>
                              handleImageChange(e, 'roomImage', field.onChange)
                            }
                            className="hidden"
                          />
                        </FormControl>
                        <Upload
                          className={`absolute left-20 z-20 h-3 w-3 2xl:h-4 2xl:w-4 ${
                            imagePreviews.roomImage
                              ? 'text-black cursor-pointer'
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                          onClick={() =>
                            imagePreviews.roomImage &&
                            triggerFileInput(roomImageRef)
                          }
                        />
                      </div>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem className="w-40">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Select Features <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select feature" />
                          </SelectTrigger>
                          <SelectContent>
                            {['Sea Side', 'Balcony View'].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="numberOfRooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Number of Rooms <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter number of rooms"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkInTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Check-in Time <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 12:00 PM"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="checkOutTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Check-out Time <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 11:00 AM"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="servingDepartments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Serving Departments{' '}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              'Reception',
                              'Housekeeping',
                              'In-Room Dining',
                              'Gym'
                            ].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="totalStaff"
                  render={({ field }) => (
                    <FormItem className="w-40">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Total Staff <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter total staff"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Chunk 3: Licenses and Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-5 bg-[#FAF6EF] shadow-custom p-6 2xl:p-8 rounded-lg">
              <FormField
                control={form.control}
                name="hotelLicenseCertifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      Hotel License & Certifications{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter license details"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hotelLicenseImage"
                render={({ field }) => (
                  <FormItem className="w-fit relative">
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      Hotel License Image{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-100"
                        onClick={() => triggerFileInput(hotelLicenseImageRef)}
                      >
                        {imagePreviews.hotelLicenseImage ? (
                          <img
                            src={imagePreviews.hotelLicenseImage}
                            alt="Hotel License Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={hotelLicenseImageRef}
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              'hotelLicenseImage',
                              field.onChange
                            )
                          }
                          className="hidden"
                        />
                      </FormControl>
                      <Upload
                        className={`absolute left-20 z-20 h-3 w-3 2xl:h-4 2xl:w-4 ${
                          imagePreviews.hotelLicenseImage
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.hotelLicenseImage &&
                          triggerFileInput(hotelLicenseImageRef)
                        }
                      />
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legalBusinessLicense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      Legal and Business License{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business license"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legalBusinessLicenseImage"
                render={({ field }) => (
                  <FormItem className="w-fit relative">
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      Business License Image{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-100"
                        onClick={() =>
                          triggerFileInput(legalBusinessLicenseImageRef)
                        }
                      >
                        {imagePreviews.legalBusinessLicenseImage ? (
                          <img
                            src={imagePreviews.legalBusinessLicenseImage}
                            alt="Business License Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={legalBusinessLicenseImageRef}
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              'legalBusinessLicenseImage',
                              field.onChange
                            )
                          }
                          className="hidden"
                        />
                      </FormControl>
                      <Upload
                        className={`absolute left-20 z-20 h-3 w-3 2xl:h-4 2xl:w-4 ${
                          imagePreviews.legalBusinessLicenseImage
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.legalBusinessLicenseImage &&
                          triggerFileInput(legalBusinessLicenseImageRef)
                        }
                      />
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="touristLicense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      Tourist License <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tourist license"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="touristLicenseImage"
                render={({ field }) => (
                  <FormItem className="w-fit relative">
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      Tourist License Image{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-100"
                        onClick={() => triggerFileInput(touristLicenseImageRef)}
                      >
                        {imagePreviews.touristLicenseImage ? (
                          <img
                            src={imagePreviews.touristLicenseImage}
                            alt="Tourist License Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={touristLicenseImageRef}
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              'touristLicenseImage',
                              field.onChange
                            )
                          }
                          className="hidden"
                        />
                      </FormControl>
                      <Upload
                        className={`absolute left-20 z-20 h-3 w-3 2xl:h-4 2xl:w-4 ${
                          imagePreviews.touristLicenseImage
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.touristLicenseImage &&
                          triggerFileInput(touristLicenseImageRef)
                        }
                      />
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      TAN Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter TAN number"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanNumberImage"
                render={({ field }) => (
                  <FormItem className="w-fit relative">
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      TAN Number Image <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-100"
                        onClick={() => triggerFileInput(tanNumberImageRef)}
                      >
                        {imagePreviews.tanNumberImage ? (
                          <img
                            src={imagePreviews.tanNumberImage}
                            alt="TAN Number Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={tanNumberImageRef}
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              'tanNumberImage',
                              field.onChange
                            )
                          }
                          className="hidden"
                        />
                      </FormControl>
                      <Upload
                        className={`absolute left-20 z-20 h-3 w-3 2xl:h-4 2xl:w-4 ${
                          imagePreviews.tanNumberImage
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.tanNumberImage &&
                          triggerFileInput(tanNumberImageRef)
                        }
                      />
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataPrivacyGdprCompliances"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      Data Privacy & GDPR Compliances{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter GDPR details"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataPrivacyGdprImage"
                render={({ field }) => (
                  <FormItem className="w-fit relative">
                    <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                      GDPR Compliance Image{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-100"
                        onClick={() =>
                          triggerFileInput(dataPrivacyGdprImageRef)
                        }
                      >
                        {imagePreviews.dataPrivacyGdprImage ? (
                          <img
                            src={imagePreviews.dataPrivacyGdprImage}
                            alt="GDPR Compliance Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={dataPrivacyGdprImageRef}
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              'dataPrivacyGdprImage',
                              field.onChange
                            )
                          }
                          className="hidden"
                        />
                      </FormControl>
                      <Upload
                        className={`absolute left-20 z-20 h-3 w-3 2xl:h-4 2xl:w-4 ${
                          imagePreviews.dataPrivacyGdprImage
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.dataPrivacyGdprImage &&
                          triggerFileInput(dataPrivacyGdprImageRef)
                        }
                      />
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="internetConnectivity"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Internet Connectivity
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="softwareCompatibility"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Software Compatibility
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col sm:flex-row justify-end gap-4 2x:gap-5">
            <Button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary text-xs 2xl:text-sm"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-primary text-xs 2xl:text-sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default HotelForm;
