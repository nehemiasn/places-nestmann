import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Places } from "../screens/Places";
import { PlaceDetail } from "../screens/PlaceDetail";
import { CategoryOfPlaces } from "../screens/CategoryOfPlaces";

const StackTabOne = createNativeStackNavigator();

export function TabOneNavigator() {
  return (
    <StackTabOne.Navigator>
      <StackTabOne.Screen
        options={{
          title: "Categoria de lugares",
        }}
        name="CategoryOfPlaces"
        component={CategoryOfPlaces as any}
      />
      <StackTabOne.Screen
        options={{
          title: "Lugares",
        }}
        name="Places"
        component={Places as any}
      />
      <StackTabOne.Screen
        options={{
          title: "Detalle de Lugar",
        }}
        name="PlaceDetail"
        component={PlaceDetail as any}
      />
    </StackTabOne.Navigator>
  );
}
