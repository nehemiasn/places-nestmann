import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Typography, View } from "../Base";

interface FavoriteSaveIconProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const FavoriteSaveIcon: React.FC<FavoriteSaveIconProps> = (props) => {
  const style = React.useMemo(() => props.style || ({} as any), []);
  return (
    <View style={{ ...styles.view1, ...style }}>
      <TouchableOpacity
        style={{
          ...styles.contentContainer,
        }}
        onPress={props.onPress}
      >
        <View style={styles.view2}>
          <FontAwesome size={24} name="save" />
          <Typography style={styles.text}>Guardar</Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    padding: 16,
    backgroundColor: "white",
  },
  view2: {
    height: 48,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    marginLeft: 8,
    fontSize: 24,
  },
});
