'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PriceTimeSettingSchema, PriceTimeSettingSchemaType } from 'schema';
import exchageIcon from '../../public/assets/exchange.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriceTimeSetting: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const priceTimeSettingForm = useForm<PriceTimeSettingSchemaType>({
    resolver: zodResolver(PriceTimeSettingSchema),
    defaultValues: {
      priceType: 'Free',
      price: 0,
      timeSlot: '5:00AM-12:00PM',
      availability: 'Monday-Friday'
    }
  });

  // Watch the value of priceType
  const priceType = priceTimeSettingForm.watch('priceType');
  if (!isOpen) return null;

  const onSubmit = async (data: PriceTimeSettingSchemaType) => {
    try {
      console.log('Price settings submitted:', data);
      priceTimeSettingForm.reset();
      onClose();
    } catch (error) {
      console.error('Error setting price:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg flex flex-col gap-6 p-6 w-full max-w-md relative animate-fadeIn">
        <div>
          <h5 className="font-medium absolute top-2 left-2">Settings</h5>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            ✖
          </button>
          <p className="absolute top-8 left-2 opacity-50 text-sm">
            Edit time or price according to availability
          </p>
        </div>
        <Form {...priceTimeSettingForm}>
          <form
            onSubmit={priceTimeSettingForm.handleSubmit(onSubmit)}
            className="pt-10 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <span className="text-sm font-semibold">Price</span>
                <div className="flex items-center gap-2">
                  <FormField
                    control={priceTimeSettingForm.control}
                    name="priceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-24 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#362913] rounded-2xl text-white border-2 shadow-md border-white">
                              {['Free', 'Paid'].map((value) => (
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
                  <span
                    onClick={() => {
                      const currentType =
                        priceTimeSettingForm.getValues('priceType');
                      const newType = currentType === 'Free' ? 'Paid' : 'Free';
                      priceTimeSettingForm.setValue('priceType', newType);
                    }}
                    className="cursor-pointer"
                  >
                    <Image
                      src={exchageIcon}
                      alt="icon"
                      height={20}
                      width={20}
                    />
                  </span>
                </div>
              </div>

              {/* Conditionally render the Amount field */}
              {priceType === 'Paid' && (
                <div className="flex gap-4 items-center justify-center">
                  <span className="text-sm pb-6 font-semibold">Amount</span>
                  <FormField
                    control={priceTimeSettingForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Amount"
                            {...field}
                            className="w-32 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none"
                          />
                        </FormControl>
                        <div className="h-4">
                          <FormMessage className="text-[10px] text-red-500" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="flex pt-6 justify-between items-center">
              <FormField
                control={priceTimeSettingForm.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2">
                    <div className="w-full">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {[
                            '5:00AM-12:00PM',
                            '12:00PM-10:00PM',
                            '10:00PM-1:00AM',
                            '11:00PM-12:00AM'
                          ].map((value) => (
                            <div
                              key={value}
                              className="flex items-center space-x-3"
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
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={priceTimeSettingForm.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row gap-2">
                    <div className="w-full">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {[
                            'Monday-Friday',
                            'Monday-Saturday',
                            'Monday-Sunday',
                            'Only Weekends'
                          ].map((value) => (
                            <div
                              key={value}
                              className="flex items-center space-x-3"
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
                      <FormMessage className="text-[10px] mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full text-center">
              <Button
                type="submit"
                className="btn-primary text-xs xl:text-sm mt-6"
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

export default PriceTimeSetting;
