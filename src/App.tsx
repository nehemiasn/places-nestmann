import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation/Navigation";
import { ActivityIndicator, StyleSheet } from "react-native";
import { AppContext, AppContextProvider } from "./providers/AppProvider";
import { createDB, statusSQLiteDB } from "./db";
import { StoreProvider } from "./store/Store";
import { CustomApolloProvider } from "./apollo";
import { config } from "./config";
import { BusinessContextProvider } from "./providers/BusinessProvider";

createDB()
  .then(() => {
    statusSQLiteDB.create = true;
    // console.log("statusSQLiteDB.create", statusSQLiteDB.create);
  })
  .catch((err) => {
    // log
    // console.log(err);
  });

export const AppContent: React.FC = () => {
  const { payload } = React.useContext(AppContext);
  const colorScheme = useColorScheme();

  return (
    <CustomApolloProvider uri={config.env.apiUrl} token={payload?.accessToken}>
      <StoreProvider>
        <BusinessContextProvider>
          <SafeAreaProvider style={styles.container}>
            <StatusBar />
            <Navigation colorScheme={colorScheme} />
          </SafeAreaProvider>
        </BusinessContextProvider>
      </StoreProvider>
    </CustomApolloProvider>
  );
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <ActivityIndicator />;
  } else {
    return (
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
