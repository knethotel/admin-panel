import React from 'react';
import CreateCouponForm from './create-coupon-form';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CreateCouponModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div>
        {/* <CreateCouponForm /> */}
      </div>
    </div>
  );
};

export default CreateCouponModal;
