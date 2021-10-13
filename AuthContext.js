import React, { useState } from 'react';
import firebase from './Config'

export const AuthContextUser = React.createContext({
    user: '',
    setUser: () => {},
  });

export function AuthContextProvider({children}) {
    const [currentUser,setUser] = useState(null);
    return (
        <AuthContextUser.Provider
            value={currentUser,setUser}
        >
            {children}
        </AuthContextUser.Provider>
    );
}