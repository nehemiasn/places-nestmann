import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ColorSchemeName } from "react-native";
import { AuthNavigator } from "./AuthNavigator";
import { UserNavigator } from "./UserNavigator";

export function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [user, setUser] = React.useState<any>();
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {user ? <UserNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
