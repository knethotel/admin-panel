'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddItemModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const addItemForm = useForm<AddItemsSchemaType>({
    resolver: zodResolver(AddItemsSchema),
    defaultValues: {
      newProductType: '',
      productName: '',
      description: '',
      cost: 0,
      type: 'Vegetarian',
      visibility: false,
      itemImage: undefined
    }
  });

  const onSubmit = (data: AddItemsSchemaType) => {
    console.log('Submitted Data:', data);
    addItemForm.reset();
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
                name="newProductType"
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
                    <FormMessage className="mt-1 text-xs ml-56" />
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
                      <FormMessage className="mt-1 text-xs ml-40" />
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
                      <FormMessage className="mt-1 text-xs ml-40" />
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
                      <FormMessage className="mt-1 text-xs ml-40" />
                    </FormItem>
                  )}
                />

                {/* Type */}
                <FormField
                  control={addItemForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-start gap-4">
                        <FormLabel className="w-32 text-xs font-medium text-gray-700 pt-1">
                          Type
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {['Vegetarian', 'Non-Vegetarian'].map((value) => (
                              <div
                                key={value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem value={value} id={value} />
                                <label
                                  htmlFor={value}
                                  className="text-xs text-gray-700 capitalize"
                                >
                                  {value}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <FormMessage className="mt-1 text-xs ml-32" />
                    </FormItem>
                  )}
                />

                {/* Visibility */}
                <div className="flex gap-14">
                  <label>Visibility</label>
                  <ToggleButton />
                </div>
              </div>

              {/* Product Image Upload */}
              <div className="w-[30%] pt-7">
                <FormField
                  control={addItemForm.control}
                  name="itemImage"
                  render={({ field }) => (
                    <FormItem className="w-44 flex flex-col">
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            placeholder=""
                            value={field.value?.name || ''}
                            readOnly
                            className="h-44 rounded-lg text-gray-700 bg-[#F6EEE0] p-2 border-none outline-none focus:ring-0 text-sm cursor-default"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                            className="hidden"
                            id="fileUpload"
                          />
                          <label
                            htmlFor="fileUpload"
                            className="absolute inset-0 right-2 rounded-lg h-24 top-1/2 -translate-y-1/2 bg-[#F6EEE0] w-full px-3 py-1 cursor-pointer"
                          >
                            <PiCameraThin className="text-black w-full h-full opacity-30" />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage className="mt-1 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full h-[1px] bg-black opacity-15" />
            {/* Submit Button */}
            <div className="flex items-center gap-4 px-10">
              <Button
                type="button" // Changed to button to prevent form submission
                onClick={onClose}
                className="bg-[#EFE9DF] text-black px-6 h-9 rounded-md hover:text-black hover:outline transition"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#A07D3D] px-8 h-9 w-24 text-white p-2 rounded-md hover:text-black hover:outline transition"
              >
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
