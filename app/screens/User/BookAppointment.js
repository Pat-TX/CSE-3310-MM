import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { styles } from "../mechstyle";

const { width } = Dimensions.get("window");

export default function Appointments() {
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null); // State for selected time
  const [randomTimeSlots, setRandomTimeSlots] = useState({});
  const flatListRef = useRef(null);

  const generateRandomTimeSlots = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const slots = {};

    days.forEach((day) => {
      const numSlots = Math.floor(Math.random() * 4) + 1; // Generate between 1-4 slots
      const startHour = 8 + Math.floor(Math.random() * 6); // Random start hour between 8 AM - 2 PM
      slots[day] = Array.from({ length: numSlots }).map((_, i) => {
        const hour = (startHour + i) % 12 || 12;
        const ampm = startHour + i >= 12 ? "PM" : "AM";
        return `${hour}:00 ${ampm}`;
      });
    });

    return slots;
  };

  useEffect(() => {
    setRandomTimeSlots(generateRandomTimeSlots());
  }, []);

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
      format === "weekday"
        ? { weekday: "short" }
        : { day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const weeks = React.useMemo(() => {
    const startOfCurrentWeek = getStartOfWeek(
      new Date(new Date().setDate(new Date().getDate() + week * 7))
    );

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = addDays(startOfCurrentWeek, adj * 7 + index);

        return {
          weekday: formatDate(date, "weekday"),
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

  const availableSlots = randomTimeSlots[value.toLocaleDateString("en-US", { weekday: "long" })] || [];

  const handleBookAppointment = () => {
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }
    alert(`Appointment booked for ${value.toDateString()} at ${selectedTime}`);
    setSelectedTime(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Availability</Text>
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
                            backgroundColor: "#111",
                            borderColor: "#111",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: "#fff" },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: "#fff" },
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
          <Text style={styles.subtitle}>{value.toDateString()}</Text>
          <View>
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTime(slot)}
                  style={[
                    styles.slotCard,
                    selectedTime === slot && { backgroundColor: "#111" },
                  ]}
                >
                  <Text
                    style={[
                      styles.slotText,
                      selectedTime === slot && { color: "#fff" },
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: "center", color: "#999" }}>
                No available time slots.
              </Text>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleBookAppointment}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Book Appointment</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}