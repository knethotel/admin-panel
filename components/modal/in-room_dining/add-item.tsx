'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddItemsSchema, AddItemsSchemaType } from 'schema';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X } from 'lucide-react';
import ToggleButton from '@/components/ui/toggleButton';
import apiCall from '@/lib/axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddItemModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const addItemForm = useForm<AddItemsSchemaType>({
    resolver: zodResolver(AddItemsSchema),
    defaultValues: {
      productType: '',
      productName: '',
      description: '',
      cost: 0,
      foodType: 'vegetarian',
      visibility: false,
      itemImage: undefined
    }
  });

  const onSubmit = async (data: AddItemsSchemaType) => {
    try {
      const payload = {
        productType: data.productType,
        productName: data.productName,
        description: data.description,
        cost: data.cost,
        foodType: data.foodType,
        visibility: data.visibility,
        HotelId: localStorage.getItem('hotelId') || '',
        image: data.itemImage || null // optional image
      };

      const response = await apiCall('POST', '/api/services/inroomdining/products', payload);

      if (response?.success) {
        alert('✅ Product added successfully!');
        addItemForm.reset();
        setPreview(null);
        onClose();
      } else {
        alert(`❌ Failed: ${response?.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('❌ Network or server error.');
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

        <Form {...addItemForm}>
          <form
            onSubmit={addItemForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 text-sm"
          >
            {/* Upper part of the form */}
            <div className="flex w-full md:w-[80%] lg:w-[75%] 2xl:w-[70%] gap-6 px-10">
              <FormField
                control={addItemForm.control}
                name="productType"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start">
                    <div className="flex items-center gap-4">
                      <FormLabel className="w-56">New Product Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product type"
                          {...field}
                          className="bg-[#F6EEE0] w-64 h-8 text-gray-700 placeholder:opacity-55 rounded-lg border-none outline-none focus:ring-0 text-sm"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="mt-1 text-xs 2xl:text-sm ml-56" />
                  </FormItem>
                )}
              />
            </div>
            {/* Line */}
            <div className="w-full h-[1px] bg-black opacity-20" />
            {/* Lower part of the form */}
            <div className="flex justify-between items-start px-10">
              <div className="w-[60%] flex flex-col gap-6">
                {/* Product name */}
                <FormField
                  control={addItemForm.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center gap-4">
                        <FormLabel className="text-sm w-40 font-medium text-gray-700">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Product Name"
                            {...field}
                            className="bg-[#F6EEE0] w-64 text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="mt-1 text-xs 2xl:text-sm ml-40" />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={addItemForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center gap-4">
                        <FormLabel className="text-sm w-40 font-medium text-gray-700">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Description"
                            {...field}
                            className="bg-[#F6EEE0] w-64 text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="mt-1 text-xs 2xl:text-sm ml-40" />
                    </FormItem>
                  )}
                />

                {/* Cost */}
                <FormField
                  control={addItemForm.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center gap-4">
                        <FormLabel className="text-sm w-40 font-medium text-gray-700">
                          Cost
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Cost"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            className="bg-[#F6EEE0] w-64 text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="mt-1 text-xs 2xl:text-sm ml-40" />
                    </FormItem>
                  )}
                />

                {/* Type */}
                <FormField
                  control={addItemForm.control}
                  name="foodType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-start gap-4">
                        <FormLabel className="w-32 text-xs 2xl:text-sm font-medium text-gray-700 pt-1">
                          Type
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {['vegetarian', 'nonvegetarian'].map((val) => (
                              <div key={val} className="flex items-center space-x-2">
                                <RadioGroupItem value={val} id={val} />
                                <label
                                  htmlFor={val}
                                  className="text-xs 2xl:text-sm text-gray-700 capitalize"
                                >
                                  {val === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
                                </label>
                              </div>
                            ))}

                          </RadioGroup>
                        </FormControl>
                      </div>
                      <FormMessage className="mt-1 text-xs 2xl:text-sm ml-32" />
                    </FormItem>
                  )}
                />


                {/* Visibility */}
                {/* <div className="flex gap-[87px]">
                  <span>Visibility</span>
                  <ToggleButton />
                </div> */}
                <FormField
                  control={addItemForm.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-[87px]">
                      <FormLabel>Visibility</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => field.onChange(true)}
                            className={`px-4 py-1 rounded-md text-sm font-medium border 
              ${field.value ? 'bg-green-500 text-white border-green-500' : 'bg-[#F6EEE0] text-gray-700 border-gray-300'}`}
                          >
                            ON
                          </button>
                          <button
                            type="button"
                            onClick={() => field.onChange(false)}
                            className={`px-4 py-1 rounded-md text-sm font-medium border 
              ${!field.value ? 'bg-red-500 text-white border-red-500' : 'bg-[#F6EEE0] text-gray-700 border-gray-300'}`}
                          >
                            OFF
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

              </div>

              {/* Product Image Upload */}
              <div className="w-[30%] pt-7">
                <FormField
                  control={addItemForm.control}
                  name="itemImage"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center w-full">
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
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
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
              </div>
            </div>
            <div className="w-full h-[1px] bg-black opacity-15" />
            {/* Submit Button */}
            <div className="flex items-center gap-4 px-10">
              <Button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </Button>
              <Button type="submit" className="btn-primary">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddItemModal;
