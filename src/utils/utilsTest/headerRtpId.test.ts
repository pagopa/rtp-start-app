import { describe, it, expect } from 'vitest';
import { getRtpIdFromLocationHeader } from '../headerRtpId.utils';

describe('getRtpIdFromLocationHeader', () => {
  it('should return null if the locationHeader is empty or null', () => {
    expect(getRtpIdFromLocationHeader('')).toBeNull();
    expect(getRtpIdFromLocationHeader(null)).toBeNull();
  });

  it('should return the last segment of the locationHeader', () => {
    const locationHeader1 = 'http://example.com/rtp/12345';
    const locationHeader2 = 'https://api.example.com/resource/67890';
    
    expect(getRtpIdFromLocationHeader(locationHeader1)).toBe('12345');
    expect(getRtpIdFromLocationHeader(locationHeader2)).toBe('67890');
  });

  it('should return null if there are no segments after splitting by "/"', () => {
    const locationHeader = 'http://example.com/rtp/';
    
    expect(getRtpIdFromLocationHeader(locationHeader)).toBeNull();
  });
});