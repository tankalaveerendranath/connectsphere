@@ .. @@
   const handleLogin = (user: User) => {
     setCurrentUser(user);
    
    // Store user session in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
    
     setUsers(prev => {
       const existingIndex = prev.findIndex(u => u.id === user.id);
       if (existingIndex >= 0) {
         const updated = [...prev];
         updated[existingIndex] = user;
         return updated;
       }
       return [...prev, user];
     });
   };
@@ .. @@
   const handleLogout = () => {
    // Clear user session from localStorage
    localStorage.removeItem('currentUser');
     setCurrentUser(null);
     setShowAuth(true);
   };
@@ .. @@
   // Initialize sample data
   useEffect(() => {
     const { users: sampleUsers, posts: samplePosts, notifications: sampleNotifications, stories: sampleStories, friendRequests: sampleFriendRequests } = generateSampleData();
     setUsers(sampleUsers);
     setPosts(samplePosts);
     setNotifications(sampleNotifications);
     setStories(sampleStories);
     setFriendRequests(sampleFriendRequests);
    
    // Check for existing user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        // Make sure the user exists in the users array
        setUsers(prev => {
          const existingIndex = prev.findIndex(u => u.id === user.id);
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = user;
            return updated;
          }
          return [...prev, user];
        });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
   }, []);

  // Show auth modal if no user is logged in (but only after checking localStorage)
   useEffect(() => {
    if (!currentUser && !localStorage.getItem('currentUser')) {
       setShowAuth(true);
     }
   }, [currentUser]);