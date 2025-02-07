import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import { CreateRtp } from "generated/apiClient";
import { v4 as uuidv4 } from "uuid";
import { AxiosError } from "axios";
import { CONTENT_TYPE } from "src/models/Requests";

export const useRtps = () => {
  const rtp = useMutation({
    mutationKey: ["createRtp"],
    mutationFn: async (data: CreateRtp) =>
      await client.api.rtps.createRtp(data, {
        headers: {
          version: "v1",
          requestId: uuidv4(),
          "content-type": CONTENT_TYPE.JSON,
        },
      }),
    onError: (error: AxiosError) => {
      throw error;
    },
  });

  return rtp;
};
