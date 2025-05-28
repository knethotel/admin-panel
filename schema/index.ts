import { sources } from 'next/dist/compiled/webpack/webpack';
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
  otp: z.string()
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
  pinCode: z.string().min(1, 'Pin Code is required'),
  source: z.string().min(1, 'Sources is required'),
  receivedAmt: z.number(),
  dueAmt: z.number(),
  paymentMode: z.string(),
  roomCategory: z.string()
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

// ****************************Payment management schema*******************************************

// ***********Create coupon schema and type************
export const createCouponSchema = z.object({
  category: z.enum(['Percentage Coupons', 'Fixed Amount Coupons'], {
    errorMap: () => ({ message: 'Please select a valid category status' })
  }),
  validityFrom: z.string().min(1, 'Validity From is required'),
  validityTo: z.string().min(1, 'Validity To is required'),
  usageLimit: z.string().min(1, 'Usage Limit is required'),
  discountPercentage: z.string().min(1, 'Per User Limit is required'),
  discountAmount: z
    .number()
    .min(0, 'Discount amount cannot be negative')
    .or(z.literal(0)),
  minimumSpent: z.string().min(1, 'Minimum Spent is required'),
  couponStatus: z.enum(['active', 'expired', 'disabled'], {
    errorMap: () => ({ message: 'Please select a valid coupon status' })
  }),
  redemption: z.enum(['automatic', 'manual entry', 'promo code'], {
    errorMap: () => ({ message: 'Please select a valid coupon status' })
  }),
  stackable: z.boolean().default(false),
  createCode: z.string().min(1, 'Create Code is required'),
  termsAndConditions: z.string().min(1, 'Terms and Conditions is required'),
  couponImage: z
    .custom<File | undefined>(
      (file) => file instanceof File || typeof file === 'undefined',
      { message: 'Invalid file format' }
    )
    .refine(
      (file) =>
        !file ||
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type
        ),
      { message: 'Only JPG, PNG, GIF, and WEBP formats are allowed.' }
    )
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: 'Image size must be 5MB or less.'
    })
});
export type createCouponSchemaType = z.infer<typeof createCouponSchema>;

//***********Create refund schema and type*************
export const createRefundSchema = z.object({
  refundID: z.string(),
  userID: z.string().min(1, 'Invalid UserID'),
  hotelID: z.string().min(1, 'Invalid HotelID'),
  amount: z.number().min(1, 'Enter valid amount'),
  refundReason: z.string().min(1, 'Enter valid input'),
  refundStatus: z.enum(['Initiated', 'In-Progress', 'Completed', 'Rejected'], {
    errorMap: () => ({ message: 'Please select a valid Refund status' })
  }),
  message: z.string().min(1, 'Enter a valid input').optional(),
  assignedStaff: z.string().min(1, 'Enter valid input'),
  serviceDepartment: z.string().min(1, 'Enter valid input'),
  dateAndTime: z.string().min(1, 'Enter valid value')
});

export type createRefundSchemaType = z.infer<typeof createRefundSchema>;

// **********Hotel Profile schema***************
// Room configuration schema
export const roomConfigSchema = z.object({
  roomType: z.string().min(1, 'Room type is required'),
  feature: z.string().min(1, 'Feature is required')
});

