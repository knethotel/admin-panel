'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { hotelSchema, HotelSchemaType } from 'schema';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { CiCamera } from 'react-icons/ci';
import { useFieldArray } from 'react-hook-form';
import { Trash2, Plus } from 'lucide-react';
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
import { ToastAtTopRight } from '@/lib/sweetalert';
import apiCall from '@/lib/axios';
import { HotelSchemaType } from 'schema';
import { indiaCities, indiaStates } from 'app/static/Type';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const HotelForm = ({
  mode = 'add',
  hotelId
}: {
  mode: 'add' | 'edit' | 'view' | 'pending';
  hotelId?: string;
}) => {
  const isMode = (modes: string | string[]) => {
    if (Array.isArray(modes)) {
      return modes.includes(mode);
    }
    return mode === modes;
  };
  const isDisabled = mode === 'view' || mode === 'pending';
  const router = useRouter();
  const [isBrandedHotelChecked, setIsBrandedHotelChecked] = useState(false);
  const [isChainHotelChecked, setIsChainHotelChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [status, setStatus] = useState<'PENDING' | 'APPROVE'>('PENDING');
  const [hotelName, setHotelName] = useState('');
  const [subHotelName, setSubHotelName] = useState('');

  // Refs for file inputs
  const roomImageRef = useRef<HTMLInputElement>(null);
  const hotelLicenseImageRef = useRef<HTMLInputElement>(null);
  const legalBusinessLicenseImageRef = useRef<HTMLInputElement>(null);
  const touristLicenseImageRef = useRef<HTMLInputElement>(null);
  const tanNumberImageRef = useRef<HTMLInputElement>(null);
  const dataPrivacyGdprImageRef = useRef<HTMLInputElement>(null);
  const logoImageRef = useRef<HTMLInputElement>(null);
  const additionalImageRef = useRef<HTMLInputElement>(null); // New ref for additional image

  const servingDepartmentOptions = [
    'Reception',
    'Housekeeping',
    'In-Room Dining',
    'Gym'
  ];

  const handleStateChange = (state: string) => {
    form.setValue('state', state);
    setSelectedState(state);
    // optionally reset city on state change
    form.setValue('city', '');
  };

  // State for image previews
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: string[]; // Ensure it's an array for each key
  }>({
    logoImage: [],
    additionalImage: [],
    roomImage: [], // Initialize as an empty array
    hotelLicenseImage: [],
    legalBusinessLicenseImage: [],
    touristLicenseImage: [],
    tanNumberImage: [],
    dataPrivacyGdprImage: []
  });

  const form = useForm<HotelSchemaType>({
    // resolver: zodResolver(hotelSchema),
    defaultValues: {
      hotelName: '',
      number: '',
      email: '',
      completeAddress: '',
      hotelCategory: '5 Star',
      city: '',
      country: 'India',
      state: 'Maharashtra',
      pinCode: '',
      parentHotelId: '',
      roomImage: undefined,
      roomConfigs: [{ roomType: 'Single', feature: 'Sea Side' }],
      numberOfRooms: 1,
      checkInTime: '12:00',
      checkOutTime: '11:00',
      servingDepartments: [''],
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
      softwareCompatibility: false,
      subscriptionPlan: 'Premium',
      subscriptionPrice: 500,
      netPrice: 0,
      applyCoupon: 'Choose coupon'
    }
  });

  const onSubmit = async (data: HotelSchemaType) => {
    const payload = {
      name: data.hotelName,
      address: data.completeAddress,
      email: data.email,
      phoneNo: data.number,
      password: 'Miss@123',
      hotelCategory: data.hotelCategory,
      city: data.city,
      country: data.country,
      state: data.state,
      pincode: data.pinCode,
      chainHotel: isChainHotelChecked,
      parentHotel: isChainHotelChecked ? data.parentHotelId : undefined,
      parentHotelId: data.parentHotelId || '',
      // subHotelName: '',
      checkInTime: data.checkInTime,
      checkOutTime: data.checkOutTime,
      brandedHotel: isBrandedHotelChecked,
      // parentHotel: isChainHotelChecked ? data.parentHotelName : '',
      subscriptionPlan: data.subscriptionPlan,
      logo: imagePreviews.logoImage?.[0] || '',
      images: imagePreviews.additionalImage,
      gst: data.gst,
      hotelLicenseAndCertification: {
        certificateValue: data.hotelLicenseCertifications,
        imageUrl: imagePreviews.hotelLicenseImage?.[0] || ''
      },
      legalAndBusinessLicense: {
        licenseValue: data.legalBusinessLicense,
        imageUrl: imagePreviews.legalBusinessLicenseImage?.[0] || ''
      },
      touristLicense: {
        licenseValue: data.touristLicense,
        imageUrl: imagePreviews.touristLicenseImage?.[0] || ''
      },
      panNumber: {
        numberValue: data.tanNumber,
        imageUrl: imagePreviews.tanNumberImage?.[0] || ''
      },
      dataPrivacyAndGDPRCompliance: {
        complianceValue: data.dataPrivacyGdprCompliances,
        imageUrl: imagePreviews.dataPrivacyGdprImage?.[0] || ''
      },
      internetConnectivity: data.internetConnectivity,
      softwareCompatibility: data.softwareCompatibility,
      rooms: data.roomConfigs
        ? data.roomConfigs.map((room: any) => ({
            roomName: room.roomType,
            roomType: room.roomType,
            features: [room.feature],
            images: imagePreviews.roomImage,
            servingDepartment: ['Concierge Service', 'In-Room Dining', 'Spa'],
            totalStaff: data.totalStaff
          }))
        : []
    };

    if (
      isChainHotelChecked &&
      (!data.parentHotelId || data.parentHotelId.trim() === '')
    ) {
      ToastAtTopRight.fire(
        'Please enter Parent Hotel ID when Chain Hotel is selected',
        'error'
      );
      return;
    }

    const url =
      mode === 'edit'
        ? `api/hotel/update-hotel/${hotelId}`
        : 'api/hotel/add-hotel';

    const method = mode === 'edit' ? 'PUT' : 'POST';

    try {
      const response = await apiCall(method, url, payload);
      if (response.status) {
        ToastAtTopRight.fire(
          mode === 'edit'
            ? 'Profile updated successfully'
            : 'Hotel created successfully',
          'success'
        );
        if (mode === 'add') {
          router.push('/super-admin/hotel-management');
        }
        console.log('Hotel data:', response);
      } else {
        ToastAtTopRight.fire(response.message || 'Operation failed', 'error');
      }
    } catch (error) {
      console.error(error);
      ToastAtTopRight.fire('Server error', 'error');
    }
  };

  const approveRequest = async () => {
    if (!hotelId) {
      ToastAtTopRight.fire('Hotel request ID missing', 'error');
      return;
    }
    try {
      const payload = {
        requestId: hotelId, // hotelId here is actually the pending request ID
        subscriptionPlan: form.getValues('subscriptionPlan'),
        subscriptionPrice: form.getValues('subscriptionPrice'),
        couponCode:
          form.getValues('applyCoupon') === 'Choose coupon'
            ? ''
            : form.getValues('applyCoupon')
      };
      const response = await apiCall(
        'POST',
        'api/hotel/approve-request',
        payload
      );
      if (response.status) {
        ToastAtTopRight.fire('Hotel approved successfully', 'success');
        router.push('/super-admin/hotel-management/pending'); // or wherever you want to navigate after approve
      } else {
        ToastAtTopRight.fire(
          response.message || 'Failed to approve hotel',
          'error'
        );
      }
    } catch (error) {
      console.error(error);
      ToastAtTopRight.fire('Server error during approval', 'error');
    }
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
      setImagePreviews((prev) => ({
        ...prev,
        [fieldName]: [...prev[fieldName], previewUrl] // Append new image to array
      }));
    } else {
      setImagePreviews((prev) => ({ ...prev, [fieldName]: [] })); // Reset if no file
    }
  };

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement | null>) => {
    ref.current?.click();
  };

  const handleBrandedHotelChange = (checked: boolean) => {
    setIsBrandedHotelChecked(checked);
    if (checked) setIsChainHotelChecked(false);
  };

  const handleChainHotelChange = (checked: boolean) => {
    setIsChainHotelChecked(checked);
    // if (checked) {
    //   setIsBrandedHotelChecked(false);
    //   // Update parent hotel name ONLY
    //   form.setValue('parentHotelName', form.getValues('hotelName'));
    // }
  };

  const handleImageRemove = (index: number, fieldName: string) => {
    setImagePreviews((prev) => {
      const updatedImages = prev[fieldName].filter((_, i) => i !== index); // Filter out the image at index
      return { ...prev, [fieldName]: updatedImages }; // Update the state with the new array
    });
  };

  // useEffect(() => {
  //   if (isChainHotelChecked) {
  //     form.setValue('parentHotelName', form.getValues('hotelName'));
  //   }
  // }, [hotelName, isChainHotelChecked]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        let res;

        if (mode === 'pending') {
          res = await apiCall('GET', `api/hotel/pending-request/${hotelId}`);
        } else if (mode === 'edit' || mode === 'view') {
          res = await apiCall('GET', `api/hotel/get-hotel/${hotelId}`);
        } else {
          return;
        }
        const data = mode === 'pending' ? res.request.hotelData : res.hotel;

        if (!data) {
          console.error('Hotel data not found in response:', res);
          return;
        }

        const idFromResponse =
          mode === 'pending' ? res.request._id : data._id || '';

        form.reset({
          hotelId: idFromResponse,
          hotelName: data.name || '',
          number: data.phoneNo || '',
          email: data.email || '',
          completeAddress: data.address || '',
          hotelCategory: data.hotelCategory || '3 Star',
          city: data.city || '',
          country: data.country || '',
          state: data.state || '',
          pinCode: data.pincode || '',
          gst: data.gstDetails || '',

          brandedHotel: data.brandedHotel || false,
          chainHotel: data.chainHotel === 'true', // string to boolean
          // parentHotelName: data.parentHotel || '',
          parentHotelId: data.parentHotel || '',
          // subHotelName: data.name || '',

          roomConfigs: data.rooms?.map((room: any) => ({
            roomType: room.roomType,
            feature: room.features?.[0] || ''
          })) || [{ roomType: 'Single', feature: 'Sea Side' }],

          numberOfRooms: data.rooms?.length || 1,
          checkInTime: data.checkInTime || '',
          checkOutTime: data.checkOutTime || '',
          servingDepartments: data.servingDepartment || [],
          totalStaff: data.totalStaff || 1,

          hotelLicenseCertifications:
            data.hotelLicenseAndCertification?.certificateValue || '',
          hotelLicenseImage: undefined,
          legalBusinessLicense:
            data.legalAndBusinessLicense?.licenseValue || '',
          legalBusinessLicenseImage: undefined,
          touristLicense: data.touristLicense?.licenseValue || '',
          touristLicenseImage: undefined,
          tanNumber: data.panNumber?.numberValue || '',
          tanNumberImage: undefined,
          dataPrivacyGdprCompliances:
            data.dataPrivacyAndGDPRCompliance?.complianceValue || '',
          dataPrivacyGdprImage: undefined,

          logoImage: undefined,
          additionalImage: undefined,

          internetConnectivity: data.internetConnectivity || false,
          softwareCompatibility: data.softwareCompatibility || false,

          subscriptionPlan: [
            '1 Month',
            '6 Months',
            '1 Year',
            'Premium'
          ].includes(data.subscriptionPlan)
            ? data.subscriptionPlan
            : 'Premium',

          subscriptionPrice: data.subscriptionPrice || 500,
          netPrice: 0,
          applyCoupon: 'Choose coupon'
        });

        // Set preview images if available
        setImagePreviews({
          logoImage: data.logo ? [data.logo] : [],
          additionalImage: data.images || [],
          roomImage: data.rooms?.[0]?.images || [],
          hotelLicenseImage: data.hotelLicenseAndCertification?.imageUrl
            ? [data.hotelLicenseAndCertification.imageUrl]
            : [],
          legalBusinessLicenseImage: data.legalAndBusinessLicense?.imageUrl
            ? [data.legalAndBusinessLicense.imageUrl]
            : [],
          touristLicenseImage: data.touristLicense?.imageUrl
            ? [data.touristLicense.imageUrl]
            : [],
          tanNumberImage: data.panNumber?.imageUrl
            ? [data.panNumber.imageUrl]
            : [],
          dataPrivacyGdprImage: data.dataPrivacyAndGDPRCompliance?.imageUrl
            ? [data.dataPrivacyAndGDPRCompliance.imageUrl]
            : []
        });
        console.log('Fetched hotel data:', data);
      } catch (error) {
        console.error('Failed to fetch hotel data', error);
      }
    };

    if (hotelId) fetchHotelData();
  }, [mode, hotelId]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'roomConfigs'
  });

  const [selectedState, setSelectedState] = useState(
    form.getValues('state') || ''
  );

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3 bg-inherit mx-auto"
        >
          {mode !== 'pending' && (
            <div className="flex gap-4">
              {/* Room Image Uploader */}
              <div>
                <FormField
                  control={form.control}
                  name="roomImage"
                  render={({ field }) => (
                    <FormItem className="w-fit relative">
                      <FormLabel className="text-coffee font-medium">
                        Room Image
                      </FormLabel>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-md border border-gray-100`}
                          onClick={() =>
                            !isDisabled && triggerFileInput(roomImageRef)
                          }
                        >
                          {imagePreviews.roomImage &&
                          imagePreviews.roomImage.length > 0 ? (
                            <img
                              src={
                                imagePreviews.roomImage[
                                  imagePreviews.roomImage.length - 1
                                ]
                              }
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
                            imagePreviews.roomImage && !isDisabled
                              ? 'text-black cursor-pointer'
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                          onClick={() =>
                            imagePreviews.roomImage &&
                            !isDisabled &&
                            triggerFileInput(roomImageRef)
                          }
                        />
                      </div>
                      <FormMessage className="text-[10px]" />

                      {/* Display all selected images in a row, wrapping to the next line if necessary */}
                      <div className="flex flex-wrap gap-3 mt-4">
                        {imagePreviews.roomImage?.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-24 h-24 2xl:w-28 2xl:h-28"
                          >
                            <img
                              src={image}
                              alt={`Room Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                              onClick={() =>
                                handleImageRemove(index, 'roomImage')
                              }
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              {/* Logo Uploader */}
              <FormField
                control={form.control}
                name="logoImage"
                render={({ field }) => (
                  <FormItem className="w-fit relative">
                    <FormLabel className="text-coffee font-medium">
                      Upload Logo
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-md border border-gray-100`}
                        onClick={() =>
                          !isDisabled && triggerFileInput(logoImageRef)
                        }
                      >
                        {imagePreviews.logoImage &&
                        imagePreviews.logoImage.length > 0 ? (
                          <img
                            src={imagePreviews.logoImage[0]}
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
                          imagePreviews.logoImage && !isDisabled
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.logoImage &&
                          !isDisabled &&
                          triggerFileInput(logoImageRef)
                        }
                      />
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="w-full flex flex-col gap-6">
            {/* Chunk 1: Basic Hotel Info */}
            <div className="flex flex-col gap-4 2xl:gap-5 bg-[#FAF6EF] shadow-custom p-6 2xl:p-8 rounded-lg">
              <div className="flex justify-end">
                {mode === 'pending' ? (
                  <>
                    <div className="w-fit mb-4 cursor-pointer">
                      <DropdownMenu.Root
                        open={showDropdown}
                        onOpenChange={setShowDropdown}
                      >
                        <DropdownMenu.Trigger asChild className="w-full">
                          <button
                            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                              status === 'PENDING'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {status}
                            {showDropdown ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="bg-white rounded w-32 shadow-lg space-y-1 mt-1">
                          <DropdownMenu.Item
                            onSelect={() => setStatus('APPROVE')}
                            className="text-sm px-4 pt-1 hover:bg-gray-100 rounded"
                          >
                            <Button
                              type="button"
                              className=""
                              onClick={approveRequest}
                            >
                              Approve
                            </Button>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* {isMode(['edit']) && (
                  <FormField
                    control={form.control}
                    name="hotelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                          Hotel ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Hotel ID"
                            {...field}
                            value={field.value} // Use form value, not hotelId prop
                            disabled={mode === 'edit'}
                            className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                )} */}
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
                          onChange={(e) => {
                            field.onChange(e);
                            setHotelName(e.target.value);
                          }}
                          disabled={isDisabled}
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
                        Phone Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        State <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            handleStateChange(value);
                            field.onChange(value);
                          }}
                          disabled={isDisabled}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indiaStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!selectedState || isDisabled}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue
                              placeholder={
                                selectedState
                                  ? 'Select city'
                                  : 'Select state first'
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {(indiaCities[selectedState] || []).map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              {mode == 'add' && (
                <div className="flex flex-col md:flex-row gap-5 w-fit">
                  <FormField
                    control={form.control}
                    name="brandedHotel"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                          Branded Hotel
                        </FormLabel>
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={isBrandedHotelChecked}
                            onChange={(e) =>
                              handleBrandedHotelChange(e.target.checked)
                            }
                            disabled={isDisabled}
                            className="form-checkbox"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="chainHotel"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                          Chain Hotel
                        </FormLabel>
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={isChainHotelChecked}
                            onChange={(e) =>
                              handleChainHotelChange(e.target.checked)
                            }
                            disabled={isDisabled || isBrandedHotelChecked}
                            className="form-checkbox"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Show both fields when either checkbox is checked */}
              {isChainHotelChecked && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <>
                    <FormField
                      control={form.control}
                      name="parentHotelId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                            Parent Hotel ID
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Parent Hotel ID"
                              {...field}
                              className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="subHotelName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                            Sub Hotel Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter sub hotel name"
                              {...field}
                              // disabled
                              // value={subHotelName}
                              onChange={(e) => {
                                setSubHotelName(e.target.value);
                                field.onChange(e.target.value);
                              }}
                              className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    /> */}
                  </>
                </div>
              )}
            </div>

            {/* Chunk 2: Room Details */}
            <div className="flex flex-col gap-4 2xl:gap-5 bg-[#FAF6EF] shadow-custom p-6 2xl:p-8 rounded-lg">
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3">
                    {/* Room Type */}
                    <FormField
                      control={form.control}
                      name={`roomConfigs.${index}.roomType`}
                      render={({ field }) => (
                        <FormItem className="w-40">
                          <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                            Room Types <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={isDisabled}
                            >
                              <SelectTrigger className="w-40 bg-[#F6EEE0] text-gray-700 p-2 rounded-md">
                                <SelectValue placeholder="Room Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  'Single',
                                  'Double',
                                  'Twin',
                                  'Deluxe',
                                  'Suite'
                                ].map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Feature */}
                    <FormField
                      control={form.control}
                      name={`roomConfigs.${index}.feature`}
                      render={({ field }) => (
                        <FormItem className="w-40">
                          <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                            Select Features{' '}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={isDisabled}
                            >
                              <SelectTrigger className="w-40 bg-[#F6EEE0] text-gray-700 p-2 rounded-md">
                                <SelectValue placeholder="Feature" />
                              </SelectTrigger>
                              <SelectContent>
                                {['Sea Side', 'Balcony View'].map((feat) => (
                                  <SelectItem key={feat} value={feat}>
                                    {feat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Delete Button */}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => !isDisabled && remove(index)}
                        className={`text-red-500 text-sm pt-6 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isDisabled}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}

                {/* Append Button */}
                <button
                  type="button"
                  onClick={() =>
                    !isDisabled &&
                    append({ roomType: 'Single', feature: 'Sea Side' })
                  }
                  className={`mt-2 text-blue-600 flex items-center gap-1 text-sm ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isDisabled}
                >
                  <Plus className="w-4 h-4" /> Add Room & Features
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="servingDepartments"
                  className="col-span-2 mb-2"
                  render={({ field }) => {
                    // field.value should be string[] now
                    // Initialize field.value as array if undefined
                    const selectedDepartments = field.value || [];

                    const toggleOption = (option: string) => {
                      const newValue = selectedDepartments.includes(option)
                        ? selectedDepartments.filter((v) => v !== option)
                        : [...selectedDepartments, option];
                      field.onChange(newValue);
                    };

                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Serving Departments
                        </FormLabel>
                        <div className="flex flex-wrap gap-3 text-gray-700 text-sm font-light">
                          {servingDepartmentOptions.map((option) => (
                            <label
                              key={option}
                              className="inline-flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedDepartments.includes(option)}
                                onChange={() => toggleOption(option)}
                                disabled={isDisabled}
                                className="form-checkbox"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="numberOfRooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Total Number of Rooms
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter number of rooms"
                          {...field}
                          disabled={isDisabled}
                          // onChange={(e) =>
                          //   field.onChange(parseInt(e.target.value, 10))
                          // }
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalStaff"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Total Staff
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter total staff"
                          {...field}
                          disabled={isDisabled}
                          // onChange={(e) =>
                          //   field.onChange(parseInt(e.target.value, 10))
                          // }
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
                  name="checkInTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Check-in Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 12:00 PM"
                          {...field}
                          disabled={isDisabled}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkOutTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Check-out Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 11:00 AM"
                          {...field}
                          disabled={isDisabled}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="subscriptionPlan"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Allocate Subscription{' '}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isDisabled}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-coffee">
                            {['1 Month', '6 Months', '1 Year'].map((value) => (
                              <SelectItem
                                key={value}
                                value={value}
                                className="text-white"
                              >
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
                  name="subscriptionPrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Subscription Price{' '}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="500"
                          placeholder="Enter Subscription Price"
                          {...field}
                          disabled={isDisabled}
                          // onChange={(e) =>
                          //   field.onChange(parseInt(e.target.value, 10))
                          // }
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applyCoupon"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Apply Coupon
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isDisabled}
                        >
                          <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm">
                            <SelectValue placeholder="Choose coupon" />
                          </SelectTrigger>
                          <SelectContent className="bg-coffee">
                            {[
                              {
                                code: 'COUPON1',
                                description: '5% off with CODE1'
                              },
                              {
                                code: 'COUPON2',
                                description: '10% off with CODE2'
                              },
                              {
                                code: 'COUPON3',
                                description: '15% off with CODE3'
                              },
                              {
                                code: 'COUPON4',
                                description: '20% off with CODE4'
                              },
                              {
                                code: 'COUPON5',
                                description: '25% off with CODE5'
                              }
                            ].map((coupon) => (
                              <SelectItem
                                key={coupon.code}
                                value={coupon.code}
                                className="text-white"
                              >
                                {coupon.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      {/* Display the selected coupon code */}
                      {field.value && field.value !== 'Choose coupon' && (
                        <div className="mt-2 text-xs text-gray-700">
                          <span className="font-semibold">{field.value}</span>{' '}
                          applied successfully
                        </div>
                      )}
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="netPrice"
                  render={({ field }) => (
                    <FormItem className="w-fit">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Net Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          // onChange={(e) =>
                          //   field.onChange(parseInt(e.target.value, 10))
                          // }
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
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter license details"
                        {...field}
                        disabled={isDisabled}
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
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-md border border-gray-100`}
                        onClick={() =>
                          !isDisabled && triggerFileInput(hotelLicenseImageRef)
                        }
                      >
                        {imagePreviews.hotelLicenseImage &&
                        imagePreviews.hotelLicenseImage.length > 0 ? (
                          <img
                            src={imagePreviews.hotelLicenseImage[0]}
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
                          disabled={isDisabled}
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
                          imagePreviews.hotelLicenseImage && !isDisabled
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.hotelLicenseImage &&
                          !isDisabled &&
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
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business license"
                        {...field}
                        disabled={isDisabled}
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
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-md border border-gray-100`}
                        onClick={() =>
                          !isDisabled &&
                          triggerFileInput(legalBusinessLicenseImageRef)
                        }
                      >
                        {imagePreviews.legalBusinessLicenseImage &&
                        imagePreviews.legalBusinessLicenseImage.length > 0 ? (
                          <img
                            src={imagePreviews.legalBusinessLicenseImage[0]}
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
                          imagePreviews.legalBusinessLicenseImage && !isDisabled
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.legalBusinessLicenseImage &&
                          !isDisabled &&
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
                      Tourist License
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tourist license"
                        {...field}
                        disabled={isDisabled}
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
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-md border border-gray-100`}
                        onClick={() =>
                          !isDisabled &&
                          triggerFileInput(touristLicenseImageRef)
                        }
                      >
                        {imagePreviews.touristLicenseImage &&
                        imagePreviews.touristLicenseImage.length > 0 ? (
                          <img
                            src={imagePreviews.touristLicenseImage[0]}
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
                          imagePreviews.touristLicenseImage && !isDisabled
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.touristLicenseImage &&
                          !isDisabled &&
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
                      TAN Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter TAN number"
                        {...field}
                        disabled={isDisabled}
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
                      TAN Number Image
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-md border border-gray-100`}
                        onClick={() =>
                          !isDisabled && triggerFileInput(tanNumberImageRef)
                        }
                      >
                        {imagePreviews.tanNumberImage &&
                        imagePreviews.tanNumberImage.length > 0 ? (
                          <img
                            src={imagePreviews.tanNumberImage[0]}
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
                          imagePreviews.tanNumberImage && !isDisabled
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.tanNumberImage &&
                          !isDisabled &&
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
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter GDPR details"
                        {...field}
                        disabled={isDisabled}
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
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-32 h-12 2xl:w-36 2xl:h-14 bg-[#F6EEE0] flex items-center justify-center ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-md border border-gray-100`}
                        onClick={() =>
                          !isDisabled &&
                          triggerFileInput(dataPrivacyGdprImageRef)
                        }
                      >
                        {imagePreviews.dataPrivacyGdprImage &&
                        imagePreviews.dataPrivacyGdprImage.length > 0 ? (
                          <img
                            src={imagePreviews.dataPrivacyGdprImage[0]}
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
                          imagePreviews.dataPrivacyGdprImage && !isDisabled
                            ? 'text-black cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          imagePreviews.dataPrivacyGdprImage &&
                          !isDisabled &&
                          triggerFileInput(dataPrivacyGdprImageRef)
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
                      GST Details
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter GDPR details"
                        {...field}
                        disabled={isDisabled}
                        className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <div></div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="internetConnectivity"
                  render={({ field }) => (
                    <FormItem className="flex items-center w-fit gap-4">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Internet Connectivity
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isDisabled}
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
                    <FormItem className="flex items-center w-fit gap-4">
                      <FormLabel className="text-xs 2xl:text-sm font-medium text-gray-700">
                        Software Compatibility
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isDisabled}
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
            {mode !== 'pending' && (
              <Button
                type="submit"
                disabled={isDisabled}
                className="btn-primary text-xs 2xl:text-sm"
              >
                {isMode(['edit', 'view']) ? 'Save Changes' : 'Create'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default HotelForm;
