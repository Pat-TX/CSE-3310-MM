import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Welcome({navigation}) {
    return (
        <SafeAreaView style={styles.container}>

          <Image 
            style={styles.logo}
            source={require('../assets/icon.png')}
          />

          <Text style={styles.header1}>Welcome in!</Text>
          <Text style={styles.header2}>Let's get you to the right place.</Text>

          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('PreUserLogin')}>
            <Text style={styles.buttonText}>I need auto services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('PreMechLogin')}>
            <Text style={styles.buttonText}>I'm a mechanic</Text>
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

export default Welcome;