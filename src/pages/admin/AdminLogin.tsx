import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(username, password);
    setLoading(false);
    if (ok) {
      navigate('/admin', { replace: true });
    } else {
      setError('Login failed. Check that the backend is running from kiora_backend/backend (see console for details).');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans antialiased p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Kiora Care Admin</h1>
        <p className="text-sm text-gray-500 text-center mb-6 font-medium">Sign in to the admin portal</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="pl-9 border-gray-200 font-medium"
                required
                autoComplete="username"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="pl-9 border-gray-200 font-medium"
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}
          <Button type="submit" className="w-full font-semibold" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
