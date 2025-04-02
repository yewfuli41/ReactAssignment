const users = [
  { email: 'meimei@gmel.com', password: '12345' },

];

export const isUser = (email, pwd) => {
  const user = users.find((u) => u.email === email); 
  if (!user) return "Incorrect email!";
  if (user.password !== pwd) return "Incorrect password!";
  return null;
};

export const showErrorMessage = (msg, setError) => {
  setError(msg); // Fix: Pass `setError` from the component
};

export const authentication = (email, password, setError) => {
  const errorMsg = isUser(email, password);
  if (errorMsg) {
    showErrorMessage(errorMsg, setError); 
    return false;
  }
  setError('');
  return true;
};

  export function handleRegister(email, name, mobile, password, confirmPassword, setErrors) {
    let errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobilePattern = /^\+?\d{9,14}$/; 
  
    // email validation
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email";
    } else if (users.some(user => user.email === email)) {
      errors.email = "Email already registered";
    }
  
    // name validation
    if (!name) {
      errors.name = "Name is required";
    }
    
    // mobile
    if (!mobile) {
      errors.mobile = "Phone number is required";
    } else if (!mobilePattern.test(mobile)) {
      errors.mobile = "Invalid phone number (9-14 digits exclude -)";
    }
  
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (typeof setErrors === 'function') {
      setErrors(errors);
    }
  
    return Object.keys(errors).length === 0; // true if no errors
  }
