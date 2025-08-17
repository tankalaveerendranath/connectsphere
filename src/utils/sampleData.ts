@@ .. @@
 export const generateSampleData = () => {
+  // Create a demo user that can be used for testing login
+  const demoUser: User = {
+    id: 'demo-user',
+    username: 'demo',
+    email: 'demo@socialhub.com',
+    firstName: 'Demo',
+    lastName: 'User',
+    displayName: 'Demo User',
+    avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150',
+    bio: 'Demo user account for testing SocialHub features. Welcome to the platform!',
+    location: 'Demo City',
+    website: 'https://socialhub.demo',
+    company: 'SocialHub',
+    position: 'Demo User',
+    followers: 100,
+    following: 50,
+    posts: 5,
+    isOnline: true,
+    isVerified: false,
+    joinedDate: new Date('2024-01-01'),
+    lastActive: new Date(),
+    privacy: 'public',
+    interests: ['Technology', 'Social Media', 'Networking'],
+    skills: ['Communication', 'Social Networking']
+  };

   const users: User[] = [
+    demoUser,
     {
       id: '1',
    }
  ];
};