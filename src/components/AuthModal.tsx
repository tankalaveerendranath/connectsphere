@@ .. @@
 const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onLogin, onSwitchMode, users }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
+  const [error, setError] = useState('');
   const [formData, setFormData] = useState({
     email: '',
     password: '',
@@ .. @@
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
+    setError('');
     setIsLoading(true);
 
     // Simulate API call
     setTimeout(() => {
       if (mode === 'login') {
-        // For demo, use existing user or create a demo user
-        const existingUser = users.find(u => u.email === formData.email) || users[0];
-        onLogin(existingUser);
+        // Find user by email
+        const existingUser = users.find(u => u.email === formData.email);
+        
+        if (!existingUser) {
+          setError('No account found with this email address. Please sign up first.');
+          setIsLoading(false);
+          return;
+        }
+        
+        // In a real app, you would verify the password hash
+        // For demo purposes, we'll check if password is not empty
+        if (!formData.password.trim()) {
+          setError('Please enter your password.');
+          setIsLoading(false);
+          return;
+        }
+        
+        // Simulate password verification (in real app, compare with hashed password)
+        if (formData.password.length < 6) {
+          setError('Invalid password. Password must be at least 6 characters.');
+          setIsLoading(false);
+          return;
+        }
+        
+        onLogin(existingUser);
       } else {
+        // Validate signup form
+        if (!formData.firstName.trim() || !formData.lastName.trim()) {
+          setError('Please enter your first and last name.');
+          setIsLoading(false);
+          return;
+        }
+        
+        if (!formData.email.trim() || !formData.email.includes('@')) {
+          setError('Please enter a valid email address.');
+          setIsLoading(false);
+          return;
+        }
+        
+        if (formData.password.length < 6) {
+          setError('Password must be at least 6 characters long.');
+          setIsLoading(false);
+          return;
+        }
+        
+        // Check if user already exists
+        const existingUser = users.find(u => u.email === formData.email);
+        if (existingUser) {
+          setError('An account with this email already exists. Please sign in instead.');
+          setIsLoading(false);
+          return;
+        }
+        
         const newUser: User = {
           id: Date.now().toString(),
           username: formData.email.split('@')[0],
@@ .. @@
               </div>
             )}
 
+            {/* Error Message */}
+            {error && (
+              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
+                <p className="text-red-600 text-sm">{error}</p>
+              </div>
+            )}
+
             {/* Form */}
             <form onSubmit={handleSubmit} className="space-y-6">