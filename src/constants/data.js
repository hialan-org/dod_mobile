export const API_BASE_URL = 'https://dlj4o26lpe.execute-api.us-west-2.amazonaws.com/Prod';

export const ROLE = 'role';
export const ROLE_ADMIN = 'admin';
export const ROLE_USER = 'user';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;