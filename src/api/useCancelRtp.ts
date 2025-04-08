import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import { v4 as uuidv4 } from "uuid";
import { CONTENT_TYPE } from "src/models/Requests";

export const useCancelRtp = () => {
  return useMutation({
    mutationKey: ["cancelRtp"],
    mutationFn: (rtpId: string) =>
      client.api.rtps.cancelRtp(rtpId, {
        headers: {
          version: "v1",
          requestId: uuidv4(),
          "content-type": CONTENT_TYPE.JSON,
        },
      }),
  });
};