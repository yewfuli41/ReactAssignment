// TBA - firebase
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth  from '@react-native-firebase/auth';

export const onGoogleButtonPress =async()=> {
    try {
     
            GoogleSignin.configure({
                webClientId: 'web_client_id',
                
            });
        // trigger Google Sign-In
        await GoogleSignin.hasPlayServices();
        console.log('Play services OK');

        const userInfo = await GoogleSignin.signIn();
        console.log('User Info:', userInfo);

        const { idToken } = userInfo;
        console.log('ID Token:', idToken);

        // Authenticate with Firebase
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);

        console.log('User signed in with Firebase');
        return userInfo;

        
    } catch (error) {
        console.error('Error in Google login:', error.code +" "+ error.message);
    
    }
}

/**
 * 
 * if (!user.email) {
            throw new Error('No email found in Google account');
        }

        const phoneNumber = await promptForPhoneNumber();
        const dialingCode = await promptForDialingCode();

        // Save the Google user along with phone number to SQLite
        db.transaction(tx => {
            tx.executeSql(
                'INSERT OR IGNORE INTO users (name, dialingCode, phoneNumber, email) VALUES (?, ?, ?, ?)',
                [user.displayName, dialingCode || '00', phoneNumber || '0000000000', user.email],
                (tx, results) => {
                    console.log('Google user inserted to local DB', results);
                },
                error => {
                    console.error('DB Insert Error', error);
                }
            );
        });

        Alert.alert('Success', 'Google login successful!');
 *628896047866-rq8mba5m5glqei3egsnfg6htih107jsf.apps.googleusercontent.com
 * 
async function promptForPhoneNumber() {
    return new Promise((resolve) => {
        setResolvePhone(() => resolve);
        setPhoneModalVisible(true);
    });
}

async function promptForDialingCode() {
    return new Promise((resolve) => {
        setResolveDialingCode(() => resolve);
        setDialingCodeModalVisible(true);
    });
}

const handlePhoneSubmit = () => {
    if (resolvePhone) {
        resolvePhone(phoneNumber);
        setPhoneModalVisible(false);
        setPhoneNumber('');
    }
};

const handleDialingCodeSubmit = () => {
    if (resolveDialingCode) {
        resolveDialingCode(dialingCode);
        setDialingCodeModalVisible(false);
        setDialingCode('');
    }
};

 */