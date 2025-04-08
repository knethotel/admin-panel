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

interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo?: string;
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

  const form = useForm<AdminSchemaType>({
    resolver: zodResolver(mode === 'add' ? addAdminSchema : editAdminSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: mode === 'add' ? '' : undefined, // Password only in add mode
      phoneNo: '',
      roleId: '',
      status: 'Active' // Default to 'Active'
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rolesRes, adminData] = await Promise.all([
          getAllRoles(),
          adminID ? getAdminById(adminID) : Promise.resolve(null)
        ]);

        if (rolesRes.status) {
          setRoles(rolesRes.roles);
        }

        if (adminData) {
          setAdminData(adminData);
          form.reset({
            firstName: adminData.firstName || '',
            lastName: adminData.lastName || '',
            email: adminData.email || '',
            password: undefined, // Exclude password in edit mode
            phoneNo: adminData.phoneNo || '',
            roleId: adminData.roleId || '',
            status: adminData.status || 'Active'
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [adminID, form]);

  const onSubmit = async (data: AdminSchemaType) => {
    console.log('Form Data:', data);
    setLoading(true);
    try {
      if (mode === 'add') {
        await addAdmin(data);
        alert('Admin added successfully!');
        form.reset();
      } else if (mode === 'edit') {
        await editAdmin(adminID!, data);
        alert('Admin updated successfully!');
      }
    } catch (error: any) {
      console.error('Submit Error:', error);
      alert(`Error: ${error.message}`);
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
                          disabled={mode === 'view' || loading}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        <span className="text-red-500">*</span>
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
                          disabled={mode === 'view' || loading}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        <span className="text-red-500">*</span>
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
                          disabled={mode === 'view' || loading}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        <span className="text-red-500">*</span>
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
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                            disabled={loading}
                            className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                          />
                          <span className="text-red-500">*</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* Lower part */}
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[0.8rem]">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        <Input
                          type="text"
                          placeholder="Phone No"
                          {...field}
                          disabled={mode === 'view' || loading}
                          className="bg-[#F6EEE0] text-black border-none placeholder:text-black placeholder:text-xs placeholder:opacity-45 pr-10"
                        />
                        <span className="text-red-500">*</span>
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
                        disabled={loading}
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
                      <span className="text-red-500">*</span>
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
                        <span className="text-red-500">*</span>
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
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-primary" disabled={loading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default AdminForm;
