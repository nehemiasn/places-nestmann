import { Link } from "@react-navigation/native";
import React from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Separator, View, Typography } from "../components";
import { signup } from "../store/actions/auth.action";
import { RootTabScreenProps } from "../types";
import { colors } from "../utils/constants";

interface RegisterProps extends RootTabScreenProps<"Props"> {}

export const Register: React.FC<RegisterProps> = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repassword, setRepassword] = React.useState<string>("");

  const handleSignup = () => {
    if (!(email && email.length > 9 && email.indexOf("@") >= 0)) {
      return Alert.alert("Error", "El email no es correcto", [{ text: "OK" }]);
    }
    if (!password) {
      return Alert.alert("Error", "Debe ingresar una contraseña", [
        { text: "OK" },
      ]);
    }
    if (!(password.length >= 8)) {
      return Alert.alert(
        "Error",
        "La contraseña debe tener 8 caracteres o más",
        [{ text: "OK" }]
      );
    }
    if (repassword !== password) {
      return Alert.alert(
        "Error",
        "Debe ingresar la misma contraseña dos veces",
        [{ text: "OK" }]
      );
    }
    dispatch(signup(email, password) as any);
  };

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Separator px={32} />
        <Typography type="OpenSans-SemiBold">Email</Typography>
        <TextInput
          style={styles.input}
          onChangeText={(ev) => setEmail(() => ev)}
          value={email}
        />
        <Separator px={16} />
        <Typography type="OpenSans-SemiBold">Contraseña nueva</Typography>
        <TextInput
          style={styles.input}
          onChangeText={(ev) => setPassword(() => ev)}
          value={password}
        />
        <Separator px={16} />
        <Typography type="OpenSans-SemiBold">Confirmar contraseña</Typography>
        <TextInput
          style={styles.input}
          onChangeText={(ev) => setRepassword(() => ev)}
          value={repassword}
        />
        <Separator px={32} />
        <Button
          title="Registrarme"
          onPress={handleSignup}
          color={colors.colorPrimary}
        />
        <Separator px={48} />
        <Typography
          style={{
            textAlign: "center",
          }}
        >
          Ya tengo una cuenta
        </Typography>
        <Link
          style={{
            textAlign: "center",
            color: "blue",
          }}
          to={"/Login"}
        >
          Iniciar sesion
        </Link>
        <Separator px={48} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    width: 250,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
  },
});
