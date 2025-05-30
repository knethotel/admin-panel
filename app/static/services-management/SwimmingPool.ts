export type SwimmingpoolServiceDataType = {
  requestID: string;
  requestDetail: string;
  requestTime: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  guestDetails: {
    guestID: string;
    name: string;
    roomNo: string;
  };
  requestType: 'Swimming Pool';
  status: 'Pending' | 'In-Progress' | 'Completed';
  assignedTo?: string;
};
