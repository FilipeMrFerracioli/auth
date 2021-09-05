import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../services/authAxios'

const AuthContexts = createContext({});
// api.defaults.headers.Authorization = `Bearer ${storagedToken}`



export const AuthProvider = ({ children }) => {

    const [signed, setSigned] = useState(null);
    const [user, setUser] = useState(null);
    //const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadStorageData() {
            try {
                const storagedUser = await AsyncStorage.getItem('@Auth:user');
                const storagedToken = await AsyncStorage.getItem('@Auth:token');

                if (storagedUser && storagedToken) {
                    console.log("storagedUser: ", storagedUser);
                    console.log("storagedToken: ", storagedToken);
                    //setUser(storagedUser);
                    //console.log('storaged user: ' + user);
                }

            } catch (error) {
                console.log(error)
            }
        }
        loadStorageData();
    }, []);

    async function signIn() {
        try {
            //const response = await login();
            const { message, token } = await login();

            setUser(message);
            setSigned(true);

            //await AsyncStorage.setItem("@Auth:user" + JSON.stringify(user));
            //await AsyncStorage.setItem('@Auth:token' + JSON.stringify(token));
            
        } catch (error) {
            console.log(error)
        }
    }

    async function signOut() {
        try {
            await AsyncStorage.clear();
            setUser(false);
            setSigned(false);
            
        } catch (error) {
            console.log(error);
        }
    }
    //console.log('pq sign: ',signed)
    return (
        <AuthContexts.Provider value={{ signed: Boolean(user), user, setSigned,/*loading,*/ signIn, signOut }}>
            {children}
        </AuthContexts.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContexts);

    return context;
}