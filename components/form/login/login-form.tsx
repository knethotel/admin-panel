'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, CircleX } from 'lucide-react';

import { setSessionStorageItem } from 'utils/localstorage';
import apiCall from '@/lib/axios';
import { loginSchema,  loginSchemaType} from 'schema';
import { 
  Form, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage, 
  FormField 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CardWrapper from './card-wrapper';
import LoginResponse from 'types/auth';

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: loginSchemaType) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await apiCall<LoginResponse>(
        'POST', 
        'api/superAdmin/login', 
        {
          email: data.email,
          password: data.password
        }
      );

      if (response.token && response.user) {
        // Secure token storage
        setSessionStorageItem('admin', {
          token: response.token,
          user: response.user
        });

        // Set secure cookie for middleware
        document.cookie = `token=${response.token}; path=/; SameSite=Strict; Secure`;

        // Determine redirect based on user role/scope
        const redirectPath = determineRedirectPath(response.user);
        router.push(redirectPath);
      } else {
        throw new Error('Invalid login credentials');
      }
    } catch (error: any) {
      setLoginError(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine redirect path based on user role/scope
  const determineRedirectPath = (user: LoginResponse['user']) => {
    switch (user.scope) {
      case 'Super Admin':
        return '/super-admin/dashboard';
      case 'Hotel':
        return '/hotel-panel/dashboard';
      default:
        return '/dashboard';
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const clearEmail = () => {
    form.setValue('email', '');
  };

  return (
    <div className="form-background overflow-hidden flex flex-col justify-center items-center w-[90%] h-[60vh] md:w-[90vw] md:h-[70vh] lg:w-[80%] lg:h-[85%] px-4 rounded-xl md:min-w-[300px] lg:min-w-[350px]">
      <CardWrapper
        title="Sign in"
        label="Please enter your email and password to sign in."
        incorrectPasswordMessage={loginError}
      >
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 text-black"
          >
            <div className="space-y-4">
              {/* Email Field */}
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
                          className="bg-transparent text-black border-black border-opacity-20 placeholder:text-black placeholder:text-xs 2xl:text-sm placeholder:opacity-25 pr-10"
                        />
                        {field.value && (
                          <button
                            type="button"
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

              {/* Password Field */}
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
                          className="bg-transparent text-black border-black border-opacity-20 placeholder:text-black placeholder:text-xs 2xl:text-sm placeholder:opacity-25 pr-10"
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

              {/* Remember Me and Forgot Password */}
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
                          className="text-xs 2xl:text-sm text-nowrap ml-2 text-black"
                        >
                          Remember me
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href="/auth/resetpassword"
                  className="text-xs 2xl:text-sm text-black hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full btn-primary" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;