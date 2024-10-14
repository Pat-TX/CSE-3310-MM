import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';

function MechRegister(props) {
    return (
        <SafeAreaView style={styles.container}>

          <Image 
            style={styles.logo}
            source={require('../assets/icon.png')}
          />

          <Text style={styles.header1}>Registration</Text>

          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Sign up</Text>
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

export default MechRegister;