type RequestTypeType = 'Swimming Pool';

type StatusType = 'Pending' | 'In-Progress' | 'Completed';

export type SwimmingpoolServiceDataType = {
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
};

export const SwimmingpoolServiceData: SwimmingpoolServiceDataType[] = [
  {
    requestID: 'RQ17823451',
    requestDetail: 'Request for an swimming instructor.',
    responseDetail: 'Scheduled for 3 PM today.',
    requestAssignedTo: 'Employee 2',
    requestTime: {
      date: '2025-02-09',
      time: '10 mins ago'
    },
    guestDetails: {
      guestID: '01953269',
      name: 'Jane Smith',
      roomNo: '305',
      mobileNumber: '7302884521',
      email: 'janesmith@gmail.com'
    },
    requestType: 'Swimming Pool',
    status: 'In-Progress',
    assignedTo: 'Employee 2'
  },
  {
    requestID: 'RQ17823452',
    requestDetail: 'Request for pool towels.',
    responseDetail: 'Towels delivered to the poolside.',
    requestAssignedTo: 'Employee 3',
    requestTime: {
      date: '2025-02-08',
      time: '30 mins ago'
    },
    guestDetails: {
      guestID: '01953270',
      name: 'John Doe',
      roomNo: '201',
      mobileNumber: '7203456789',
      email: 'johndoe@gmail.com'
    },
    requestType: 'Swimming Pool',
    status: 'Completed',
    assignedTo: 'Employee 3'
  },
  {
    requestID: 'RQ17823453',
    requestDetail: 'Request for a private swimming session.',
    responseDetail: 'Scheduled from 5 PM to 6 PM.',
    requestAssignedTo: 'Employee 5',
    requestTime: {
      date: '2025-02-07',
      time: '1 hour ago'
    },
    guestDetails: {
      guestID: '01953271',
      name: 'Alice Johnson',
      roomNo: '410',
      mobileNumber: '7309876543',
      email: 'alicejohnson@gmail.com'
    },
    requestType: 'Swimming Pool',
    status: 'Pending',
    assignedTo: 'Employee 5'
  },
  {
    requestID: 'RQ17823454',
    requestDetail: 'Request for poolside snacks and drinks.',
    responseDetail: 'Order placed, delivery in 15 mins.',
    requestAssignedTo: 'Employee 4',
    requestTime: {
      date: '2025-02-09',
      time: '5 mins ago'
    },
    guestDetails: {
      guestID: '01953272',
      name: 'Michael Lee',
      roomNo: '315',
      mobileNumber: '7405678912',
      email: 'michaellee@gmail.com'
    },
    requestType: 'Swimming Pool',
    status: 'In-Progress',
    assignedTo: 'Employee 4'
  },
  {
    requestID: 'RQ17823455',
    requestDetail: 'Request for a floating pool bed.',
    responseDetail: 'Delivered to the pool.',
    requestAssignedTo: 'Employee 1',
    requestTime: {
      date: '2025-02-06',
      time: '45 mins ago'
    },
    guestDetails: {
      guestID: '01953273',
      name: 'Emma Watson',
      roomNo: '220',
      mobileNumber: '7102345678',
      email: 'emmawatson@gmail.com'
    },
    requestType: 'Swimming Pool',
    status: 'Completed',
    assignedTo: 'Employee 1'
  },
  {
    requestID: 'RQ17823456',
    requestDetail: 'Request for a kids’ pool play session.',
    responseDetail: 'Scheduled for 11 AM tomorrow.',
    requestAssignedTo: 'Employee 6',
    requestTime: {
      date: '2025-02-10',
      time: '20 mins ago'
    },
    guestDetails: {
      guestID: '01953274',
      name: 'David Miller',
      roomNo: '108',
      mobileNumber: '7201234567',
      email: 'davidmiller@gmail.com'
    },
    requestType: 'Swimming Pool',
    status: 'Pending',
    assignedTo: 'Employee 6'
  },
  {
    requestID: 'RQ17823457',
    requestDetail: 'Request for extra lounge chairs at the pool.',
    responseDetail: 'Chairs arranged near the pool.',
    requestAssignedTo: 'Employee 2',
    requestTime: {
      date: '2025-02-07',
      time: '15 mins ago'
    },
    guestDetails: {
      guestID: '01953275',
      name: 'Sophia Wilson',
      roomNo: '412',
      mobileNumber: '7309991234',
      email: 'sophiawilson@gmail.com'
    },
    requestType: 'Swimming Pool',
    status: 'Completed',
    assignedTo: 'Employee 2'
  }
];