// Full hotel schema
export const hotelSchema = z.object({
  hotelId: z.string().min(1, 'Hotel ID is required'), // maps to "HotelId"
  hotelName: z.string().min(1, 'Hotel name is required'), // maps to "name"
  number: z.string().length(10, 'Phone number must be exactly 10 digits'), // maps to "phoneNo"
  email: z.string().email('Invalid email address'),
  completeAddress: z.string().min(1, 'Complete address is required'), // maps to "address"
  hotelCategory: z.enum(['3 Star', '4 Star', '5 Star', '7 Star']),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  pinCode: z.string().min(1, 'Pincode is required'), // maps to "pincode"
  gst: z.string().optional(), // maps to "gstDetails"
  brandedHotel: z.boolean().optional(),
  chainHotel: z.boolean().optional(), // mapped from string-to-boolean if needed
  // parentHotelName: z.string().optional(), // maps to "parentHotel"
  parentHotelId: z.string().optional(), // maps to "parentHotel"
  // subHotelName: z.string().optional(),
  roomImage: z.any().optional(),
  roomConfigs: z.array(roomConfigSchema),
  numberOfRooms: z.number().min(1),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  servingDepartments: z.array(z.string()).optional(), // maps to servingDepartment[0]
  totalStaff: z.number().min(1),
  hotelLicenseCertifications: z.string().optional(), // maps to "hotelLicenseAndCertification.certificateValue"
  hotelLicenseImage: z.any().optional(),
  legalBusinessLicense: z.string().optional(), // maps to "legalAndBusinessLicense.licenseValue"
  legalBusinessLicenseImage: z.any().optional(),
  touristLicense: z.string().optional(), // maps to "touristLicense.licenseValue"
  touristLicenseImage: z.any().optional(),
  tanNumber: z.string().optional(), // maps to "panNumber.numberValue"
  tanNumberImage: z.any().optional(),
  dataPrivacyGdprCompliances: z.string().optional(), // maps to "dataPrivacyAndGDPRCompliance.complianceValue"
  dataPrivacyGdprImage: z.any().optional(),
  subscriptionPlan: z.enum(['1 Month', '6 Months', '1 Year', 'Premium']),
  subscriptionPrice: z.number().min(500),
  netPrice: z.number().optional(),
  applyCoupon: z.string().optional(),
  logoImage: z.any().optional(),
  additionalImage: z.any().optional(),
  internetConnectivity: z.boolean().optional(),
  softwareCompatibility: z.boolean().optional()
});

// Inferred type
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

// ***********************PriceTimeSetting Modal Form Schema **********************//

// PriceTimeSetting(Global) Schema
export const PriceTimeSettingSchema = z.object({
  priceType: z.enum(['Free', 'Paid'], {
    errorMap: () => ({
      message: 'Invalid Price Category'
    })
  }),
  price: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Invalid price format (e.g., 10 or 10.99)'
    })
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' })
    .or(z.number().min(1, { message: 'Price must be greater than 0' })),
  timeSlot: z.enum(
    ['5:00AM-12:00PM', '12:00PM-10:00PM', '10:00PM-1:00AM', '11:00PM-12:00AM'],
    {
      errorMap: () => ({ message: 'Please select valid time slot' })
    }
  ),
  availability: z.enum(
    ['Monday-Friday', 'Monday-saturday', 'Monday-Sunday', 'only Weekends'],
    {
      errorMap: () => ({ message: 'Please select valid slot' })
    }
  )
});

export type PriceTimeSettingSchemaType = z.infer<typeof PriceTimeSettingSchema>;

// Price time setting schema for gym service

export const PriceTimeSettingGymSchema = z.object({
  priceType: z.enum(['Free', 'Paid'], {
    errorMap: () => ({
      message: 'Invalid Price Category'
    })
  }),
  price: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Invalid price format (e.g., 10 or 10.99)'
    })
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' })
    .or(z.number().min(1, { message: 'Price must be greater than 0' })),
  timeSlot: z.enum(
    ['5:00AM-12:00PM', '12:00PM-10:00PM', '10:00PM-1:00AM', '11:00PM-12:00AM'],
    {
      errorMap: () => ({ message: 'Please select valid time slot' })
    }
  ),
  availability: z.enum(
    ['Monday-Friday', 'Monday-saturday', 'Monday-Sunday', 'only Weekends'],
    {
      errorMap: () => ({ message: 'Please select valid slot' })
    }
  ),
  category: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  })
});

export type PriceTimeSettingGymSchemaType = z.infer<
  typeof PriceTimeSettingGymSchema
>;

// Price time setting schema for Concierge service

