type RequestTypeType = 'Spa' | 'Salon';

type StatusType = 'Pending' | 'In-Progress' | 'Completed';

export type SpaServiceDataType = {
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

export const SpaServiceData: SpaServiceDataType[] = [
  {
    requestID: 'RQ17823451',
    requestDetail: 'Request for a deep tissue massage.',
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
    requestType: 'Spa',
    status: 'In-Progress',
    assignedTo: 'Employee 2'
  },
  {
    requestID: 'RQ17823452',
    requestDetail: 'Looking for a hair spa session.',
    responseDetail: 'Appointment confirmed at 5 PM.',
    requestAssignedTo: 'Employee 3',
    requestTime: {
      date: '2025-02-08',
      time: '30 mins ago'
    },
    guestDetails: {
      guestID: '01953270',
      name: 'Michael Brown',
      roomNo: '202',
      mobileNumber: '8103672914',
      email: 'michaelbrown@gmail.com'
    },
    requestType: 'Salon',
    status: 'Pending',
    assignedTo: 'Employee 3'
  },
  {
    requestID: 'RQ17823453',
    requestDetail: 'Manicure and pedicure service request.',
    responseDetail: 'Service scheduled for 6 PM.',
    requestAssignedTo: 'Employee 4',
    requestTime: {
      date: '2025-02-07',
      time: '1 hour ago'
    },
    guestDetails: {
      guestID: '01953271',
      name: 'Emma Wilson',
      roomNo: '110',
      mobileNumber: '9246701892',
      email: 'emmawilson@gmail.com'
    },
    requestType: 'Salon',
    status: 'Completed',
    assignedTo: 'Employee 4'
  },
  {
    requestID: 'RQ17823454',
    requestDetail: 'Facial treatment request.',
    responseDetail: 'Confirmed for tomorrow at 10 AM.',
    requestAssignedTo: 'None',
    requestTime: {
      date: '2025-02-06',
      time: '2 hours ago'
    },
    guestDetails: {
      guestID: '01953272',
      name: 'Olivia Martinez',
      roomNo: '406',
      mobileNumber: '6783409283',
      email: 'oliviamartinez@gmail.com'
    },
    requestType: 'Salon',
    status: 'Pending',
    assignedTo: 'Employee 5'
  },
  {
    requestID: 'RQ17823455',
    requestDetail: 'Need aromatherapy session.',
    responseDetail: 'Session arranged for 8 PM today.',
    requestAssignedTo: 'Employee 6',
    requestTime: {
      date: '2025-02-05',
      time: '3 hours ago'
    },
    guestDetails: {
      guestID: '01953273',
      name: 'David Lee',
      roomNo: '312',
      mobileNumber: '5346729103',
      email: 'davidlee@gmail.com'
    },
    requestType: 'Spa',
    status: 'In-Progress',
    assignedTo: 'Employee 6'
  },
  {
    requestID: 'RQ17823456',
    requestDetail: 'Request for Swedish massage.',
    responseDetail: 'Service completed successfully.',
    requestAssignedTo: 'Employee 7',
    requestTime: {
      date: '2025-02-04',
      time: '5 hours ago'
    },
    guestDetails: {
      guestID: '01953274',
      name: 'Sophia Hernandez',
      roomNo: '208',
      mobileNumber: '9876134207',
      email: 'sophiahernandez@gmail.com'
    },
    requestType: 'Spa',
    status: 'Completed',
    assignedTo: 'Employee 7'
  },
  {
    requestID: 'RQ17823457',
    requestDetail: 'Haircut request for evening.',
    responseDetail: 'Scheduled for 7:30 PM.',
    requestAssignedTo: 'Employee 8',
    requestTime: {
      date: '2025-02-03',
      time: '10 hours ago'
    },
    guestDetails: {
      guestID: '01953275',
      name: 'Liam Carter',
      roomNo: '601',
      mobileNumber: '4567213980',
      email: 'liamcarter@gmail.com'
    },
    requestType: 'Salon',
    status: 'Pending',
    assignedTo: 'Employee 8'
  }
];
