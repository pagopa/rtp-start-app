import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import { v4 as uuidv4 } from "uuid";
import { CancelReason } from "generated/apiClient";

export type { CancelReason };

export type CancelRtpParams = {
  rtpId: string;
  reason: CancelReason;
};

export const useCancelRtp = () => {
  return useMutation({
    mutationKey: ["cancelRtp"],
    mutationFn: ({ rtpId, reason }: CancelRtpParams) =>
      client.api.rtps.cancelRtp(
        { resourceId: rtpId, reason },
        {
          headers: {
            version: "v1",
            requestId: uuidv4(),
          },
        }
      ),
  });
};