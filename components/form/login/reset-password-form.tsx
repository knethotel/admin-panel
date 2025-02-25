'use client';

import React, { useState } from 'react';
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import {
  resetPasswordSchema,
  resetPasswordSchemaType,
  otpVerificationSchema,
  otpVerificationSchemaType,
  setNewPasswordSchema,
  setNewPasswordSchemaType
} from 'schema'; // Assumed schema file
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'; // Your custom OTP components

type Mode = 'enter-email' | 'enter-otp' | 'set-new-password';

const ResetPasswordForm = () => {
  // Email form
  const emailForm = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  // OTP form
  const otpForm = useForm<otpVerificationSchemaType>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      otp: ''
    },
    mode: 'onChange'
  });

  // New password form
  const setNewPasswordForm = useForm<setNewPasswordSchemaType>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const [mode, setMode] = useState<Mode>('enter-email');

  const onEmailSubmit = (data: resetPasswordSchemaType) => {
    console.log('Email submitted:', data);
    setMode('enter-otp');
    emailForm.reset();
  };

  const onOtpSubmit = (data: otpVerificationSchemaType) => {
    console.log('OTP submitted:', data);
    setMode('set-new-password');
    otpForm.reset();
  };

  const onNewPasswordSubmit = (data: setNewPasswordSchemaType) => {
    console.log('New password submitted:', data);
    setNewPasswordForm.reset();
  };

  switch (mode) {
    case 'enter-email':
      return (
        <div className="form-background overflow-hidden flex flex-col justify-center items-center w-[90%] h-[60vh] md:w-[90vw] md:h-[70vh] lg:w-[80%] lg:h-[85%] px-4 rounded-xl md:min-w-[300px] lg:min-w-[350px]">
          <CardWrapper title="Reset Password" label="">
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="bg-transparent text-black border-black border-opacity-10 placeholder:text-black placeholder:text-xs placeholder:opacity-25"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full text-white bg-[#A07D3D] hover:opacity-80 hover:text-black hover:border hover:border-black"
                >
                  Send OTP
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </div>
      );

    case 'enter-otp':
      return (
        <div className="form-background overflow-hidden flex flex-col justify-center items-center w-[90%] h-[60vh] md:w-[90vw] md:h-[70vh] lg:w-[80%] lg:h-[85%] px-4 rounded-xl md:min-w-[300px] lg:min-w-[350px]">
          <CardWrapper title="Verify OTP" label="">
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Enter OTP</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          value={field.value} // Explicitly set value
                          onChange={(newValue) => field.onChange(newValue)} // Sync with form state
                        >
                          <InputOTPGroup>
                            {Array.from({ length: 6 }).map((_, i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full text-white bg-[#A07D3D] hover:opacity-80 hover:text-black hover:border hover:border-black"
                >
                  Verify OTP
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </div>
      );

    case 'set-new-password':
      return (
        <div className="form-background overflow-hidden flex flex-col justify-center items-center w-[90%] h-[60vh] md:w-[90vw] md:h-[70vh] lg:w-[80%] lg:h-[85%] px-4 rounded-xl md:min-w-[300px] lg:min-w-[350px]">
          <CardWrapper title="Reset Password" label="">
            <Form {...setNewPasswordForm}>
              <form
                onSubmit={setNewPasswordForm.handleSubmit(onNewPasswordSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={setNewPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="New Password"
                          className="bg-transparent text-black border-black border-opacity-10 placeholder:text-black placeholder:text-xs placeholder:opacity-25"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={setNewPasswordForm.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm New Password"
                          className="bg-transparent text-black border-black border-opacity-10 placeholder:text-black placeholder:text-xs placeholder:opacity-25"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-[130px] text-xs text-white bg-[#A07D3D] hover:opacity-80 hover:text-black hover:border hover:border-black"
                >
                  Save
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </div>
      );

    default:
      return <div>Invalid mode</div>;
  }
};

export default ResetPasswordForm;
