import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { styles } from "../style";
import { doc, getDoc } from "firebase/firestore";

function UserLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const db = FIREBASE_DB;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, "customers", auth.currentUser.uid);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        throw new Error("User not found");
      }
      console.log(response);
      navigation.navigate("UserHome");
    } catch (error) {
      alert("Sign in failed: " + error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

      <Text style={styles.header1}>Login</Text>

      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      ></TextInput>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              signIn();
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

export default UserLogin;
