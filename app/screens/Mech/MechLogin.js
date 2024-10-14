import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

function MechLogin(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
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
              <TouchableOpacity style={styles.buttonStyle} onPress={signIn}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
          
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header1: {
      fontSize: 40,
      paddingBottom: 15,  
    },
    buttonStyle: {
      elevation: 8,
      backgroundColor: "lightblue",
      borderRadius: 15,
      paddingVertical: 10,
      width: Dimensions.get('window').width - 50,  
      margin: 10,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      alignSelf: "center",
    },
    logo: {
      alignItems: "center",
      justifyContent: "center",
      width: 150,
      height: 150,
      margin: 20,
    },
    input: {
      backgroundColor: '#fff',
      height: 50,
      borderRadius: 4,
      borderWidth: 1,
      padding: 10,
      margin: 5,
      width: Dimensions.get('window').width - 50,
    },
  });

export default MechLogin;