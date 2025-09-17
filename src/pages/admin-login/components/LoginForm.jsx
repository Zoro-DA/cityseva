import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { login } from '../../../lib/auth';
import { userIsAdmin } from '../../../lib/admin';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (loginError) setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.email) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData?.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData?.password) newErrors.password = 'Password is required';
    else if (formData?.password?.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError('');
    try {
      // 1) Firebase sign-in
      const cred = await login(formData.email.trim(), formData.password);

      // 2) Admin check (Firestore: admins/{uid} -> isAdmin: true)
      const isAdmin = await userIsAdmin(cred.user.uid);
      if (!isAdmin) {
        setLoginError('Your account is not an admin for this project.');
        return;
      }

      // 3) Preserve existing app behavior (for Header etc.)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('adminEmail', formData.email.trim());
      if (formData.rememberMe) localStorage.setItem('rememberAdmin', 'true');
      else localStorage.removeItem('rememberAdmin');

      navigate('/admin-dashboard');
    } catch (e) {
      // show Firebase error code to help diagnose (user-not-found, wrong-password, etc.)
      setLoginError(`${e?.code || 'auth/error'}: ${e?.message || 'Login failed'}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password recovery coming soon. Ask an administrator to reset your password.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-civic-lg border border-border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="var(--color-primary-foreground)" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground">
            Sign in to access the City Seva administration panel
          </p>
        </div>

        {/* Login Error */}
        {loginError && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-error mb-1">Authentication Failed</p>
                <p className="text-sm text-error/80">{loginError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="admin@cityseva.gov.in"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-civic"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
            iconSize={20}
            className="py-3"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* You can delete this demo block if you want */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Tip</p>
              <p className="text-xs text-muted-foreground">
                Make sure to use your credentials on your private computer and do not share your credentials with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
