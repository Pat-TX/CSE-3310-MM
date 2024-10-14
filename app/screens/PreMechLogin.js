import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';

function PreMechLogin({navigation}) {
    return (
        <SafeAreaView style={styles.container}>

          <Image 
            style={styles.logo}
            source={require('../assets/icon.png')}
          />

          <Text style={styles.header1}>You've got skills.</Text>
          <Text style={styles.header2}>We've got people needing them.</Text>

          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('MechLogin')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('MechRegister')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

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
    header2: {
      fontSize: 20,
      paddingBottom: 30,  
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
  });

export default PreMechLogin;