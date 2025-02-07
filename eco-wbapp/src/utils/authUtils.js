export function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000; // exp is in seconds, converting to milliseconds
        return expirationTime < Date.now();
    } catch (error) {
        // In case the token is not valid or the decoding fails
        return true;
    }
}