import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface FavoritePlaceIconProps {
  style?: StyleProp<ViewStyle>;
  isFavorite?: boolean;
  onPress?: () => void;
}

export const FavoritePlaceIcon: React.FC<FavoritePlaceIconProps> = (props) => {
  const style = React.useMemo(() => props.style || ({} as any), []);
  return (
    <View style={{ ...styles.icon, ...style }}>
      <TouchableOpacity onPress={props.onPress}>
        {!!props.isFavorite ? (
          <FontAwesome size={24} name="star" color="#ffd800" />
        ) : (
          <FontAwesome size={24} name="star-o" color="#eee" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 16,
  },
});
