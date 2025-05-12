'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormWrapper from './form-wrapper';
import { guestSchema, guestSchemaType } from 'schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GuestData } from 'app/static/GuestData';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
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
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Heading } from '@/components/ui/heading';

interface Props {
  guestId?: string;
  isEnabled?: boolean;
  mode: string;
}

const GuestForm: React.FC<Props> = ({ guestId, isEnabled, mode }) => {
  const [images, setImages] = useState<(string | null)[]>(Array(6).fill(null));
  const [showDropdown, setShowDropdown] = useState(false);
  const [status, setStatus] = useState<'PENDING' | 'APPROVE'>('PENDING');
  const router = useRouter();

  const guest = guestId
    ? GuestData.find((guest) => guest.guestId === guestId)
    : null;

  const addGuestForm = useForm<guestSchemaType>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      firstName: guest?.guestDetails?.name?.split(' ')[0] || '',
      lastName: guest?.guestDetails?.name?.split(' ')[1] || '',
      phoneNo: guest?.guestDetails?.phoneNo || '',
      address: guest?.guestDetails?.address || '',
      city: guest?.guestDetails?.city || '',
      state: guest?.guestDetails?.state || '',
      pinCode: guest?.guestDetails?.pinCode || '',
      email: guest?.contactDetails?.email || '',
      source: '',
      receivedAmt: guest?.paymentDetails?.receivedAmt || 0,
      dueAmt: guest?.paymentDetails?.dueAmt || 0,
      paymentMode: guest?.paymentDetails?.paymentMode || '',
      roomCategory: guest?.roomDetails?.roomCategory || ''
    }
  });

  const onSubmit = (data: guestSchemaType) => {
    console.log(data);
    addGuestForm.reset();
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <FormWrapper title="">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-3xl text-gray-700 font-semibold">
            {mode === 'edit' ? 'Edit Guest Details' : 'Guest Details'}
          </h2>
          <div>
            {mode === 'pending' ? (
              <>
                <div className="flex justify-end w-full mb-4 cursor-pointer">
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
                    <DropdownMenu.Content className="bg-white rounded px-4 shadow-lg p-2 space-y-1 mt-1 z-[10]">
                      <DropdownMenu.Item onSelect={() => setStatus('PENDING')}>
                        <span className="text-sm px-2 py-1 hover:bg-gray-100 rounded">
                          PENDING
                        </span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onSelect={() => setStatus('APPROVE')}>
                        <span className="text-sm px-2 py-1 hover:bg-gray-100 rounded">
                          APPROVE
                        </span>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <Form {...addGuestForm}>
          <form
            onSubmit={addGuestForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={addGuestForm.control}
                  name="phoneNo"
                  className="w-full"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="Phone Number"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="First Name"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="Last Name"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Email ID
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="email"
                            placeholder="Email ID"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Address
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="Address"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        State
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="state"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Source
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="Source"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        City
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="City"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Pin Code
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="Pin Code"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                          {isEnabled && <span className="text-red-500">*</span>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="receivedAmt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Received Amount
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="0"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="dueAmt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Due Amount
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="0"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="w-full"
                  control={addGuestForm.control}
                  name="paymentMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-[0.8rem]">
                        Payment mode
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            disabled={!isEnabled}
                            type="text"
                            placeholder="Payment Mode"
                            {...field}
                            className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* {(mode === 'add' || mode === 'pending') && ( */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10 border-t border-dashed border-gray-400 pt-4 mt-4">
                <div className="flex flex-col gap-4">
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Assign Room Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Room Number"
                        className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                </div>
                <div className="flex flex-col gap-4">
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Room Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Room Number"
                        className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                </div>
                <div className="flex flex-col gap-4">
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Room Tariff
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Room Number"
                        className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                </div>
                <div className="flex flex-col gap-4">
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Check-in Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        // disabled
                        className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                </div>
                <div className="flex flex-col gap-4">
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Check-out Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        // disabled
                        className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </div>
            {/* )} */}
          </form>
        </Form>
      </FormWrapper>

      <div className="flex flex-col items-start w-full mt-8 pb-4">
        <FormWrapper
          title={
            mode === 'edit' ? 'Upload Document' : 'Identification Document'
          }
        >
          <h2 className="text-3xl text-gray-700 font-semibold mb-4">
            {mode === 'edit' ? 'Upload Document' : 'Identification Document'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative rounded-sm w-full h-40 md:h-56 bg-[#D9D9D9] overflow-hidden"
              >
                <label className="w-full h-full block cursor-pointer">
                  <input
                    type="file"
                    disabled={!isEnabled}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  {img ? (
                    <Image
                      src={img}
                      alt={`Uploaded ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-600">
                      Upload Image
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </FormWrapper>
      </div>

      {/* {isEnabled && ( */}
      <div className="flex items-center gap-3 py-8 justify-end w-full">
        <Button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Cancel
        </Button>
        <Button type="submit" className="btn-primary">
          Save Changes
        </Button>
      </div>
      {/* )} */}
    </>
  );
};

export default GuestForm;
