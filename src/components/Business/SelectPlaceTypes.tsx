import React from "react";
import { StyleSheet, TouchableOpacity, Modal, Button } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { StoreContext } from "../../store/Store";
import { colors } from "../../utils/constants";
import { Separator, Typography, View } from "../Base";

interface SelectPlaceTypesProps {
  onValueChange: (item: any) => void;
}

export const SelectPlaceTypes: React.FC<SelectPlaceTypesProps> = (props) => {
  const { onValueChange } = props;
  const { placeTypes } = React.useContext(StoreContext);
  const [viewModal, setViewModal] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const selectItems = React.useMemo(() => {
    return placeTypes.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, []);

  return (
    <>
      <TouchableOpacity onPress={() => setViewModal(true)}>
        <View style={styles.input}>
          <Typography type="OpenSans-Regular" style={styles.regular}>
            {selectItems[index].label || "Seleccionar tipo"}
          </Typography>
        </View>
      </TouchableOpacity>
      {viewModal ? (
        <Modal
          animationType="slide"
          visible={viewModal}
          onRequestClose={() => setViewModal(false)}
        >
          <View style={styles.modal}>
            <Typography type="OpenSans-SemiBold" style={styles.text}>
              Seleccionar tipo
            </Typography>
            <Separator px={24} />
            <WheelPickerExpo
              height={300}
              width={300}
              initialSelectedIndex={index}
              items={selectItems}
              onChange={(item) => setIndex(item.index)}
            />
            <Separator px={32} />
            <Button
              title="Aceptar"
              onPress={() => {
                setViewModal(false);
                onValueChange(selectItems[index]);
              }}
              color={colors.colorPrimary}
            />
          </View>
        </Modal>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 20,
  },
  regular: {
    fontSize: 16,
  },
});
