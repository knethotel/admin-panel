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

// **********Payment management schema***************

export const paymentSchema = z.object({
  category: z.enum(
    ['category1', 'category2', 'category3', 'category4', 'category5'],
    {
      errorMap: () => ({ message: 'Please select a valid category status' })
    }
  ),
  validityFrom: z.string().min(1, 'Validity From is required'),
  validityTo: z.string().min(1, 'Validity To is required'),
  usageLimit: z.string().min(1, 'Usage Limit is required'),
  perUserLimit: z.string().min(1, 'Per User Limit is required'),
  minimumSpent: z.string().min(1, 'Minimum Spent is required'),
  couponStatus: z.enum(['active', 'expired', 'disabled'], {
    errorMap: () => ({ message: 'Please select a valid coupon status' })
  }),
  redemption: z.enum(['automatic', 'manual entry', 'promo code'], {
    errorMap: () => ({ message: 'Please select a valid coupon status' })
  }),
  stackable: z.boolean().default(false),
  createCode: z.string().min(1, 'Create Code is required'),
  termsAndConditions: z.string().min(1, 'Terms and Conditions is required')
});

export type paymentSchemaType = z.infer<typeof paymentSchema>;

// **********Hotel Profile schema***************
export const hotelSchema = z.object({
  logoImage: z
    .union([z.instanceof(File), z.string().url()])
    .optional()
    .refine((file) => file !== '', {
      message: 'Logo image must not be an empty value'
    }),

  hotelName: z.string().min(1, 'Hotel name is required'),
  number: z
    .string()
    .length(10, 'Phone number must be exactly 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  completeAddress: z.string().min(1, 'Complete address is required'),

  hotelCategory: z.enum(['Budget', 'Luxury', 'Mid-range', 'Boutique'], {
    errorMap: () => ({ message: 'Invalid hotel category' })
  }),

  city: z.enum(['Delhi', 'Mumbai', 'Bangalore', 'Chennai'], {
    errorMap: () => ({ message: 'Please select a valid city' })
  }),
  country: z.enum(['India', 'USA', 'UK', 'Canada'], {
    errorMap: () => ({ message: 'Please select a valid country' })
  }),
  state: z.enum(['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi'], {
    errorMap: () => ({ message: 'Please select a valid state' })
  }),

  pinCode: z
    .string()
    .length(6, 'Pincode must be exactly 6 digits')
    .regex(/^\d+$/, 'Pincode must contain only digits'),

  roomTypes: z.enum(['Single', 'Double', 'Suite'], {
    errorMap: () => ({ message: 'Please select a valid room type' })
  }),
  roomImage: z.union([z.instanceof(File), z.string().url()]).optional(),

  features: z.enum(['WIFI', 'Pool', 'Gym'], {
    errorMap: () => ({ message: 'Please select a valid feature' })
  }),

  numberOfRooms: z
    .number()
    .int('Number of rooms must be an integer')
    .positive('Number of rooms must be positive')
    .min(1, 'At least one room is required'),

  checkInTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)$/i,
      'Invalid time format (e.g., 12:00 PM)'
    ),

  checkOutTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)$/i,
      'Invalid time format (e.g., 12:00 PM)'
    ),

  servingDepartments: z.enum(['Housekeeping', 'Reception', 'Dining'], {
    errorMap: () => ({ message: 'Please select a valid serving department' })
  }),

  totalStaff: z
    .number()
    .int('Total staff must be an integer')
    .nonnegative('Total staff cannot be negative')
    .min(1, 'At least one staff member is required'),

  hotelLicenseCertifications: z
    .string()
    .min(1, 'Hotel license & certifications are required'),

  hotelLicenseImage: z.union([z.instanceof(File), z.string().url()]).optional(),

  legalBusinessLicense: z
    .string()
    .min(1, 'Legal and business license is required'),

  legalBusinessLicenseImage: z
    .union([z.instanceof(File), z.string().url()])
    .optional(),

  touristLicense: z.string().min(1, 'Tourist license is required'),
  touristLicenseImage: z
    .union([z.instanceof(File), z.string().url()])
    .optional(),

  tanNumber: z
    .string()
    .regex(
      /^[A-Z]{4}\d{5}[A-Z]$/,
      'Invalid TAN number format (e.g., ABCD12345E)'
    ),

  tanNumberImage: z.union([z.instanceof(File), z.string().url()]).optional(),

  dataPrivacyGdprCompliances: z
    .string()
    .min(1, 'Data privacy & GDPR compliances are required'),

  dataPrivacyGdprImage: z
    .union([z.instanceof(File), z.string().url()])
    .optional(),

  internetConnectivity: z.boolean().default(false),
  softwareCompatibility: z.boolean().default(false)
});

// TypeScript type inferred from the schema
export type HotelSchemaType = z.infer<typeof hotelSchema>;

// **********Change password schema************ //

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: 'Old password must be at least 6 characters' })
      .nonempty({ message: 'Old password is required' }),

    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters' })
      .max(18, { message: 'New password must not exceed 18 characters' })
      .regex(/[A-Z]/, {
        message: 'New password must contain at least one uppercase letter'
      })
      .regex(/[a-z]/, {
        message: 'New password must contain at least one lowercase letter'
      })
      .regex(/\d/, { message: 'New password must contain at least one number' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'New password must contain at least one special character'
      })
      .nonempty({ message: 'New password is required' }),

    confirmNewPassword: z
      .string()
      .min(8, { message: 'Confirm password must be at least 6 characters' })
      .nonempty({ message: 'Confirm password is required' })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword']
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: 'New password must be different from old password',
    path: ['newPassword']
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
