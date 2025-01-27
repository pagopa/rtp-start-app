import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import { CreateRtp } from "generated/apiClient";

export const useRtps = () => {
  const rtp = useMutation({
    mutationKey: ["createRtp"],
    mutationFn: async (data: CreateRtp) =>
      await client.api.rtps.createRtp(data),
  });

	return rtp;
};
