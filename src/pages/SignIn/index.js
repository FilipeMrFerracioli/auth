import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { useAuth } from '../../contexts/auth';


//import authService from '../../services/auth';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default function SignIn() {

    const { signed, setSigned, signIn } = useAuth();

    const handleSignIn = async () => {
        try {
            console.log('User logged status: ' + signed);
            // formulario
            await signIn();
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
}