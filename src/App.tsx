import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation/Navigation";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <ActivityIndicator />;
  } else {
    return (
      <Provider store={store as any}>
        <SafeAreaProvider style={styles.container}>
          <StatusBar />
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
