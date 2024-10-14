import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header1: {
      fontSize: 40,
      paddingBottom: 15,  
    },
    header2: {
      fontSize: 20,
      paddingBottom: 30,  
    },
    buttonStyle: {
      elevation: 8,
      backgroundColor: "#435F8E",
      borderRadius: 15,
      paddingVertical: 10,
      width: Dimensions.get('window').width - 50,  
      margin: 10,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      alignSelf: "center",
      color: 'white',
    },
    logo: {
      alignItems: "center",
      justifyContent: "center",
      width: 150,
      height: 150,
      margin: 20,
    },
    input: {
      backgroundColor: '#fff',
      height: 50,
      borderRadius: 4,
      borderWidth: 1,
      padding: 10,
      margin: 5,
      width: Dimensions.get('window').width - 50,
    },
  });