import React from "react";
import { addPlaceTypes, createPlaceTypes, getPlaceTypes } from "../db";
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

  return {
    ...status,
    data,
  };
};

export const useViewPlace = () => {
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
