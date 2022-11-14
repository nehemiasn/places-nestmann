import React from "react";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

interface MapPickerProps {
  onLocation: (event: MapPressEvent) => void;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export const MapPicker: React.FC<MapPickerProps> = (props) => {
  const { onLocation, initialRegion } = props;
  const [selectedLocation, setSelectedLocation] = React.useState<any>();

  const onHandlePickLocation = (event: MapPressEvent) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
    onLocation(event);
  };

  return (
    <>
      <MapView
        initialRegion={
          initialRegion || {
            latitude: 37.78,
            longitude: -122.43,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
        style={styles.container}
        onPress={onHandlePickLocation}
      >
        {selectedLocation && (
          <Marker
            title="Ubicación seleccionada"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
    maxHeight: 300,
  },
});
