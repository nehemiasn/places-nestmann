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
  const [_index, setIndex] = React.useState<number>();

  const index = React.useMemo(() => {
    return _index;
  }, [_index]);

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
          {index ? (
            <Typography type="OpenSans-Regular">
              {selectItems[index].label}
            </Typography>
          ) : (
            <Typography type="OpenSans-Regular">Seleccionar tipo</Typography>
          )}
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
              initialSelectedIndex={_index}
              items={selectItems}
              onChange={(item) => setIndex(item.index)}
            />
            <Separator px={32} />
            <Button
              title="Aceptar"
              onPress={() => {
                setViewModal(false);
                if (index) {
                  onValueChange(selectItems[index]);
                }
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
});
