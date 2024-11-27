import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { styles } from "../newstyle";

function PreMechLogin({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
        <Image 
          style={styles.logo}
          source={require('../../assets/repair.jpg')}
        />
        <Text style={styles.appName}>MOBILE MECH</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.header1}>You've got skills.</Text>
        <Text style={styles.header2}>We've got people needing them.</Text>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("MechLogin")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("MechRegister")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default PreMechLogin;
