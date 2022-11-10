import React from "react";
import { ILocation } from "../components/Base/GoogleMaps/CurrentPosition";
import { CurrentPosition } from "../components/Base/GoogleMaps";
import { SetterState } from "../types";
import { View } from "../components";
import { LoadingApp } from "../components/Business/LoadingApp";
import { Ipayload } from "../store/UserStore";

interface IAppContext {
  location: ILocation | undefined;
  handleGetLocation: (callback?: (l: ILocation) => void) => void;
  payload: Ipayload | undefined;
  setPayload: SetterState<Ipayload | undefined>;
}

const context: IAppContext = {
  location: undefined,
  handleGetLocation: () => {},
  payload: undefined,
  setPayload: () => {},
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
  const [payload, setPayload] = React.useState<Ipayload>();

  const handleGetLocation = async (callback?: (l: ILocation) => void) => {
    const location: any = await getLocation();
    setLocation(() => ({ ...location }));
    if (callback) {
      callback(location);
    }
  };

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
        payload,
        setPayload,
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
