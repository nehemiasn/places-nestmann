import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login as any}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register as any}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
