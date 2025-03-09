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
      emailID: 'johndoe@gmailcom'
    },
    role: 'Housekeeping',
    status: 'ACTIVE'
  }
];