export const PriceTimeSettingConciergeSchema = z.object({
  priceType: z.enum(['Free', 'Paid'], {
    errorMap: () => ({
      message: 'Invalid Price Category'
    })
  }),
  price: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Invalid price format (e.g., 10 or 10.99)'
    })
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' })
    .or(z.number().min(1, { message: 'Price must be greater than 0' })),
  timeSlot: z.enum(
    ['5:00AM-12:00PM', '12:00PM-10:00PM', '10:00PM-1:00AM', '11:00PM-12:00AM'],
    {
      errorMap: () => ({ message: 'Please select valid time slot' })
    }
  ),
  availability: z.enum(
    ['Monday-Friday', 'Monday-saturday', 'Monday-Sunday', 'only Weekends'],
    {
      errorMap: () => ({ message: 'Please select valid slot' })
    }
  ),
  category: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  })
});

export type PriceTimeSettingConciergeSchemaType = z.infer<
  typeof PriceTimeSettingConciergeSchema
>;
// Price time setting schema for InRoomControl service

export const PriceTimeSettingInRoomControlSchema = z.object({
  priceType: z.enum(['Free', 'Paid'], {
    errorMap: () => ({
      message: 'Invalid Price Category'
    })
  }),
  price: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Invalid price format (e.g., 10 or 10.99)'
    })
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' })
    .or(z.number().min(1, { message: 'Price must be greater than 0' })),
  timeSlot: z.enum(
    ['5:00AM-12:00PM', '12:00PM-10:00PM', '10:00PM-1:00AM', '11:00PM-12:00AM'],
    {
      errorMap: () => ({ message: 'Please select valid time slot' })
    }
  ),
  availability: z.enum(
    ['Monday-Friday', 'Monday-saturday', 'Monday-Sunday', 'only Weekends'],
    {
      errorMap: () => ({ message: 'Please select valid slot' })
    }
  ),
  category: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  })
});

export type PriceTimeSettingInRoomControlSchemaType = z.infer<
  typeof PriceTimeSettingInRoomControlSchema
>;

// Price time setting schema for spa/salon service

export const PriceTimeSettingSpaSchema = z.object({
  priceType: z.enum(['Free', 'Paid'], {
    errorMap: () => ({
      message: 'Invalid Price Category'
    })
  }),
  price: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Invalid price format (e.g., 10 or 10.99)'
    })
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' })
    .or(z.number().min(1, { message: 'Price must be greater than 0' })),
  timeSlot: z.enum(
    ['5:00AM-12:00PM', '12:00PM-10:00PM', '10:00PM-1:00AM', '11:00PM-12:00AM'],
    {
      errorMap: () => ({ message: 'Please select valid time slot' })
    }
  ),
  availability: z.enum(
    ['Monday-Friday', 'Monday-saturday', 'Monday-Sunday', 'only Weekends'],
    {
      errorMap: () => ({ message: 'Please select valid slot' })
    }
  ),
  service: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  }),
  productCategory: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  }),
  productName: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  })
});

export type PriceTimeSettingSpaSchemaType = z.infer<
  typeof PriceTimeSettingSpaSchema
>;
// Price time setting schema for spa/salon service

export const PriceTimeSettingHouseKeepingSchema = z.object({
  priceType: z.enum(['Free', 'Paid'], {
    errorMap: () => ({
      message: 'Invalid Price Category'
    })
  }),
  price: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Invalid price format (e.g., 10 or 10.99)'
    })
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' })
    .or(z.number().min(1, { message: 'Price must be greater than 0' })),
  timeSlot: z.enum(
    ['5:00AM-12:00PM', '12:00PM-10:00PM', '10:00PM-1:00AM', '11:00PM-12:00AM'],
    {
      errorMap: () => ({ message: 'Please select valid time slot' })
    }
  ),
  availability: z.enum(
    ['Monday-Friday', 'Monday-saturday', 'Monday-Sunday', 'only Weekends'],
    {
      errorMap: () => ({ message: 'Please select valid slot' })
    }
  ),
  service: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  }),
  productCategory: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  }),
  productName: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  })
});

