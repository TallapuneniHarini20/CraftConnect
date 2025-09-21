import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterPage() {
  const { actions, isAuthenticated } = useMember();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<string[]>([]);

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: checked
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.email) newErrors.push('Email is required');
    if (!formData.password) newErrors.push('Password is required');
    if (!formData.firstName) newErrors.push('First name is required');
    if (!formData.lastName) newErrors.push('Last name is required');
    if (!formData.agreeToTerms) newErrors.push('You must agree to the terms and conditions');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Use Wix authentication for registration
      await actions.login();
      // Navigation will happen automatically via useEffect when isAuthenticated becomes true
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">CraftConnect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Already on CraftConnect?</span>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Side - Hero Content */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Showcase your craftsmanship
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join our platform as an artisan to manage your products, reach customers worldwide, and grow your craft business with our specialized tools.
              </p>
            </div>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Manage your product catalog</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Access artisan dashboard</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Voice input for descriptions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Join as an Artisan
              </h1>
              <p className="text-gray-600">
                Create your artisan account to showcase and manage your handcrafted products
              </p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  🎨 <strong>Artisan Registration:</strong> This registration is for artisans only. 
                  Customers can browse the marketplace without creating an account.
                </p>
              </div>
            </div>

            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 h-12 text-base"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password (6+ characters)
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 h-12 text-base"
                      placeholder="Enter your password"
                      minLength={6}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 h-12 text-base"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 h-12 text-base"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={handleCheckboxChange}
                      className="mt-1"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
                      By clicking Agree & Join, you agree to the CraftConnect{' '}
                      <Link to="#" className="text-blue-600 hover:underline">
                        User Agreement
                      </Link>
                      ,{' '}
                      <Link to="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                      , and{' '}
                      <Link to="#" className="text-blue-600 hover:underline">
                        Cookie Policy
                      </Link>
                      .
                    </Label>
                  </div>

                  {errors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        <ul className="list-disc list-inside">
                          {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
                  >
                    Agree & Join
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => {
                        try {
                          await actions.login();
                          // Navigation will happen automatically via useEffect
                        } catch (error) {
                          console.error('Google registration error:', error);
                        }
                      }}
                      className="w-full h-12 text-base font-semibold border-gray-300"
                    >
                      Continue with Google
                    </Button>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Already an artisan?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                      Sign in
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Just browsing?{' '}
                    <Link to="/marketplace" className="font-semibold text-blue-600 hover:text-blue-700">
                      Visit Marketplace
                    </Link>
                    {' '}(No account needed)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}