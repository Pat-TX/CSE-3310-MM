import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styles } from "../newstyle";

function CreditCardPayment({ navigation }) {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handleConfirmPayment = () => {
    alert('Payment confirmed');
    navigation.goBack(); // Navigate back after confirming payment
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
      <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
        <Text style={styles.paymentHeader}>Enter Credit Card Information</Text>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        {/* Card Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />

        {/* Expiry Date Input */}
        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        {/* CVV Input */}
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          secureTextEntry
        />

        {/* Billing Address Input */}
        <TextInput
          style={styles.input}
          placeholder="Billing Address"
          value={billingAddress}
          onChangeText={setBillingAddress}
        />

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleConfirmPayment}
        >
          <Text style={styles.buttonText}>Confirm Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default CreditCardPayment;
