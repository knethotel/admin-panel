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
};