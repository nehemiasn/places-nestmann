import { Link } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { Separator, View, Typography } from "../components";
import { RootTabScreenProps } from "../types";
import { colors } from "../utils/constants";

interface LoginProps extends RootTabScreenProps<"Props"> {}

export const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Separator px={32} />
        <Typography>Email</Typography>
        <TextInput
          style={styles.input}
          onChangeText={(ev) => setEmail(() => ev)}
          value={email}
        />
        <Separator px={16} />
        <Typography>Contraseña</Typography>
        <TextInput
          style={styles.input}
          onChangeText={(ev) => setPassword(() => ev)}
          value={password}
        />
        <Separator px={32} />
        <Button
          title="Iniciar sesion"
          onPress={() => {}}
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
    width: "250px",
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
