import {firebase, googleAuthProvider} from "../firebase/firebase";

export const login = (uid) => ({
    type: "LOGIN",
    uid
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};
// --> Asynchronous func. 
// Because I call things from firebase, I need my reference to firebase --> I need to import firebase
// Pass the auth function to a function and this starts the process
// .  popup --> Takes the provider as the only argument
//         '--> display a little popup, pick your account and then you're authenticated

export const logout = () => ({
    type: "LOGOUT"
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};


// HAVE THE ID IF USER LOGS IN, HAVE NOTHING IF USER LOGS OUT