import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../components";
import { AppContext } from "../providers/AppProvider";
import { FontAwesome } from "@expo/vector-icons";

interface MapProps {}

export const Map: React.FC<MapProps> = () => {
  const { location, handleGetLocation } = React.useContext(AppContext);
  const mapRef = React.useRef<any>();
  const [latitude, setLatitude] = React.useState<number>();
  const [longitude, setLongitude] = React.useState<number>();

  const handleSetCurrentPosition = async () => {
    handleGetLocation((loc) => {
      const lat = loc?.coords.latitude;
      const lng = loc?.coords.longitude;
      setLatitude(() => lat);
      setLongitude(() => lng);
      if (mapRef.current && lat && lng) {
        mapRef.current.animateToRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
    });
  };

  React.useEffect(() => {
    handleSetCurrentPosition();
  }, []);

  return (
    <>
      {latitude && longitude ? (
        <MapView
          ref={mapRef}
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
