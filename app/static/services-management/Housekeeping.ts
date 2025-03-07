type RequestTypeType =
  | 'Room Necessities'
  | 'Bathroom Necessities'
  | 'Bathroom Cleaning';

type StatusType = 'Pending' | 'In-Progress' | 'Completed';

export type HousekeepingDataType = {
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

export const HousekeepingData: HousekeepingDataType[] = [
  {
    requestID: 'RQ17823450',
    requestDetail: 'Need extra towels in the room.',
    responseDetail: 'Towels will be delivered shortly.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '2025-02-10',
      time: '1 min ago'
    },
    guestDetails: {
      guestID: '01953268',
      name: 'John Doe',
      roomNo: '501',
      mobileNumber: '6203770138',
      email: 'johndoe@gmail.com'
    },
    requestType: 'Room Necessities',
    status: 'Pending',
    assignedTo: 'Employee 1'
  },
  {
    requestID: 'RQ17823451',
    requestDetail: 'Need room cleaning service.',
    responseDetail: 'Housekeeping will arrive in 10 minutes.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '2025-02-09',
      time: '30 mins ago'
    },
    guestDetails: {
      guestID: '01953269',
      name: 'Alice Smith',
      roomNo: '302',
      mobileNumber: '9876543210',
      email: 'alice.smith@email.com'
    },
    requestType: 'Room Necessities',
    status: 'In-Progress',
    assignedTo: 'Employee 2'
  },
  {
    requestID: 'RQ17823452',
    requestDetail: 'Bathroom sink is leaking.',
    responseDetail: 'Maintenance has been informed.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '2025-02-08',
      time: '1 hour ago'
    },
    guestDetails: {
      guestID: '01953270',
      name: 'Robert Johnson',
      roomNo: '205',
      mobileNumber: '9234567890',
      email: 'robert.johnson@email.com'
    },
    requestType: 'Bathroom Necessities',
    status: 'Pending',
    assignedTo: 'Employee 3'
  },
  {
    requestID: 'RQ17823453',
    requestDetail: 'Toilet paper needs restocking.',
    responseDetail: 'Housekeeping will restock soon.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '2025-02-07',
      time: '10 mins ago'
    },
    guestDetails: {
      guestID: '01953271',
      name: 'Emma Wilson',
      roomNo: '104',
      mobileNumber: '9101112134',
      email: 'emma.wilson@email.com'
    },
    requestType: 'Bathroom Necessities',
    status: 'Completed',
    assignedTo: 'Employee 4'
  },
  {
    requestID: 'RQ17823454',
    requestDetail: 'Need air freshener in the bathroom.',
    responseDetail: 'Air freshener will be provided.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '2025-02-06',
      time: '2 hours ago'
    },
    guestDetails: {
      guestID: '01953272',
      name: 'Michael Brown',
      roomNo: '303',
      mobileNumber: '9001122334',
      email: 'michael.brown@email.com'
    },
    requestType: 'Bathroom Cleaning',
    status: 'Pending',
    assignedTo: 'Employee 5'
  },
  {
    requestID: 'RQ17823455',
    requestDetail: 'Shower drain is clogged.',
    responseDetail: 'Maintenance is on the way.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '2025-02-05',
      time: '5 mins ago'
    },
    guestDetails: {
      guestID: '01953273',
      name: 'Sophia Martinez',
      roomNo: '401',
      mobileNumber: '9304455667',
      email: 'sophia.martinez@email.com'
    },
    requestType: 'Bathroom Cleaning',
    status: 'In-Progress',
    assignedTo: 'Employee 6'
  },
  {
    requestID: 'RQ17823456',
    requestDetail: 'Room needs a deep clean.',
    responseDetail: 'Scheduled for deep cleaning tomorrow.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '2025-02-04',
      time: '1 day ago'
    },
    guestDetails: {
      guestID: '01953274',
      name: 'David Lee',
      roomNo: '202',
      mobileNumber: '9456677889',
      email: 'david.lee@email.com'
    },
    requestType: 'Room Necessities',
    status: 'Completed',
    assignedTo: 'Employee 7'
  }
];

