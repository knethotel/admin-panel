'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  ConciergeManageProductsModalFormSchema,
  ConciergeManageProductsModalFormSchemaType
} from 'schema';
import { PiCameraThin } from 'react-icons/pi';
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageProducts: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const form = useForm<ConciergeManageProductsModalFormSchemaType>({
    resolver: zodResolver(ConciergeManageProductsModalFormSchema),
    defaultValues: {
      productCategory: '',
      selectService: 'Nearby Attractions',
      name: '',
      description: '',
      productImage: undefined
    }
  });
  const onSubmit = (data: ConciergeManageProductsModalFormSchemaType) => {
    console.log('Submitted Data:', data);
    form.reset();
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
            className="flex flex-col gap-4 text-sm"
          >
            <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-start lg:items-center ml-9">
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                      Product category
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Description"
                        {...field}
                        className="bg-[#F6EEE0] w-64 text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="selectService"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="text-sm w-fit text-nowrap font-medium text-gray-700">
                      Select Service
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-56 bg-lightbrown text-gray-700 py-4 px-2 rounded-md border-none">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#362913] text-nowrap rounded-2xl text-white border-2 shadow-md border-white">
                          {[
                            'Nearby Attractions',
                            'Nearby Cafe & Restaurants'
                          ].map((value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="text-nowrap"
                            >
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
            </div>
            {/* Line */}
            <div className="w-full h-[1px] bg-black opacity-20 mt-4" />
            {/* Lower part of the form */}
            <div className="flex justify-between items-start px-10">
              <div className="w-[60%] flex flex-col gap-6">
                {/* Product Category */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Product Name"
                          {...field}
                          className="bg-[#F6EEE0] w-64 text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                        Descripton
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Product Description"
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
                      <FormControl>
                        <div
                          className="relative h-44 w-44 rounded-lg bg-[#F6EEE0]"
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              field.onChange(file);
                              if (preview) URL.revokeObjectURL(preview);
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <div className="h-full w-full flex items-center justify-center">
                            {preview && (
                              <img
                                src={preview}
                                alt="Product preview"
                                className="h-full w-full object-cover rounded-lg"
                              />
                            )}
                          </div>
                          {!preview && (
                            <label
                              htmlFor="fileUpload"
                              className="absolute inset-0 flex justify-center items-center cursor-pointer"
                              aria-label="Upload product image"
                            >
                              <PiCameraThin className="text-black w-12 h-44 opacity-30" />
                            </label>
                          )}
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
                              } else {
                                setPreview(null);
                              }
                              field.onChange(file);
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
                  router.push('/service-management/conciergeservice/products');
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

export default ManageProducts;
