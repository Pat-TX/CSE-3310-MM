import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { styles } from '../style';
import Modal from "react-native-modal";
import { doc, setDoc } from 'firebase/firestore';
import { customersCollection } from '../../../FirebaseConfig';

function UserRegister({navigation}) {

  // For auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // For database
  const db = FIREBASE_DB;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [area, setArea] = useState('');

  // Profile customization modal, captures data for name, area
  const [isModalVisible, setModalVisible] = useState(false);

  // Method to enable or disable modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  // Registration logic
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Check your email to validate account!');
      toggleModal();
    } catch (error) {
      console.log(error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  // Adding to database logic
  const addToDB = async () => {
    try {
      const docRef = doc(customersCollection, auth.currentUser.uid);
      const response = await setDoc(docRef, {
        uid: auth.currentUser.uid,
        firstName,
        lastName,
        area,
        role: "customer"
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <SafeAreaView style={styles.container}>

      <Image
        style={styles.logo}
        source={require('../../assets/icon.png')}
      />

      <Text style={styles.header1}>Registration</Text>

      <TextInput style={styles.input} value={email} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} ></TextInput>
      <TextInput style={styles.input} value={password} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true} ></TextInput>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => { signUp(); }}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </>
      )}

<Modal isVisible={isModalVisible}>
        <View style={styles.modal1}>
          <Text style={[styles.header2, styles.modalDesc]}>Welcome in!</Text>

          <Text style={styles.modalDesc}>First Name</Text>
          <TextInput style={styles.modalInput} value={firstName} placeholder='John' autoCapitalize='none' onChangeText={(text) => setFirstName(text)}></TextInput>
          <Text style={styles.modalDesc}>Last Name</Text>
          <TextInput style={styles.modalInput} value={lastName} placeholder='Smith' autoCapitalize='none' onChangeText={(text) => setLastName(text)}></TextInput>
          <Text style={styles.modalDesc}>Location</Text>
          <TextInput style={styles.modalInput} value={area} placeholder='Fort Worth, TX' autoCapitalize='none' onChangeText={(text) => setArea(text)}></TextInput>

          <TouchableOpacity style={styles.buttonStyle} onPress={() => { addToDB(); toggleModal(); navigation.navigate('UserLogin'); }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

export default UserRegister;