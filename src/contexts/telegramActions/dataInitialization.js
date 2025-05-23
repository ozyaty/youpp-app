export const generateId = () => Math.random().toString(36).substr(2, 9);

export const initializeDataHandler = (setters, mockData) => {
  const { setCurrentUser, setUsers, setPosts, setComments, setNotifications, setTrends, setSuggestedUsers, setIsInitialized } = setters;
  const { mockCurrentUserInitial, mockUsersInitial, mockPostsInitial, mockCommentsInitial, mockNotificationsInitial, mockTrendsInitial, mockSuggestedUsersInitial } = mockData;

  let storedCurrentUser = JSON.parse(localStorage.getItem('telegramCurrentUser'));
  let storedUsers = JSON.parse(localStorage.getItem('telegramUsers')) || [];
  let storedPosts = JSON.parse(localStorage.getItem('telegramPosts')) || [];
  let storedComments = JSON.parse(localStorage.getItem('telegramComments')) || [];
  let storedNotifications = JSON.parse(localStorage.getItem('telegramNotifications')) || [];
  
  if (!storedCurrentUser) {
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    storedCurrentUser = { 
      ...mockCurrentUserInitial, 
      id: telegramUser?.id?.toString() || mockCurrentUserInitial.id,
      username: telegramUser?.username || mockCurrentUserInitial.username,
      name: `${telegramUser?.first_name || 'Current'} ${telegramUser?.last_name || 'User'}`,
      avatar: telegramUser?.photo_url || '',
      coverImage: '',
      email: '',
      phone: '',
      isPrivate: false,
      showActivityStatus: true,
      bookmarkedPosts: [],
    };
    localStorage.setItem('telegramCurrentUser', JSON.stringify(storedCurrentUser));
  }
  
  setCurrentUser(storedCurrentUser);

  if (storedUsers.length === 0) {
    storedUsers = [storedCurrentUser, ...mockUsersInitial.filter(u => u.id !== storedCurrentUser.id)];
    localStorage.setItem('telegramUsers', JSON.stringify(storedUsers));
  } else {
    const currentUserInUsers = storedUsers.find(u => u.id === storedCurrentUser.id);
    if (currentUserInUsers) {
      Object.assign(currentUserInUsers, storedCurrentUser);
    } else {
      storedUsers.push(storedCurrentUser);
    }
    localStorage.setItem('telegramUsers', JSON.stringify(storedUsers));
  }
  setUsers(storedUsers);

  if (storedPosts.length === 0) {
    storedPosts = mockPostsInitial.map(p => ({...p, bookmarked: storedCurrentUser.bookmarkedPosts?.includes(p.id) || false }));
    localStorage.setItem('telegramPosts', JSON.stringify(storedPosts));
  } else {
      storedPosts = storedPosts.map(p => ({...p, bookmarked: storedCurrentUser.bookmarkedPosts?.includes(p.id) || false }));
  }
  setPosts(storedPosts);
  
  if (storedComments.length === 0) {
    storedComments = mockCommentsInitial;
    localStorage.setItem('telegramComments', JSON.stringify(storedComments));
  }
  setComments(storedComments);

  if (storedNotifications.length === 0) {
    storedNotifications = mockNotificationsInitial;
    localStorage.setItem('telegramNotifications', JSON.stringify(storedNotifications));
  }
  setNotifications(storedNotifications);

  setTrends(mockTrendsInitial);
  setSuggestedUsers(mockSuggestedUsersInitial);
  setIsInitialized(true);
};