import React from "react";
import { ILocation } from "../components/Base/GoogleMaps/CurrentPosition";
import { CurrentPosition } from "../components/Base/GoogleMaps";
import { SetterState } from "../types";
import { View } from "../components";
import { LoadingApp } from "../components/Business/LoadingApp";
import { Ipayload } from "../store/User";

interface IAppContext {
  loading: boolean;
  setLoading: SetterState<boolean>;
  location: ILocation | undefined;
  handleGetLocation: (callback?: (l: ILocation) => void) => void;
  payload: Ipayload | undefined;
  setPayload: SetterState<Ipayload | undefined>;
  initialRegion:
    | {
        latitudeDelta: number;
        longitudeDelta: number;
        latitude: number;
        longitude: number;
      }
    | undefined;
}

const context: IAppContext = {
  loading: false,
  setLoading: () => {},
  location: undefined,
  handleGetLocation: () => {},
  payload: undefined,
  setPayload: () => {},
  initialRegion: undefined,
};

export const AppContext = React.createContext(context);

export interface AppContextProviderProps {}

export const AppContextProvider: React.FC<AppContextProviderProps> = (
  props
) => {
  const loadComponent = React.useRef<boolean>(false);
  const { children } = props as any;
  const [loading, setLoading] = React.useState<boolean>(false);
  const { getLocation } = CurrentPosition();
  const [location, setLocation] = React.useState<ILocation>();
  const [payload, setPayload] = React.useState<Ipayload>();

  const initialRegion = React.useMemo(() => {
    if (location) {
      return {
        ...location.coords,
        latitudeDelta: 20,
        longitudeDelta: 20,
      };
    }
    return undefined;
  }, [location]);

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
        loading,
        setLoading,
        location,
        handleGetLocation,
        payload,
        setPayload,
        initialRegion,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <LoadingApp loading={loading} />
        {children}
      </View>
    </AppContext.Provider>
  );
};
