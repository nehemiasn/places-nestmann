import React from "react";
import {
  Button,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import { colors } from "../../utils/constants";
import { Typography } from "./Typography";

interface DeleteButtonProps {
  onPress?: () => void;
  modal?: {
    title?: string;
    message: string;
    textOk?: string;
    textCancel?: string;
    onCancel?: () => void;
  };
}

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const { onPress, modal } = props;
  const [modalConfirm, setModalConfirm] = React.useState<boolean>(false);

  const handleOnPress = () => {
    if (onPress) {
      if (modal && !modalConfirm) {
        setModalConfirm(() => true);
      } else {
        setModalConfirm(() => false);
        onPress();
      }
    }
  };

  const handleOnCancel = () => {
    setModalConfirm(() => false);
    if (modal?.onCancel) {
      modal.onCancel;
    }
  };

  return (
    <>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={handleOnPress}
      >
        <View style={styles.component}>
          <Typography style={styles.textComponent}>❌</Typography>
        </View>
      </TouchableHighlight>
      {modal ? (
        <Modal
          animationType="slide"
          visible={modalConfirm}
          onRequestClose={() => setModalConfirm(() => false)}
        >
          <View style={styles.modal}>
            <View style={styles.textModal}>
              <View>
                <Typography style={styles.titleModal}>
                  {modal.title || "Alerta"}
                </Typography>
              </View>
              <View style={styles.messageModal}>
                <Typography>{modal.message}</Typography>
              </View>
            </View>
            <View style={styles.buttonsModal}>
              <View style={styles.buttonCancel}>
                {modal.onCancel ? (
                  <Button
                    title={modal.textCancel || "Cancelar"}
                    onPress={handleOnCancel}
                    color={colors.colorPrimary}
                  />
                ) : null}
              </View>
              <View style={styles.buttonOk}>
                <Button
                  title={modal.textOk || "Aceptar"}
                  onPress={handleOnPress}
                  color={colors.colorPrimary}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  component: {
    width: 20,
    height: 20,
  },
  textComponent: {
    marginTop: 0,
    marginLeft: 0,
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
  },
  textModal: {
    flex: 1,
  },
  titleModal: {
    fontSize: 20,
  },
  messageModal: {
    paddingVertical: 16,
  },
  buttonsModal: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  buttonCancel: {
    flex: 0.5,
    padding: 16,
  },
  buttonOk: {
    flex: 0.5,
    padding: 16,
  },
});
