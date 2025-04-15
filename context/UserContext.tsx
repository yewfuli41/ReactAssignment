import React, { createContext, useState, useContext } from 'react';

type UserData = {
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
};

type UserContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

export type ValidationErrors = {
    name?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
  };

  export const validateUserData = (userData: UserData): ValidationErrors => {
    const newErrors: ValidationErrors = {};
  
    if (!userData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(userData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
  
    if (!userData.email || !userData.email.includes('@')) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Email format is invalid";
    }
  
    if (!userData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{3}-\d{7}$/.test(userData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone format should be XXX-XXXXXXX';
    }
  
    return newErrors;
  };
  

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    dateOfBirth: "2000-01-01",
    phoneNumber: "011-1213141",
    gender: "Male",
  });

  const contextValue = {
    userData,
    setUserData,
    validateUserData, // Add the validation function to context
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};