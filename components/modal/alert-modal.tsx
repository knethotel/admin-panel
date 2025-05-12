'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onConfirmAction: () => void;
  loading: boolean;
  title?: string;
  description?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onCloseAction,
  onConfirmAction,
  loading,
  title = 'Are you sure?',
  description = 'This action cannot be undone.'
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleLogout = () => {
    // Remove the session and cookie
    sessionStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=0; path=/'; // Clear the cookie
  
    // Redirect to login page
    window.location.href = '/';
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onCloseAction={onCloseAction}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onCloseAction}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={handleLogout}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </Modal>
  );
};
