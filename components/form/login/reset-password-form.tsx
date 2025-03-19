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
} from 'schema';
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
} from '@/components/ui/input-otp';

enum Mode {
  EnterEmail = 'enter-email',
  EnterOTP = 'enter-otp',
  SetNewPassword = 'set-new-password'
}

// Reusable styles
const inputClassName =
  'bg-transparent text-black border-black border-opacity-10 placeholder:text-black placeholder:text-xs placeholder:opacity-25';
const buttonClassName =
  'w-full text-white text-sm font-[400] bg-[#A07D3D] hover:opacity-80 hover:text-black hover:border hover:border-black';

// Email Form Component
const EmailForm = ({
  onSubmit
}: {
  onSubmit: (data: resetPasswordSchemaType) => void;
}) => {
  const form = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className={inputClassName}
                  aria-label="Email address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={buttonClassName}>
          Send OTP
        </Button>
      </form>
    </Form>
  );
};

// OTP Form Component
const OTPForm = ({
  onSubmit
}: {
  onSubmit: (data: otpVerificationSchemaType) => void;
}) => {
  const form = useForm<otpVerificationSchemaType>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: { otp: '' },
    mode: 'onSubmit'
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center items-start">
              <FormLabel className="text-black text-start font-[400]">
                Enter OTP
              </FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
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
        <Button type="submit" className={buttonClassName}>
          Verify OTP
        </Button>
      </form>
    </Form>
  );
};

// New Password Form Component
const NewPasswordForm = ({
  onSubmit
}: {
  onSubmit: (data: setNewPasswordSchemaType) => void;
}) => {
  const form = useForm<setNewPasswordSchemaType>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: { newPassword: '', confirmNewPassword: '' }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-[400]">
                New Password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="New Password"
                  className={inputClassName}
                  aria-label="New password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-[400]">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm New Password"
                  className={inputClassName}
                  aria-label="Confirm new password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={buttonClassName}>
          Save
        </Button>
      </form>
    </Form>
  );
};

const ResetPasswordForm = () => {
  const [mode, setMode] = useState<Mode>(Mode.EnterEmail);

  const onEmailSubmit = (data: resetPasswordSchemaType) => {
    console.log('Email submitted:', data);
    setMode(Mode.EnterOTP);
  };

  const onOtpSubmit = (data: otpVerificationSchemaType) => {
    console.log('OTP submitted:', data);
    setMode(Mode.SetNewPassword);
  };

  const onNewPasswordSubmit = (data: setNewPasswordSchemaType) => {
    console.log('New password submitted:', data);
    console.log("Successfull password reset.....Let's go to the party");
    // Reset to initial mode after completion
  };

  return (
    <div className="form-background overflow-hidden flex flex-col justify-center items-center w-[90%] h-[60vh] md:w-[90vw] md:h-[70vh] lg:w-[80%] lg:h-[85%] px-4 rounded-xl md:min-w-[300px] lg:min-w-[350px]">
      <CardWrapper
        title={
          mode === Mode.EnterEmail
            ? 'Reset Password'
            : mode === Mode.EnterOTP
              ? 'Reset Password'
              : 'Set New Password'
        }
        label=""
      >
        {mode === Mode.EnterEmail && <EmailForm onSubmit={onEmailSubmit} />}
        {mode === Mode.EnterOTP && <OTPForm onSubmit={onOtpSubmit} />}
        {mode === Mode.SetNewPassword && (
          <NewPasswordForm onSubmit={onNewPasswordSubmit} />
        )}
      </CardWrapper>
    </div>
  );
};

export default ResetPasswordForm;
