import React from "react";
import { addPlaceTypes, createPlaceTypes, getPlaceTypes } from "../db";
import { addPlaces, createPlaces, getPlaces } from "../db/place";
import {
  IPlace,
  IPlaceType,
  useQueryPlaces,
  useQueryPlaceTypes,
} from "../services/PlaceService";

export const usePlaceTypes = () => {
  const [_data, setData] = React.useState<IPlaceType[]>([]);
  const [call, status] = useQueryPlaceTypes();

  const data = React.useMemo(() => {
    return status.data.length ? status.data : _data;
  }, [_data, status.data]);

  React.useEffect(() => {
    if (status.data.length) {
      createPlaceTypes()
        .then(() => {
          addPlaceTypes(status.data);
        })
        .catch(() => {
          // log
        });
    }
  }, [status.data]);

  React.useEffect(() => {
    getPlaceTypes()
      .then((res) => {
        setData(() => res);
      })
      .catch(() => {
        // log
      })
      .finally(() => {
        call();
      });
  }, []);

  return {
    ...status,
    data,
  };
};

export const useViewPlace = () => {
  const [place, setPlace] = React.useState<IPlace>();
  return {
    place,
    setPlace,
  };
};

export const useAllPlace = () => {
  const [places, setPlaces] = React.useState<IPlace[]>([]);
  const [placeType, setPlaceType] = React.useState<IPlaceType>();
  const [callPlaces, statusPlaces] = useQueryPlaces();
  const [_update, setUpdate] = React.useState<number>();

  const update = React.useMemo(() => {
    return () => {
      setUpdate(() => new Date().getTime());
    };
  }, []);

  const placesByType = React.useMemo(() => {
    return places.filter((i) => i.placeTypeId === placeType?.id);
  }, [placeType, places]);

  React.useEffect(() => {
    if (statusPlaces.data.length) {
      createPlaces()
        .then(() => {
          addPlaces(JSON.stringify(statusPlaces.data));
          setPlaces(() => statusPlaces.data);
        })
        .catch(() => {
          // log
        });
    }
  }, [statusPlaces.data]);

  React.useEffect(() => {
    getPlaces()
      .then((res) => {
        if (res) {
          setPlaces(() => JSON.parse(res));
        }
      })
      .catch(() => {
        // log
      })
      .finally(() => {
        callPlaces();
      });
  }, [_update]);

  return {
    places,
    placesByType,
    placeType,
    setPlaceType,
    update,
  };
};

export const useAddPlace = () => {
  const [placeType, setPlaceType] = React.useState<IPlaceType>();
  const [place, setPlace] = React.useState<IPlace>();
  const [callPlaces, statusPlaces] = useQueryPlaces();

  React.useEffect(() => {
    if (placeType?.id) {
      callPlaces({
        variables: {
          where: {
            placeTypeId: {
              equals: placeType.id,
            },
          },
        },
      });
    }
  }, [placeType]);

  return {
    placeType,
    setPlaceType,
    ...statusPlaces,
    place,
    setPlace,
  };
};
