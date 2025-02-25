'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CardWrapper from './card-wrapper';
import { guestSchema, guestSchemaType } from 'schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

const AddGuestForm = () => {
  const router = useRouter();
  const addGuestForm = useForm<guestSchemaType>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNo: '',
      address: '',
      city: '',
      email: '',
      state: '',
      pinCode: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    addGuestForm.reset();
  };

  return (
    <CardWrapper title="Guest Detail">
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
                          type="text"
                          placeholder="First Name"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-40 placeholder:text-black placeholder:text-xs placeholder:opacity-40 pr-10"
                        />{' '}
                        <span className="text-red-500">*</span>
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
                          type="text"
                          placeholder="Last Name"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-40 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10"
                        />{' '}
                        <span className="text-red-500">*</span>
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
                          type="text"
                          placeholder="Phone Number"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-40 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10"
                        />{' '}
                        <span className="text-red-500">*</span>
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
                          type="text"
                          placeholder="Address"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-40 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10"
                        />{' '}
                        <span className="text-red-500">*</span>
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
                          type="text"
                          placeholder="City"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-40 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10"
                        />{' '}
                        <span className="text-red-500">*</span>
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
                          type="email"
                          placeholder="Email ID"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-40 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10"
                        />
                        <span className="text-red-500">*</span>
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
                          type="text"
                          placeholder="State"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-40 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10"
                        />
                        <span className="text-red-500">*</span>
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
                          type="text"
                          placeholder="Pin Code"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-40 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10"
                        />
                        <span className="text-red-500">*</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Buttons */}
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
        </form>
      </Form>
    </CardWrapper>
  );
};

export default AddGuestForm;
