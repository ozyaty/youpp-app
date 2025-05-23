export const markNotificationAsReadHandler = (notificationId, setNotifications) => {
  setNotifications(prevNotifications => {
    const updatedNotifications = prevNotifications.map(n => 
      n.id === notificationId ? { ...n, unread: false } : n
    );
    localStorage.setItem('telegramNotifications', JSON.stringify(updatedNotifications));
    return updatedNotifications;
  });
};