export type PriceTimeSettingHouseKeepingSchemaType = z.infer<
  typeof PriceTimeSettingHouseKeepingSchema
>;

// ***********Reception Details Form Schema************//

const requestTypeEnum = z.enum([
  'Service',
  'Complaint',
  'Wake-up call',
  'Pre check-in',
  'Pre check-out',
  'Wake up call schedule',
  'Feedback',
  'Service feedback'
]);

const statusEnum = z.enum(['Pending', 'In-Progress', 'Completed']);

export const ReceptionDataSchema = z.object({
  requestID: z.string(),
  requestDetail: z.string(),
  responseDetail: z.string(),
  requestAssignedTo: z.string(),
  requestTime: z.object({
    date: z.string(), // Consider using `z.date()` if you work with actual Date objects
    time: z.string()
  }),
  guestDetails: z.object({
    guetID: z.string(),
    name: z.string(),
    roomNo: z.string(),
    mobileNumber: z.string().min(10).max(15), // Adjust min/max length as needed
    email: z.string().email()
  }),
  requestType: requestTypeEnum,
  status: statusEnum,
  assignedTo: z.string()
});

export type ReceptionDataSchemaType = z.infer<typeof ReceptionDataSchema>;

// *************Order Management schema***************
//manage products modal form schema

export const ManageProductsSchema = z.object({
  productType: z.string().min(1, 'Invalid input')
});

export type ManageProductsSchemaType = z.infer<typeof ManageProductsSchema>;

//Add Menu modal form schema

export const AddMenuSchema = z.object({
  newProductType: z.string().min(1, 'Invalid input'),
  selectType: z
    .enum(['American', 'Starter'], {
      errorMap: () => ({
        message: 'Invalid status category'
      })
    })
    .optional(),
  productName: z.string().min(1, 'Invalid input'),
  description: z.string().min(1, 'Invalid input'),
  barcode: z.string().min(1, 'Invalid input'),
  salesPrice: z.number().min(0, 'Sales price must be a positive number'),
  salesTaxes: z.number().min(0, 'Sales tax must be a positive number'),
  productImage: z
    .custom<File | undefined>(
      (file) => file instanceof File || typeof file === 'undefined',
      { message: 'Invalid file format' }
    )
    .refine(
      (file) =>
        !file ||
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type
        ),
      { message: 'Only JPG, PNG, GIF, and WEBP formats are allowed.' }
    )
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: 'Image size must be 5MB or less.'
    })
});

export type AddMenuSchemaType = z.infer<typeof AddMenuSchema>;

// *******************Employee management*********************
// Add employee form schema
export const employeeSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email().min(1, 'Email is required'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .nonempty({ message: 'Password is required' }),
  phoneNo: z.string().min(1, 'Phone Number is required'),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['Active', 'Inactive'], {})
});

export type employeeSchemaType = z.infer<typeof employeeSchema>;

// **************SPA/Salon service schema**************//

export const spaSalonServiceSchema = z.object({
  additionalService: z.string().min(1, 'Invalid input')
});

export type SpaSalonServiceSchemaType = z.infer<typeof spaSalonServiceSchema>;

// *************In-room dining shema*****************//
//Add item schema

export const AddItemsSchema = z.object({
  newProductType: z.string().min(1, 'Enter valid input'),
  productName: z.string().min(1, 'Enter valid input'),
  description: z.string().min(1, 'Enter valid input'),
  cost: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Invalid price format (e.g., 10 or 10.99)'
    })
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' })
    .or(z.number().min(1, { message: 'Price must be greater than 0' })),
  type: z.enum(['Vegetarian', 'Non-Vegeterian'], {
    errorMap: () => ({
      message: 'Not a valid type'
    })
  }),
  visibility: z.boolean(),
  itemImage: z
    .custom<File | undefined>(
      (file) => file instanceof File || typeof file === 'undefined',
      { message: 'Invalid file format' }
    )
    .refine(
      (file) =>
        !file ||
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type
        ),
      { message: 'Only JPG, PNG, GIF, and WEBP formats are allowed.' }
    )
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: 'Image size must be 5MB or less.'
    })
});

