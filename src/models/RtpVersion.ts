// API "version" header values: v1 = EPC 3.2, v2 = EPC 4.0
export enum RtpVersion {
  V3 = "v1",
  V4 = "v2",
}

export const isRtpVersion = (value: unknown): value is RtpVersion =>
  Object.values(RtpVersion).includes(value as RtpVersion);
