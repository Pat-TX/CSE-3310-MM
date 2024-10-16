import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { styles } from '../style';
import Modal from "react-native-modal";
import { MultiSelect } from 'react-native-element-dropdown';
import { doc, setDoc } from 'firebase/firestore';
import { mechsCollection } from '../../../FirebaseConfig';

function MechRegister({navigation}) {

  // For auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // For database
  const db = FIREBASE_DB;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [servicesOffered, setServicesOffered] = useState([]);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    servicesOffered: [],
    serviceArea: ""
  });



  // Profile customization modal, captures data for name, location, etc
  const [isModalVisible, setModalVisible] = useState(false);

  // Array to hold mechanic services
  const mechServices = [
    { label: 'Oil Changes', value: 'Oil Changes' },
    { label: 'Brake Services', value: 'Brake Services' },
    { label: 'Tire Services', value: 'Tire Services' },
    { label: 'Engine Diagnostics', value: 'Engine Diagnostics' },
    { label: 'Transmission Repair', value: 'Transmission Repair' },
    { label: 'Suspension and Steering Repair', value: 'Suspension and Steering Repair' },
    { label: 'Battery Replacement', value: 'Battery Replacement' },
    { label: 'AC and Heating Repair', value: 'AC and Heating Repair' },
    { label: 'Exhaust System Repair', value: 'Exhaust System Repair' },
    { label: 'Alignment and Balancing', value: 'Alignment and Balancing' },
    { label: 'Fluid Checks and Refills', value: 'Fluid Checks and Refills' },
    { label: 'Electrical System Repair', value: 'Electrical System Repair' },
    { label: 'Tune-Ups', value: 'Tune-Ups' },
    { label: 'Fuel System Repair', value: 'Fuel System Repair' },
    { label: 'Bodywork and Collision Repair', value: 'Bodywork and Collision Repair' },
    { label: 'Inspection Services', value: 'Inspection Services' }
  ];

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
      const docRef = doc(mechsCollection, auth.currentUser.uid);
      const response = await setDoc(docRef, {
        uid: auth.currentUser.uid,
        firstName,
        lastName,
        serviceArea,
        role: "mechanic",
        servicesOffered
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
          <Text style={[styles.header2, styles.modalDesc]}>Let's get to know you.</Text>

          <Text style={styles.modalDesc}>First Name</Text>
          <TextInput style={styles.modalInput} value={firstName} placeholder='John' autoCapitalize='none' onChangeText={(text) => setFirstName(text)}></TextInput>
          <Text style={styles.modalDesc}>Last Name</Text>
          <TextInput style={styles.modalInput} value={lastName} placeholder='Smith' autoCapitalize='none' onChangeText={(text) => setLastName(text)}></TextInput>
          <Text style={styles.modalDesc}>Location</Text>
          <TextInput style={styles.modalInput} value={serviceArea} placeholder='Fort Worth, TX' autoCapitalize='none' onChangeText={(text) => setServiceArea(text)}></TextInput>
          <Text style={styles.modalDesc}>Services</Text>

          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={mechServices}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select services"
            searchPlaceholder="Search..."
            value={servicesOffered}
            onChange={item => {
              setServicesOffered(item);
            }}
            selectedStyle={styles.selectedStyle}
          />

          <TouchableOpacity style={styles.buttonStyle} onPress={() => { addToDB(); toggleModal(); navigation.navigate('MechLogin');}}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

export default MechRegister;