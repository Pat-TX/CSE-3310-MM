import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { styles } from './newstyle';

function Welcome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Image 
          style={styles.logo}
          source={require('../assets/repair.jpg')}
        />
        <Text style={styles.appName}>MOBILE MECH</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.header1}>Welcome in!</Text>
        <Text style={styles.header2}>Let's get you to the right place.</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('PreUserLogin')}>
          <Text style={styles.buttonText}>I need auto services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('PreMechLogin')}>
          <Text style={styles.buttonText}>I'm a mechanic</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Welcome;
