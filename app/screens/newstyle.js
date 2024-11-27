import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingTop: 10,
  },
  topSection: {
    flex: 3,
    backgroundColor: '#a363ff',
    alignItems: 'center',
    justifyContent: 'center',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    paddingTop: 30,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,  
  },
  appName: {
    color: '#fff',
    fontSize: 30,
    marginTop: 10,
    fontWeight: 'bold',
  },
  box: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 60,
    marginTop: -20, // To overlap the box with the top section
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  header1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  header2: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: "#a363ff",
    borderRadius: 25,
    paddingVertical: 15,
    width: width * 0.8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
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
input: {
    width: width * 0.8,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: "#007BFF",
    textAlign: "center",
    fontSize: 14,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  modal1: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modal1Header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalDesc: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  modalInput: {
    width: width * 0.8,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  dropdown: {
    width: width * 0.8,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ccc',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
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
    padding: 12,
  },
});
