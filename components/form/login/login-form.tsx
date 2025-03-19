'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { loginSchema, loginSchemaType } from 'schema';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CardWrapper from './card-wrapper';
import React, { useState } from 'react';
import { Eye, EyeOff, CircleX } from 'lucide-react';

const DUMMY_CORRECT_PASSWORD = 'password123';

const LoginForm = () => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const handleOnChangePassword = (newPassword: string) => {
    if (newPassword === DUMMY_CORRECT_PASSWORD) {
      setPasswordError(null);
    }
  };

  const onSubmit = (data: loginSchemaType) => {
    if (data.password !== DUMMY_CORRECT_PASSWORD) {
      setPasswordError('Incorrect password');
      return;
    }

    setPasswordError(null);
    console.log('Login successful:', data);
    form.reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const clearEmail = () => {
    form.setValue('email', ''); // Clear the email field
  };

  return (
    <div className="form-background overflow-hidden flex flex-col justify-center items-center w-[90%] h-[60vh] md:w-[90vw] md:h-[70vh] lg:w-[80%] lg:h-[85%] px-4 rounded-xl md:min-w-[300px] lg:min-w-[350px]">
      <CardWrapper
        title="Sign in"
        label="Please enter your email and password to sign in."
        incorrectPasswordMessage={passwordError}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 text-black"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          className="bg-transparent text-black border-black border-opacity-10 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10" // Add padding-right for icon
                        />
                        {field.value && (
                          <button
                            type="button" // Prevent form submission
                            onClick={clearEmail}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            aria-label="Clear email"
                          >
                            <CircleX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleOnChangePassword(e.target.value);
                          }}
                          className="bg-transparent text-black border-black border-opacity-20 placeholder:text-black placeholder:text-xs placeholder:opacity-25 pr-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-between items-center">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex justify-center">
                      <div className="flex items-center w-full">
                        <FormControl>
                          <Input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            id="rememberMe"
                            className="h-4 w-4 bg-transparent border-black border-opacity-20"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="rememberMe"
                          className="text-xs text-nowrap ml-2 text-black"
                        >
                          Remember me
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href="/resetpassword"
                  className="text-xs text-black hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-[#A07D3D] hover:opacity-80 hover:text-black hover:border hover:border-black"
            >
              Sign in
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;
