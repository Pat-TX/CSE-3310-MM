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
import { styles } from "../style";

function PreMechLogin({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require("../../assets/MobileMech.png")}
      />

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
    </SafeAreaView>
  );
}

export default PreMechLogin;
