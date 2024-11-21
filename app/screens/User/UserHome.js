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
  FlatList,
  Alert
} from "react-native";
import { Button } from "@react-navigation/elements";
import { styles } from "../style";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
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
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
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
    <View style={styles.safeArea}>
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
  <Text style={styles.buttonText}>Book an Appointment</Text>
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
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const exampleConversations = [
    {
      id: "1",
      name: "Chris Irimia",
      lastMessage: "No worries, once I get there, I'll get it taken care of!",
      messages: [
        { id: "m1", text: "Hey there!", sender: "You" },
        { id: "m2", text: "It's about time for my car to get an oil change. Are you available?", sender: "You" },
        { id: "m3", text: "Yeah -- take a look at my schedule, pick any appointment slot! We can talk prices when I learn a bit more about the car. :)", sender: "Chris" },
        { id: "m4", text: "Thanks so much. Do you travel?", sender: "You" },
        { id: "m5", text: "I can perform services at my shop or at your residence, whichever you prefer.", sender: "Chris" },
        { id: "m6", text: "At my house would be great. With work and the kids, I didn't know when I was going to have time.", sender: "You" },
        { id: "m7", text: "No worries, once I get there, I'll get it taken care of!", sender: "Chris" },
      ],
    },
    {
      id: "2",
      name: "James Anderson",
      lastMessage: "Thank you 🙏🙏",
      messages: [
        { id: "m1", text: "Not gonna lie, my inspection has been due for like 2 months", sender: "You" },
        { id: "m2", text: "Say no more", sender: "James" },
        { id: "m3", text: "Schedule an appointment, I gotchu ASAP", sender: "James" },
        { id: "m4", text: "Thank you 🙏🙏", sender: "You" },
      ],
    },
    {
      id: "3",
      name: "Ella Brooks",
      lastMessage: "...I can check it out",
      messages: [
        { id: "m1", text: "So when I get my car up to cruising speed, it's kinda wobbly", sender: "You" },
        { id: "m2", text: "What's cruising speed to you?", sender: "Ella" },
        { id: "m3", text: "It's nothing excessive! I just get on I20 and set my cruise control to 115", sender: "You" },
        { id: "m4", text: "...I can check it out", sender: "Ella" },
      ],
    },
  ];

  const openConversation = (conversation) => {
    setSelectedConversation(conversation);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedConversation(null);
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => openConversation(item)}
    >
      <Text style={styles.conversationName}>{item.name}</Text>
      <Text style={styles.conversationLastMessage}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.convoContainer}>
      <Text style={styles.messagesTitle}>Your Inbox</Text>
      <FlatList
        data={exampleConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.conversationList}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalConvoContainer}>
          <Text style={styles.modalConvoTitle}>
            {selectedConversation?.name || "Conversation"}
          </Text>
          <FlatList
            data={selectedConversation?.messages || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.sender === "You"
                    ? styles.messageBubbleYou
                    : styles.messageBubbleOther,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.sender === "You"
                      ? styles.messageTextYou
                      : styles.messageTextOther,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
          />
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.sendButton}>
            <Image
                source={require("../../assets/paper-plane.png")}
                style={styles.sendButtonImg}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeConvoButton} onPress={closeModal}>
            <Text style={styles.closeConvoButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </SafeAreaView>
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Signed out successfully");
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Sign out failed", error.message);
    }
  };

  // Display loading indicator while fetching data
  if (loading) {
    return <Text>Loading profile...</Text>;
  }

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView style={styles.safeArea}>
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
      <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
            >
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
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