export function getRtpIdFromLocationHeader(locationHeader: string | null): string | null {
  if (!locationHeader) return null;
  
  const segments = locationHeader.split('/');
  return segments.pop() || null;
}