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

  hotelCategory: z.enum(['3 Starr', '4 Star', '5 Star', '7 Star'], {
    errorMap: () => ({ message: 'Invalid hotel category' })
  }),

  city: z.enum(
    [
      'Delhi',
      'Mumbai',
      'Bangalore',
      'Chennai',
      'Kolkata',
      'Hyderabad',
      'Ahmedabad',
      'Pune',
      'Jaipur',
      'Surat',
      'Lucknow',
      'Kanpur',
      'Nagpur',
      'Visakhapatnam',
      'Bhopal',
      'Patna',
      'Ludhiana',
      'Agra',
      'Nashik',
      'Vadodara',
      'Indore',
      'Coimbatore',
      'Kochi',
      'Chandigarh',
      'Guwahati'
    ],
    {
      errorMap: () => ({ message: 'Please select a valid city' })
    }
  ),
  country: z.enum([
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ]),
  state: z.enum(
    [
      'Maharashtra',
      'Karnataka',
      'Tamil Nadu',
      'Delhi',
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Kerala',
      'Madhya Pradesh',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
      'Andaman and Nicobar Islands',
      'Chandigarh',
      'Dadra and Nagar Haveli and Daman and Diu',
      'Jammu and Kashmir',
      'Ladakh',
      'Lakshadweep',
      'Puducherry'
    ],
    {
      errorMap: () => ({ message: 'Please select a valid state' })
    }
  ),

  pinCode: z
    .string()
    .length(6, 'Pincode must be exactly 6 digits')
    .regex(/^\d+$/, 'Pincode must contain only digits'),

  roomTypes: z.enum(
    [
      'Single',
      'Double',
      'Twin',
      'Deluxe',
      'Studio Room /Apartments',
      'Junior Suits',
      'Suite',
      'Presidential Suite',
      'Connecting Suite',
      'Rooms with a View'
    ],
    {
      errorMap: () => ({ message: 'Please select a valid room type' })
    }
  ),
  roomImage: z.union([z.instanceof(File), z.string().url()]).optional(),

  features: z.enum(['Sea Side', 'Balcony View'], {
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

  servingDepartments: z.enum(
    [
      'Reception',
      'Housekeeping',
      'In-Room Dining',
      'Gym',
      'Spa',
      'Swimming Pool',
      'Concierge Service',
      'In-Room Control',
      'Order Management',
      'SOS Management',
      'Chat With Staff'
    ],
    {
      errorMap: () => ({ message: 'Please select a valid serving department' })
    }
  ),

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

// ***********************PriceTimeSetting Modal Form Schema

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
  status: z.enum(['Active', 'Inactive'], {}),
  priceType: z.enum(['ACTIVE', 'INACTIVE'], {
    errorMap: () => ({
      message: 'Invalid status Category'
    })
  })
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
  cost: z.number().positive('Cost must be a positive value'),
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
