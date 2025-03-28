import { z } from 'zod';
// ****************************Company Panel*********************

// Admin Management Schema
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
