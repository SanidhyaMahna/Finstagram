import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
export const AuthContext = React.createContext(); 
import {auth} from '../firebase'
function AuthWrapper({children}) {
    console.log("in the wrapper");
    //feature created
    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    const store = {
        login
    }

    return (
        <AuthContext.Provider value={store}>
            { children }
        </AuthContext.Provider>
      
    )
  }

export default AuthWrapper;