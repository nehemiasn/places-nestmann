import React from "react";
import { Mutation, Query } from "../apollo/GraphQL";
import {
  CustomMutationOutput,
  CustomQueryOutput,
  useCustomMutation,
  useCustomQuery,
} from "../apollo/hooks";

export const useQueryPlaceTypes = (): CustomQueryOutput<IPlaceType[]> => {
  const [call, status] = useCustomQuery(Query.placeTypes);

  const data = React.useMemo(() => {
    return status.data || [];
  }, [status.data]);

  return [
    call,
    {
      ...status,
      data,
    },
  ];
};

export const useQueryPlaces = (): CustomQueryOutput<IPlace[]> => {
  const [call, status] = useCustomQuery(Query.places);

  const data = React.useMemo(() => {
    return status.data || [];
  }, [status.data]);

  return [
    call,
    {
      ...status,
      data,
    },
  ];
};

export const useMutationCreateOnePlace = (): CustomMutationOutput<{
  id: number;
}> => {
  const [call, status] = useCustomMutation(Mutation.createOnePlace);
  return [call, status];
};

export interface IPlaceType {
  id: number;
  name: string;
  description: string;
}
export interface IPlace {
  id: number;
  userId: number;
  name: string;
  googlePlaceId: number;
  latitude: number;
  longitude: number;
  description: string;
  infoGoogle: string;
  placeTypeId: number;
  placeFiles: IPlaceFile[];
}

export interface IPlaceFile {
  id: number;
  placeId: number;
  imageUrl: string;
}
