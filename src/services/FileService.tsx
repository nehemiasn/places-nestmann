import React from "react";
import { Mutation } from "../apollo/GraphQL";
import { CustomMutationOutput, useCustomMutation } from "../apollo/hooks";

export const useUploadOnePlaceFile = (): CustomMutationOutput<any> => {
  const [call, status] = useCustomMutation(Mutation.uploadOnePlaceFile);
  return [call, status];
};

export const uploadFileUser = (): CustomMutationOutput<any> => {
  const [call, status] = useCustomMutation(Mutation.uploadFileUser);
  return [call, status];
};
