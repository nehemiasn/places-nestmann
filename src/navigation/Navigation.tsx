import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ColorSchemeName } from "react-native";
import { AuthNavigator } from "./AuthNavigator";
import { UserNavigator } from "./UserNavigator";
import { useSelector } from "react-redux";

export function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const sesion = useSelector((state: any) => state.auth.sesion);
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {sesion ? <UserNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
