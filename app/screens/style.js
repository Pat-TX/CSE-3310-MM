import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

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
      backgroundColor: "white",
      borderRadius: 15,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      
    },
    modal1Header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
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
    modalContainer: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: "#007BFF",
      padding: 10,
      borderRadius: 5,
      alignSelf: "flex-end",
    },
    closeButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    mechanicCard: {
      backgroundColor: "#f9f9f9",
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      elevation: 3,
    },
    mechanicName: {
      fontSize: 18,
      fontWeight: "bold",
    },
    mechanicLocation: {
      fontSize: 16,
      color: "#666",
    },
    conversationList: {
      padding: 10,
    },
    conversationItem: {
      backgroundColor: "#ffffff",
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    conversationName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    conversationLastMessage: {
      fontSize: 14,
      color: "#666",
      marginTop: 4,
    },
    modalConvoContainer: {
      flex: 1,
      backgroundColor: "#ffffff",
      padding: 20,
    },
    modalConvoTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    messageBubble: {
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    messageBubbleYou: {
      backgroundColor: "#d1f8ff",
      alignSelf: "flex-end",
    },
    messageBubbleOther: {
      backgroundColor: "#f0f0f0",
      alignSelf: "flex-start",
    },
    messageText: {
      fontSize: 18,
    },
    messageTextYou: {
      color: "#007aff",
    },
    messageTextOther: {
      color: "#000000",
    },
    closeConvoButton: {
      marginTop: 20,
      backgroundColor: "#007aff",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    closeConvoButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
    },
    convoContainer: {
      flex: 1,
      backgroundColor: "#f8f8f8",
    },
    messagesTitle: {
      fontSize: 24,
      fontWeight: "bold",
      padding: 20,
      textAlign: "center",
      backgroundColor: "#ffffff",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    messageInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: "#ddd",
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    messageInput: {
      flex: 1,
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 20,
      paddingHorizontal: 15,
      fontSize: 18,
      borderWidth: 1,
      borderColor: "#ccc",
      shadowColor: "#000",
      elevation: 1,
    },
    sendButton: {
      marginLeft: 10,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    sendButtonImg: {
      width: 30,
      height: 30,
    },
    goBackButton: {
        position: 'absolute',
        top: 25,
        left: 25,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#ddd',
    },
    goBackText: {
        color: '#333',
        fontSize: 16,
    },
    safeArea: {
      flex: 1,
  },
  bottomContainer: {
    flex: 1, // Takes up all remaining space, pushing the button to the bottom
    justifyContent: 'flex-end', // Aligns the button at the bottom
    paddingBottom: 20, // Adds some spacing from the bottom of the screen
    width: '100%',
  },
  signOutButton: {
    backgroundColor: "#FF6347", 
    paddingVertical: 10,
    marginTop: 50,
    elevation: 3,
    borderRadius: 15,
    width: Dimensions.get('window').width - 50,  
    margin: 10,
    alignSelf: 'center',
  },
  signOutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: 'center',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  selectedButton: {
    backgroundColor: '#007aff',
  },
  paymentStyle: {
    elevation: 8,
    backgroundColor: "#007aff",
    borderRadius: 15,
    paddingVertical: 10,
    width: Dimensions.get('window').width - 250,  
    margin: 10,
  },
  paymentText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: 'white',
  },
  paymentHeader: {
    fontSize: 22,
    //fontWeight: "bold",
    color: '#171515',
    paddingBottom: 25,  
  },
  paymentlogo: {
    position: 'absolute',
    top: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 150,
    margin: 100,
  },
  pay: {
    position: 'absolute',
    top: 400,
    alignItems: "center",
    justifyContent: "center",
    width: 500,
    height: 150,
    margin: 100,
  },
  forgotPasswordText: {
    color: "#007BFF",
    textAlign: "center",
    fontSize: 14,
  },
  });