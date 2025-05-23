export const showAlertHandler = (message, callback) => {
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showConfirm) {
    window.Telegram.WebApp.showConfirm(message, callback);
  } else {
    console.warn('Telegram WebApp showConfirm is not available. Falling back to browser confirm.');
    const confirmed = window.confirm(message);
    if (callback) {
      callback(confirmed);
    }
  }
};

export const closeAppHandler = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.close();
  } else {
    console.warn('Telegram WebApp close is not available.');
  }
};