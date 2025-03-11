type RequestTypeType =
  | 'Tourist Attraction'
  | 'Taxi/Cab'
  | 'Entertainment'
  | 'Nearby Restaurent'
  | 'Swimming pool';

type StatusType = 'Pending' | 'In-Progress' | 'Completed';

export type ConciergeServiceDataType = {
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

export const ConciergeServiceData: ConciergeServiceDataType[] = [
  {
    requestID: 'RQ17823451',
    requestDetail: 'Request for a coolie at 3 PM.',
    responseDetail: 'Will arrive at 3 PM.',
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
    requestType: 'Tourist Attraction',
    status: 'In-Progress',
    assignedTo: 'Employee 2'
  },
  {
    requestID: 'RQ17823452',
    requestDetail: 'Request for a cab to the airport.',
    responseDetail: 'Cab will arrive in 15 minutes.',
    requestAssignedTo: 'Employee 5',
    requestTime: {
      date: '2025-02-08',
      time: '20 mins ago'
    },
    guestDetails: {
      guestID: '01953270',
      name: 'John Doe',
      roomNo: '201',
      mobileNumber: '7203456789',
      email: 'johndoe@gmail.com'
    },
    requestType: 'Taxi/Cab',
    status: 'Completed',
    assignedTo: 'Employee 5'
  },
  {
    requestID: 'RQ17823453',
    requestDetail: 'Request for tickets to a cultural dance show.',
    responseDetail: 'Booked for 7 PM today.',
    requestAssignedTo: 'Employee 3',
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
    requestType: 'Entertainment',
    status: 'Pending',
    assignedTo: 'Employee 3'
  },
  {
    requestID: 'RQ17823454',
    requestDetail: 'Recommendation for a fine dining restaurant nearby.',
    responseDetail: 'Suggested “The Royal Dine” at 2 km distance.',
    requestAssignedTo: 'Employee 1',
    requestTime: {
      date: '2025-02-09',
      time: '30 mins ago'
    },
    guestDetails: {
      guestID: '01953272',
      name: 'Michael Lee',
      roomNo: '315',
      mobileNumber: '7405678912',
      email: 'michaellee@gmail.com'
    },
    requestType: 'Nearby Restaurent',
    status: 'Completed',
    assignedTo: 'Employee 1'
  },
  {
    requestID: 'RQ17823455',
    requestDetail: 'Request for extra pool towels and lounge chairs.',
    responseDetail: 'Delivered to the poolside.',
    requestAssignedTo: 'Employee 4',
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
    requestType: 'Swimming pool',
    status: 'Completed',
    assignedTo: 'Employee 4'
  },
  {
    requestID: 'RQ17823456',
    requestDetail: 'Request for a private night pool session.',
    responseDetail: 'Confirmed for 10 PM - 12 AM.',
    requestAssignedTo: 'Employee 6',
    requestTime: {
      date: '2025-02-10',
      time: '15 mins ago'
    },
    guestDetails: {
      guestID: '01953274',
      name: 'David Miller',
      roomNo: '108',
      mobileNumber: '7201234567',
      email: 'davidmiller@gmail.com'
    },
    requestType: 'Swimming pool',
    status: 'Pending',
    assignedTo: 'Employee 6'
  },
  {
    requestID: 'RQ17823457',
    requestDetail: 'Request for a sightseeing tour guide for Jaipur.',
    responseDetail: 'Tour booked for tomorrow at 9 AM.',
    requestAssignedTo: 'Employee 2',
    requestTime: {
      date: '2025-02-07',
      time: '1 hour ago'
    },
    guestDetails: {
      guestID: '01953275',
      name: 'Sophia Wilson',
      roomNo: '412',
      mobileNumber: '7309991234',
      email: 'sophiawilson@gmail.com'
    },
    requestType: 'Tourist Attraction',
    status: 'Completed',
    assignedTo: 'Employee 2'
  }
];
