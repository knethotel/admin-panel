import { z } from 'zod';
// ****************************Company Panel*********************

// Admin Management Schema---------------------------------------------------------------------------------------
export const adminSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email().min(1, 'Email is required'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .nonempty({ message: 'Password is required' }),
  phoneNo: z.string().min(1, 'Phone Number is required'),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['Active', 'Inactive'], {
    errorMap: () => ({ message: 'Invalid Status' })
  }),
  logIn: z.string().min(1, 'Login Time is required'),
  logOut: z.string().min(1, 'Logout Time is required')
});

export type adminSchemaType = z.infer<typeof adminSchema>;

// Subscription Management Schema---------------------------------------------------------------------------------
export const SubscriptionManagementFormSchema = z.object({
  subscriptionID: z
    .string()
    .min(1, 'Subscription ID cannot be empty')
    .optional(),
  planName: z.string().min(1, 'Plan Name cannot be empty').optional(),
  planDuration: z.string().min(1, 'Plan Duration cannot be empty').optional(), // Made optional
  planType: z.string().min(1, 'Plan Type cannot be empty').optional(),
  description: z.string().min(1, 'Description cannot be empty').optional(),
  status: z.enum(['Active', 'Inactive', 'Cancelled', 'Expired'], {
    errorMap: () => ({ message: 'Invalid status' })
  }),
  cost: z.coerce
    .number({ invalid_type_error: 'Cost must be a valid number' })
    .positive('Cost must be positive')
    .min(0, 'Cost must be non-negative')
    .optional() // Made optional
  // PAYMENT TYPE FIELD VALIDATION IS LEFT
});

export type SubscriptionManagementFormSchemaType = z.infer<
  typeof SubscriptionManagementFormSchema
>;

//Complaint management form schema--------------------------------------------------------------------------------
export const complaintFormSchema = z.object({
  complaintID: z.string(),
  userID: z.string().min(1, 'Invalid UserID'),
  complaintCategory: z.enum(
    ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    {
      errorMap: () => ({ message: 'Please select a valid complaint category' })
    }
  ),
  description: z.string().min(1, 'Enter valid input'),
  feedback: z.string().min(1, 'Enter valid input'),
  status: z.enum(['Open', 'In-Progress', 'Resolved', 'Closed'], {
    errorMap: () => ({ message: 'Please select a valid Refund status' })
  }),
  assignedStaff: z.string().min(1, 'Enter valid input'),
  dateAndTime: z.string().min(1, 'Enter valid value')
});

export type ComplaintFormSchemaType = z.infer<typeof complaintFormSchema>;

// Hotel management form schema--------------------------------------------------------------------------------

export const serviceOptions = [
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
] as const;

export type ServiceType = (typeof serviceOptions)[number];

export const CreateHotelIdFormSchema = z.object({
  hotelImageUrl: z.string(),
  hotelImageFile: z
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
    }),
  hotelID: z.string().min(1, 'Hotel ID cannot be empty'),
  hotelName: z.string().min(1, 'Hotel Name cannot be empty'), // Typo: "enmtpy" -> "empty"
  address: z.string().min(1, 'Address field is required'),
  services: z.array(z.enum(serviceOptions)),
  subscriptionPlan: z.string().min(1, 'Subscription plan name is required.'),
  subscriptionPrice: z.number().min(1, 'Price is required.'),
  contactNo: z
    .string()
    .length(10, 'Contact number must be exactly 10 digits')
    .regex(/^\d+$/, 'Contact number must contain only digits'),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email address is required')
});

export type CreateHotelIdFormSchemaType = z.infer<
  typeof CreateHotelIdFormSchema
>;
