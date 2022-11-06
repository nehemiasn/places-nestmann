import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../components";
import { AppContext } from "../providers/AppProvider";
import { FontAwesome } from "@expo/vector-icons";
import { IS_WEB } from "../constants";

interface MapProps {}

export const Map: React.FC<MapProps> = () => {
  const { location, handleGetLocation } = React.useContext(AppContext);
  const [latitude, setLatitude] = React.useState<number>();
  const [longitude, setLongitude] = React.useState<number>();
  const [key, setkey] = React.useState<any>();

  const handleSetCurrentPosition = async () => {
    handleGetLocation();
  };

  React.useEffect(() => {
    if (location) {
      setLatitude(() => location.coords.latitude);
      setLongitude(() => location.coords.longitude);
      setkey(() => new Date().getTime());
    }
  }, [location]);

  return (
    <>
      {/* {latitude && longitude && !IS_WEB ? (
        <MapView
          key={key}
          style={styles.container}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            title="Mi ubicación"
          />
        </MapView>
      ) : null}
      <View
        style={{
          position: "absolute",
          bottom: 32,
          right: 16,
          backgroundColor: "transparent",
        }}
      >
        <TouchableOpacity onPress={handleSetCurrentPosition}>
          <FontAwesome size={32} name="crosshairs" color="white" />
        </TouchableOpacity>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
