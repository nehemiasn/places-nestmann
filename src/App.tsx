import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation/Navigation";
import { ActivityIndicator, StyleSheet } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <ActivityIndicator />;
  } else {
    return (
      <SafeAreaProvider style={styles.container}>
        <StatusBar />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
