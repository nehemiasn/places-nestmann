import React from "react";
import { Alert } from "react-native";
import { addProfile, getProfile } from "../db";
import { updateProfile } from "../db/myprofile";
import {
  useLoginUserService,
  useSignupFirebaseUserService,
} from "../services/UserService";

export const useAuthStore = (init?: IUser) => {
  const [user, setUser] = React.useState<IUser>(init || ({} as any));
  const [callLogin, resultLogin] = useLoginUserService();

  const isUserLoaded = React.useMemo(() => {
    return !!user.id;
  }, [user]);

  const loading = React.useMemo(() => {
    return resultLogin.loading;
  }, []);

  const updateUser = (update: {
    firstName?: string;
    lastName?: string;
    image?: string;
  }) => {
    if (isUserLoaded) {
      updateProfile({
        id: user.id,
        ...update,
      })
        .then((r) => {
          if (r) {
            setUser((v) => ({
              ...v,
              ...update,
            }));
          }
        })
        .catch((err) => {
          // log
          console.error(err);
        });
    }
  };

  const login = React.useMemo(() => {
    return (email: string, password: string) => {
      callLogin({
        variables: {
          email,
          password,
        },
      });
    };
  }, []);

  React.useEffect(() => {
    if (resultLogin.data) {
      setUser(() => resultLogin.data);
    }
  }, [resultLogin]);

  React.useEffect(() => {
    getProfile()
      .then((u) => {
        if (u) {
          setUser(() => u);
        }
      })
      .catch((err) => {
        // log
        console.error(err);
      });
  }, []);

  return {
    login,
    user,
    isUserLoaded,
    updateUser,
    loading,
  };
};

export const useSignupStore = () => {
  const [callSignup, resultSignup] = useSignupFirebaseUserService();
  const form = React.useRef<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }>();

  const loading = React.useMemo(() => {
    return resultSignup.loading;
  }, []);

  const signup = React.useMemo(() => {
    return (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      form.current = {
        email,
        password,
        firstName,
        lastName,
      };
      callSignup(
        JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        })
      );
    };
  }, []);

  React.useEffect(() => {
    if (resultSignup.data && form.current) {
      console.log(resultSignup.data);
      addProfile({
        localId: resultSignup.data.localId,
        ...form.current,
      })
        .then(() => {
          Alert.alert("Listo!", "Usuario registrado correctamente.", [
            { text: "OK" },
          ]);
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Error", "Ocurrio un error al intentar registrarse.", [
            { text: "OK" },
          ]);
        });
    } else if (resultSignup.error) {
      Alert.alert("Error", "Ocurrio un error al intentar registrarse.", [
        { text: "OK" },
      ]);
      console.log(resultSignup.error);
    }
  }, [resultSignup]);

  return {
    signup,
    loading,
  };
};

export interface IUser {
  id: number;
  localId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
}
