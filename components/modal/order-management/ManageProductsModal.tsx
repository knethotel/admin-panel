'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ManageProductsSchema, ManageProductsSchemaType } from 'schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageProductsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const manageProductsForm = useForm<ManageProductsSchemaType>({
    resolver: zodResolver(ManageProductsSchema),
    defaultValues: {
      productType: ''
    }
  });
  const onSubmit = (data: ManageProductsSchemaType) => {
    console.log('Price settings submitted:', data);
    manageProductsForm.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg flex flex-col gap-6 p-6 w-full max-w-md relative animate-fadeIn">
        <div>
          <h5 className="font-medium absolute top-2 left-2">Manage Products</h5>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            ✖
          </button>
          <p className="absolute top-8 left-2 opacity-50 text-sm">
            Add or Delete product category
          </p>
        </div>
        <Form {...manageProductsForm}>
          <form
            onSubmit={manageProductsForm.handleSubmit(onSubmit)}
            className="w-full"
          >
            <div className="flex gap-2">
              <span className="text-sm pb-6 font-semibold">Product Type</span>
              <FormField
                control={manageProductsForm.control}
                name="productType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <Input
                        type="text"
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
            <Button
              type="submit"
              className="mt-6 bg-[#8c6b33] text-white hover:bg-[#362913] px-6 h-7 rounded-lg text-xs"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ManageProductsModal;
