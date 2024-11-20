import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Modal,
  FlatList
} from "react-native";
import { Button } from "@react-navigation/elements";
import { styles } from "../style";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../FirebaseConfig";
//import BookAppointment from "./BookAppointment";

const Tab = createBottomTabNavigator();

// ********************************************************************************************************
// * This function provides functionality for the tab navigation.                                         *
// ********************************************************************************************************
function MyTabs() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 300,
        },
        animation: "shift",
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/search.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/messages.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/user.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

// ********************************************************************************************************
// * This function provides functionality for the searching feature.                                      *
// * See SearchPage.png in the sketches folder for design inspiration. This screen should take a user     *
// * query, perform the query, and return applicable results to the screen.                               *
// * SATISFIES: Search, Reporting, Mechanic Profile                                                       *
// ********************************************************************************************************
function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectMechanic, setselectMechanic] = useState(null);
  const [options, setoptions] = useState(false);

  const handleSearch = async (param) => {
    if (!param.trim()) {
      alert("Please enter a service to search!");
      return;
    }

    setLoading(true);
    setModalVisible(true);

    try {
      const mechanicsRef = collection(FIREBASE_DB, "mechanics");
      const mechanicsQuery = query(
        mechanicsRef,
        where("servicesOffered", "array-contains", param)
      );

      const querySnapshot = await getDocs(mechanicsQuery);
      const mechanics = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResults(mechanics);
    } catch (error) {
      console.error("Error fetching mechanics: ", error);
      alert("Error fetching mechanics!");
    } finally {
      setLoading(false);
    }
  };

  const selectOptions = (mechanic) => {
    setselectMechanic(mechanic);
    setoptions(true);
  };

  const navigation = useNavigation();

  return (
    <View>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }} // Allow centering the text below the image
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.searchTitle}>
            Find local mechanics ready to take care of your automotive needs.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter to search services!"
            autoCapitalize="none"
            value={searchQuery}
            onChangeText={setSearchQuery}
          ></TextInput>
          <TouchableOpacity style={styles.buttonStyle}
          onPress={() => handleSearch(searchQuery)}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>

          <Text style={styles.searchTitle}>Top searched services</Text>

          <View style={styles.gridContainer}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.serviceButton}
                onPress={() => handleSearch("Oil Changes")}
              >
                <Image
                  source={require("../../assets/oil.png")}
                  style={styles.buttonImage}
                />
                <Text style={styles.serviceButtonText}>Oil Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceButton}
              onPress={() => handleSearch("Tire Services")}>
                <Image
                  source={require("../../assets/wheel.png")}
                  style={styles.buttonImage}
                />
                <Text style={styles.serviceButtonText}>Tire Services</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.serviceButton}
              onPress={() => handleSearch("Brake Services")}>
                <Image
                  source={require("../../assets/brake.png")}
                  style={styles.buttonImage}
                />
                <Text style={styles.serviceButtonText}>Brake Services</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceButton}
              onPress={() => handleSearch("Battery Replacement")}>
                <Image
                  source={require("../../assets/car-battery.png")}
                  style={styles.buttonImage}
                />
                <Text style={styles.serviceButtonText}>
                  Battery Replacement
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.serviceButton}
              onPress={() => handleSearch("Alignment and Balancing")}>
                <Image
                  source={require("../../assets/stability.png")}
                  style={styles.buttonImage}
                />
                <Text style={styles.serviceButtonText}>Alignment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceButton}
              onPress={() => handleSearch("Inspection Services")}>
                <Image
                  source={require("../../assets/list.png")}
                  style={styles.buttonImage}
                />
                <Text style={styles.serviceButtonText}>
                  Inspection Services
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Search Results</Text>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>

              {loading ? (
                <Text>Loading...</Text>
              ) : results.length > 0 ? (
                <ScrollView>
                  {results.map((mechanic) => (
                    <TouchableOpacity
                      key={mechanic.id}
                      style={styles.mechanicCard}
                      onPress={() => selectOptions(mechanic)}
                    >
                      <Text style={styles.mechanicName}>
                        {mechanic.firstName} {mechanic.lastName}
                      </Text>
                      <Text style={styles.mechanicLocation}>
                        {mechanic.serviceArea}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <Text>No mechanics found.</Text>
              )}
            </View>
          </Modal>

          <Modal
            visible={options}
            animationType="slide"
            onRequestClose={() => setoptions(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Choose an option</Text>

              {selectMechanic && (
                <>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                      setoptions(false);
                      alert(`Contacting ${selectMechanic.firstName} ${selectMechanic.lastName}`);
                    }}
                  >
                    <Text style={styles.buttonText}>Contact this Mechanic</Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                  setModalVisible(false); 
                  setoptions(false); 
                  navigation.navigate('BookAppointment'); // Navigate to appointment screen
  }}
>
  <Text style={styles.buttonText}>Create Appointment</Text>
</TouchableOpacity>

                </>
              )}
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setoptions(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ********************************************************************************************************
// * This function provides functionality for the messaging feature.                                      *
// * See MessagesPage.png and IndividualMessagesPage.png for design inspiration. This screen should       *
// * First display all of a user's messages history, and upon selection of a specific chat, bring up that *
// * specific conversation. SATISFIES: Communication, Reporting, Payment                                  *
// ********************************************************************************************************
function Messages() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Messages Screen!</Text>
    </View>
  );
}

// ********************************************************************************************************
// * This function provides functionality for the profiles  feature.                                      *
// * See CustomerProfilePage.png for design inspiration. This screen should display applicable info about *
// * the logged in user, as well as provide functionality to update their information                     *
// * SATISFIES: User Profile                                                                              *
// ********************************************************************************************************
function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = FIREBASE_DB;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, "customers", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("No such document!");
          }
        } else {
          console.error("No authenticated user found");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };

    fetchUserData();
  }, []);

  // Display loading indicator while fetching data
  if (loading) {
    return <Text>Loading profile...</Text>;
  }

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "fff" }}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }} // Allow centering the text below the image
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.userProfileContainer}>
            <Image
              style={styles.userImg}
              source={require("../../assets/user.png")}
            />
            <TouchableOpacity
              style={styles.editUserButton}
              onPress={() => console.log("Button Pressed")}
            >
              <Image
                source={require("../../assets/pencil.png")}
                style={styles.editUserButtonImage}
              />
            </TouchableOpacity>
            <View style={styles.userTextContainer}>
              <Text style={styles.userName}>
                {userData?.firstName || "N/A"} {userData?.lastName || "N/A"}
              </Text>
              <Text style={styles.userLocation}>{userData?.area || "N/A"}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ********************************************************************************************************
// * This function serves as the root to this part of the application. Should stay pretty bare bones.     *
// ********************************************************************************************************
function UserHome({ navigation }) {
  return <MyTabs />;
}

export default UserHome;