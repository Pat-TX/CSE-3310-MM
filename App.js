import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./app/screens/Welcome";
import PreUserLogin from "./app/screens/PreUserLogin";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App executed");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="PreUserLogin" component={PreUserLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

