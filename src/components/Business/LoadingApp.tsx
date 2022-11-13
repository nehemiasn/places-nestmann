import React from "react";
import { ActivityIndicator } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import { StoreContext } from "../../store/Store";
import { View } from "../Base";

interface LoadingAppProps {
  loading?: boolean;
}

export const LoadingApp: React.FC<LoadingAppProps> = (props) => {
  const { loading } = props;
  const { loginStore, signupStore, currentUserStore } =
    React.useContext(StoreContext);

  const _loading = React.useMemo(() => {
    return !!(
      loading ||
      loginStore.loading ||
      signupStore.loading ||
      currentUserStore.loading
    );
  }, [
    loading,
    loginStore.loading,
    signupStore.loading,
    currentUserStore.loading,
  ]);

  return (
    <>
      {_loading ? (
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
