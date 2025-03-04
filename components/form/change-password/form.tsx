'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormWrapper from '@/components/form/change-password/form-wrapper'; // Adjust path as needed
import {
  changePasswordSchema,
  ChangePasswordSchemaType
} from '../../../schema'; // Adjust path as needed

export default function ChangePasswordForm() {
  // Initialize form with schema resolver
  const changePasswordForm = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  // Submit handler
  const onChangePasswordSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      // Here you would typically make an API call
      console.log('Form submitted with data:', data);
      // Add your password change logic here
      changePasswordForm.reset();
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <FormWrapper title="Change Password">
      <Form {...changePasswordForm}>
        <form
          onSubmit={changePasswordForm.handleSubmit(onChangePasswordSubmit)}
          className="lg:flex flex-col justify-center items-start space-y-6 bg-[#FAF6EF] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] border-none outline-none rounded-md"
        >
          <div className="flex justify-between items-center w-full text-sm">
            {/* Old Password Field */}
            <FormField
              control={changePasswordForm.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Old Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Current Password"
                      className="bg-transparent text-black border-black border-opacity-20 placeholder:text-black placeholder:text-xs placeholder:opacity-25"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              control={changePasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="New Password"
                      className="bg-transparent text-black border-black border-opacity-20 placeholder:text-black placeholder:text-xs placeholder:opacity-25"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm New Password Field */}
            <FormField
              control={changePasswordForm.control}
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
                      className="bg-transparent text-black border-black border-opacity-20 placeholder:text-black placeholder:text-xs placeholder:opacity-25"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-[130px] text-xs text-white bg-[#A07D3D] hover:opacity-80 hover:text-black hover:border hover:border-black"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
