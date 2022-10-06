import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Typography } from "./Typography";

interface CheckBoxProps {
  check?: boolean;
  onCheck?: (value: boolean) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { check, onCheck } = props;

  const handleOnCheck = () => {
    if (onCheck) {
      onCheck(!check);
    }
  };

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={handleOnCheck}
    >
      <View style={styles.component}>
        {check ? (
          <Typography style={styles.textComponent}>☑️</Typography>
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  component: {
    width: 20,
    height: 20,
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 2,
  },
  textComponent: {
    marginTop: -2,
    marginLeft: -1,
  },
});
