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
  }, [resultLogin.loading]);

  const login = React.useMemo(() => {
    return (email: string, password: string) => {
      callLogin({
        variables: {
          data: {
            email,
            password,
          },
        },
      }).catch((err) => {
        // log
        console.error(err);
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
          // console.error(err);
        });
    }
  }, [resultLogin.data]);

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
              // console.error(err);
            });
        }
      })
      .catch((err) => {
        // log
        // console.error(err);
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
  }, [resultCurrentUser.loading]);

  const logout = React.useMemo(() => {
    return () => {
      setUser(() => undefined);
    };
  }, []);

  const update = React.useMemo(() => {
    return (update: {
      id: number;
      firstName?: string;
      lastName?: string;
      imageUrl?: string;
    }) => {
      updateCurrentUser({
        ...update,
      })
        .then((r) => {
          if (r) {
            console.log("updateCurrentUser");
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
          // console.error(err);
        });
    };
  }, []);

  React.useEffect(() => {
    if (resultCurrentUser.data && !user) {
      addCurrentUser(resultCurrentUser.data)
        .then(() => {
          setUser(() => resultCurrentUser.data);
        })
        .catch((err) => {
          // log
          // console.error(err);
        });
    }
  }, [resultCurrentUser.data]);

  React.useEffect(() => {
    if (resultCurrentUser.data && user) {
      update(resultCurrentUser.data);
    }
  }, [resultCurrentUser.data]);

  React.useEffect(() => {
    getCurrentUser()
      .then((u) => {
        if (u) {
          setUser(() => u);
        }
      })
      .catch((err) => {
        // log
        // console.error(err);
      })
      .finally(() => {
        callCurrentUser().catch((err) => {
          // log
          // console.error(err);
        });
      });
  }, [callCurrentUser]);

  return {
    user,
    isUserLoaded,
    update,
    loading,
    logout,
  };
};

export const useSignup = () => {
  const [callSignup, resultSignup] = useSignupUserService();
  const [callCurrentUser, resultCurrentUser] = useCurrentUserService();

  const loading = React.useMemo(() => {
    return resultSignup.loading || resultCurrentUser.loading;
  }, [resultSignup.loading, resultCurrentUser.loading]);

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
      })
        .then(() => {
          callCurrentUser().catch((err) => {
            // log
            // console.error(err);
          });
        })
        .catch((err) => {
          // log
          // console.error(err);
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
          // console.error(err);
        });
    } else if (resultCurrentUser.error) {
      Alert.alert("Error", "Ocurrio un error al intentar loguearse.", [
        { text: "OK" },
      ]);
      // console.log(resultSignup.error);
    }
  }, [resultCurrentUser.data, resultCurrentUser.error]);

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
