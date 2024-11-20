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

function PreUserLogin({ navigation }) {
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

      <Text style={styles.header1}>Auto services?</Text>
      <Text style={styles.header2}>We've got you covered.</Text>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("UserLogin")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("UserRegister")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default PreUserLogin;
