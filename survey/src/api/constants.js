const PROTOCOL= process.env.REACT_APP_REMOTE_SERVICE_PROTOCOL;
const HOST= process.env.REACT_APP_REMOTE_SERVICE_HOST_NAME;
const PORT= process.env.REACT_APP_REMOTE_SERVICE_HOST_PORT;

export const HOST_URL = `${PROTOCOL}://${HOST}:${PORT}`;
// export const HOST_URL = 'http://ravanagahi.com:8585';
// export const HOST_URL = 'http://192.168.0.26:8585';
//  export const HOST_URL = 'http://localhost:8585';
// export const HOST_URL = 'http://localhost:3001';