import { z } from 'zod';
// *****************Login and resetpassword form schema and type*******************

// Login Schema and type
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be atleast 6 characters'),
  rememberMe: z.boolean().default(false)
});

export type loginSchemaType = z.infer<typeof loginSchema>;

// Reset Password Schema and type
export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

// Email verification Schema and type
export const otpVerificationSchema = z.object({
  otp: z.string().min(6, 'Enter 6 digits')
});

export type otpVerificationSchemaType = z.infer<typeof otpVerificationSchema>;

// Set new password schema and type
export const setNewPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Password must be atleast 6 characters'),
  confirmNewPassword: z.string().min(8, 'Password must be atleast 6 characters')
});

export type setNewPasswordSchemaType = z.infer<typeof setNewPasswordSchema>;

// *****************Add guest and Add booking form schema and type*******************

// Add guest schema and type
export const guestSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  phoneNo: z.string().min(1, 'Phone Number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  email: z.string().email().min(1, 'Email is required'),
  state: z.string().min(1, 'State is required'),
  pinCode: z.string().min(1, 'Pin Code is required')
});

export type guestSchemaType = z.infer<typeof guestSchema>;

// Add booking schema and type
export const bookingSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  phoneNo: z.string().min(1, 'Phone Number is required'),
  idProof: z.string().min(1, 'ID Proof is required'),
  roomType: z.string().min(1, 'Room Type is required'),
  email: z.string().email().min(1, 'Email is required'),
  roomNo: z.string().min(1, 'Room Number is required'),
  paymentStatus: z.string().min(1, 'Payment Status is required')
});

export type bookingSchemaType = z.infer<typeof bookingSchema>;

// *****************Notification Details form schema and type*******************

export const notificationSchema = z.object({
  notificationID: z.string().min(1, 'Notification ID is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  name: z.string().min(1, 'Name is required'),
  phoneNo: z.string().min(10, 'Phone number must be at least 10 digits'),
  roomNo: z.string().min(1, 'Room number is required'),
  notificationType: z.literal('Email'),
  Status: z.enum(['Received', 'Sent'])
});

export type notificationSchemaType = z.infer<typeof notificationSchema>;
