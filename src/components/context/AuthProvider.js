import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(false);

    
    const loginWithGoogle = (provider) =>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }

    

    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)

    }

    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }


    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }
    


    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
                // console.log('user inside state change', currentUser)
                setUser(currentUser)
                
                setLoading(false)
            })
            return () =>{
                unsubscribe()
            }
        },[])


    const authInfo = {user,loginWithGoogle, logOut,createUser,signIn,loading,setLoading,updateUserProfile}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
            {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;