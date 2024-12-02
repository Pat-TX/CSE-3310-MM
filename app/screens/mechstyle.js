import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // General container styles
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingTop: 67,
  },
  container1: {
    flex: 1,
    //paddingVertical: 24,
    //paddingTop: 67,
  },
  topSection: {
    flex: .2,
    backgroundColor: '#a363ff', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    //borderBottomLeftRadius: 30,
    //borderBottomRightRadius: 30,
  },

  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff', 
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },

  // Picker styles
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Item styles
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 14,
    fontWeight: '600', 
    color: '#666', 
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 16,
    fontWeight: '700', 
    color: '#333', 
  },
  activeItem: {
    backgroundColor: '#a363ff',
    borderColor: '#a363ff',
  },
  
  activeItemText: {
    color: 'white', 
  },
  

  // Placeholder styles
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  // Button styles
  btn: {
    elevation: 8,
    backgroundColor: '#a363ff',
    borderRadius: 15,
    paddingVertical: 10,
    width: width - 20,
    margin: 10,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },

  // Appointment-specific styles
  appointmentCard: {
    backgroundColor: '#ceaffa',
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  actionButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  noAppointments: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },

  // Slot card styles
  slotCard: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignItems: 'center',
  },
  slotText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  // Go back button styles
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
});
