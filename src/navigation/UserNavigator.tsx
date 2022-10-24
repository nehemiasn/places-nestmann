import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "../screens/NotFoundScreen";
import { BottomTabs } from "./BottomTabs";

const Stack = createNativeStackNavigator();

export const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen as any}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};
