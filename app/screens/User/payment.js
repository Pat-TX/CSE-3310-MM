import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from '../newstyle'; 

function Payment({ navigation }) {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
    alert(`Payment method selected: ${method}`);
  };

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
          style={styles.paymentlogo}
          source={require('../../assets/handpay.png')}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.paymentHeader}>Please Select Your Payment Method</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[styles.paymentStyle, paymentMethod === 'cash' && styles.selectedButton]}
            onPress={() => selectPaymentMethod('cash')}
          >
            <Text style={styles.paymentText}>Cash</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentStyle, paymentMethod === 'credit' && styles.selectedButton]}
            onPress={() => selectPaymentMethod('credit')}
          >
            <Text style={styles.paymentText}>Credit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Payment;
