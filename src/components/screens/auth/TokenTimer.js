// tokenTimer.js
let refreshTokenTimeout;

export const startRefreshTokenTimer = (expiresTime, refreshTokenCallback) => {
  console.log('da vao refresh', expiresTime);
  const currentTime = Date.now();
  const expires = expiresTime - currentTime;

  // Thiết lập thời gian refresh token trước 2 phút
  const refreshTime = expires - 2 * 60 * 1000; // 2 phút trước khi chết
  if (refreshTime > 0) {
    if (refreshTokenTimeout) {
      clearTimeout(refreshTokenTimeout);
    }

    refreshTokenTimeout = setTimeout(async () => {
      try {
        await refreshTokenCallback();
      } catch (error) {
        console.log('Error refreshing token', error);
      }
    }, refreshTime);
  }
};

export const stopRefreshTokenTimer = () => {
  if (refreshTokenTimeout) {
    clearTimeout(refreshTokenTimeout);
    refreshTokenTimeout = null;
  }
};
