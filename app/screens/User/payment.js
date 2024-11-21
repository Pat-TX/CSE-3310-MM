import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../style';

function Payment({ navigation }) {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
    alert(`Payment method selected: ${method}`);
    // You can add navigation or other logic here if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        style={styles.paymentlogo}
        source={require('../../assets/handpay.png')}
      />

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
      <Image 
        style={styles.pay}
        source={require('../../assets/pay.png')}
      />
    </SafeAreaView>
  );
}


export default Payment;
