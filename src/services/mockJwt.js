/**
 * Helper to encode an object as URL-safe base64
 */
const base64UrlEncode = (obj) => {
  const jsonStr = JSON.stringify(obj);
  return btoa(jsonStr)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

/**
 * Creates a mock 3-part base64 encoded JWT token for testing.
 * Format: header.payload.signature
 */
export const createMockJwt = (userData = {}, expiresInSeconds = 3600) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userData.id || 'usr_12345',
    email: userData.email || 'member@group14.com',
    name: userData.name || 'Group 14 Member',
    role: userData.role || 'member',
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const dummySignature = 'mock_signature_group14_sec_key';

  return `${encodedHeader}.${encodedPayload}.${dummySignature}`;
};

/**
 * Pre-configured mock JWT tokens for testing auth flows
 */
export const mockTokens = {
  // Valid Member token (expires in 2 hours)
  validMember: () => createMockJwt({ id: 'usr_1', email: 'user@company.com', name: 'Standard User', role: 'member' }, 7200),
  
  // Valid Admin token (expires in 2 hours)
  validAdmin: () => createMockJwt({ id: 'usr_2', email: 'admin@company.com', name: 'Admin User', role: 'admin' }, 7200),
  
  // Expired token (expired 30 minutes ago)
  expired: () => createMockJwt({ id: 'usr_3', email: 'expired@company.com', name: 'Expired User', role: 'member' }, -1800),
  
  // Invalid/corrupted token format
  corrupted: () => 'invalid.corrupted_jwt_token_string',
};

export default mockTokens;
