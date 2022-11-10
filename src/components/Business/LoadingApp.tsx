import React from "react";
import { ActivityIndicator } from "react-native";
import { StoreContext } from "../../store/Store";
import { View } from "../Base";

interface LoadingAppProps {}

export const LoadingApp: React.FC<LoadingAppProps> = () => {
  const { loginStore, signupStore, currentUserStore } =
    React.useContext(StoreContext);

  const loading = React.useMemo(() => {
    return !!(
      loginStore.loading ||
      signupStore.loading ||
      currentUserStore.loading
    );
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            flex: 1,
            zIndex: 2,
            backgroundColor: "#00000000",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000066",
            }}
          >
            <ActivityIndicator />
          </View>
        </View>
      ) : null}
    </>
  );
};
