import React from "react";
import { addPlaceTypes, createPlaceTypes, getPlaceTypes } from "../db";
import { IPlaceType, useQueryPlaceTypes } from "../services/PlaceService";

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
