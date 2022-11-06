import React from "react";
import { ILocation } from "../components/Base/GoogleMaps/CurrentPosition";
import { CurrentPosition } from "../components/Base/GoogleMaps";
import { SetterState } from "../types";
import { View } from "../components";
import { LoadingApp } from "../components/Business/LoadingApp";

interface IAppContext {
  location: ILocation | undefined;
  // setLocation: SetterState<ILocation | undefined>
  handleGetLocation: (callback?: (l: ILocation) => void) => void;
  imageUri: string | undefined;
  setImageUri: SetterState<string | undefined>;
}

const context: IAppContext = {
  location: undefined,
  handleGetLocation: () => {},
  imageUri: undefined,
  setImageUri: () => {},
};

export const AppContext = React.createContext(context);

export interface AppContextProviderProps {}

export const AppContextProvider: React.FC<AppContextProviderProps> = (
  props
) => {
  const loadComponent = React.useRef<boolean>(false);
  const { children } = props as any;
  const { getLocation } = CurrentPosition();
  const [location, setLocation] = React.useState<ILocation>();
  const [imageUri, setImageUri] = React.useState<string>();

  const handleGetLocation = async (callback?: (l: ILocation) => void) => {
    const location: any = await getLocation();
    setLocation(() => ({ ...location }));
    if (callback) {
      callback(location);
    }
  };

  React.useEffect(() => {
    if (imageUri && loadComponent.current) {
      // addProfile("", imageUri || "").catch((err) => {
      //   console.log(err);
      // });
    }
  }, [imageUri]);

  React.useEffect(() => {
    loadComponent.current = true;
    handleGetLocation();
    return () => {
      loadComponent.current = false;
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        location,
        handleGetLocation,
        imageUri,
        setImageUri,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <LoadingApp />
        {children}
      </View>
    </AppContext.Provider>
  );
};
