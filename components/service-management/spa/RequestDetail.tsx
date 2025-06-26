
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
    <div className="bg-[#FAF6EF] rounded-xl shadow-md px-8 py-10 w-full space-y-12 font-medium text-gray-800">
      {/* Header */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
        <p>👤 Guest ID: <span className="text-gray-700">{service.guest._id}</span></p>
        <p>🛎️ Service ID: <span className="text-gray-700">{service._id}</span></p>
        <p>⏰ Booking Time: <span className="text-gray-700">{service.bookingTime}</span></p>
      </div>

      {/* Details Section */}
      <div className="space-y-10">
        {/* Top Row */}
        <div className="flex flex-wrap gap-6">
          {[
            { label: "Guest Name", value: `${service.guest.firstName} ${service.guest.lastName}` },
            { label: "Booking Date", value: new Date(service.bookingDate).toLocaleDateString() },
            { label: "Payment Status", value: service.paymentStatus }
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{label}</span>
              <span className="bg-[#F6EEE0] rounded-md px-4 py-1">{value}</span>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column */}
          <div className="space-y-6 w-full lg:w-1/2">
            <InfoRow label="Date" value={new Date(service.bookingDate).toLocaleString()} />
            <InfoRow label="Booking Date" value={new Date(service.bookingDate).toLocaleDateString()} />
            <InfoRow
              label="Payment Status"
              value={service.paymentStatus}
              className={service.paymentStatus === "paid" ? "text-green-700" : "text-red-600"}
            />

            <div className="space-y-2">
              <LabelValue label="Subtotal" value={`₹${service.amount.subtotal ?? 0}`} />
              <LabelValue label="Discount" value={`₹${service.amount.discount ?? 0}`} />
              <LabelValue label="Total" value={`₹${service.amount.finalAmount ?? 0}`} bold />
            </div>

            <div className="space-y-2">
              <span className="text-sm text-gray-500">Description</span>
              <p className="bg-[#F6EEE0] px-4 py-2 rounded-md text-sm">
                {service.spaSalonProduct.description}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 w-full lg:w-1/2">
            <div className="space-y-2">
              <span className="text-sm text-gray-500">Effective Cost</span>
              <ToggleButton />
              <div className="bg-[#F6EEE0] px-6 py-1 rounded-md w-fit">
                ₹{service.amount.finalAmount}
              </div>
            </div>

            <InfoRow label="Request Time" value={new Date(service.requestTime).toLocaleString()} />
            <InfoRow label="Transaction ID" value={service.transaction} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default SpaServiceRequestDetail;
