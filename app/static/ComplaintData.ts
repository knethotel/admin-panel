export type ComplaintDataType = {
  complaintID: string;
  complaintTime: {
    date: string;
    time: string;
  };
  hotelId: string;
  complaintType: string;
  status: string;
  assignedTo: string;
  guestId?: string;
  employeeID?: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  feedback?: string;
};