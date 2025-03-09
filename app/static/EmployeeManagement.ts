//****************Dummy guest data type definition*****************
type RoleType =
  | 'Reception'
  | 'Housekeeping'
  | 'In-Room Dining'
  | 'Gym'
  | 'Spa'
  | 'Swimming Pool'
  | 'Concierge Service'
  | 'In-Room Control'
  | 'Order Management'
  | 'SOS'
  | 'Chat';
type StatusType = 'ACTIVE' | 'INACTIVE';

export type EmployeeDataType = {
  employeeID: string;
  employeeDetails: {
    name: string;
    roomNo: string;
    mobileNo: string;
    emailID: string;
  };
  role: RoleType;
  status: StatusType;
};

// Dummy guest data
export const EmployeeData: EmployeeDataType[] = [
  {
    employeeID: 'ED123452',
    employeeDetails: {
      name: 'MR JOHN DOE',
      roomNo: '101',
      mobileNo: '6203770138',
      emailID: 'johndoe@gmail.com'
    },
    role: 'Housekeeping',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED234561',
    employeeDetails: {
      name: 'MS JANE SMITH',
      roomNo: '102',
      mobileNo: '7204881927',
      emailID: 'janesmith@gmail.com'
    },
    role: 'Reception',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED345670',
    employeeDetails: {
      name: 'MR MIKE JOHNSON',
      roomNo: '103',
      mobileNo: '8205992746',
      emailID: 'mikejohnson@gmail.com'
    },
    role: 'Gym',
    status: 'INACTIVE'
  },
  {
    employeeID: 'ED456789',
    employeeDetails: {
      name: 'MS EMILY DAVIS',
      roomNo: '104',
      mobileNo: '9005123478',
      emailID: 'emilydavis@gmail.com'
    },
    role: 'Spa',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED567890',
    employeeDetails: {
      name: 'MR ROBERT BROWN',
      roomNo: '105',
      mobileNo: '7896543210',
      emailID: 'robertbrown@gmail.com'
    },
    role: 'Swimming Pool',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED678901',
    employeeDetails: {
      name: 'MS LISA WILSON',
      roomNo: '106',
      mobileNo: '8796541230',
      emailID: 'lisawilson@gmail.com'
    },
    role: 'Concierge Service',
    status: 'INACTIVE'
  },
  {
    employeeID: 'ED789012',
    employeeDetails: {
      name: 'MR DAVID MARTIN',
      roomNo: '107',
      mobileNo: '9687452310',
      emailID: 'davidmartin@gmail.com'
    },
    role: 'In-Room Control',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED890123',
    employeeDetails: {
      name: 'MS SOPHIA TAYLOR',
      roomNo: '108',
      mobileNo: '8569742310',
      emailID: 'sophiataylor@gmail.com'
    },
    role: 'Order Management',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED901234',
    employeeDetails: {
      name: 'MR JAMES ANDERSON',
      roomNo: '109',
      mobileNo: '9236587410',
      emailID: 'jamesanderson@gmail.com'
    },
    role: 'SOS',
    status: 'INACTIVE'
  },
  {
    employeeID: 'ED112345',
    employeeDetails: {
      name: 'MS OLIVIA THOMAS',
      roomNo: '110',
      mobileNo: '8754213690',
      emailID: 'oliviathomas@gmail.com'
    },
    role: 'Chat',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED223456',
    employeeDetails: {
      name: 'MR ETHAN WHITE',
      roomNo: '111',
      mobileNo: '9854231078',
      emailID: 'ethanwhite@gmail.com'
    },
    role: 'Housekeeping',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED334567',
    employeeDetails: {
      name: 'MS AVA HARRIS',
      roomNo: '112',
      mobileNo: '8759623104',
      emailID: 'avaharris@gmail.com'
    },
    role: 'Reception',
    status: 'INACTIVE'
  },
  {
    employeeID: 'ED445678',
    employeeDetails: {
      name: 'MR WILLIAM CLARK',
      roomNo: '113',
      mobileNo: '9521473608',
      emailID: 'williamclark@gmail.com'
    },
    role: 'Gym',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED556789',
    employeeDetails: {
      name: 'MS MIA LEWIS',
      roomNo: '114',
      mobileNo: '8412569034',
      emailID: 'mialewis@gmail.com'
    },
    role: 'Spa',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED667890',
    employeeDetails: {
      name: 'MR BENJAMIN HALL',
      roomNo: '115',
      mobileNo: '9154623087',
      emailID: 'benjaminhall@gmail.com'
    },
    role: 'Swimming Pool',
    status: 'INACTIVE'
  },
  {
    employeeID: 'ED778901',
    employeeDetails: {
      name: 'MS CHARLOTTE ALLEN',
      roomNo: '116',
      mobileNo: '8754623190',
      emailID: 'charlotteallen@gmail.com'
    },
    role: 'Concierge Service',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED889012',
    employeeDetails: {
      name: 'MR LUCAS SCOTT',
      roomNo: '117',
      mobileNo: '9654127803',
      emailID: 'lucasscott@gmail.com'
    },
    role: 'In-Room Control',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED990123',
    employeeDetails: {
      name: 'MS AMELIA KING',
      roomNo: '118',
      mobileNo: '8754123098',
      emailID: 'ameliaking@gmail.com'
    },
    role: 'Order Management',
    status: 'INACTIVE'
  },
  {
    employeeID: 'ED101234',
    employeeDetails: {
      name: 'MR HENRY LEE',
      roomNo: '119',
      mobileNo: '9521034785',
      emailID: 'henrylee@gmail.com'
    },
    role: 'SOS',
    status: 'ACTIVE'
  },
  {
    employeeID: 'ED111345',
    employeeDetails: {
      name: 'MS GRACE WALKER',
      roomNo: '120',
      mobileNo: '8796543201',
      emailID: 'gracewalker@gmail.com'
    },
    role: 'Chat',
    status: 'ACTIVE'
  }
];
