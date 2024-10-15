import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from './style';

function MechHome({navigation}) {
    return (
        <SafeAreaView style={styles.container}>

          <Text style={styles.header1}>Mech Home</Text>

        </SafeAreaView>
      );
}

export default MechHome;