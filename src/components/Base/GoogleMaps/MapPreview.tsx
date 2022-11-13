import { View, Image, StyleSheet } from "react-native";
import { URL_MAPS } from "../../../utils/constants";

export const MapPreview = (props: any) => {
  const { children, location, style } = props;
  const { lat, lng } = location || {};
  const mapPreviewUrl = location ? URL_MAPS(lat, lng) : "";
  return (
    <View style={{ ...styles.container, ...style }}>
      {location ? (
        <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
      ) : (
        children
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
