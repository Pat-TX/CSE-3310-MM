import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { styles } from '../style';

function MechLogin({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const db = FIREBASE_DB;

    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);

        const docRef = doc(db, "mechanics", auth.currentUser.uid);
        const docSnapshot = await getDoc(docRef);
      
        if(!(docSnapshot.exists()))
        {
          throw error = "User not found";
        }

        console.log(response);
      } catch (error) {
        alert('Sign in failed: ' + error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    return (
        <SafeAreaView style={styles.container}>
          
          <Image 
            style={styles.logo}
            source={require('../../assets/icon.png')}
          />

          <Text style={styles.header1}>Login</Text>

          <TextInput style={styles.input} value={email} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} ></TextInput>
          <TextInput style={styles.input} value={password} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true} ></TextInput>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => { signIn(); if(auth.currentUser) navigation.navigate('MechHome');}}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
          
        </SafeAreaView>
      );
}

export default MechLogin;