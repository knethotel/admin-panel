'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import FormWrapper from './form-wrapper';
import { guestSchema, guestSchemaType } from 'schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GuestData, GuestDataType } from 'app/static/GuestData';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
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

type Props = {
  guestId?: string;
  isEnabled?: boolean;
  mode: string;
};

const GuestForm = ({ guestId, isEnabled, mode }: Props) => {
  const router = useRouter();

  // Get guest details using id
  const getGuestDetails = (guestId: string | undefined) => {
    if (guestId) {
      return GuestData.find((guest) => guest.guestId === guestId);
    } else {
      return null;
    }
  };
  const guest = getGuestDetails(guestId);

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
      email: guest?.contactDetails?.email || ''
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    addGuestForm.reset({
      firstName: '',
      lastName: '',
      phoneNo: '',
      address: '',
      city: '',
      state: '',
      pinCode: '',
      email: ''
    });
  };

  return (
    <FormWrapper
      title={mode === 'edit' ? 'Edit Guest Details' : 'Guest Details'}
    >
      <Form {...addGuestForm}>
        <form
          onSubmit={addGuestForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Form Fields */}
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col gap-4">
              <FormField
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
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />{' '}
                        {isEnabled && <span className="text-red-500">*</span>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />{' '}
                        {isEnabled && <span className="text-red-500">*</span>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-3">
              <FormField
                control={addGuestForm.control}
                name="phoneNo"
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
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />{' '}
                        {isEnabled && <span className="text-red-500">*</span>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />{' '}
                        {isEnabled && <span className="text-red-500">*</span>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />{' '}
                        {isEnabled && <span className="text-red-500">*</span>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <FormField
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
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                        {isEnabled && <span className="text-red-500">*</span>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
                          placeholder="State"
                          {...field}
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                        {isEnabled && <span className="text-red-500">*</span>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs"
                        />
                        {isEnabled && <span className="text-red-500">*</span>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Buttons */}
          {isEnabled && (
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => router.back()}
                className="bg-[#EFE9DF] hover:outline hover:outline-black"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#A07D3D] text-white hover:text-black hover:outline hover:outline-black"
              >
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </Form>
    </FormWrapper>
  );
};

export default GuestForm;
