export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // exp is in seconds, converting to milliseconds
    return expirationTime < Date.now();
  } catch (error) {
    console.log('Error checking token expiration:', error);
    return true;
  }
}
