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
import {useNavigation,} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Appointments from "./Appointment"; 

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
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Messages Screen!</Text>
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
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'fff' }}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center"}} // Allow centering the text below the image
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
              <Text style={styles.userName}>Default Name</Text>
              <Text style={styles.userLocation}>Default Location</Text>
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
