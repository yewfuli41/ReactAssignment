let SQLite = require('react-native-sqlite-storage');

/**
 * notes: I use promise constructor because have 2 methods: resolve and reject
 * reference: MDN documentation : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */

const openCallback = () => {
  console.log('database open success');
}

const errorCallback = (err) => {
  console.error('Error in opening the database: ' + err);
}
let db = SQLite.openDatabase(
    {name: 'database.sqlite', createFromLocation: '~database.sqlite'},
    openCallback,
    errorCallback,
)

export const _getUserInfo = (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (tx, results) => { 
          if (results.rows.length > 0) {
            resolve(results.rows.item(0)); 
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

const _getUserByEmail = (email)=>{
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (tx, results) => { 
          if (results.rows.length > 0) {
            resolve(results.rows.item(0)); 
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  });

}

const isUser = async (email, pwd) => {
  // check empty
  if(email.trim()==="") return "Email cannot be empty!";
  if (pwd.trim() === "") return "Password cannot be empty!";
 
  // check user exist
  const user = await _getUserInfo(email, pwd);
  if (!user) {
    return "Incorrect email or password!";
  }
  return null;
};


export const authentication = async(email, password) => {
  const errorMsg = await isUser(email, password);
  if (errorMsg) {
   return errorMsg;
}};

  export const dialingCode = [ // hard code dialing code
    { key: "MY", value: "+60" },
    { key: "IDN", value: "+62" },
    { key: "PH", value: "+63" },
    { key: "SG", value: "+65" },
    { key: "TH", value: "+66" },
  ];
  export async function handleRegister(email, name, mobile, password, confirmPassword, setErrors) {
    let errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobilePattern = /^\d{9,14}$/; 
  
    // email validation
    if (!email||email.trim()==="") {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format";
    } else{
      const user = await _getUserByEmail(email); 
    if (user) {
      errors.email = "Email already registered";
    }
    }
  
    // name validation
    let nam = name.toUpperCase()
    if (!nam || nam.trim() === "") {
      errors.name = "Name is required";
    }
    
    // mobile

    if (!mobile) {
      errors.mobile = "Phone number is required";

    }

    if(!mobilePattern.test(mobile)) {
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
