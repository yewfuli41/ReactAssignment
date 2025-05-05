import React, { createContext, useState, useContext } from 'react';
import { _getUserInfo } from '../LoginScreen/functions';

type UserData = {
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
};

type UserContextType = {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  validateUserData: (userData: UserData) => ValidationErrors;
  fetchUserData: (email: string, password: string) => Promise<void>;
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
  } else if (!/^\d{7,8}$/.test(userData.phoneNumber)) {
    newErrors.phoneNumber = 'Phone format should be 7 numbers';
  }

  return newErrors;
};


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>({
    name: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
  });

  const fetchUserData = async (email: string, password: string) => {
    try {
      const user = await _getUserInfo(email, password);
      if (user) {
        setUserData({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.birthDate,
          gender: user.gender,
        });
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const contextValue = {
    userData,
    setUserData,
    validateUserData, // Add the validation function to context
    fetchUserData,
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