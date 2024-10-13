import React from 'react';
import { StatusBar } from 'react-native-web';
import { View, StyleSheet, Text } from 'react-native';

function Welcome(props) {
    return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Welcome;