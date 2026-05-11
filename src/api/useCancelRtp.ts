import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import { v4 as uuidv4 } from "uuid";
import { CONTENT_TYPE } from "src/models/Requests";

export type CancelRtpParams = {
  rtpId: string;
  reason: string;
};

export const useCancelRtp = () => {
  return useMutation({
    mutationKey: ["cancelRtp"],
    mutationFn: ({ rtpId, reason }: CancelRtpParams) =>
      client.api.instance.post(
        `/rtps/cancel`,
        { resourceId: rtpId, reason },
        {
          headers: {
            version: "v1",
            requestId: uuidv4(),
            "content-type": CONTENT_TYPE.JSON,
          },
        }
      ),
  });
};