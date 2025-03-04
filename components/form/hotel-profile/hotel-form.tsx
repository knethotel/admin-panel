// components/HotelForm.tsx
'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelSchema, HotelSchemaType } from 'schema';
import { ChevronDown, Upload } from 'lucide-react';
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
  const logoImageRef = useRef<HTMLInputElement>(null); // Added ref for logo

  const form = useForm<HotelSchemaType>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      hotelName: '',
      number: '',
      email: '',
      completeAddress: '',
      hotelCategory: 'Budget',
      city: 'Delhi',
      country: 'India',
      state: 'Maharashtra',
      pinCode: '',
      roomTypes: 'Single',
      roomImage: undefined,
      features: 'WIFI',
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
      // Note: logoImage needs to be added to HotelSchemaType in schema.ts if not already present
    }
  });

  const onSubmit = (data: HotelSchemaType) => {
    console.log('Hotel Data:', data);
    form.reset();
  };

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col gap-2 bg-inherit max-w-4xl mx-auto"
        >
          <div>
            <FormField
              control={form.control}
              name="logoImage"
              render={({ field }) => (
                <FormItem className=" relative inline-block">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      className="bg-[#A07D3D] text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
                      onClick={() => logoImageRef.current?.click()}
                    >
                      Upload Logo
                    </Button>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={logoImageRef}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="hidden"
                      />
                    </FormControl>
                    <span>
                      <Upload className="text-black h-4 w-4 absolute -right-2 -translate-y-1/2" />
                    </span>
                    <FormMessage className="text-[10px]" />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-6">
            {/* Chunk 1: Basic Hotel Info */}
            <div className="flex flex-col gap-3 bg-[#FAF6EF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-4 rounded-lg">
              {/* First Three Fields */}
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="hotelName"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Hotel Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter hotel name"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Next Two Fields */}
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="completeAddress"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Complete Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter address"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hotelCategory"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Hotel Category
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#FAF6EF]">
                            {['Budget', 'Luxury', 'Mid-range', 'Boutique'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <span>
                        <ChevronDown className="absolute right-4 -translate-y-1/2 text-black h-4 w-4" />
                      </span>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Last Four Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        City
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#FAF6EF]">
                            {['Los Angeles', 'New York', 'Chicago'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <span>
                        <ChevronDown className="absolute right-4 -translate-y-1/2 text-black h-4 w-4" />
                      </span>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#FAF6EF]">
                            {['USA', 'Canada', 'India'].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <span>
                        <ChevronDown className="absolute right-4 -translate-y-1/2 text-black h-4 w-4" />
                      </span>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        State
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#FAF6EF]">
                            {['California', 'New York', 'Illinois'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <span>
                        <ChevronDown className="absolute right-4 -translate-y-1/2 text-black h-4 w-4" />
                      </span>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Pincode
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pincode"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Chunk 2: Room Details */}
            <div className="flex flex-col bg-[#FAF6EF] gap-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-4 rounded-lg">
              {/* First Three Fields */}
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="roomTypes"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Room Types
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#FAF6EF]">
                            {['Single', 'Double', 'Suite'].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <span>
                        <ChevronDown className="absolute right-4 -translate-y-1/2 text-black h-4 w-4" />
                      </span>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomImage"
                  render={({ field }) => (
                    <FormItem className="inline-block relative">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          className="bg-[#A07D3D] relative text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
                          onClick={() => roomImageRef.current?.click()}
                        >
                          Upload Image
                          <span className="absolute -right-4">
                            <Upload className="text-black  h-4 w-4 absolute -right-2 -translate-y-1/2" />
                          </span>
                        </Button>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            ref={roomImageRef}
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                            className="hidden"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Select Features
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                            <SelectValue placeholder="Select feature" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#FAF6EF]">
                            {['WiFi', 'Pool', 'Gym'].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <span>
                        <ChevronDown className="absolute right-4 -translate-y-1/2 text-black h-4 w-4" />
                      </span>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Next Two Fields */}
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="numberOfRooms"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Number of Rooms
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
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkInTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Check-in Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 12:00 PM"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Last Two Fields */}
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="checkOutTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Check-out Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 11:00 AM"
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="servingDepartments"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-row items-center gap-2 relative">
                      <FormLabel className="w-32 text-xs font-medium text-gray-700">
                        Serving Departments
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#FAF6EF]">
                            {['Housekeeping', 'Reception', 'Dining'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <span>
                        <ChevronDown className="absolute right-4 -translate-y-1/2 text-black h-4 w-4" />
                      </span>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Remaining Field */}
              <FormField
                control={form.control}
                name="totalStaff"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 relative">
                    <FormLabel className="w-full sm:w-32 text-xs font-medium text-gray-700">
                      Total Staff
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter total staff"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                      </FormControl>
                      <span className="text-red-500 absolute -top-0 -right-2">
                        *
                      </span>
                      <FormMessage className="text-[10px]" />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Chunk 3: Licenses and Certifications */}
            <div className="grid grid-cols-2 bg-[#FAF6EF] gap-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-4 rounded-lg">
              <FormField
                control={form.control}
                name="hotelLicenseCertifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <FormLabel className="w-32 text-xs font-medium text-gray-700">
                      Hotel License & Certifications
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter license details"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <span className="text-red-500 absolute -top-0 -right-2">
                      *
                    </span>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hotelLicenseImage"
                render={({ field }) => (
                  <FormItem className="relative">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        className="bg-[#A07D3D] relative text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
                        onClick={() => hotelLicenseImageRef.current?.click()}
                      >
                        Upload Image
                        <span className="absolute -right-4">
                          <Upload className="text-black  h-4 w-4 absolute -right-2 -translate-y-1/2" />
                        </span>
                      </Button>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={hotelLicenseImageRef}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legalBusinessLicense"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <FormLabel className="w-32 text-xs font-medium text-gray-700">
                      Legal and Business License
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business license"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <span className="text-red-500 absolute -top-0 -right-2">
                      *
                    </span>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legalBusinessLicenseImage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        className="bg-[#A07D3D] relative text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
                        onClick={() =>
                          legalBusinessLicenseImageRef.current?.click()
                        }
                      >
                        Upload Image
                        <span className="absolute -right-4">
                          <Upload className="text-black  h-4 w-4 absolute -right-2 -translate-y-1/2" />
                        </span>
                      </Button>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={legalBusinessLicenseImageRef}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="touristLicense"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <FormLabel className="w-32 text-xs font-medium text-gray-700">
                      Tourist License
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tourist license"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <span className="text-red-500 absolute -top-0 -right-2">
                      *
                    </span>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="touristLicenseImage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        className="bg-[#A07D3D] relative text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
                        onClick={() => touristLicenseImageRef.current?.click()}
                      >
                        Upload Image
                        <span className="absolute -right-4">
                          <Upload className="text-black  h-4 w-4 absolute -right-2 -translate-y-1/2" />
                        </span>
                      </Button>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={touristLicenseImageRef}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <FormLabel className="w-32 text-xs font-medium text-gray-700">
                      TAN Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter TAN number"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <span className="text-red-500 absolute -top-0 -right-2">
                      *
                    </span>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanNumberImage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        className="bg-[#A07D3D] relative text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
                        onClick={() => tanNumberImageRef.current?.click()}
                      >
                        Upload Image
                        <span className="absolute -right-4">
                          <Upload className="text-black  h-4 w-4 absolute -right-2 -translate-y-1/2" />
                        </span>
                      </Button>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={tanNumberImageRef}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataPrivacyGdprCompliances"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <FormLabel className="w-32 text-xs font-medium text-gray-700">
                      Data Privacy & GDPR Compliances
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter GDPR details"
                        {...field}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                      />
                    </FormControl>
                    <span className="text-red-500 absolute -top-0 -right-2">
                      *
                    </span>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataPrivacyGdprImage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        className="bg-[#A07D3D] relative text-white hover:bg-[#8c6b33] px-6 py-2 rounded-md text-xs"
                        onClick={() => dataPrivacyGdprImageRef.current?.click()}
                      >
                        Upload Image
                        <span className="absolute -right-4">
                          <Upload className="text-black  h-4 w-4 absolute -right-2 -translate-y-1/2" />
                        </span>
                      </Button>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={dataPrivacyGdprImageRef}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internetConnectivity"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <FormLabel className="w-32 text-xs font-medium text-gray-700">
                      Internet Connectivity
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-[#F6EEE0] data-[state=checked]:bg-[#A07D3D]"
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
                  <FormItem className="flex flex-row items-center gap-2 relative">
                    <FormLabel className="w-32 text-xs font-medium text-gray-700">
                      Software Compatibility
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-[#F6EEE0] data-[state=checked]:bg-[#A07D3D]"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
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

export default HotelForm;
