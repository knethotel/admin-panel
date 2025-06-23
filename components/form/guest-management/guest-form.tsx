'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import apiCall from '@/lib/axios';

interface Props {
  guestId?: string;
  isEnabled?: boolean;
  id?: string;
  mode: 'add' | 'edit' | 'view' | 'pending';
}

const GuestForm: React.FC<Props> = ({ guestId, isEnabled, mode }) => {
  const [images, setImages] = useState<(string | null)[]>(Array(6).fill(null));
  const [showDropdown, setShowDropdown] = useState(false);
  const [status, setStatus] = useState<'PENDING' | 'APPROVE'>('PENDING');
  const [loading, setLoading] = useState(false);
  const [isExistingGuest, setIsExistingGuest] = useState(false);
  const router = useRouter();
  const id = guestId;

  const guest = id
    ? GuestData.find((guest) => guest.guestId === id)
    : null;

  useEffect(() => {
    const fetchGuestById = async () => {
      if (id && (mode === 'view')) {
        try {
          setLoading(true);
          const res = await apiCall('GET', `/api/booking/hotel/${id}`);
          const guest = res.booking;

          if (guest) {
            setIsExistingGuest(true);

            addGuestForm.reset({
              firstName: guest.firstName,
              lastName: guest.lastName,
              phoneNo: guest.phoneNumber,
              email: guest.email,
              address: guest.address,
              state: guest.state,
              city: guest.city,
              pinCode: guest.pincode,
              source: guest.sources,
              receivedAmt: guest.receivedAmt || 0,
              dueAmt: guest.dueAmt || 0,
              paymentMode: guest.paymentMode || '',
              roomCategory: guest.roomCategory || '',
              checkIn: guest.checkInDate || '',
              checkOut: guest.checkOutDate || '',
            });

            if (guest.images) {
              setImages(guest.images);
            }
          }
        } catch (err) {
          console.error('Error fetching guest by ID:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGuestById();
  }, [id, mode]);


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


  const fetchGuestByPhone = async (phone: string) => {
    try {
      const res = await apiCall('GET', `api/booking/fetch-guest/${phone}`);
      if (res?.success && res?.guest) {
        const guestData = res.guest;

        //Only reset the fields your form has
        addGuestForm.reset({
          firstName: guestData.firstName || '',
          lastName: guestData.lastName || '',
          phoneNo: guestData.phoneNumber || '',
          email: guestData.email || '',
          address: guestData.address || '',
          city: guestData.city || '',
          state: guestData.state || '',
          pinCode: guestData.pincode || '',
          source: guestData.sources || ''
        });

      } else {
        console.warn('Guest not found or response invalid:', res);
      }
    } catch (error) {
      console.error('Error fetching guest:', error);
    }
  };



  const toUtcIso = (val: string | Date | null | undefined): string | null => {
    if (!val) return null;
    const date = typeof val === 'string' ? new Date(val) : val;
    if (isNaN(date.getTime())) return null;
    return date.toISOString();
  };

  const toDatetimeLocal = (dateStr: string | Date): string => {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };


  const fetchGuestById = async () => {
    if (id && mode === 'edit') {
      try {
        setLoading(true);
        const res = await apiCall('PUT', `/api/booking/hotel/${id}`);
        const guest = res.booking;

        if (guest) {
          addGuestForm.reset({
            firstName: guest.firstName || '',
            lastName: guest.lastName || '',
            phoneNo: guest.phoneNumber || '',
            email: guest.email || '',
            address: guest.address || '',
            city: guest.city || '',
            state: guest.state || '',
            pinCode: guest.pincode || '',
            source: guest.sources || '',
            receivedAmt: guest.receivedAmt || 0,
            dueAmt: guest.dueAmt || 0,
            paymentMode: guest.paymentMode || '',
            roomCategory: guest.roomCategory || '',
            checkIn: guest.checkInDate || '',
            checkOut: guest.checkOutDate || ''
          });
        }
      } catch (err) {
        console.error('Failed to fetch guest', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // keep this useEffect
  useEffect(() => {
    fetchGuestById();
  }, [id, mode]);


  const onSubmit = async (data: guestSchemaType) => {
    try {
      // Construct the common data
      const baseData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNo,
        email: data.email,
        address: data.address,
        state: data.state,
        city: data.city,
        sources: data.source,
        pincode: data.pinCode,
        checkIn: toUtcIso(data.checkIn),
        checkOut: toUtcIso(data.checkOut),
        status: 'Pending',
        guestsCount: 1,
        preCheckIn: false,
        paymentStatus: 'Pending',
        receivedAmt: data.receivedAmt || 0,
        dueAmt: data.dueAmt || 0,
        paymentMode: data.paymentMode || '',
        roomCategory: data.roomCategory || '',
        roomNumber: data.roomNumber || '',
        roomTariff: data.roomTariff || '',
      };

      if (mode === 'edit' && id) {
        // For UPDATE
        const payload = {
          updates: baseData
        };

        const res = await apiCall('PUT', `/api/booking/hotel/${id}`, payload);
        console.log('Booking Updated:', res.booking);
        alert('Guest booking updated successfully!');
        fetchGuestById();
      } else {
        // For CREATE
        const payload = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNo,
          email: data.email,
          address: data.address,
          state: data.state,
          city: data.city,
          sources: data.source,
          pincode: data.pinCode,
          checkIn: toUtcIso(data.checkIn),
          checkOut: toUtcIso(data.checkOut),
          status: 'Pending',
          guestsCount: 1,
          preCheckIn: false,
          paymentStatus: 'Pending',
          receivedAmt: data.receivedAmt || 0,
          dueAmt: data.dueAmt || 0,
          paymentMode: data.paymentMode || '',
          roomCategory: data.roomCategory || '',
          roomNumber: data.roomNumber || '',  // Add room number here
          roomTariff: data.roomTariff || '',
        };

        const res = await apiCall('POST', '/api/booking/addBooking', payload);
        console.log('Booking Added:', res.data);
        alert('Guest booking saved!');
      }

      addGuestForm.reset();
      router.back();
    } catch (err) {
      console.error('Booking Save/Update Failed:', err);
      alert('Failed to save booking');
    }
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
                        className={`flex items-center gap-2 px-4 py-2 rounded-md border ${status === 'PENDING'
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <FormField
                  control={addGuestForm.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-black text-sm">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Phone Number"
                          disabled={!isEnabled}
                          onBlur={() => {
                            if (mode === 'add' && (field.value?.length ?? 0) >= 10) {
                              fetchGuestByPhone(field.value!);
                            }
                          }}
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addGuestForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-black text-sm">First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="First Name"
                          disabled={!isEnabled}
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addGuestForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-black text-sm">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Last Name"
                          disabled={!isEnabled}
                          className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
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
              {/* <div className="flex flex-col gap-4">
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
              </div> */}
              <FormField
                control={addGuestForm.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">Check-in Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={field.value ? toDatetimeLocal(field.value) : ''}
                        disabled={!isEnabled}
                        className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                      />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addGuestForm.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">Check-out Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={field.value ? toDatetimeLocal(field.value) : ''}
                        disabled={!isEnabled}
                        className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                      />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            {/* )} */}


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
              <Button
                type="button"
                className="btn-primary"
                onClick={addGuestForm.handleSubmit(onSubmit)}
              >
                Save Changes
              </Button>


            </div>
            {/* )} */}
          </form>
        </Form>
      </FormWrapper>
    </>
  );
};

export default GuestForm;
