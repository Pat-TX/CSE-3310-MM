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
  FlatList,
  Modal,
  TextInput
} from "react-native";
import { Button } from "@react-navigation/elements";
import { styles } from "../style";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {useNavigation,} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Appointments from "./Appointment"; 
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../FirebaseConfig";

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
        animation: 'shift',
        tabBarStyle: {
          height: 60,
        },
      }}  
    >
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/calendar.png")}
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
// * This function provides functionality for the appointments feature.                                   *
// * This screen should show the mechanic all of their confirmed appointments in a clear, comfortable way *
// * so that they may stay on top of the work they need to do. SATISFIES: Appointments                    *
// ********************************************************************************************************
// function Appointments() {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Appointments Screen!</Text>
//     </View>
//   );
// }

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
      name: "Mason Harper",
      lastMessage: "No worries, once I get there, I'll get it taken care of!",
      messages: [
        { id: "m1", text: "Hey there!", sender: "Mason" },
        { id: "m2", text: "It's about time for my car to get an oil change. Are you available?", sender: "Mason" },
        { id: "m3", text: "Yeah -- take a look at my schedule, pick any appointment slot! We can talk prices when I learn a bit more about the car. :)", sender: "You" },
        { id: "m4", text: "Thanks so much. Do you travel?", sender: "Mason" },
        { id: "m5", text: "I can perform services at my shop or at your residence, whichever you prefer.", sender: "You" },
        { id: "m6", text: "At my house would be great. With work and the kids, I didn't know when I was going to have time.", sender: "Mason" },
        { id: "m7", text: "No worries, once I get there, I'll get it taken care of!", sender: "You" },
      ],
    },
    {
      id: "2",
      name: "Sophie Chambers",
      lastMessage: "Thank you 🙏🙏",
      messages: [
        { id: "m1", text: "Not gonna lie, my inspection has been due for like 2 months", sender: "Sophie" },
        { id: "m2", text: "Say no more", sender: "You" },
        { id: "m3", text: "Schedule an appointment, I gotchu ASAP", sender: "You" },
        { id: "m4", text: "Thank you 🙏🙏", sender: "Sophie" },
      ],
    },
    {
      id: "3",
      name: "Lucas Bennett",
      lastMessage: "...I can check it out",
      messages: [
        { id: "m1", text: "So when I get my car up to cruising speed, it's kinda wobbly", sender: "Lucas" },
        { id: "m2", text: "What's cruising speed to you?", sender: "You" },
        { id: "m3", text: "It's nothing excessive! I just get on I20 and set my cruise control to 115", sender: "Lucas" },
        { id: "m4", text: "...I can check it out", sender: "You" },
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
  );
}

// ********************************************************************************************************
// * This function provides functionality for the profiles feature.                                       *
// * See CustomerProfilePage.png for design inspiration. This screen should display applicable info about *
// * the logged in user, as well as provide functionality to update their information.                    *
// * SATISFIES: Mechanic Profile                                                                          *
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
          const userDocRef = doc(db, "mechanics", currentUser.uid);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: 'fff' }}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center"}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.userProfileContainer}>
            <Image
              style={styles.userImg}
              source={require('../../assets/user.png')}
            />
            <TouchableOpacity 
              style={styles.editUserButton} 
              onPress={() => console.log('Button Pressed')}
            >
              <Image
                source={require('../../assets/pencil.png')}
                style={styles.editUserButtonImage}
              />
            </TouchableOpacity>
            <View style={styles.userTextContainer}>
              <Text style={styles.userName}>
                {userData?.firstName || "N/A"} {userData?.lastName || "N/A"}
              </Text>
              <Text style={styles.userLocation}>
                {userData?.serviceArea || "N/A"}
              </Text>
              <View style={styles.starContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                  key={index}
                  name="star"
                  size={25}
                  color="#FFD700" // Gold color
                  style={styles.star}
                />
              ))}
            </View>
            </View>
          </View>
          <View style={styles.mechBar}/>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// *******************************************************************************************************
// * This function serves as the root to this part of the application. Should stay pretty bare bones.    *
// *******************************************************************************************************
function MechHome({ navigation }) {
  return <MyTabs />;
}

export default MechHome;
