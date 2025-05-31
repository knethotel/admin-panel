'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { apiCall } from '@/lib/axios';
import { ToastAtTopRight } from '@/lib/sweetalert';
import {
  SpaManageProductsModalFormSchema,
  SpaManageProductsModalFormSchemaType
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
import { ArrowDown, ChevronDown, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageProducts: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  // Separate state for each image preview
  const [productPreview, setProductPreview] = useState<string | null>(null);
  const [additionalServicePreview, setAdditionalServicePreview] = useState<
    string | null
  >(null);

  // Cleanup for both previews
  useEffect(() => {
    return () => {
      if (productPreview) URL.revokeObjectURL(productPreview);
      if (additionalServicePreview)
        URL.revokeObjectURL(additionalServicePreview);
    };
  }, [productPreview, additionalServicePreview]);

  const form = useForm<SpaManageProductsModalFormSchemaType>({
    resolver: zodResolver(SpaManageProductsModalFormSchema),
    defaultValues: {
      productCategory: '',
      selectService: 'Spa',
      name: '',
      description: '',
      productImage: undefined,
      additionalService: '',
      additionalServicePrice: 0,
      additionalServiceImage: undefined
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SpaManageProductsModalFormSchemaType) => {
    try {
      setIsSubmitting(true);
      
      // Prepare the payload according to the API requirements
      const payload = {
        serviceType: data.selectService,
        productCategory: data.productCategory,
        productName: data.name,
        description: data.description,
        price: data.additionalServicePrice, // Assuming this is the main product price
        imageUrl: data.productImage, // This should be the uploaded image URL
        additionalServices: data.additionalService ? [
          {
            name: data.additionalService,
            price: data.additionalServicePrice
          }
        ] : []
      };

      // Make the API call
      const response = await apiCall('POST', 'api/services/spasalon/products', payload);
      
      // Show success message
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product created successfully!'
      });
      
      // Reset the form
      form.reset({
        productCategory: '',
        selectService: 'Spa',
        name: '',
        description: '',
        productImage: undefined,
        additionalService: '',
        additionalServicePrice: 0,
        additionalServiceImage: undefined
      });
      setProductPreview(null);
      setAdditionalServicePreview(null);
      
      // Close the modal
      onClose();
      
    } catch (error: any) {
      // Show error message
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Error',
        text: error?.message || 'Failed to create product. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
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
            className="flex flex-col gap-4 text-sm"
          >
            <div className="flex flex-row lg:flex-col justify-start items-start lg:items-start ml-9 gap-6 lg:gap-12">
              <FormField
                control={form.control}
                name="selectService"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 relative">
                    <FormLabel className="text-sm w-fit text-nowrap font-medium text-gray-700">
                      Select Service
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-44 bg-lightbrown text-gray-700 py-4 px-2 rounded-md border-none">
                          <SelectValue placeholder="Select type" />
                          <ChevronDown className="ml-2 mt-1 h-5 w-5 text-black" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#362913] text-nowrap rounded-2xl text-white border-2 shadow-md border-white">
                          {['Spa', 'Salon'].map((value) => (
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
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => {
                  const selectedService = form.watch('selectService');
                  const categoryOptions = selectedService === 'Spa' 
                    ? ['Massage', 'Facial', 'Body Treatment'] 
                    : ['Radiance', 'Couple Offers'];

                  return (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                        Product category
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedService}
                        >
                          <SelectTrigger className="w-64 bg-[#F6EEE0] text-gray-700 py-2 px-3 rounded-md border-none">
                            <SelectValue placeholder={
                              selectedService 
                                ? 'Select category' 
                                : 'Select a service first'
                            } />
                            <ChevronDown className="ml-2 h-4 w-4 text-black" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#362913] text-white border-2 shadow-md border-white rounded-2xl">
                            {categoryOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="text-nowrap hover:bg-[#4a3a21]"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            {/* Line */}
            <div className="w-full h-[1px] bg-black opacity-20 mt-4" />
            {/* Lower part of the form */}
            <div className="flex justify-between items-start px-10">
              <div className="w-[60%] flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    const selectedCategory = form.watch('productCategory');
                    
                    // Define product options based on category
                    const productOptions: Record<string, string[]> = {
                      'Massage': [
                        'Swedish massage',
                        'Deep-tissue massage',
                        'Aromatherapy massage',
                        'Hot stone massage',
                        'Thai massage'
                      ],
                      'Facial': [
                        'Hydrating facial',
                        'Anti-aging facial',
                        'Acne treatment facial'
                      ],
                      'Body Treatment': [
                        'Body scrub & Exfoliation',
                        'Detoxifying body wrap',
                        'Herbal stem therapy'
                      ],
                      'Radiance': [
                        'Manicure & pedicure',
                        'Hair spa & styling',
                        'Waxing & threading'
                      ],
                      'Couple Offers': [
                        'Couple spa',
                        'Full-day spa retreat',
                        'Customized package'
                      ]
                    };

                    const currentOptions = productOptions[selectedCategory] || [];

                    return (
                      <FormItem className="flex items-center gap-4">
                        <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!selectedCategory}
                          >
                            <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 py-2 px-3 rounded-md border-none">
                              <SelectValue placeholder={
                                selectedCategory 
                                  ? `Select ${selectedCategory.toLowerCase()} product` 
                                  : 'Select a category first'
                              } />
                              <ChevronDown className="ml-2 h-4 w-4 text-black" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#362913] text-white border-2 shadow-md border-white rounded-2xl">
                              {currentOptions.map((option) => (
                                <SelectItem
                                  key={option}
                                  value={option}
                                  className="text-nowrap hover:bg-[#4a3a21]"
                                >
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Product Description"
                          {...field}
                          className="bg-[#F6EEE0] w-full text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm resize-y min-h-[100px]"
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
                              if (!file.type.startsWith('image/')) {
                                alert('Please upload an image file.');
                                return;
                              }
                              if (file.size > 5 * 1024 * 1024) {
                                alert('File size exceeds 5MB.');
                                return;
                              }
                              if (productPreview)
                                URL.revokeObjectURL(productPreview);
                              const imageUrl = URL.createObjectURL(file);
                              setProductPreview(imageUrl);
                              field.onChange(file);
                            }
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <div className="h-full w-full flex items-center justify-center relative">
                            {productPreview ? (
                              <>
                                <img
                                  src={productPreview}
                                  alt="Product preview"
                                  className="h-full w-full object-cover rounded-lg"
                                />
                                {/* Overlay to make the image clickable for reupload */}
                                <label
                                  htmlFor="productImageUpload"
                                  className="absolute inset-0 flex justify-center items-center cursor-pointer bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity rounded-lg"
                                  aria-label="Reupload product image"
                                >
                                  <PiCameraThin className="text-white w-12 h-12 opacity-70" />
                                </label>
                              </>
                            ) : (
                              <label
                                htmlFor="productImageUpload"
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
                                if (productPreview)
                                  URL.revokeObjectURL(productPreview);
                                const imageUrl = URL.createObjectURL(file);
                                setProductPreview(imageUrl);
                                field.onChange(file);
                              } else {
                                setProductPreview(null);
                                field.onChange(undefined);
                              }
                            }}
                            className="hidden"
                            id="productImageUpload"
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
            <div className="flex justify-between items-start px-10">
              <div className="w-[60%] flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="additionalService"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                        Additional Service
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Service Name"
                          {...field}
                          className="bg-[#F6EEE0] w-full text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additionalServicePrice"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-sm w-40 text-nowrap font-medium text-gray-700">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Price(₹)"
                          {...field}
                          className="bg-[#F6EEE0] w-40 text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-sm"
                        />
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
                  router.push('/hotel-panel/service-management/spa/products');
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
