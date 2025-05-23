export const updateUserProfileHandler = (updatedProfileData, setCurrentUser, setUsers) => {
  setCurrentUser(prevUser => {
    const newUser = { ...prevUser, ...updatedProfileData };
    localStorage.setItem('telegramCurrentUser', JSON.stringify(newUser));
    
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(u => u.id === newUser.id ? newUser : u);
      localStorage.setItem('telegramUsers', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    return newUser;
  });
};

export const toggleFollowUserHandler = (userIdToFollow, currentUser, users, setUsers, setCurrentUser) => {
  setUsers(prevUsers => {
    const updatedUsers = prevUsers.map(user => {
      if (user.id === userIdToFollow) {
        const newIsFollowing = !user.isFollowing;
        const newFollowersCount = newIsFollowing ? (user.followers || 0) + 1 : Math.max(0, (user.followers || 0) - 1);
        return { ...user, isFollowing: newIsFollowing, followers: newFollowersCount };
      }
      return user;
    });

    const userBeingFollowed = updatedUsers.find(u => u.id === userIdToFollow);
    
    if (currentUser.id !== userIdToFollow) {
        setCurrentUser(prevCurrentUser => {
            const newFollowingCountForCurrentUser = userBeingFollowed.isFollowing 
                ? (prevCurrentUser.following || 0) + 1 
                : Math.max(0, (prevCurrentUser.following || 0) - 1);
            const updatedCurrentUser = { ...prevCurrentUser, following: newFollowingCountForCurrentUser };
            localStorage.setItem('telegramCurrentUser', JSON.stringify(updatedCurrentUser));

            // Update currentUser in the main users list as well
            const finalUsers = updatedUsers.map(u => u.id === updatedCurrentUser.id ? updatedCurrentUser : u);
            localStorage.setItem('telegramUsers', JSON.stringify(finalUsers));
            return updatedCurrentUser; 
        });
    } else { // if current user is somehow the one being (un)followed (e.g. data issue), just save users list.
        localStorage.setItem('telegramUsers', JSON.stringify(updatedUsers));
    }
    return updatedUsers; 
  });
};