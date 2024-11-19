import { StyleSheet, Dimensions } from "react-native";

const {height, width} = Dimensions.get('window');

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
      backgroundColor: "#007aff",
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
    modal1: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'left',
      justifyContent: 'center',
    },
    modalDesc: {
      paddingLeft: 15,
      fontSize: 16,
    },
    modalInput: {
      backgroundColor: '#fff',
      height: 50,
      borderRadius: 4,
      borderWidth: 1,
      padding: 10,
      margin: 5,
      marginBottom: 15,
      width: Dimensions.get('window').width - 50,
    },
    dropdown: {
      margin: 5,
      height: 50,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      width: Dimensions.get('window').width - 50,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 10,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    selectedStyle: {
      borderRadius: 20,
      margin: 5,
    },
    userProfileContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 10,
      marginLeft: 15,
      width: '100%',
      position: 'relative',
    },
    userImg: {
      width: width / 3,
      height: width / 3,
      borderRadius: width / 6,
    },
    editUserButton: {
      position: 'absolute',
      top: 15,
      right: 20,
      width: width / 18,
      height: width / 18,
      overflow: 'hidden',
      zIndex: 1,
    },
    editUserButtonImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    userTextContainer: {
      marginLeft: 20,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 0,
    },
    userLocation: {
      fontSize: 16,
      color: 'gray',
      marginTop: 5,
    },
    mechBar: {
      height: 5,
      backgroundColor: 'light gray',
      marginTop: 20,
      width: '100%',
    },
    starContainer: {
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: 0,
      marginTop: 5,
      bottom: -65,
    },
    star: {
      marginHorizontal: 3,
    },
    searchTitle: {
      fontSize: 20,
      paddingBottom: 40,
      paddingTop: 40,
      paddingLeft: 20,
      paddingRight: 20,
      fontWeight: 'bold',  
    },
    gridContainer: {
      marginTop: 20,
      width: '90%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    serviceButton: {
      backgroundColor: '#f0f0f0',
      width: '48%', // Each button takes 48% of the container width
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      shadowColor: '#000', // Shadow color
      shadowOffset: { width: 0, height: 2 }, // Offset for shadow
      shadowOpacity: 0.3, // Opacity of the shadow
      shadowRadius: 4, // Blur radius of the shadow
      elevation: 3, // Required for Android to enable shadows
    },
    serviceButtonText: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
    buttonImage: {
      width: 70,
      height: 70,
      marginBottom: 5,
    },
  });