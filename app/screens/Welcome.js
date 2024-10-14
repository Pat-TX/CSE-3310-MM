import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from './style';

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

export default Welcome;