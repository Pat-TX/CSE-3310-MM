import React from "react";
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
import {
  useNavigation,
} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

// ********************************************************************************************************
// * This function gets the screen dimensions                                                             *
// ********************************************************************************************************
const {height, width} = Dimensions.get('window');

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen!</Text>
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
// * SATISFIES: User Profile *
// ********************************************************************************************************
function Profile() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'fff' }}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center"}} // Allow centering the text below the image
          showsVerticalScrollIndicator={false}
        >
          <View style={userStyles.profileContainer}>
            <Image
              style={userStyles.userImg}
              source={require('../../assets/user.png')}
            />
            <TouchableOpacity style={userStyles.button} onPress={() => console.log('Button Pressed')}>
              <Text style={userStyles.buttonText}>+</Text>
            </TouchableOpacity>
            <View style={userStyles.textContainer}>
              <Text style={userStyles.userName}>Default Name</Text>
              <Text style={userStyles.userLocation}>Default Location</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const userStyles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    width: '100%',
  },
  userImg: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 6,
  },
  button: {
    position: 'absolute',
    top: -width / 6, // Position the button above the image
    right: -width / 6, // Position the button to the right
    width: width / 9, // 1/3 of the radius of the image
    height: width / 9,
    borderRadius: width / 18, // Make the button circular
    backgroundColor: '#007BFF',  // Example color for the button
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userLocation: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});

// ********************************************************************************************************
// * This function serves as the root to this part of the application. Should stay pretty bare bones.     *
// ********************************************************************************************************
function UserHome({ navigation }) {
  return <MyTabs />;
}

export default UserHome;
