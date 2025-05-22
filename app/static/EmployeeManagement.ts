import { StatusType } from "./Type";

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
