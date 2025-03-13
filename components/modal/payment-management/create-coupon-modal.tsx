import React from 'react';
import CreateCouponForm from './create-coupon-form';
import { X } from 'lucide-react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCouponModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white relative p-6 rounded-md max-h-[90vh] w-[90vw] max-w-5xl overflow-y-auto scroll- ">
        <button
          onClick={onClose}
          className="fixed top-4 right-4 text-white hover:text-yellow-950"
        >
          {' '}
          <X className="w-8 h-8" />{' '}
        </button>

        <CreateCouponForm onClose={() => onClose()} />
      </div>
    </div>
  );
};

export default CreateCouponModal;
