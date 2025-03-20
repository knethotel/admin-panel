// components/HotelForm.tsx
'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelSchema, HotelSchemaType } from 'schema';
import { ChevronDown, Upload } from 'lucide-react';
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

  // State for image previews
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: string | null;
  }>({
    logoImage: null,
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
      roomImage: null,
      hotelLicenseImage: null,
      legalBusinessLicenseImage: null,
      touristLicenseImage: null,
      tanNumberImage: null,
      dataPrivacyGdprImage: null
    });
  };

  // Handle image preview and upload
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    fieldOnChange: (file: File | undefined) => void
  ) => {
    const file = e.target.files?.[0];
    fieldOnChange(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({ ...prev, [fieldName]: previewUrl }));
    } else {
      setImagePreviews((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  // Trigger file input click for reupload
  const triggerFileInput = (ref: React.RefObject<HTMLInputElement | null>) => {
    ref.current?.click();
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
                <FormItem className="relative flex items-center gap-2">
                  <FormLabel className="text-coffee font-medium px-1">
                    Upload Logo
                  </FormLabel>
                  <div className="flex relative items-center gap-1">
                    {' '}
                    <div
                      className="w-32 h-12 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-300"
                      onClick={() => logoImageRef.current?.click()}
                    >
                      {imagePreviews.logoImage ? (
                        <img
                          src={imagePreviews.logoImage}
                          alt="Logo Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <span className="">
                          <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                        </span>
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
                      className={`absolute right-10 h-4 w-4 ${
                        imagePreviews.logoImage
                          ? 'text-black cursor-pointer'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() =>
                        imagePreviews.logoImage &&
                        triggerFileInput(logoImageRef)
                      }
                    />
                    <FormMessage className="text-[10px]" />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-6">
            {/* Chunk 1: Basic Hotel Info */}
            <div className="flex flex-col gap-3 bg-[#FAF6EF] shadow-custom p-4 rounded-lg">
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
                          <SelectContent className="bg-coffee">
                            {['3 Starr', '4 Star', '5 Star', '7 Star'].map(
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
                          <SelectContent>
                            {[
                              'Delhi',
                              'Mumbai',
                              'Bangalore',
                              'Chennai',
                              'Kolkata',
                              'Hyderabad',
                              'Ahmedabad',
                              'Pune',
                              'Jaipur',
                              'Surat',
                              'Lucknow',
                              'Kanpur',
                              'Nagpur',
                              'Visakhapatnam',
                              'Bhopal',
                              'Patna',
                              'Ludhiana',
                              'Agra',
                              'Nashik',
                              'Vadodara',
                              'Indore',
                              'Coimbatore',
                              'Kochi',
                              'Chandigarh',
                              'Guwahati'
                            ].map((value) => (
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
                          <SelectContent>
                            {[
                              'Afghanistan',
                              'Albania',
                              'Algeria',
                              'Andorra',
                              'Angola',
                              'Antigua and Barbuda',
                              'Argentina',
                              'Armenia',
                              'Australia',
                              'Austria',
                              'Azerbaijan',
                              'Bahamas',
                              'Bahrain',
                              'Bangladesh',
                              'Barbados',
                              'Belarus',
                              'Belgium',
                              'Belize',
                              'Benin',
                              'Bhutan',
                              'Bolivia',
                              'Bosnia and Herzegovina',
                              'Botswana',
                              'Brazil',
                              'Brunei',
                              'Bulgaria',
                              'Burkina Faso',
                              'Burundi',
                              'Cabo Verde',
                              'Cambodia',
                              'Cameroon',
                              'Canada',
                              'Central African Republic',
                              'Chad',
                              'Chile',
                              'China',
                              'Colombia',
                              'Comoros',
                              'Congo',
                              'Costa Rica',
                              'Croatia',
                              'Cuba',
                              'Cyprus',
                              'Czech Republic',
                              'Democratic Republic of the Congo',
                              'Denmark',
                              'Djibouti',
                              'Dominica',
                              'Dominican Republic',
                              'East Timor',
                              'Ecuador',
                              'Egypt',
                              'El Salvador',
                              'Equatorial Guinea',
                              'Eritrea',
                              'Estonia',
                              'Eswatini',
                              'Ethiopia',
                              'Fiji',
                              'Finland',
                              'France',
                              'Gabon',
                              'Gambia',
                              'Georgia',
                              'Germany',
                              'Ghana',
                              'Greece',
                              'Grenada',
                              'Guatemala',
                              'Guinea',
                              'Guinea-Bissau',
                              'Guyana',
                              'Haiti',
                              'Honduras',
                              'Hungary',
                              'Iceland',
                              'India',
                              'Indonesia',
                              'Iran',
                              'Iraq',
                              'Ireland',
                              'Israel',
                              'Italy',
                              'Ivory Coast',
                              'Jamaica',
                              'Japan',
                              'Jordan',
                              'Kazakhstan',
                              'Kenya',
                              'Kiribati',
                              'Kuwait',
                              'Kyrgyzstan',
                              'Laos',
                              'Latvia',
                              'Lebanon',
                              'Lesotho',
                              'Liberia',
                              'Libya',
                              'Liechtenstein',
                              'Lithuania',
                              'Luxembourg',
                              'Madagascar',
                              'Malawi',
                              'Malaysia',
                              'Maldives',
                              'Mali',
                              'Malta',
                              'Marshall Islands',
                              'Mauritania',
                              'Mauritius',
                              'Mexico',
                              'Micronesia',
                              'Moldova',
                              'Monaco',
                              'Mongolia',
                              'Montenegro',
                              'Morocco',
                              'Mozambique',
                              'Myanmar',
                              'Namibia',
                              'Nauru',
                              'Nepal',
                              'Netherlands',
                              'New Zealand',
                              'Nicaragua',
                              'Niger',
                              'Nigeria',
                              'North Korea',
                              'North Macedonia',
                              'Norway',
                              'Oman',
                              'Pakistan',
                              'Palau',
                              'Palestine',
                              'Panama',
                              'Papua New Guinea',
                              'Paraguay',
                              'Peru',
                              'Philippines',
                              'Poland',
                              'Portugal',
                              'Qatar',
                              'Romania',
                              'Russia',
                              'Rwanda',
                              'Saint Kitts and Nevis',
                              'Saint Lucia',
                              'Saint Vincent and the Grenadines',
                              'Samoa',
                              'San Marino',
                              'Sao Tome and Principe',
                              'Saudi Arabia',
                              'Senegal',
                              'Serbia',
                              'Seychelles',
                              'Sierra Leone',
                              'Singapore',
                              'Slovakia',
                              'Slovenia',
                              'Solomon Islands',
                              'Somalia',
                              'South Africa',
                              'South Korea',
                              'South Sudan',
                              'Spain',
                              'Sri Lanka',
                              'Sudan',
                              'Suriname',
                              'Sweden',
                              'Switzerland',
                              'Syria',
                              'Tajikistan',
                              'Tanzania',
                              'Thailand',
                              'Togo',
                              'Tonga',
                              'Trinidad and Tobago',
                              'Tunisia',
                              'Turkey',
                              'Turkmenistan',
                              'Tuvalu',
                              'Uganda',
                              'Ukraine',
                              'United Arab Emirates',
                              'United Kingdom',
                              'United States',
                              'Uruguay',
                              'Uzbekistan',
                              'Vanuatu',
                              'Vatican City',
                              'Venezuela',
                              'Vietnam',
                              'Yemen',
                              'Zambia',
                              'Zimbabwe'
                            ].map((value) => (
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
                          <SelectContent>
                            {[
                              'Maharashtra',
                              'Karnataka',
                              'Tamil Nadu',
                              'Delhi',
                              'Andhra Pradesh',
                              'Arunachal Pradesh',
                              'Assam',
                              'Bihar',
                              'Chhattisgarh',
                              'Goa',
                              'Gujarat',
                              'Haryana',
                              'Himachal Pradesh',
                              'Jharkhand',
                              'Kerala',
                              'Madhya Pradesh',
                              'Manipur',
                              'Meghalaya',
                              'Mizoram',
                              'Nagaland',
                              'Odisha',
                              'Punjab',
                              'Rajasthan',
                              'Sikkim',
                              'Telangana',
                              'Tripura',
                              'Uttar Pradesh',
                              'Uttarakhand',
                              'West Bengal',
                              'Andaman and Nicobar Islands',
                              'Chandigarh',
                              'Dadra and Nagar Haveli and Daman and Diu',
                              'Jammu and Kashmir',
                              'Ladakh',
                              'Lakshadweep',
                              'Puducherry'
                            ].map((value) => (
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
            <div className="flex flex-col bg-[#FAF6EF] gap-3 shadow-custom p-4 rounded-lg">
              {/* First Three Fields */}
              <div className="flex flex-row gap-4 justify-between items-center w-full">
                <div className="flex flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="roomTypes"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2 w-full max-w-md">
                        <FormLabel className="min-w-24 text-xs font-medium text-gray-700 shrink-0">
                          Room Types
                        </FormLabel>
                        <div className="relative flex-1 max-w-44">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs pr-8">
                                <SelectValue placeholder="Select room type" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  'Single',
                                  'Double',
                                  'Twin',
                                  'Deluxe',
                                  'Studio Room /Apartments',
                                  'Junior Suite',
                                  'Suite',
                                  'Presidential Suite',
                                  'Connecting Suite',
                                  'Rooms with a View'
                                ].map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-black h-4 w-4 pointer-events-none" />
                          <span className="absolute -right-3 top-0 text-red-500 text-xs">
                            *
                          </span>
                        </div>
                        <FormMessage className="text-[10px] absolute -bottom-5 left-28" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomImage"
                    render={({ field }) => (
                      <FormItem className="inline-block relative mt-2">
                        <div className="flex relative items-center gap-2">
                          <div
                            className="w-32 h-12 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-300"
                            onClick={() => roomImageRef.current?.click()}
                          >
                            {imagePreviews.roomImage ? (
                              <img
                                src={imagePreviews.roomImage}
                                alt="Room Preview"
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <span className="">
                                <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                              </span>
                            )}
                          </div>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              ref={roomImageRef}
                              onChange={(e) =>
                                handleImageChange(
                                  e,
                                  'roomImage',
                                  field.onChange
                                )
                              }
                              className="hidden"
                            />
                          </FormControl>
                          <Upload
                            className={`absolute right-10 h-4 w-4 ${imagePreviews.roomImage ? 'text-black cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                            onClick={() =>
                              imagePreviews.roomImage &&
                              triggerFileInput(roomImageRef)
                            }
                          />
                          <FormMessage className="text-[10px]" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 w-full max-w-md">
                      <FormLabel className="min-w-24 text-xs font-medium text-gray-700 shrink-0">
                        Select Features
                      </FormLabel>
                      <div className="relative flex-1 max-w-44">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs pr-8">
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
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-black h-4 w-4 pointer-events-none" />
                        <span className="absolute -right-3 top-0 text-red-500 text-xs">
                          *
                        </span>
                      </div>
                      <FormMessage className="text-[10px] absolute -bottom-5 left-28" />
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
                          <SelectContent>
                            {[
                              'Reception',
                              'Housekeeping',
                              'In-Room Dining',
                              'Gym',
                              'Spa',
                              'Swimming Pool',
                              'Concierge Service',
                              'In-Room Control',
                              'Order Management',
                              'SOS Management',
                              'Chat With Staff'
                            ].map((value) => (
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
              {/* Remaining Field */}
              <FormField
                control={form.control}
                name="totalStaff"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 relative">
                    <FormLabel className="w-full sm:w-[115px] text-xs font-medium text-gray-700">
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
                          className="w-12 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
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
            <div className="grid grid-cols-2 bg-[#FAF6EF] gap-4 shadow-custom p-4 rounded-lg">
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
                  <FormItem className="relative inline-block">
                    <div className="flex relative items-center gap-2">
                      <div
                        className="w-[79px] h-12 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-300"
                        onClick={() => hotelLicenseImageRef.current?.click()}
                      >
                        {imagePreviews.hotelLicenseImage ? (
                          <img
                            src={imagePreviews.hotelLicenseImage}
                            alt="Hotel License Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <span className="">
                            <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                          </span>
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
                        className={`absolute left-20 h-4 w-4 ${imagePreviews.hotelLicenseImage ? 'text-black cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                        onClick={() =>
                          imagePreviews.hotelLicenseImage &&
                          triggerFileInput(hotelLicenseImageRef)
                        }
                      />
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
                  <FormItem className="relative inline-block">
                    <div className="flex relative items-center gap-2">
                      <div
                        className="w-[79px] h-12 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-300"
                        onClick={() =>
                          legalBusinessLicenseImageRef.current?.click()
                        }
                      >
                        {imagePreviews.legalBusinessLicenseImage ? (
                          <img
                            src={imagePreviews.legalBusinessLicenseImage}
                            alt="Business License Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <span className="">
                            <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                          </span>
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
                        className={`absolute left-20 h-4 w-4 ${imagePreviews.legalBusinessLicenseImage ? 'text-black cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                        onClick={() =>
                          imagePreviews.legalBusinessLicenseImage &&
                          triggerFileInput(legalBusinessLicenseImageRef)
                        }
                      />
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
                  <FormItem className="relative inline-block">
                    <div className="flex relative items-center gap-2">
                      <div
                        className="w-[79px] h-12 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-300"
                        onClick={() => touristLicenseImageRef.current?.click()}
                      >
                        {imagePreviews.touristLicenseImage ? (
                          <img
                            src={imagePreviews.touristLicenseImage}
                            alt="Tourist License Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <span className="">
                            <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                          </span>
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
                        className={`absolute left-20 h-4 w-4 ${imagePreviews.touristLicenseImage ? 'text-black cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                        onClick={() =>
                          imagePreviews.touristLicenseImage &&
                          triggerFileInput(touristLicenseImageRef)
                        }
                      />
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
                  <FormItem className="relative inline-block">
                    <div className="flex relative items-center gap-2">
                      <div
                        className="w-[79px] h-12 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-300"
                        onClick={() => tanNumberImageRef.current?.click()}
                      >
                        {imagePreviews.tanNumberImage ? (
                          <img
                            src={imagePreviews.tanNumberImage}
                            alt="TAN Number Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <span className="">
                            <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                          </span>
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
                        className={`absolute left-20 h-4 w-4 ${imagePreviews.tanNumberImage ? 'text-black cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                        onClick={() =>
                          imagePreviews.tanNumberImage &&
                          triggerFileInput(tanNumberImageRef)
                        }
                      />
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
                  <FormItem className="relative inline-block">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-[79px] h-12 bg-[#F6EEE0] flex items-center justify-center cursor-pointer rounded-md border border-gray-300"
                        onClick={() => dataPrivacyGdprImageRef.current?.click()}
                      >
                        {imagePreviews.dataPrivacyGdprImage ? (
                          <img
                            src={imagePreviews.dataPrivacyGdprImage}
                            alt="GDPR Compliance Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <span className="">
                            <CiCamera className="w-8 h-8 text-coffee opacity-50" />
                          </span>
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
                        className={`absolute left-20 h-4 w-4 ${imagePreviews.dataPrivacyGdprImage ? 'text-black cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                        onClick={() =>
                          imagePreviews.dataPrivacyGdprImage &&
                          triggerFileInput(dataPrivacyGdprImageRef)
                        }
                      />
                      <FormMessage className="text-[10px]" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex flex-col justify-center gap-4">
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
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
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
