export type RootStackParamList = {
  BookingHome: undefined;
  BookingDetails: {
    serviceName:string;
    calculateTotal:(serviceName:string)=>number};
  BookingConfirm: {
    serviceName: string; 
    dentistName: string; 
    appointmentDate: string; 
    timeSlot:string;
    calculateTotal:(serviceName:string)=>number
  };
};