export type AddItemsSchemaType = z.infer<typeof AddItemsSchema>;

//*****************Housekeeping Service > Manage products modal form schema****************/

export const ManageProductsModalFormSchema = z.object({
  selectService: z.enum(['Laundary', 'Toileteries'], {
    errorMap: () => ({ message: 'Invalid Category' })
  }),
  productCategory: z
    .string()
    .min(1, 'Input field must have at least 1 character.'),
  productName: z.string().min(1, 'Input field must have at least 1 character.'),
  productImage: z
    .union([z.any(), z.string().url()])
    .optional()
    .refine((file) => file !== '', {
      message: 'Logo image must not be an empty value'
    })
});

export type ManageProductsModalFormSchemaType = z.infer<
  typeof ManageProductsModalFormSchema
>;

//***************Concierge Service > Manage products modal form schema****************/
export const ConciergeManageProductsModalFormSchema = z.object({
  productCategory: z
    .string()
    .min(1, 'Input field must have at least 1 character.'),
  selectService: z.enum(['Nearby Attractions', 'Nearby Cafe & Restaurants'], {
    errorMap: () => ({ message: 'Invalid Category' })
  }),
  name: z.string().min(1, 'Input field must have at least 1 character.'),
  description: z.string().min(1, 'Input field must have at least 1 character.'),
  productImage: z
    .union([z.any(), z.string().url()])
    .optional()
    .refine((file) => file !== '', {
      message: 'Logo image must not be an empty value'
    })
});

export type ConciergeManageProductsModalFormSchemaType = z.infer<
  typeof ConciergeManageProductsModalFormSchema
>;

//***************Spa/Salon Service > Manage products modal form schema****************/

export const SpaManageProductsModalFormSchema = z.object({
  productCategory: z
    .string()
    .min(1, 'Input field must have at least 1 character.'),
  selectService: z.enum(['SPA SERVICE', 'SALON SERVICE'], {
    errorMap: () => ({ message: 'Invalid Category' })
  }),
  name: z.string().min(1, 'Input field must have at least 1 character.'),
  description: z.string().min(1, 'Input field must have at least 1 character.'),
  productImage: z
    .union([z.any(), z.string().url()])
    .optional()
    .refine((file) => file !== '', {
      message: 'Logo image must not be an empty value'
    }),
  additionalService: z
    .string()
    .min(1, 'Input field must have at least 1 character.'),
  additionalServicePrice: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Invalid price format (e.g., 10 or 10.99)'
    })
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' })
    .or(z.number().min(1, { message: 'Price must be greater than 0' })),
  additionalServiceImage: z
    .union([z.any(), z.string().url()])
    .optional()
    .refine((file) => file !== '', {
      message: 'Logo image must not be an empty value'
    })
});

export type SpaManageProductsModalFormSchemaType = z.infer<
  typeof SpaManageProductsModalFormSchema
>;

//*****************Swimming Pool Service > Manage products modal form schema****************/
export const SwimmingPoolManageProductsModalFormSchema = z.object({
  swimmingPoolImage: z
    .union([z.any(), z.string().url()])
    .optional()
    .refine((file) => file !== '', {
      message: 'Logo image must not be an empty value'
    })
});

export type SwimmingPoolManageProductsModalFormSchemaType = z.infer<
  typeof SwimmingPoolManageProductsModalFormSchema
>;

//*****************Gym Pool Service > Manage products modal form schema****************/

export const GymManageProductsModalFormSchema = z.object({
  equipmentImage: z
    .union([z.any(), z.string().url()])
    .optional()
    .refine((file) => file !== '', {
      message: 'Logo image must not be an empty value'
    }),
  equipmentName: z.string().min(1, 'Empty input field.')
});

export type GymManageProductsModalFormSchemaType = z.infer<
  typeof GymManageProductsModalFormSchema
>;
