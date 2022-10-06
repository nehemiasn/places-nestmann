import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Map } from "../screens/Map";

const StackTabTwo = createNativeStackNavigator();

export function TabTwoNavigator() {
  return (
    <StackTabTwo.Navigator initialRouteName="Map">
      <StackTabTwo.Screen
        options={{
          title: "Mapa",
        }}
        name="Map"
        component={Map as any}
      />
    </StackTabTwo.Navigator>
  );
}
