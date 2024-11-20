import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { styles } from '../style';
import { doc, getDoc } from 'firebase/firestore';

function payment({navigation}) {

}

export default payment;