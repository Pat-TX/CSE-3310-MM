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
} from "react-native";
import { Button } from "@react-navigation/elements";
import { styles } from "../style";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header2}>
          Find local mechanics ready to take care of your automotive needs.
        </Text>
      </ScrollView>
    </SafeAreaView>
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
