import React from "react";
import {
  Ipayload,
  IUser,
  useLogin,
  useCurrentUser,
  useSignupStore,
} from "./UserStore";

interface IStore {
  loginStore: {
    login: (email: string, password: string) => void;
    loading: boolean;
    userAuthToken: Ipayload | undefined;
  };
  currentUserStore: {
    user: IUser | undefined;
    isUserLoaded: boolean;
    update: (update: {
      firstName?: string;
      lastName?: string;
      imageUrl?: string;
    }) => void;
    loading: boolean;
  };
  signupStore: {
    signup: (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => void;
    loading: boolean;
  };
}

const context: IStore = {
  loginStore: {} as any,
  currentUserStore: {} as any,
  signupStore: {} as any,
};

export const StoreContext = React.createContext(context);

export interface StoreProviderProps {
  children: any;
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  const loginStore = useLogin();
  const currentUserStore = useCurrentUser();
  const signupStore = useSignupStore();

  return (
    <StoreContext.Provider
      value={{ loginStore, currentUserStore, signupStore }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
