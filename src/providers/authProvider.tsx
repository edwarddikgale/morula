import React, { ReactNode, useEffect, useState, useContext, createContext } from 'react';
import { auth } from '../config/firebase';
import { Auth, UserCredential, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
  
  export const LocalCacheUserKey = "user";

  export interface AuthProviderProps {
    children?: ReactNode
  }
  
  export interface UserContextState {
    isAuthenticated: boolean
    isLoading: boolean
    id?: string
  }
  
  export const UserStateContext = createContext<UserContextState>(
    {} as UserContextState,
  )

  export interface AuthContextModel {
    auth: Auth
    user: User | null
    signIn: (email: string, password: string) => Promise<UserCredential>
    signUp: (email: string, password: string) => Promise<UserCredential>
    sendPasswordResetEmail?: (email: string) => Promise<void>
    resetPassword: (email: string) => Promise<void>
    signOut: () => Promise<void>; // Add the signOut function
  }
  
  export const AuthContext: React.Context<AuthContextModel> = React.createContext<AuthContextModel>({} as AuthContextModel)
  
  export function useAuth(): AuthContextModel {
    return useContext(AuthContext)
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>(null)
  
    function signUp(email: string, password: string): Promise<UserCredential> {
      return createUserWithEmailAndPassword(auth, email, password)
    }
  
    function signIn(email: string, password: string): Promise<UserCredential> {
      return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email: string): Promise<void> {
      return sendPasswordResetEmail(auth, email)
    }

    function handleSignOut(): Promise<void> {
      localStorage.removeItem(LocalCacheUserKey);
      return auth.signOut(); // Call the signOut function from firebase/auth
    }

    useEffect(() => {
      //function that firebase notifies you if a user is set
      const unsubsrcibe = auth.onAuthStateChanged((user) => {
        if(user){
          localStorage.setItem(LocalCacheUserKey, JSON.stringify(user));
        }
        else{
          localStorage.removeItem(LocalCacheUserKey);
        }
        
        setUser(user)
      })
      return unsubsrcibe
    }, [])

    useEffect(() => {
      const cachedUser = localStorage.getItem(LocalCacheUserKey);
      if(cachedUser){
        setUser(JSON.parse(cachedUser));
      }
    }, [])
  
    const values = {
      signUp,
      user,
      signIn,
      resetPassword,
      signOut: handleSignOut,
      auth,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  }
  
  export const useUserContext = (): UserContextState => {
    return useContext(UserStateContext);
  }