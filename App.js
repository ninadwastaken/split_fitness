import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import TabNavigation from "./TabNavigation";
import AuthScreen from './screens/AuthScreen';

const firebaseConfig = {
    apiKey: "AIzaSyAPb93qPZSN6XXVPuVn7vpSbP1Yw6gHmC4",
    authDomain: "split-fitness-eb3af.firebaseapp.com",
    projectId: "split-fitness-eb3af",
    storageBucket: "split-fitness-eb3af.appspot.com",
    messagingSenderId: "102806762892",
    appId: "1:102806762892:web:46ee1d26d1961d226ad2a9",
    measurementId: "G-KDCX7Z6SR2"
};

const app = initializeApp(firebaseConfig);




export default App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');

    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);


    const handleAuthentication = async () => {
        try {
            if (user) {
                // If user is already authenticated, log out
                console.log('User logged out successfully!');
                await signOut(auth);
            } else {
                // Sign in or sign up
                if (isLogin) {
                    // Sign in
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('User signed in successfully!');
                } else {
                    // Sign up
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log('User created successfully!');
                }
            }
        } catch (error) {
            console.error('Authentication error:', error.message);
            alert(error.message);
        }
    };

    return (
        <View
            // contentContainerStyle={styles.container}
            style={styles.container}
        >
            {user ? (
                // Show user's email if user is authenticated
                <TabNavigation/>
            ) : (
                // Show sign-in or sign-up form if user is not authenticated
                <AuthScreen
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    name={name}
                    setName={setName}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    handleAuthentication={handleAuthentication}
                />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexGrow: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 16,
        // backgroundColor: '#f0f0f0',
    },

});