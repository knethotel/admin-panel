'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { PiCameraThin } from 'react-icons/pi';
import {
  laundryCategories,
  laundryItems,
  toiletriesCategories,
  toiletriesItems
} from 'app/static/services-management/Housekeeping';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ToastAtTopRight } from '@/lib/sweetalert';
import apiCall from '@/lib/axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// create here type for the form
type FormData = {
  selectService: string;
  productCategory: string;
  productName: string;
  productPrice: number;
  productImage: File | null;
};

const AddItemModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      selectService: 'Laundry',
      productCategory: '',
      productName: '',
      productImage: undefined,
      productPrice: 0
    }
  });

  const selectedService = form.watch('selectService');
  const selectedCategory = form.watch('productCategory');

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      serviceType: data.selectService, // 'Laundry' or 'Toiletries'
      category: data.productCategory, // 'Men', 'Women' etc.
      name: data.productName, // 'shirt', 'soap' etc.
      price: Number(data.productPrice) // number
    };

    try {
      await apiCall('POST', 'api/services/housekeeping/items', payload);
      ToastAtTopRight.fire('Service item added successfully', 'success');
      form.reset();
      setPreview(null);
      onClose();
    } catch (err: any) {
      ToastAtTopRight.fire(err?.message || 'Failed to save', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-[#FAF6EF] rounded-lg shadow-lg pt-4 pb-8 w-full max-w-5xl relative animate-fadeIn">
        <X
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-black"
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 text-sm"
          >
            <div className="w-full h-[1px] bg-black opacity-20 mt-12" />

            <div className="flex justify-between items-start px-10">
              <div className="w-[60%] flex flex-col gap-6">
                {/* Select Service */}
                <FormField
                  control={form.control}
                  name="selectService"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-1">
                      <FormLabel className="text-sm w-[129px] text-nowrap font-medium text-gray-700">
                        Select Service
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-64 bg-lightbrown text-gray-700 p-2 rounded-md border-none">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#362913] rounded-2xl text-white border-2 shadow-md border-white">
                            {['Laundry', 'Toiletries'].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Category */}
                <FormField
                  control={form.control}
                  name="productCategory"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 font-medium text-gray-700">
                        Product Category
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-64 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#362913] rounded-2xl text-white border-2 shadow-md border-white">
                            {(selectedService === 'Laundry'
                              ? laundryCategories
                              : toiletriesCategories
                            ).map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 font-medium text-gray-700">
                        Product Name
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-64 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                            <SelectValue placeholder="Select Item" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#362913] rounded-2xl text-white border-2 shadow-md border-white">
                            {(selectedService === 'Laundry'
                              ? laundryItems[selectedCategory] || []
                              : toiletriesItems[selectedCategory] || []
                            ).map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productPrice"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="INR 100/-"
                          {...field}
                          className="bg-[#F6EEE0] w-64 text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Product Image Upload */}
              <div className="w-[30%]">
                <FormField
                  control={form.control}
                  name="productImage"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-sm w-40 font-medium text-gray-700">
                        Product image
                      </FormLabel>
                      <FormControl>
                        <div
                          className="relative h-44 w-44 rounded-lg bg-[#F6EEE0]"
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
                                  alt="Product preview"
                                  className="h-full w-full object-cover rounded-lg"
                                />
                                {/* Overlay to make the image clickable for reupload */}
                                <label
                                  htmlFor="fileUpload"
                                  className="absolute inset-0 flex justify-center items-center cursor-pointer bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity rounded-lg"
                                  aria-label="Reupload product image"
                                >
                                  <PiCameraThin className="text-white w-12 h-12 opacity-70" />
                                </label>
                              </>
                            ) : (
                              <label
                                htmlFor="fileUpload"
                                className="absolute inset-0 flex justify-center items-center cursor-pointer"
                                aria-label="Upload product image"
                              >
                                <PiCameraThin className="text-black w-12 h-44 opacity-30" />
                              </label>
                            )}
                          </div>
                          <input
                            type="file"
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
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-black opacity-15" />

            {/* Submit Button */}
            <div className="flex items-center gap-4 px-10">
              <Button type="submit" className="btn-primary">
                Save
              </Button>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(
                    '/hotel-panel/service-management/housekeeping/products'
                  );
                }}
                className="btn-primary"
              >
                View Products
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddItemModal;
