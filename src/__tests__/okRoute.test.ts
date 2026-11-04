import { describe, it, expect } from "vitest";
import { RtpVersion } from "src/models/RtpVersion";
import { Route } from "src/routes/ok";

const validateSearch = Route.options.validateSearch as (search: Record<string, unknown>) => unknown;

describe("/ok route search params", () => {
  it("reads result, rtpId, version and reason", () => {
    expect(validateSearch({ result: "deleted", rtpId: "id", version: RtpVersion.V4, reason: "AC04" })).toEqual({
      result: "deleted",
      rtpId: "id",
      version: RtpVersion.V4,
      reason: "AC04",
    });
  });

  it("drops invalid values", () => {
    expect(validateSearch({ result: "unauthorized", rtpId: 1, version: "v9", reason: 2 })).toEqual({
      result: undefined,
      rtpId: undefined,
      version: undefined,
      reason: undefined,
    });
  });
});
