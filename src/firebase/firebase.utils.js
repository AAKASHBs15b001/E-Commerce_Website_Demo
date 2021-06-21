import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyB9ePW2k-yc133qM6-DF67RMfdgpDks9KI",
    authDomain: "crwn-clothing-demo-642f7.firebaseapp.com",
    projectId: "crwn-clothing-demo-642f7",
    storageBucket: "crwn-clothing-demo-642f7.appspot.com",
    messagingSenderId: "1037375038547",
    appId: "1:1037375038547:web:ca6a8e15b119f3b16b92a6",
    measurementId: "G-XQE1LX8TTX"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
