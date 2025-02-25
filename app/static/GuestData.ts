// Dummy guest data type definition
type TrackingStatusType = 'under review' | 'pending' | 'submitted';
type PaymentStatusType = 'pending' | 'paid';

export type GuestDataType = {
  guestId: string;
  checkInCheckOutDetails: {
    checkInDate: string;
    checkInTime: string;
    CheckOutTime: string;
    checkOutDate: string;
  };
  guestDetails: {
    name: string;
    phoneNo: string;
    roomNo: string;
  };
  contactDetails: {
    email: string;
    mobileNo: string;
  };
  trackingStatus: TrackingStatusType;
  paymentStatus: PaymentStatusType;
};

// Dummy guest data
export const GuestData: GuestDataType[] = [
  {
    guestId: 'GD17823450',
    checkInCheckOutDetails: {
      checkInDate: '2022-01-01',
      checkInTime: '10:00 AM',
      CheckOutTime: '12:00 PM',
      checkOutDate: '2022-01-05'
    },
    guestDetails: {
      name: 'John Doe',
      phoneNo: '1234567890',
      roomNo: '101'
    },
    contactDetails: {
      email: 'johndoe@gmail.com',
      mobileNo: '9899999999'
    },
    trackingStatus: 'under review',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823451',
    checkInCheckOutDetails: {
      checkInDate: '2022-02-10',
      checkInTime: '2:00 PM',
      CheckOutTime: '11:00 AM',
      checkOutDate: '2022-02-15'
    },
    guestDetails: {
      name: 'Jane Smith',
      phoneNo: '2345678901',
      roomNo: '102'
    },
    contactDetails: {
      email: 'janesmith@yahoo.com',
      mobileNo: '9876543210'
    },
    trackingStatus: 'submitted',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823452',
    checkInCheckOutDetails: {
      checkInDate: '2022-03-05',
      checkInTime: '3:00 PM',
      CheckOutTime: '10:00 AM',
      checkOutDate: '2022-03-07'
    },
    guestDetails: {
      name: 'Alice Johnson',
      phoneNo: '3456789012',
      roomNo: '103'
    },
    contactDetails: {
      email: 'alicej@outlook.com',
      mobileNo: '8765432109'
    },
    trackingStatus: 'pending',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823453',
    checkInCheckOutDetails: {
      checkInDate: '2022-04-01',
      checkInTime: '1:00 PM',
      CheckOutTime: '12:00 PM',
      checkOutDate: '2022-04-03'
    },
    guestDetails: {
      name: 'Bob Brown',
      phoneNo: '4567890123',
      roomNo: '104'
    },
    contactDetails: {
      email: 'bobbrown@gmail.com',
      mobileNo: '7654321098'
    },
    trackingStatus: 'under review',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823454',
    checkInCheckOutDetails: {
      checkInDate: '2022-05-15',
      checkInTime: '4:00 PM',
      CheckOutTime: '11:00 AM',
      checkOutDate: '2022-05-20'
    },
    guestDetails: {
      name: 'Clara Davis',
      phoneNo: '5678901234',
      roomNo: '105'
    },
    contactDetails: {
      email: 'claradavis@gmail.com',
      mobileNo: '6543210987'
    },
    trackingStatus: 'submitted',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823455',
    checkInCheckOutDetails: {
      checkInDate: '2022-06-01',
      checkInTime: '12:00 PM',
      CheckOutTime: '10:00 AM',
      checkOutDate: '2022-06-03'
    },
    guestDetails: {
      name: 'David Wilson',
      phoneNo: '6789012345',
      roomNo: '106'
    },
    contactDetails: {
      email: 'davidw@yahoo.com',
      mobileNo: '5432109876'
    },
    trackingStatus: 'pending',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823456',
    checkInCheckOutDetails: {
      checkInDate: '2022-07-10',
      checkInTime: '2:00 PM',
      CheckOutTime: '11:00 AM',
      checkOutDate: '2022-07-12'
    },
    guestDetails: {
      name: 'Emma Taylor',
      phoneNo: '7890123456',
      roomNo: '107'
    },
    contactDetails: {
      email: 'emmataylor@gmail.com',
      mobileNo: '4321098765'
    },
    trackingStatus: 'under review',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823457',
    checkInCheckOutDetails: {
      checkInDate: '2022-08-01',
      checkInTime: '3:00 PM',
      CheckOutTime: '12:00 PM',
      checkOutDate: '2022-08-05'
    },
    guestDetails: {
      name: 'Frank Miller',
      phoneNo: '8901234567',
      roomNo: '108'
    },
    contactDetails: {
      email: 'frankm@gmail.com',
      mobileNo: '3210987654'
    },
    trackingStatus: 'submitted',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823458',
    checkInCheckOutDetails: {
      checkInDate: '2022-09-15',
      checkInTime: '1:00 PM',
      CheckOutTime: '10:00 AM',
      checkOutDate: '2022-09-18'
    },
    guestDetails: {
      name: 'Grace Lee',
      phoneNo: '9012345678',
      roomNo: '109'
    },
    contactDetails: {
      email: 'gracelee@outlook.com',
      mobileNo: '2109876543'
    },
    trackingStatus: 'pending',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823459',
    checkInCheckOutDetails: {
      checkInDate: '2022-10-01',
      checkInTime: '4:00 PM',
      CheckOutTime: '11:00 AM',
      checkOutDate: '2022-10-03'
    },
    guestDetails: {
      name: 'Henry Clark',
      phoneNo: '0123456789',
      roomNo: '110'
    },
    contactDetails: {
      email: 'henryc@yahoo.com',
      mobileNo: '1098765432'
    },
    trackingStatus: 'under review',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823460',
    checkInCheckOutDetails: {
      checkInDate: '2022-11-05',
      checkInTime: '2:00 PM',
      CheckOutTime: '12:00 PM',
      checkOutDate: '2022-11-07'
    },
    guestDetails: {
      name: 'Isabella Adams',
      phoneNo: '1122334455',
      roomNo: '111'
    },
    contactDetails: {
      email: 'isabellaa@gmail.com',
      mobileNo: '0987654321'
    },
    trackingStatus: 'submitted',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823461',
    checkInCheckOutDetails: {
      checkInDate: '2022-12-01',
      checkInTime: '3:00 PM',
      CheckOutTime: '10:00 AM',
      checkOutDate: '2022-12-04'
    },
    guestDetails: {
      name: 'James Carter',
      phoneNo: '2233445566',
      roomNo: '112'
    },
    contactDetails: {
      email: 'jamesc@yahoo.com',
      mobileNo: '9876543210'
    },
    trackingStatus: 'pending',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823462',
    checkInCheckOutDetails: {
      checkInDate: '2023-01-10',
      checkInTime: '1:00 PM',
      CheckOutTime: '11:00 AM',
      checkOutDate: '2023-01-12'
    },
    guestDetails: {
      name: 'Kelly White',
      phoneNo: '3344556677',
      roomNo: '113'
    },
    contactDetails: {
      email: 'kellyw@outlook.com',
      mobileNo: '8765432109'
    },
    trackingStatus: 'under review',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823463',
    checkInCheckOutDetails: {
      checkInDate: '2023-02-01',
      checkInTime: '4:00 PM',
      CheckOutTime: '12:00 PM',
      checkOutDate: '2023-02-03'
    },
    guestDetails: {
      name: 'Liam Turner',
      phoneNo: '4455667788',
      roomNo: '114'
    },
    contactDetails: {
      email: 'liamt@gmail.com',
      mobileNo: '7654321098'
    },
    trackingStatus: 'submitted',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823464',
    checkInCheckOutDetails: {
      checkInDate: '2023-03-15',
      checkInTime: '2:00 PM',
      CheckOutTime: '10:00 AM',
      checkOutDate: '2023-03-18'
    },
    guestDetails: {
      name: 'Mia Harris',
      phoneNo: '5566778899',
      roomNo: '115'
    },
    contactDetails: {
      email: 'miah@outlook.com',
      mobileNo: '6543210987'
    },
    trackingStatus: 'pending',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823465',
    checkInCheckOutDetails: {
      checkInDate: '2023-04-01',
      checkInTime: '3:00 PM',
      CheckOutTime: '11:00 AM',
      checkOutDate: '2023-04-05'
    },
    guestDetails: {
      name: 'Noah King',
      phoneNo: '6677889900',
      roomNo: '116'
    },
    contactDetails: {
      email: 'noahk@gmail.com',
      mobileNo: '5432109876'
    },
    trackingStatus: 'under review',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823466',
    checkInCheckOutDetails: {
      checkInDate: '2023-05-10',
      checkInTime: '1:00 PM',
      CheckOutTime: '12:00 PM',
      checkOutDate: '2023-05-12'
    },
    guestDetails: {
      name: 'Olivia Scott',
      phoneNo: '7788990011',
      roomNo: '117'
    },
    contactDetails: {
      email: 'olivias@gmail.com',
      mobileNo: '4321098765'
    },
    trackingStatus: 'submitted',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823467',
    checkInCheckOutDetails: {
      checkInDate: '2023-06-01',
      checkInTime: '4:00 PM',
      CheckOutTime: '10:00 AM',
      checkOutDate: '2023-06-03'
    },
    guestDetails: {
      name: 'Peter Evans',
      phoneNo: '8899001122',
      roomNo: '118'
    },
    contactDetails: {
      email: 'petere@yahoo.com',
      mobileNo: '3210987654'
    },
    trackingStatus: 'pending',
    paymentStatus: 'pending'
  },
  {
    guestId: 'GD17823468',
    checkInCheckOutDetails: {
      checkInDate: '2023-07-15',
      checkInTime: '2:00 PM',
      CheckOutTime: '11:00 AM',
      checkOutDate: '2023-07-18'
    },
    guestDetails: {
      name: 'Quinn Parker',
      phoneNo: '9900112233',
      roomNo: '119'
    },
    contactDetails: {
      email: 'quinnp@outlook.com',
      mobileNo: '2109876543'
    },
    trackingStatus: 'under review',
    paymentStatus: 'paid'
  },
  {
    guestId: 'GD17823469',
    checkInCheckOutDetails: {
      checkInDate: '2023-08-01',
      checkInTime: '3:00 PM',
      CheckOutTime: '12:00 PM',
      checkOutDate: '2023-08-05'
    },
    guestDetails: {
      name: 'Rose Bennett',
      phoneNo: '0011223344',
      roomNo: '120'
    },
    contactDetails: {
      email: 'roseb@gmail.com',
      mobileNo: '1098765432'
    },
    trackingStatus: 'submitted',
    paymentStatus: 'pending'
  }
];
