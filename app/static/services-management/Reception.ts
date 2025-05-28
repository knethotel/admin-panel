type RequestTypeType =
  | 'Service'
  | 'Complaint'
  | 'Wake-up call'
  | 'Pre check-in'
  | 'Pre check-out'
  | 'Wake up call schedule'
  | 'Feedback'
  | 'Service feedback';
type StatusType = 'Pending' | 'In-Progress' | 'Completed';

export type ReceptionDataType = {
  requestID: string;
  requestDetail: string;
  responseDetail: string;
  requestAssignedTo: string;
  requestTime: {
    date: string;
    time: string;
  };
  guestDetails: {
    guestID: string;
    name: string;
    roomNo: string;
    mobileNumber: string;
    email: string;
  };
  requestType: RequestTypeType;
  status: StatusType;
  assignedTo: string;
  estimatedTime?: string;
};
