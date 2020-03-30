export const API_BASE_URL = 'https://5dih1d57x5.execute-api.us-west-1.amazonaws.com/Prod';

export const ROLE = 'role';
export const ROLE_ADMIN = 'admin';
export const ROLE_USER = 'user';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;