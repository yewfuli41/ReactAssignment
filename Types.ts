export type RootStackParamList = {
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
  BookingDetails: undefined;
  BookingConfirm: {
    serviceName: string; 
    dentistName: string; 
    appointmentDate: string; 
    timeSlot:string;
    calculateTotal:(serviceName:string)=>number
  };
  LoginMain: undefined;
  Home: undefined;
};