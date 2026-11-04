import { describe, it, expect } from "vitest";
import { RtpVersion } from "src/models/RtpVersion";
import { Route } from "src/routes/ok";

const validateSearch = Route.options.validateSearch as (search: Record<string, unknown>) => unknown;

describe("/ok route search params", () => {
  it("reads rtpId, version and reason", () => {
    expect(validateSearch({ rtpId: "id", version: RtpVersion.V4, reason: "AC04" })).toEqual({
      rtpId: "id",
      version: RtpVersion.V4,
      reason: "AC04",
    });
  });

  it("drops invalid values", () => {
    expect(validateSearch({ rtpId: 1, version: "v9", reason: 2 })).toEqual({
      rtpId: undefined,
      version: undefined,
      reason: undefined,
    });
  });
});
