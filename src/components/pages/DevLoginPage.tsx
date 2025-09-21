import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Code, Terminal, Settings, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

export default function DevLoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    environment: 'development'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const environments = [
    { value: 'development', label: 'Development', color: 'bg-green-100 text-green-800' },
    { value: 'staging', label: 'Staging', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'testing', label: 'Testing', color: 'bg-blue-100 text-blue-800' },
    { value: 'local', label: 'Local', color: 'bg-purple-100 text-purple-800' }
  ];

  const devAccounts = [
    { username: 'dev-admin', role: 'Administrator', access: 'Full System Access' },
    { username: 'dev-tester', role: 'QA Tester', access: 'Testing Environment' },
    { username: 'dev-viewer', role: 'Read Only', access: 'View Only Access' },
    { username: 'dev-cms', role: 'CMS Manager', access: 'Content Management' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      alert('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate dev login process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication for development accounts
      const validDevAccounts = ['dev-admin', 'dev-tester', 'dev-viewer', 'dev-cms'];
      
      if (validDevAccounts.includes(credentials.username) && credentials.password === 'dev123') {
        // Store dev session info
        sessionStorage.setItem('devSession', JSON.stringify({
          username: credentials.username,
          environment: credentials.environment,
          loginTime: new Date().toISOString(),
          role: devAccounts.find(acc => acc.username === credentials.username)?.role
        }));
        
        alert(`Development login successful!\nUser: ${credentials.username}\nEnvironment: ${credentials.environment}`);
        navigate('/home');
      } else {
        throw new Error('Invalid development credentials');
      }
    } catch (error) {
      console.error('Dev login error:', error);
      alert('Invalid development credentials. Use dev accounts with password "dev123"');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (username: string) => {
    setCredentials(prev => ({
      ...prev,
      username,
      password: 'dev123'
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Dev Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-6 h-6 text-green-400" />
            <h1 className="text-xl font-mono font-bold">CraftShare Dev Portal</h1>
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-mono">
              DEVELOPMENT ONLY
            </span>
          </div>
          <div className="text-sm font-mono text-gray-400">
            Build: v1.0.0-dev | Node: 18.x
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Dev Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-mono font-bold">Development Access</h2>
              </div>
              <p className="text-gray-300 mb-4 font-mono text-sm">
                This login portal is exclusively for development, testing, and administrative purposes. 
                Customer access should use the main login page.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-mono text-sm">Full database access</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-mono text-sm">Admin panel access</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-mono text-sm">Debug mode enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-mono text-sm">API testing tools</span>
                </div>
              </div>
            </div>

            {/* Quick Access Accounts */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-mono font-bold">Quick Access Accounts</h3>
              </div>
              <div className="space-y-3">
                {devAccounts.map((account, index) => (
                  <div 
                    key={account.username}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded border border-gray-600 hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => quickLogin(account.username)}
                  >
                    <div>
                      <div className="font-mono text-sm font-semibold text-white">
                        {account.username}
                      </div>
                      <div className="font-mono text-xs text-gray-400">
                        {account.role} • {account.access}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-500 text-gray-300 hover:bg-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        quickLogin(account.username);
                      }}
                    >
                      Use
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gray-900 rounded border border-gray-600">
                <p className="font-mono text-xs text-gray-400">
                  💡 Default password for all dev accounts: <code className="text-green-400">dev123</code>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-mono text-white flex items-center justify-center gap-2">
                  <Database className="w-6 h-6 text-blue-400" />
                  Developer Login
                </CardTitle>
                <p className="font-mono text-gray-400 text-sm">
                  Access development environment and tools
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="environment" className="font-mono text-gray-300">
                      Environment
                    </Label>
                    <Select 
                      value={credentials.environment} 
                      onValueChange={(value) => setCredentials(prev => ({ ...prev, environment: value }))}
                    >
                      <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {environments.map(env => (
                          <SelectItem key={env.value} value={env.value} className="text-white hover:bg-gray-600">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded text-xs ${env.color}`}>
                                {env.label}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="username" className="font-mono text-gray-300">
                      Developer Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="dev-admin, dev-tester, etc."
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="font-mono text-gray-300">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter dev password"
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 font-mono"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 h-12 text-lg font-mono"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Authenticating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        Access Dev Environment
                      </div>
                    )}
                  </Button>
                </form>

                <div className="border-t border-gray-700 pt-4">
                  <div className="bg-gray-900 rounded p-4 border border-gray-600">
                    <h4 className="font-mono text-sm font-bold text-yellow-400 mb-2">⚠️ Security Notice</h4>
                    <ul className="font-mono text-xs text-gray-400 space-y-1">
                      <li>• This portal is for authorized developers only</li>
                      <li>• All access is logged and monitored</li>
                      <li>• Do not share development credentials</li>
                      <li>• Use VPN when accessing from external networks</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-mono text-gray-400 text-sm">
                    Need customer login?{' '}
                    <a href="/login" className="text-blue-400 hover:underline">
                      Use main login page
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 p-4 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-gray-400 text-sm">
            CraftShare Development Portal | Internal Use Only | 
            <span className="text-red-400"> Not for Production</span>
          </p>
        </div>
      </footer>
    </div>
  );
}