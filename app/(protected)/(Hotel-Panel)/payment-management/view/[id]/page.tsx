'use client';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';  // For description fields
import { Button } from '@/components/ui/button';

const ViewTransaction = () => {
  const transactionData = {
    guestDetail: {
      firstName: 'MR. TIMOTHY CHALAMATE',
      lastName: '6203770138',
      guestID: '01953268',
    },
    serviceDetail: {
      name: 'CONCIERGE SERVICE',
      description: 'Description of the service',
    },
    orderDetail: {
      name: 'NEARBY RESTAURANT',
      description: 'Description of the order',
    },
    paymentDetail: {
      amount: 'INR 5672/-',
      paymentMode: 'ONLINE',
      discount: 'INR 672/-',
      couponCode: 'NEW 25',
      status: 'Paid',
    },
    refundDetail: {
      refundCode: 'RC123',
      status: 'Completed',
      refundReason: 'Service not needed',
    },
  };

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="my-24 px-6">
        <Card className="bg-[#FAF6EF] w-full shadow-custom border-none">
            <div className='flex gap-8 items-center p-4'>
                <div>
                    <h2 className="text-sm font-medium text-gray-500">Guest ID : 01953268</h2>
                </div>
                <div>
                    <h2 className="text-sm font-medium text-gray-500">Service ID - RQ17823450</h2>
                </div>
                <div>
                    <h2 className="text-sm font-medium text-gray-500">Order ID - RQ17823450</h2>
                </div>
            </div>
          <CardContent>
            <div className="space-y-4">
              {/* Guest Detail Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">GUEST DETAIL</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex gap-x-6 items-center">
                    <label className="text-black text-[0.8rem] text-nowrap">First Name</label>
                    <Input
                      value={transactionData.guestDetail.firstName}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                  <div className="flex gap-x-6 items-center">
                    <label className="text-black text-[0.8rem] text-nowrap">Last Name</label>
                    <Input
                      value={transactionData.guestDetail.lastName}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Service Detail Section */}
              <div className="space-y-2 pt-4">
                <h3 className="text-sm font-medium">SERVICE DETAIL</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex gap-x-6 items-top">
                    <label className="text-black text-[0.8rem] text-nowrap">Service Name</label>
                    <Input
                      value={transactionData.serviceDetail.name}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                  <div className="flex gap-x-6 items-top">
                    <label className="text-black text-[0.8rem] text-nowrap">Description</label>
                    <Textarea
                      value={transactionData.serviceDetail.description || 'N/A'}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Order Detail Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">ORDER DETAIL</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex gap-x-6 items-top">
                    <label className="text-black text-[0.8rem] text-nowrap">Order Name</label>
                    <Input
                      value={transactionData.orderDetail.name}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                  <div className="flex gap-x-6 items-top">
                    <label className="text-black text-[0.8rem] text-nowrap">Order Description</label>
                    <Textarea
                      value={transactionData.orderDetail.description || 'N/A'}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Detail Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">PAYMENT DETAIL</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex gap-x-6 items-center">
                    <label className="text-black text-[0.8rem] text-nowrap">Amount</label>
                    <Input
                      value={transactionData.paymentDetail.amount}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                  <div className="flex gap-x-6 items-center">
                    <label className="text-black text-[0.8rem] text-nowrap">Payment Mode</label>
                    <Input
                      value={transactionData.paymentDetail.paymentMode}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                  <div className="flex gap-x-6 items-center">
                    <label className="text-black text-[0.8rem] text-nowrap">Status</label>
                    <Input
                      value={'Paid'}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-3">
                  <div className="flex gap-x-6 items-center">
                    <label className="text-black text-[0.8rem] text-nowrap">Discount</label>
                    <Input
                      value={transactionData.paymentDetail.discount}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                  <div className="flex gap-x-6 items-center">
                    <label className="text-black text-[0.8rem] text-nowrap">Coupon Code</label>
                    <Input
                      value={transactionData.paymentDetail.couponCode}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Refund Detail Section */}
              <div className="space-y-2 pt-10">
                <h3 className="text-sm font-medium">REFUND DETAIL</h3>
                <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                  <div className="flex flex-col">
                    <label className="text-black text-[0.8rem] mb-1">Refund Code</label>
                    <Input
                      value={transactionData.refundDetail.refundCode || 'N/A'}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-[0.8rem] mb-1">Refund Status</label>
                    <Input
                      value={transactionData.refundDetail.status || 'N/A'}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-[0.8rem] mb-1">Refund Reason</label>
                    <Textarea
                      value={transactionData.refundDetail.refundReason || 'N/A'}
                      disabled
                      className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none text-xs 2xl:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewTransaction;
