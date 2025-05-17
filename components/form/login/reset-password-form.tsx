'use client';

import React, { useState } from 'react';
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Snackbar, Alert, AlertColor } from '@mui/material'; // Import Material UI components
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
import apiCall from '@/lib/axios';

enum Mode {
  EnterEmail = 'enter-email',
  EnterOTP = 'enter-otp',
  SetNewPassword = 'set-new-password'
}

// Reusable styles
const inputClassName =
  'bg-transparent text-black border-black border-opacity-10 placeholder:text-black placeholder:text-xs 2xl:text-sm placeholder:opacity-25';
const buttonClassName =
  'w-full text-white text-sm font-[400] bg-[#A07D3D] hover:opacity-80 hover:text-black hover:border hover:border-black';

// Email Form Component
const EmailForm = ({
  onSubmit,
  isLoading
}: {
  onSubmit: (data: resetPasswordSchemaType) => void;
  isLoading: boolean;
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
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={buttonClassName} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send OTP'}
        </Button>
      </form>
    </Form>
  );
};

// OTP Form Component
const OTPForm = ({
  onSubmit,
  email,
  isLoading
}: {
  onSubmit: (data: otpVerificationSchemaType & { email: string }) => void;
  email: string;
  isLoading: boolean;
}) => {
  const form = useForm<otpVerificationSchemaType>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: { otp: '' },
    mode: 'onSubmit'
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit({ ...data, email }))} className="space-y-6">
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
                  disabled={isLoading}
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
        <Button type="submit" className={buttonClassName} disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </form>
    </Form>
  );
};

// New Password Form Component
const NewPasswordForm = ({
  onSubmit,
  email,
  isLoading
}: {
  onSubmit: (data: setNewPasswordSchemaType & { email: string }) => void;
  email: string;
  isLoading: boolean;
}) => {
  const form = useForm<setNewPasswordSchemaType>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: { newPassword: '', confirmNewPassword: '' }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit({ ...data, email }))} className="space-y-6">
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={buttonClassName} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
};

const ResetPasswordForm = () => {
  const [mode, setMode] = useState<Mode>(Mode.EnterEmail);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Snackbar state management
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
  
  const router = useRouter();

  // Custom notification handler to replace toast
  const showNotification = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Handle snackbar close
  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const onEmailSubmit = async (data: resetPasswordSchemaType) => {
    setIsLoading(true);
    try {
      const response = await apiCall(
        'POST',
        'api/superAdmin/send-reset-otp',
        data
      );
      
      if (response && response.status === false) {
        // Handle specific API error responses
        showNotification(response.message || 'Failed to send OTP', 'error');
        return;
      }
      
      console.log('OTP sent successfully:', response);
      showNotification('OTP sent successfully. Please check your email.', 'success');
      setUserEmail(data.email); // Store the email for future requests
      setMode(Mode.EnterOTP);
    } catch (error: any) {
      // Handle different error scenarios
      if (error.response?.data) {
        showNotification(error.response.data.message || 'User not found', 'error');
      } else if (error.message) {
        showNotification(error.message, 'error');
      } else {
        showNotification('Failed to send OTP. Please try again.', 'error');
      }
      console.error('Send OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (data: otpVerificationSchemaType & { email: string }) => {
    setIsLoading(true);
    try {
      // Include the email in the OTP verification request
      const response = await apiCall('POST', 'api/superAdmin/verify-otp', {
        otp: data.otp,
        email: data.email
      });
      
      if (response && response.status === false) {
        showNotification(response.message || 'Invalid OTP', 'error');
        return;
      }
      
      console.log('OTP verified successfully:', response);
      showNotification('OTP verified successfully', 'success');
      setMode(Mode.SetNewPassword);
    } catch (error: any) {
      if (error.response?.data) {
        showNotification(error.response.data.message || 'Invalid OTP', 'error');
      } else if (error.message) {
        showNotification(error.message, 'error');
      } else {
        showNotification('Failed to verify OTP. Please try again.', 'error');
      }
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onNewPasswordSubmit = async (data: setNewPasswordSchemaType & { email: string }) => {
    setIsLoading(true);
    try {
      // Include the email in the password reset request
      const response = await apiCall('POST', 'api/superAdmin/reset-password', {
        newPassword: data.newPassword,
        email: data.email
      });
      
      if (response && response.status === false) {
        showNotification(response.message || 'Failed to reset password', 'error');
        return;
      }
      
      console.log('Password reset successful:', response);
      showNotification('Password reset successful. Redirecting to login...', 'success');
      
      // Delay redirect slightly to allow snackbar to be seen
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error: any) {
      if (error.response?.data) {
        showNotification(error.response.data.message || 'Failed to reset password', 'error');
      } else if (error.message) {
        showNotification(error.message, 'error');
      } else {
        showNotification('Failed to reset password. Please try again.', 'error');
      }
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
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
        {mode === Mode.EnterEmail && <EmailForm onSubmit={onEmailSubmit} isLoading={isLoading} />}
        {mode === Mode.EnterOTP && <OTPForm onSubmit={onOtpSubmit} email={userEmail} isLoading={isLoading} />}
        {mode === Mode.SetNewPassword && (
          <NewPasswordForm onSubmit={onNewPasswordSubmit} email={userEmail} isLoading={isLoading} />
        )}
      </CardWrapper>
      
      {/* Material UI Snackbar */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPasswordForm;