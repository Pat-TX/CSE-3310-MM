import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./app/screens/Welcome";
import PreUserLogin from "./app/screens/PreUserLogin";
import PreMechLogin from "./app/screens/PreMechLogin";
import UserLogin from "./app/screens/UserLogin";
import UserRegister from "./app/screens/UserRegister";
import MechLogin from "./app/screens/MechLogin";
import MechRegister from "./app/screens/MechRegister";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

