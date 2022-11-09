import React from "react";
import { Link } from "@react-navigation/native";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { Separator, View, Typography } from "../components";
import { StoreContext } from "../store/Store";
import { RootTabScreenProps } from "../types";
import { colors } from "../utils/constants";

interface LoginProps extends RootTabScreenProps<"Props"> {}

export const Login: React.FC<LoginProps> = () => {
  const { userLoggedIn } = React.useContext(StoreContext);
  const [email, setEmail] = React.useState<string>(
    "nehemias.nestmann@gmail.com"
  );
  const [password, setPassword] = React.useState<string>("Coderhouse22");

  const handleLogin = () => {
    if (!(email && email.length > 9 && email.indexOf("@") >= 0)) {
      return Alert.alert("Error", "El email no es correcto", [{ text: "OK" }]);
    }
    if (!password) {
      return Alert.alert("Error", "Debe ingresar una contraseña", [
        { text: "OK" },
      ]);
    }
    userLoggedIn.login(email, password);
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
        <Typography type="OpenSans-SemiBold">Contraseña</Typography>
        <TextInput
          style={styles.input}
          onChangeText={(ev) => setPassword(() => ev)}
          value={password}
        />
        <Separator px={32} />
        <Button
          title="Iniciar sesion"
          onPress={handleLogin}
          color={colors.colorPrimary}
        />
        <Separator px={48} />
        <Typography
          style={{
            textAlign: "center",
          }}
        >
          No tengo una cuenta
        </Typography>
        <Link
          style={{
            textAlign: "center",
            color: "blue",
          }}
          to={"/Register"}
        >
          Registrarme
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
