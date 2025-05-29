'use client';
import React, { useEffect, useState } from 'react';
import {
  getAllRoles,
  Role
} from '@/lib/superAdmin/api/rolesAndPermissions/getAllRoles';
import { useRouter } from 'next/navigation';
import FormWrapper from './form-wrapper';
import {
  addAdminSchema,
  editAdminSchema,
  AdminSchemaType
} from 'schema/company-panel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { getAdminById } from '@/lib/superAdmin/api/admin/getAdmins';
import { editAdmin } from '@/lib/superAdmin/api/admin/editAdmin';
import { ToastAtTopRight } from '@/lib/sweetalert';
import apiCall from '@/lib/axios';

interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  roleId: string;
  status: string;
  [key: string]: any;
}

type Props = {
  adminID?: string;
  mode: string;
};

const AdminForm = ({ adminID, mode }: Props) => {
  const router = useRouter();
  const [admin, setAdminData] = useState<Admin | undefined>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<any>(null);

  const form = useForm<AdminSchemaType>({
    resolver: zodResolver(mode === 'add' ? addAdminSchema : editAdminSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: mode === 'add' ? '' : undefined, // Password only in add mode
      mobileNumber: '',
      roleId: '',
      status: 'Active' // Default to 'Active'
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [rolesRes, employeeData] = await Promise.all([
        getAllRoles(),
        adminID ? apiCall('GET', `api/employee/${adminID}`) : Promise.resolve(null)
      ]);
      if (rolesRes.status) setRoles(rolesRes.roles);
      if (employeeData && employeeData.employee) setEmployee(employeeData.employee);
      setLoading(false);
    };
    fetchData();
  }, [adminID, form, mode]);

  // Reset form only after both roles and employee are loaded
  useEffect(() => {
    if (roles.length && employee) {
      form.reset({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        password: undefined,
        mobileNumber: employee.mobileNumber || '',
        roleId: employee.roleId?._id || '', // This should match the SelectItem value
        status: employee.status || 'Active'
      });
    }
  }, [roles, employee, form]);

  const onSubmit = async (data: AdminSchemaType) => {
    console.log('Form Data:', data);
    setLoading(true);
    try {
      if (mode === 'add') {
        await addAdmin(data);
        ToastAtTopRight.fire('Admin added successfully!', 'success');
        router.push('/super-admin/admin-management');
      } else if (mode === 'edit') {
        await editAdmin(adminID!, data);
        ToastAtTopRight.fire('Admin updated successfully!', 'success');
        router.push('/super-admin/admin-management');
      }
    } catch (error: any) {
      console.error('Submit Error:', error);
      ToastAtTopRight.fire(error.message || 'Something went wrong', 'error');
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black text-[0.8rem]">
                    First Name
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input
                        type="text"
                        placeholder="First Name"
                        {...field}
                        disabled={mode === 'view' || loading}
                        className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs 2xl:text-sm placeholder:opacity-45 pr-10"
                      />
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
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input
                        type="text"
                        placeholder="Last Name"
                        {...field}
                        disabled={mode === 'view' || loading}
                        className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs 2xl:text-sm placeholder:opacity-45 pr-10"
                      />
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
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input
                        type="email"
                        placeholder="Email ID"
                        {...field}
                        disabled={mode === 'view' || loading}
                        className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs 2xl:text-sm placeholder:opacity-45 pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === 'add' && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Password
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          disabled={loading}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs 2xl:text-sm placeholder:opacity-45 pr-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black text-[0.8rem]">
                    Phone Number
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input
                        type="text"
                        placeholder="Phone No"
                        {...field}
                        disabled={mode === 'view' || loading}
                        className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs 2xl:text-sm placeholder:opacity-45 pr-10"
                      />
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
                  <FormLabel>
                    Select Role <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <div className="flex gap-1">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={mode === 'view' || loading}
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
                  <FormLabel>
                    Status <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={mode === 'view' || loading}
                      >
                        <SelectTrigger className="min-w-32 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Active', 'Inactive'].map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                  <ChevronDown className="absolute right-4 top-[2.2rem] text-black w-4 h-4" />
                </FormItem>
              )}
            />
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-primary" disabled={mode === 'view' || loading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default AdminForm;
