import { StaticImageData } from 'next/image';
import { z } from 'zod';
export const CreateHotelIdFormSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE'], {
    errorMap: () => ({ message: 'Enter valid status' })
  }),
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
  hotelName: z.string().min(1, 'Hotel Name cannot be enmtpy'),
  address: z.string().min(1, 'Address field is required'),
  services: z.enum(
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
      errorMap: () => ({ message: 'Please select a valid service.' })
    }
  ),
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
