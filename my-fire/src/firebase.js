import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword,updateProfile,updatePassword, signInWithEmailAndPassword,sendEmailVerification, onAuthStateChanged, signOut} from "firebase/auth"
import toast from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";




  const firebaseConfig = { 
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const register = async (email, password) => {
 try {
    const {user} =  await createUserWithEmailAndPassword(auth, email, password)
 return user
 } catch (error) {
    
 }
}
export const login = async(email, password) => {
    try {
    const {user} = await signInWithEmailAndPassword(auth, email, password)
    return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const logout = async() => {
    try {
   const a = await signOut(auth)
    return true
    } catch (error) {
        toast.error(error.message)
    }
}

export const update = async data => {
 try {
  await updateProfile(auth.currentUser, data)
  toast.success('Profil güncellendi')
  return true
 } catch (error){
  toast.error(error.message)
 }
}

export const resetPassword = async password => {
  try {
   await updatePassword(auth.currentUser, password)
   toast.success('Parolanız güncellendi')
   return true
  } catch (error){
   toast.error(error.message)
  }
 }

export const emailVerication = async() => {
  try{
    await sendEmailVerification(auth.currentUser)
    toast.success(`Doğrulama Maili ${auth.currentUser.email} adresine gönderildi, lütfen kontrol edin`)
  }catch (error) {
 toast.error(error.message)
  }
}
onAuthStateChanged(auth, (user) => {
  if (user) {
  store.dispatch(loginHandle({
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    uid: user.uid
  }))
  } else {
   store.dispatch(logoutHandle())
  }
});
export default app;
