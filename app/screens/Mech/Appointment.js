import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import { FIREBASE_DB } from '../../../FirebaseConfig';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { styles } from '../mechstyle';

const { width } = Dimensions.get('window');

export default function MechanicAppointments() {
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState({});
  const flatListRef = useRef(null);

  // Fetch appointments from Firestore
  useEffect(() => {
    const fetchAppointments = () => {
      try {
        const startOfDay = Timestamp.fromDate(new Date(value.setHours(0, 0, 0, 0)));
        const endOfDay = Timestamp.fromDate(new Date(value.setHours(23, 59, 59, 999)));

        const appointmentsRef = collection(FIREBASE_DB, 'appointments');
        const q = query(
          appointmentsRef,
          where('date', '>=', startOfDay),
          where('date', '<=', endOfDay)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedAppointments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAppointments(fetchedAppointments);
        });

        return unsubscribe; // Cleanup on component unmount
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const unsubscribe = fetchAppointments();
    return () => unsubscribe && unsubscribe();
  }, [value]);

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const formatDate = (date, format) => {
    const options =
      format === 'weekday'
        ? { weekday: 'short' }
        : { day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const weeks = useMemo(() => {
    const startOfCurrentWeek = getStartOfWeek(
      new Date(new Date().setDate(new Date().getDate() + week * 7))
    );

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = addDays(startOfCurrentWeek, adj * 7 + index);

        return {
          weekday: formatDate(date, 'weekday'),
          date,
        };
      });
    });
  }, [week]);

  const handleScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (newIndex === 1) return;

    const newWeek = week + (newIndex - 1);
    setWeek(newWeek);
    setValue(addDays(value, (newIndex - 1) * 7));

    setTimeout(() => {
      flatListRef.current.scrollToIndex({ index: 1, animated: false });
    }, 100);
  };

  const markAsCompleted = (id) => {
    setCompletedAppointments((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container1}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <Text style={[styles.title, { color: '#fff' }]}>My Schedule</Text>
        </View>

        {/* Picker Section */}
        <View style={styles.picker}>
          <FlatList
            ref={flatListRef}
            data={weeks}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            initialScrollIndex={1}
            onScrollEndDrag={handleScrollEnd}
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item: dates }) => (
              <View style={styles.itemRow}>
                {dates.map((item, dateIndex) => {
                  const isActive = value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && styles.activeItem, // Apply active styles
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && styles.activeItemText, // Apply active text styles
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && styles.activeItemText, // Apply active text styles
                          ]}
                        >
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            )}
          />
        </View>

        {/* Appointments Section */}
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>
            Appointments for {value.toDateString()}
          </Text>
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isCompleted = completedAppointments[item.id];
              return (
                <View style={styles.appointmentCard}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardText}>Time: {item.time}</Text>
                  <Text style={styles.cardText}>Service: {item.service}</Text>
                  <Text style={styles.cardText}>Contact: {item.contact}</Text>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      isCompleted && { backgroundColor: '#180226' },
                    ]}
                    onPress={() => markAsCompleted(item.id)}
                    disabled={isCompleted}
                  >
                    <Text
                      style={[
                        styles.actionButtonText,
                        isCompleted && { color: '#fff' },
                      ]}
                    >
                      {isCompleted ? 'Completed' : 'Mark as Completed'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.noAppointments}>No upcoming appointments</Text>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
