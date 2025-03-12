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
  requestedTimeSlot: string;
  effectiveCost: string;
  requestedVenue: string;
};

export const ConciergeServiceData: ConciergeServiceDataType[] = [
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
    assignedTo: 'Employee 2',
    requestedTimeSlot: '9:00 AM - 12:00 PM',
    effectiveCost: 'INR 1200/hr. only',
    requestedVenue: 'City Palace, Jaipur'
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
    assignedTo: 'Employee 2',
    requestedTimeSlot: '9:00 AM - 12:00 PM',
    effectiveCost: 'INR 1200/hr. only',
    requestedVenue: 'City Palace, Jaipur'
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
    assignedTo: 'Employee 2',
    requestedTimeSlot: '9:00 AM - 12:00 PM',
    effectiveCost: 'INR 1200/hr. only',
    requestedVenue: 'City Palace, Jaipur'
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
    assignedTo: 'Employee 2',
    requestedTimeSlot: '9:00 AM - 12:00 PM',
    effectiveCost: 'INR 1200/hr. only',
    requestedVenue: 'City Palace, Jaipur'
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
    assignedTo: 'Employee 2',
    requestedTimeSlot: '9:00 AM - 12:00 PM',
    effectiveCost: 'INR 1200/hr. only',
    requestedVenue: 'City Palace, Jaipur'
  }
];
