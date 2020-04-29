import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBslcMyGGf64vivFNkUuUXBoLwwrD3b5ho",
    authDomain: "crwn-db-3a38b.firebaseapp.com",
    databaseURL: "https://crwn-db-3a38b.firebaseio.com",
    projectId: "crwn-db-3a38b",
    storageBucket: "crwn-db-3a38b.appspot.com",
    messagingSenderId: "407602620110",
    appId: "1:407602620110:web:e0da1f9ea40d046dfc929f",
    measurementId: "G-P0EPLK76XK"
  };

  export const createUserProfileDocument = async (userAuth, addintionalData) => {
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
          ...addintionalData
        })
      } catch (error) {
          console.log('error creating user', error.message);
      }
    }

    return userRef;
  }; 

  firebase.initializeApp(config);

  export const auth =  firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ promt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
