export const getAccessToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("access_token"))
    ?.split("=")[1];
};

export const getRefreshToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("refresh_token"))
    ?.split("=")[1];
};

export const getExpiresToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("expires_in"))
    ?.split("=")[1];
};

export const getDateNowToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("date_now"))
    ?.split("=")[1];
};

export const hasTokenExpired = () => {
  return Date.now() - Number(getDateNowToken()) > 3600 * 1000;
};

export const refreshToken = () => {
  if (getRefreshToken()) {
    document.cookie = `date_now=${Date.now()}`;
  } else {
    document.cookie = `access_token=;`;
    document.cookie = `refresh_token=;`;
    document.cookie = `expires_in=;`;
  }
};

//TODO delete cookie to change user

//TODO logout
