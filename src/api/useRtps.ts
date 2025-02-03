import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import { CreateRtp } from "generated/apiClient";
import { v4 as uuidv4 } from "uuid";
import { AxiosError } from "axios";

export const useRtps = () => {
  const rtp = useMutation({
    mutationKey: ["createRtp"],
    mutationFn: async (data: CreateRtp) =>
      await client.api.rtps.createRtp(data, {
        headers: {
          version: "v1",
          requestId: uuidv4(),
          "content-type": "text/json",
        },
      }),
    onError: (error: AxiosError) => {
      throw error;
    },
  });

  return rtp;
};
