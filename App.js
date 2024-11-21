import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./app/screens/Welcome";
import PreUserLogin from "./app/screens/User/PreUserLogin";
import PreMechLogin from "./app/screens/Mech/PreMechLogin";
import UserLogin from "./app/screens/User/UserLogin";
import UserRegister from "./app/screens/User/UserRegister";
import MechLogin from "./app/screens/Mech/MechLogin";
import MechRegister from "./app/screens/Mech/MechRegister";
import UserHome from "./app/screens/User/UserHome";
import MechHome from "./app/screens/Mech/MechHome";
import BookAppointment from "./app/screens/User/BookAppointment";
import Payment from "./app/screens/User/payment";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App executed");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: true }} />
        <Stack.Screen name="PreUserLogin" component={PreUserLogin} options={{ headerShown: true }} />
        <Stack.Screen name="PreMechLogin" component={PreMechLogin} options={{ headerShown: true }} />
        <Stack.Screen name="UserLogin" component={UserLogin} options={{ headerShown: true }} />
        <Stack.Screen name="UserRegister" component={UserRegister} options={{ headerShown: true }} />
        <Stack.Screen name="MechLogin" component={MechLogin} options={{ headerShown: true }} />
        <Stack.Screen name="MechRegister" component={MechRegister} options={{ headerShown: true }} />
        <Stack.Screen name="MechHome" component={MechHome} options={{ headerShown: true }} />
        <Stack.Screen name="UserHome" component={UserHome} options={{ headerShown: true }} />
        <Stack.Screen name="BookAppointment" component={BookAppointment} options={{ headerShown: true }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
