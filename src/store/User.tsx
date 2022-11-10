import React from "react";
import { Alert } from "react-native";
import {
  addCurrentUser,
  addUserAuthToken,
  getCurrentUser,
  updateCurrentUser,
  getUserAuthToken,
} from "../db";
import {
  useLoginUserService,
  useSignupUserService,
  useCurrentUserService,
} from "../services/UserService";

export const useLogin = () => {
  const [userAuthToken, setUserAuthToken] = React.useState<Ipayload>();
  const [callLogin, resultLogin] = useLoginUserService();

  const loading = React.useMemo(() => {
    return resultLogin.loading;
  }, [resultLogin]);

  const login = React.useMemo(() => {
    return (email: string, password: string) => {
      callLogin({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
    };
  }, []);

  React.useEffect(() => {
    if (resultLogin.data) {
      addUserAuthToken(resultLogin.data)
        .then(() => {
          setUserAuthToken(() => resultLogin.data);
        })
        .catch((err) => {
          // log
          console.error(err);
        });
    }
  }, [resultLogin]);

  React.useEffect(() => {
    getCurrentUser()
      .then((u) => {
        if (u) {
          getUserAuthToken(u.id)
            .then((p) => {
              if (p) {
                setUserAuthToken(() => p);
              }
            })
            .catch((err) => {
              // log
              console.error(err);
            });
        }
      })
      .catch((err) => {
        // log
        console.error(err);
      });
  }, []);

  return {
    login,
    loading,
    userAuthToken,
  };
};

export const useCurrentUser = () => {
  const [user, setUser] = React.useState<IUser>();
  const [callCurrentUser, resultCurrentUser] = useCurrentUserService();

  const isUserLoaded = React.useMemo(() => {
    return !!user?.id;
  }, [user]);

  const loading = React.useMemo(() => {
    return resultCurrentUser.loading;
  }, [resultCurrentUser]);

  const update = React.useMemo(() => {
    return (update: {
      firstName?: string;
      lastName?: string;
      imageUrl?: string;
    }) => {
      if (user?.id) {
        updateCurrentUser({
          ...update,
          id: user.id,
        })
          .then((r) => {
            if (r) {
              setUser((v) => {
                if (v) {
                  return {
                    ...v,
                    ...update,
                  };
                }
                return undefined;
              });
            }
          })
          .catch((err) => {
            // log
            console.error(err);
          });
      }
    };
  }, [user]);

  React.useEffect(() => {
    if (resultCurrentUser.data && !user) {
      addCurrentUser(resultCurrentUser.data)
        .then(() => {
          setUser(() => resultCurrentUser.data);
        })
        .catch((err) => {
          // log
          console.error(err);
        });
    }
  }, [resultCurrentUser]);

  React.useEffect(() => {
    getCurrentUser()
      .then((u) => {
        if (u) {
          setUser(() => u);
        }
      })
      .catch((err) => {
        // log
        console.error(err);
      })
      .finally(() => {
        callCurrentUser();
      });
  }, [callCurrentUser]);

  return {
    user,
    isUserLoaded,
    update,
    loading,
  };
};

export const useSignup = () => {
  const [callSignup, resultSignup] = useSignupUserService();
  const [callCurrentUser, resultCurrentUser] = useCurrentUserService();

  const loading = React.useMemo(() => {
    return resultSignup.loading || resultCurrentUser.loading;
  }, [resultSignup, resultCurrentUser]);

  const signup = React.useMemo(() => {
    return (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      callSignup({
        variables: {
          data: {
            email,
            password,
            firstName,
            lastName,
          },
        },
      }).then(() => {
        callCurrentUser();
      });
    };
  }, []);

  React.useEffect(() => {
    if (resultCurrentUser.data) {
      Alert.alert("Listo!", "Usuario registrado correctamente.", [
        { text: "OK" },
      ]);
      addCurrentUser(resultCurrentUser.data)
        .then(() => {
          // setUser(() => resultCurrentUser.data);
        })
        .catch((err) => {
          // log
          console.error(err);
        });
    } else if (resultCurrentUser.error) {
      Alert.alert("Error", "Ocurrio un error al intentar loguearse.", [
        { text: "OK" },
      ]);
      console.log(resultSignup.error);
    }
  }, [resultCurrentUser]);

  return {
    signup,
    loading,
  };
};

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl: string;
}

export interface Ipayload {
  accessToken: string;
  expiration: number;
  refreshToken: string;
  userId: number;
}