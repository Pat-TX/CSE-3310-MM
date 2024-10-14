import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { styles } from '../style';
import Modal from "react-native-modal";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

function MechRegister(props) {

  // For auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // Profile customization modal, captures data for name, location, etc
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);

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
          <TextInput style={styles.modalInput} placeholder='John' autoCapitalize='none'></TextInput>
          <Text style={styles.modalDesc}>Last Name</Text>
          <TextInput style={styles.modalInput} placeholder='Smith' autoCapitalize='none'></TextInput>
          <Text style={styles.modalDesc}>Location</Text>
          <TextInput style={styles.modalInput} placeholder='Fort Worth, TX' autoCapitalize='none'></TextInput>
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
            value={selected}
            onChange={item => {
              setSelected(item);
            }}
            selectedStyle={styles.selectedStyle}
          />

          <TouchableOpacity style={styles.buttonStyle} onPress={() => { toggleModal(); }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

export default MechRegister;