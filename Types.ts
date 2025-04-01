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
    calculateTotal:(serviceName:string)=>number};
  
  ProfileScreen: undefined,
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
};