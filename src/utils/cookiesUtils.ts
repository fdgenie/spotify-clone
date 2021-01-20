export const setAccessToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("access_token"))
    ?.split("=")[1];
};

export const setRefreshToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("refresh_token"))
    ?.split("=")[1];
};

export const setExpiresToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("expires_in"))
    ?.split("=")[1];
};

export const setDateNowToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("date_now"))
    ?.split("=")[1];
};

export const hasTokenExpired = () => {
  return Date.now() - Number(setDateNowToken()) > 3600 * 1000;
};

export const refreshToken = () => {
  //   if (setRefreshToken()) {
  //   }
};
