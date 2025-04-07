'use client';
import React, { useEffect, useState } from 'react';
import {
  getAllRoles,
  Role
} from '@/lib/superAdmin/api/rolesAndPermissions/getAllRoles';
import { useRouter } from 'next/navigation';
import FormWrapper from './form-wrapper';
import { adminSchema, adminSchemaType } from 'schema/company-panel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminDummyData } from 'app/static/company-panel/AdminManagement';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { addAdmin } from '@/lib/superAdmin/api/admin/addAdmin';

type Props = {
  adminID?: string;
  mode: string;
};

const AdminForm = ({ adminID, mode }: Props) => {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  //Fetch all the available roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getAllRoles();
        if (res.status) {
          setRoles(res.roles);
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Get admin details using id
  const getAdminDetails = (adminID: string | undefined) => {
    if (adminID) {
      return AdminDummyData.find((admin) => admin.adminID === adminID);
    } else {
      return null;
    }
  };
  const admin = getAdminDetails(adminID);

  // Modified: Added all schema fields (logIn, logOut, priceType) to defaultValues
  const form = useForm<adminSchemaType>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: admin?.adminDetails?.name?.split(' ')[0] || '',
      lastName: admin?.adminDetails?.name?.split(' ')[1] || '',
      email: admin?.adminDetails?.emailID || '',
      password: admin?.adminDetails.password || '',
      phoneNo: admin?.adminDetails?.mobileNo || '',
      roleId: admin?.role || '',
      status: 'Active'
    }
  });

  // Modified: Typed data parameter as adminSchemaType for better type safety
  const onSubmit = async (data: adminSchemaType) => {
    setLoading(true);
    try {
      await addAdmin(data);
      alert('Admin added successfully!');
      // redirect or reset form
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title={'Admin Profile'}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-4">
            {/* Upper part */}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        <Input
                          type="text"
                          placeholder="First Name"
                          {...field}
                          disabled={mode === 'view'}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        {mode === 'add' && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        <Input
                          type="text"
                          placeholder="Last Name"
                          {...field}
                          disabled={mode === 'view'}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        {mode === 'add' && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        <Input
                          type="email"
                          placeholder="Email ID"
                          {...field}
                          disabled={mode === 'view'}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        {mode === 'add' && (
                          <span className="text-red-500">*</span>
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
                      <div className="flex gap-1">
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          disabled={mode === 'view'}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        {mode === 'add' && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Lower part */}
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    {/* Modified: Fixed label from "Email" to "Phone Number" */}
                    <FormLabel className="text-black text-[0.8rem]">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        <Input
                          type="text"
                          placeholder="Phone No"
                          {...field}
                          disabled={mode === 'view'}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        {mode === 'add' && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Role Selection */}
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Select Role</FormLabel>
                    <div className="flex gap-1">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-40 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role._id} value={role._id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {mode === 'add' && (
                        <span className="text-red-500">*</span>
                      )}
                    </div>
                    <FormMessage />
                    <ChevronDown className="absolute right-4 top-[2.2rem] text-black w-4 h-4" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={mode === 'view'}
                        >
                          <SelectTrigger className="min-w-32 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {['Active', 'Inactive'].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {mode === 'add' && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                    <ChevronDown className="absolute right-4 top-[2.2rem] text-black w-4 h-4" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default AdminForm;
