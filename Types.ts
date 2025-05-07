export type RootStackParamList = {
  BookingHome: undefined;
  ProfileScreen: undefined;
  UserProfile: undefined;
  EditProfile: {
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
  };
  HowToGo: undefined;
  FAQ: undefined;
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
  BookingHistory: undefined;
  BookingUpdate: {
    bookingId: number;
    service: string;
    dentistName: string;
    bookingDate: string;
    timeSlot: string;
    amount: number;
    paymentMethod: string;
  };
  LoginMain: undefined;
  Home: undefined;
 

};