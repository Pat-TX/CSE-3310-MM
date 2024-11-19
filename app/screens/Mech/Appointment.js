import React, { useState, useRef, useMemo } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import { styles } from '../mechstyle';
const { width } = Dimensions.get('window');


const sampleAppointments = [
  { id: 1, customer: 'Margaret Roche', time: '10:00 AM', service: 'Oil Change', contact: '123-456-7890', date: new Date() },
  { id: 2, customer: 'Sujana Kabir', time: '11:30 AM', service: 'Tire Replacement', contact: '903-654-2024', date: new Date() },
  { id: 3, customer: 'Jonathan Hor', time: '2:00 PM', service: 'Electrical System Repair', contact: '555-555-5555', date: new Date(new Date().setDate(new Date().getDate() + 2)) },
];

export default function MechanicAppointments() {
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const flatListRef = useRef(null);

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

  const filteredAppointments = sampleAppointments.filter(
    (appointment) => appointment.date.toDateString() === value.toDateString()
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Schedule</Text>
        </View>

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
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
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

        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>
            Appointments for {value.toDateString()}
          </Text>
          <FlatList
            data={filteredAppointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.appointmentCard}>
                <Text style={styles.cardTitle}>{item.customer}</Text>
                <Text style={styles.cardText}>Time: {item.time}</Text>
                <Text style={styles.cardText}>Service: {item.service}</Text>
                <Text style={styles.cardText}>Contact: {item.contact}</Text>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => console.log(`Completed ${item.id}`)}
                >
                  <Text style={styles.actionButtonText}>Mark as Completed</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noAppointments}>
                No upcoming appointments
              </Text>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

