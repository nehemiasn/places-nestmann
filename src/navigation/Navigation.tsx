import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ColorSchemeName } from "react-native";
import { AuthNavigator } from "./AuthNavigator";
import { UserNavigator } from "./UserNavigator";
import { StoreContext } from "../store/Store";

export function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { currentUserStore } = React.useContext(StoreContext);
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {currentUserStore.isUserLoaded ? <UserNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
