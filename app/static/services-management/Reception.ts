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
};
export const ReceptionData: ReceptionDataType[] = [
  {
    requestID: 'RQ17823450',
    requestDetail:
      'Great experience! The platform made finding the perfect space quick and easy.',
    responseDetail:
      'We appreciate your feedback! Happy to help you find the perfect space.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '10-02-2025',
      time: '1 min ago'
    },
    guestDetails: {
      guestID: '01953268',
      name: 'John Doe',
      roomNo: '501',
      mobileNumber: '6203770138',
      email: 'jeetsingh46@gmail.com'
    },
    requestType: 'Service',
    status: 'Pending',
    assignedTo: 'Employee 1'
  },
  {
    requestID: 'RQ17823451',
    requestDetail: 'Air conditioning is not working properly.',
    responseDetail:
      'Technician has been assigned and will resolve the issue shortly.',
    requestAssignedTo: 'Technician 2',
    requestTime: {
      date: '10-02-2025',
      time: '5 mins ago'
    },
    guestDetails: {
      guestID: '01953269',
      name: 'Alice Brown',
      roomNo: '305',
      mobileNumber: '7203559876',
      email: 'alice.b@gmail.com'
    },
    requestType: 'Complaint',
    status: 'In-Progress',
    assignedTo: 'Employee 2'
  },
  {
    requestID: 'RQ17823452',
    requestDetail: 'Request for a wake-up call at 6:30 AM.',
    responseDetail: 'Wake-up call scheduled successfully.',
    requestAssignedTo: 'Reception',
    requestTime: {
      date: '10-02-2025',
      time: '10 mins ago'
    },
    guestDetails: {
      guestID: '01953270',
      name: 'Robert Smith',
      roomNo: '210',
      mobileNumber: '6302114765',
      email: 'robertsmith@gmail.com'
    },
    requestType: 'Wake-up call',
    status: 'Completed',
    assignedTo: 'Employee 3'
  },
  {
    requestID: 'RQ17823453',
    requestDetail: 'Pre check-in request for early arrival.',
    responseDetail: 'Early check-in confirmed for 8 AM.',
    requestAssignedTo: 'Front Desk',
    requestTime: {
      date: '10-02-2025',
      time: '15 mins ago'
    },
    guestDetails: {
      guestID: '01953271',
      name: 'Emily White',
      roomNo: '102',
      mobileNumber: '6789234501',
      email: 'emilywhite@gmail.com'
    },
    requestType: 'Pre check-in',
    status: 'Completed',
    assignedTo: 'Employee 4'
  },
  {
    requestID: 'RQ17823454',
    requestDetail: 'Request for a late check-out.',
    responseDetail: 'Late check-out approved until 2 PM.',
    requestAssignedTo: 'Front Desk',
    requestTime: {
      date: '10-02-2025',
      time: '20 mins ago'
    },
    guestDetails: {
      guestID: '01953272',
      name: 'David Wilson',
      roomNo: '410',
      mobileNumber: '7023459876',
      email: 'davidwilson@gmail.com'
    },
    requestType: 'Pre check-out',
    status: 'Pending',
    assignedTo: 'Employee 5'
  },
  {
    requestID: 'RQ17823455',
    requestDetail: 'Schedule a recurring wake-up call at 7 AM.',
    responseDetail: 'Wake-up call scheduled for 7 AM daily.',
    requestAssignedTo: 'Reception',
    requestTime: {
      date: '10-02-2025',
      time: '25 mins ago'
    },
    guestDetails: {
      guestID: '01953273',
      name: 'Sophia Martinez',
      roomNo: '608',
      mobileNumber: '7219087654',
      email: 'sophiam@gmail.com'
    },
    requestType: 'Wake up call schedule',
    status: 'In-Progress',
    assignedTo: 'Employee 6'
  },
  {
    requestID: 'RQ17823456',
    requestDetail: 'Feedback regarding the room service.',
    responseDetail: 'Thank you for your feedback! We will improve our service.',
    requestAssignedTo: 'Customer Support',
    requestTime: {
      date: '10-02-2025',
      time: '30 mins ago'
    },
    guestDetails: {
      guestID: '01953274',
      name: 'Michael Johnson',
      roomNo: '312',
      mobileNumber: '6784561230',
      email: 'michaelj@gmail.com'
    },
    requestType: 'Feedback',
    status: 'Completed',
    assignedTo: 'Employee 7'
  },
  {
    requestID: 'RQ17823457',
    requestDetail: 'Service feedback on the hotel amenities.',
    responseDetail:
      'We appreciate your feedback! Thank you for staying with us.',
    requestAssignedTo: 'Customer Support',
    requestTime: {
      date: '10-02-2025',
      time: '35 mins ago'
    },
    guestDetails: {
      guestID: '01953275',
      name: 'Olivia Taylor',
      roomNo: '715',
      mobileNumber: '7654321890',
      email: 'oliviat@gmail.com'
    },
    requestType: 'Service feedback',
    status: 'Pending',
    assignedTo: 'Employee 8'
  }
];
