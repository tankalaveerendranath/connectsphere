const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onLogin, onSwitchMode, users }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (mode === 'login') {
        // Find user by email
        const existingUser = users.find(u => u.email === formData.email);
        
        if (!existingUser) {
          setError('No account found with this email address. Please sign up first.');
          setIsLoading(false);
          return;
        }
        
        // In a real app, you would verify the password hash
        // For demo purposes, we'll check if password is not empty
        if (!formData.password.trim()) {
          setError('Please enter your password.');
          setIsLoading(false);
          return;
        }
        
        // Simulate password verification (in real app, compare with hashed password)
        if (formData.password.length < 6) {
          setError('Invalid password. Password must be at least 6 characters.');
          setIsLoading(false);
          return;
        }
        
        onLogin(existingUser);
      } else {
        // Validate signup form
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          setError('Please enter your first and last name.');
          setIsLoading(false);
          return;
        }
        
        if (!formData.email.trim() || !formData.email.includes('@')) {
          setError('Please enter a valid email address.');
          setIsLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long.');
          setIsLoading(false);
          return;
        }
        
        // Check if user already exists
        const existingUser = users.find(u => u.email === formData.email);
        if (existingUser) {
          setError('An account with this email already exists. Please sign in instead.');
          setIsLoading(false);
          return;
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          username: formData.email.split('@')[0],
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=3b82f6&color=fff`,
        };
        onLogin(newUser);
      }
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {mode === 'login' ? <LogIn className="text-white" size={24} /> : <UserPlus className="text-white" size={24} />}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h2>
            <p className="text-slate-600">
              {mode === 'login' 
                ? 'Sign in to access your dashboard' 
                : 'Join us and start your journey'
              }
            </p>
          </div>

          {/* Demo Users (only show in login mode) */}
          {mode === 'login' && users.length > 0 && (
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-600 mb-3 font-medium">Demo Users:</p>
              <div className="space-y-2">
                {users.slice(0, 2).map(user => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <img src={user.avatar} alt={user.firstName} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
            
            {mode === 'login' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-700">
                  <strong>Demo Note:</strong> You can only sign in with accounts you've created. 
                  If you don't have an account, please sign up first.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};