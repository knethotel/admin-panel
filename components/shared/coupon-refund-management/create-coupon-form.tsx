'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormWrapper from './form-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { PiCameraThin } from 'react-icons/pi';
import apiCall from '@/lib/axios';
import { ToastAtTopRight } from '@/lib/sweetalert';

interface CreateCouponFormProps {
  mode?: 'create' | 'view' | 'edit';
  couponId?: string;
}

const defaultValues = {
  category: 'Percentage Coupons',
  validityFrom: '',
  validityTo: '',
  usageLimit: '',
  discountPercentage: '',
  discountAmount: 0,
  minimumSpent: '',
  couponStatus: 'active',
  createCode: '',
  termsAndConditions: '',
  couponImage: undefined as File | undefined,
};

const CreateCouponForm: React.FC<CreateCouponFormProps> = ({ mode = 'create', couponId }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const router = useRouter();
  const form = useForm({ defaultValues });
  const selectedCouponCategory = form.watch('category');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Fetch coupon data for edit mode
  useEffect(() => {
    if (isEditMode && couponId) {
      (async () => {
        try {
          const data = await apiCall('GET', `api/coupon/${couponId}`);
          // Map API data to form fields
          form.reset({
            category: data.discountType === 'percentage' ? 'Percentage Coupons' : 'Fixed Amount Coupons',
            validityFrom: data.validFrom || '',
            validityTo: data.validUntil || '',
            usageLimit: data.usageLimit?.toString() || '',
            discountPercentage: data.discountType === 'percentage' ? data.value?.toString() : '',
            discountAmount: data.discountType === 'fixed' ? Number(data.value) : 0,
            minimumSpent: data.minimumSpend?.toString() || '',
            couponStatus: data.status?.toLowerCase() || 'active',
            createCode: data.code || '',
            termsAndConditions: data.termsAndConditions || '',
            couponImage: undefined,
          });
        } catch (error) {
          ToastAtTopRight.fire('Failed to fetch coupon data', 'error');
        }
      })();
    }
    // eslint-disable-next-line
  }, [isEditMode, couponId]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const payload = {
        code: data.createCode,
        discountType: data.category === 'Percentage Coupons' ? 'percentage' : 'fixed',
        value: data.category === 'Percentage Coupons' ? data.discountPercentage : String(data.discountAmount),
        minimumSpend: Number(data.minimumSpent),
        validFrom: data.validityFrom,
        validUntil: data.validityTo,
        usageLimit: Number(data.usageLimit),
        perUserLimit: 1,
        stockable: false,
        imageUrl: '',
        termsAndConditions: data.termsAndConditions,
        status: data.couponStatus,
      };
      if (isEditMode && couponId) {
        await apiCall('PUT', `api/coupon/${couponId}`, payload);
        ToastAtTopRight.fire('Coupon updated successfully!', 'success');
      } else {
        await apiCall('POST', 'api/coupon', payload);
        ToastAtTopRight.fire('Coupon created successfully!', 'success');
      }
      form.reset();
      setPreview(null);
      router.back();
    } catch (error: any) {
      ToastAtTopRight.fire(error?.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full relative h-full max-w-4xl mx-auto rounded-lg"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left Side */}
            <div className="flex flex-col gap-3">
              {/* Category */}
              <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 shrink-0">
                  Select Category
                </FormLabel>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 py-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="">
                            {['Percentage Coupons', 'Fixed Amount Coupons'].map(
                              (value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px] text-xs mt-1" />
                      </>
                    )}
                  />
                </div>
              </FormItem>

              {/* Validity */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 shrink-0">
                    Validity
                  </FormLabel>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <FormField
                      control={form.control}
                      name="validityFrom"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Input
                                  type="text"
                                  disabled={isViewMode}
                                  value={field.value}
                                  placeholder="From (YYYY-MM-DD)"
                                  className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 cursor-pointer text-xs 2xl:text-sm"
                                  readOnly
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value ? new Date(field.value) : undefined}
                                  onSelect={(date) =>
                                    field.onChange(date?.toISOString().split('T')[0])
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage className="text-[10px] text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="validityTo"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Input
                                  type="text"
                                  disabled={isViewMode}
                                  value={field.value}
                                  placeholder="To (YYYY-MM-DD)"
                                  className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 cursor-pointer text-xs 2xl:text-sm"
                                  readOnly
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value ? new Date(field.value) : undefined}
                                  onSelect={(date) =>
                                    field.onChange(date?.toISOString().split('T')[0])
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage className="text-[10px] text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Limits */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 shrink-0">
                        Usage Limit
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            disabled={isViewMode}
                            {...field}
                            className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] text-xs mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                {selectedCouponCategory === 'Percentage Coupons' && (
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 shrink-0">
                          Discount (%)
                        </FormLabel>
                        <div className="w-full">
                          <FormControl>
                            <Input
                              type="text"
                              disabled={isViewMode}
                              {...field}
                              className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] text-xs mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                )}
                {selectedCouponCategory === 'Fixed Amount Coupons' && (
                  <FormField
                    control={form.control}
                    name="discountAmount"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 shrink-0">
                          Discount in Amount
                        </FormLabel>
                        <div className="w-full">
                          <FormControl>
                            <Input
                              type="number"
                              disabled={isViewMode}
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] text-xs mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="minimumSpent"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 shrink-0">
                        Minimum Spent
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            disabled={isViewMode}
                            {...field}
                            className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] text-xs mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Coupon Status */}
              <FormField
                control={form.control}
                name="couponStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2">
                    <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 pt-1 shrink-0">
                      Coupon Status
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {['active', 'expired', 'disabled'].map((value) => (
                            <div key={value} className="flex items-center space-x-2">
                              <RadioGroupItem value={value} id={value} />
                              <label htmlFor={value} className="text-xs 2xl:text-sm text-gray-700 capitalize">
                                {value}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-[10px] text-xs mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-center md:items-start space-y-8">
              {/* Create Code */}
              <FormField
                control={form.control}
                name="createCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 shrink-0">
                      Create Code
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          disabled={isViewMode}
                          {...field}
                          className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] text-xs mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              {/* Coupon Image (optional, not sent to API) */}
              <FormField
                control={form.control}
                name="couponImage"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 shrink-0">
                      Coupon Image
                    </FormLabel>
                    <div className="flex items-center w-full">
                      <FormControl>
                        <div
                          className="relative h-36 w-36 2xl:h-40 2xl:w-40 rounded-lg bg-[#F6EEE0]"
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              if (!file.type.startsWith('image/')) {
                                alert('Please upload an image file.');
                                return;
                              }
                              if (file.size > 5 * 1024 * 1024) {
                                alert('File size exceeds 5MB.');
                                return;
                              }
                              if (preview) URL.revokeObjectURL(preview);
                              const imageUrl = URL.createObjectURL(file);
                              setPreview(imageUrl);
                              field.onChange(file);
                            }
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <div className="h-full w-full flex items-center justify-center relative">
                            {preview ? (
                              <>
                                <img
                                  src={preview}
                                  alt="Coupon preview"
                                  className="h-full w-full object-cover rounded-lg"
                                />
                                {/* Overlay to make the image clickable for reupload */}
                                <label
                                  htmlFor="fileUpload"
                                  className="absolute inset-0 flex justify-center items-center cursor-pointer bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity rounded-lg"
                                  aria-label="Reupload coupon image"
                                >
                                  <PiCameraThin className="text-white w-12 h-12 opacity-70" />
                                </label>
                              </>
                            ) : (
                              <label
                                htmlFor="fileUpload"
                                className="absolute inset-0 flex justify-center items-center cursor-pointer"
                                aria-label="Upload coupon image"
                              >
                                <PiCameraThin className="text-black w-12 h-44 opacity-30" />
                              </label>
                            )}
                          </div>
                          <input
                            type="file"
                            disabled={isViewMode}
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (!file.type.startsWith('image/')) {
                                  alert('Please upload an image file.');
                                  return;
                                }
                                if (file.size > 5 * 1024 * 1024) {
                                  alert('File size exceeds 5MB.');
                                  return;
                                }
                                if (preview) URL.revokeObjectURL(preview);
                                const imageUrl = URL.createObjectURL(file);
                                setPreview(imageUrl);
                                field.onChange(file);
                              } else {
                                setPreview(null);
                                field.onChange(undefined);
                              }
                            }}
                            className="hidden"
                            id="fileUpload"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="termsAndConditions"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2">
                    <FormLabel className="w-full sm:w-36 2xl:w-40 text-xs 2xl:text-sm font-medium text-gray-700 pt-1 shrink-0">
                      Terms and Conditions
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-64 h-32 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 resize-y text-xs 2xl:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] text-xs mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex gap-4 w-full justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="btn-secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? (isEditMode ? 'Saving...' : 'Creating...') : isEditMode ? 'Save' : 'Create'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default CreateCouponForm;
