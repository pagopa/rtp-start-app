// Which success message the /ok page shows. It lives in the URL (not in the message store)
// because the API interceptor overwrites the store on every failed request.
export const OK_RESULTS = ["default", "deleted", "statusUpdated", "statusUpdateCancelled"] as const;

export type OkResult = (typeof OK_RESULTS)[number];

export const isOkResult = (value: unknown): value is OkResult =>
  OK_RESULTS.includes(value as OkResult);
