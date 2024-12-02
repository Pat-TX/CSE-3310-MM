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
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { styles } from "../mechstyle";

const { width } = Dimensions.get("window");

export default function Appointments() {
  const navigation = useNavigation(); 
  const route = useRoute();
  const mechanicUid = route.params?.mechanicUid || null; 
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "" });
  const [dailyAvailableSlots, setDailyAvailableSlots] = useState({});
  const flatListRef = useRef(null);

  // Fixed time slots from 9 AM to 5 PM with 1-hour intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      const formattedHour = hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
      slots.push(formattedHour);
    }
    return slots;
  };

  useEffect(() => {
    initializeSlotsForWeek();
    fetchUserInfo();
  }, []);

  const initializeSlotsForWeek = () => {
    const slots = generateTimeSlots();
    const newSlots = {};

    // Initialize slots for the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);
      newSlots[date.toDateString()] = [...slots];
    }

    setDailyAvailableSlots(newSlots);
  };

  const fetchUserInfo = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      console.error("User not logged in");
      return;
    }
    try {
      const userDoc = doc(FIREBASE_DB, "customers", user.uid);
      const docSnap = await getDoc(userDoc);
  
      if (docSnap.exists()) {
        const { firstName, lastName } = docSnap.data();
        setUserInfo({ firstName, lastName });
      } else {
        console.error("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }
  
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      alert("You must be logged in to book an appointment.");
      return;
    }


  
    try {
      const appointmentsCollection = collection(FIREBASE_DB, "appointments");
      const appointment = {
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        date: value.toDateString(),
        time: selectedTime,
        mechanicId: mechanicUid, // Use mechanicUid from route params
        status: "Pending",
      };
  
      await addDoc(appointmentsCollection, appointment);
  
      setDailyAvailableSlots((prevSlots) => {
        const updatedSlots = { ...prevSlots };
        updatedSlots[value.toDateString()] = updatedSlots[
          value.toDateString()
        ].filter((slot) => slot !== selectedTime);
        return updatedSlots;
      });
  
      setSelectedTime(null);
      navigation.navigate("Payment");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

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

  const availableSlots =
    dailyAvailableSlots[value.toDateString()] || generateTimeSlots();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>

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
                          backgroundColor: "#a363ff",
                          borderColor: "#a363ff",
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
                  selectedTime === slot && { backgroundColor: "#a363ff" },
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
    </SafeAreaView>
  );
}
