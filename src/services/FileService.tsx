import { Mutation } from "../apollo/GraphQL";
import { CustomMutationOutput, useCustomMutation } from "../apollo/hooks";

export const useUploadOnePlaceFileService = (): CustomMutationOutput<any> => {
  const [call, status] = useCustomMutation(Mutation.uploadOnePlaceFile);
  return [call, status];
};

export const useUploadFileUserService = (): CustomMutationOutput<any> => {
  const [call, status] = useCustomMutation(Mutation.uploadFileUser);
  return [call, status];
};
