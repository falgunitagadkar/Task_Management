export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update-profile',
    CHANGE_PASSWORD: '/user/change-password',
  },
  TASK: {
    CREATE: '/tasks/add',
    UPDATE: '/tasks/update',
    DELETE: '/tasks/delete',
    GETALL: '/tasks/get-all',
    GETBYID: '/tasks/get-by-id',
  }
};