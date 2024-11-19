import { StyleSheet, Dimensions } from "react-native";

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingVertical: 24 
    },
    header: { 
        paddingHorizontal: 16 
    },
    title: { 
        fontSize: 32, 
        fontWeight: '700', 
        color: '#1d1d1d', 
        marginBottom: 12 
    },
    picker: { 
        flex: 1, 
        maxHeight: 74, 
        paddingVertical: 12 
    },
    subtitle: { 
        fontSize: 17, 
        fontWeight: '600', 
        color: '#999999', 
        marginBottom: 12 
    },
    item: { 
        flex: 1, 
        height: 50, 
        marginHorizontal: 4, 
        borderWidth: 1, 
        borderRadius: 8 
    },
    itemRow: { 
        width, flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 12 
    },
    itemWeekday: { 
        fontSize: 13, 
        fontWeight: '500', 
        color: '#737373', 
        marginBottom: 4 
    },
    itemDate: { 
        fontSize: 15, 
        fontWeight: '600', 
        color: '#111' 
    },
    appointmentCard: { 
        backgroundColor: '#f9f9f9', 
        padding: 16, 
        marginBottom: 16, 
        borderRadius: 8 },
    cardTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 8 
    },
    cardText: { 
        fontSize: 14, 
        marginBottom: 4 
    },
    actionButton: { 
        backgroundColor: '#007aff', 
        padding: 8, 
        borderRadius: 4, 
        marginTop: 8 
    },
    actionButtonText: { 
        color: '#fff', 
        textAlign: 'center' 
    },
    noAppointments: { 
        textAlign: 'center', 
        marginTop: 20, 
        fontSize: 16, 
        color: '#999' 
    },
  
    
  });