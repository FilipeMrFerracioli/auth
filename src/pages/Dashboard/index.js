import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { useAuth } from '../../contexts/auth';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default function SignIn() {
    const { signOut, signed, setSigned } = useAuth();

    const handleSignOut = async () => {
        try {
            console.log('User logged status: ' + signed);
            await signOut();
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View style={styles.container}>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}