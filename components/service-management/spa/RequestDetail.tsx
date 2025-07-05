
'use client';

import React, { useEffect, useState } from 'react';
import ToggleButton from '@/components/ui/toggleButton';
import apiCall from '@/lib/axios'; // <- make sure this exists
import { useParams } from 'next/navigation';

type SpaSalonBooking = {
  _id: string;
  uniqueId: string;
  status: string;
  bookingDate: string;
  serviceID: string;
  transaction: string;
  bookingTime: string;
  description: string;
  paymentStatus: string;
  paymentDate: string;
  requestTime: string;
  amount: {
    subtotal: number;
    discount: number;
    finalAmount: number;
  };
  guest: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  spaSalonProduct: {
    _id: string;
    serviceType: string;
    productCategory: string;
    productName: string;
    price: number;
    description: string;
    imageUrl: string;
  };
};

type Props = {
  serviceID: string;
};

type LabelValueProps = {
  label: string;
  value: string | number;
  bold?: boolean;
};

type InfoRowProps = {
  label: string;
  value: string | number;
  className?: string;
};


const SpaServiceRequestDetail: React.FC<Props> = ({ serviceID }) => {
  const [service, setService] = useState<SpaSalonBooking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      try {
        const res = await apiCall('GET', `/api/services/spasalon/booking/${serviceID}`);
        if (res.success) {
          setService(res.data);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [serviceID]);

  if (loading) return <p>Loading...</p>;
  if (!service) return <p>No data found.</p>;

  const InfoRow: React.FC<InfoRowProps> = ({ label, value, className = "" }) => (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={`bg-[#F6EEE0] rounded-md px-4 py-1 ${className}`}>{value}</span>
    </div>
  );

  const LabelValue: React.FC<LabelValueProps> = ({ label, value, bold = false }) => (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={`bg-[#F6EEE0] px-4 py-1 rounded-md ${bold ? "font-semibold" : ""}`}>
        {value}
      </span>
    </div>
  );


  return (
    <div className="bg-white rounded-xl shadow-md px-6 md:px-10 py-8 max-w-5xl mx-auto text-gray-800 space-y-10">
      {/* Header Info */}
      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
        <span><strong>👤 Guest ID:</strong> {service.guest._id}</span>
        <span><strong>🛎️ Service ID:</strong> {service.uniqueId}</span>
        <span><strong>⏰ Booking Time:</strong> {service.bookingTime}</span>
      </div>

      {/* Booking Details */}
      <section className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Booking Overview</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <InfoRow label="Guest Name" value={`${service.guest.firstName} ${service.guest.lastName}`} />
          <InfoRow label="Booking Date" value={new Date(service.bookingDate).toLocaleDateString()} />
          <InfoRow
            label="Payment Status"
            value={service.paymentStatus}
            className={service.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}
          />
        </div>
      </section>

      {/* Description & Amount */}
      <section className="flex flex-col lg:flex-row gap-10 border-t pt-6">
        {/* Left */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <InfoRow label="Full Date & Time" value={new Date(service.bookingDate).toLocaleString()} />
            <InfoRow label="Payment Status" value={service.paymentStatus} className={service.paymentStatus === 'paid' ? 'text-green-700' : 'text-red-600'} />
          </div>

          <div className="bg-gray-50 p-4 rounded-md shadow-inner space-y-2">
            <h4 className="text-sm text-gray-500 font-medium">Amount Details</h4>
            <LabelValue label="Subtotal" value={`₹${service.amount.subtotal}`} />
            <LabelValue label="Discount" value={`₹${service.amount.discount}`} />
            <LabelValue label="Final Amount" value={`₹${service.amount.finalAmount}`} bold />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-gray-500">Service Description</h4>
            <p className="bg-[#FFF9F0] px-4 py-2 rounded-md text-sm leading-relaxed">
              {service.spaSalonProduct.description}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 space-y-6">
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Effective Cost</h4>
            <div className="bg-[#F6EEE0] text-lg px-6 py-2 font-semibold rounded-md w-fit">
              ₹{service.amount.finalAmount}
            </div>
          </div>

          <div className="space-y-2">
            <InfoRow label="Request Time" value={new Date(service.requestTime).toLocaleString()} />
            <InfoRow label="Transaction ID" value={service.transaction} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpaServiceRequestDetail;
