import { useMutation } from "@tanstack/react-query";
import { client } from "./client";
import { v4 as uuidv4 } from "uuid";
import { AxiosError, AxiosResponse } from "axios";
import { RtpStatusUpdateCancelResult, RtpStatusUpdateResult } from "generated/apiClient";
import { CONTENT_TYPE } from "src/models/Requests";

export type StatusUpdateType = "statusUpdate" | "statusUpdateCancel";

export type StatusUpdateParams = {
  resourceId: string;
};

// Status update is available only for EPC 4.0, which maps to API version v2
export const STATUS_UPDATE_VERSION = "v2";

export const useStatusUpdate = (type: StatusUpdateType) => {
  return useMutation({
    mutationKey: [type],
    mutationFn: ({ resourceId }: StatusUpdateParams): Promise<AxiosResponse<RtpStatusUpdateResult | RtpStatusUpdateCancelResult>> => {
      const params = {
        headers: {
          version: STATUS_UPDATE_VERSION,
          requestId: uuidv4(),
          "content-type": CONTENT_TYPE.JSON,
        },
      };
      return type === "statusUpdate"
        ? client.api.rtps.requestRtpStatusUpdate({ resourceId }, params)
        : client.api.rtps.requestRtpStatusUpdateCancel({ resourceId }, params);
    },
    onError: (error: AxiosError) => {
      throw error;
    },
  });
};
