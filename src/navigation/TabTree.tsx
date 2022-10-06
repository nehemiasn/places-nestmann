import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Favorites } from "../screens/Favorites";

const StackTabTree = createNativeStackNavigator();

export function TabTreeNavigator() {
  return (
    <StackTabTree.Navigator>
      <StackTabTree.Screen
        options={{
          title: "Favoritos",
        }}
        name="Favorites"
        component={Favorites as any}
      />
    </StackTabTree.Navigator>
  );
}
