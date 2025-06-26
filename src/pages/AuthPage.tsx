
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Lock, Stethoscope, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const validateForm = (type: 'login' | 'register') => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (type === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('login')) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '🎉 Welcome back!',
          description: 'You have been logged in successfully.',
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('register')) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            userType: userType,
          }
        }
      });

      if (error) {
        toast({
          title: 'Sign Up Failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '🚀 Account created successfully!',
          description: `Welcome to DocSpot! Your ${userType} account is ready to use. Please check your email to confirm your account.`,
        });
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      toast({
        title: 'Sign Up Failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getUserTypeConfig = (type: string) => {
    switch (type) {
      case 'patient': 
        return { 
          icon: User, 
          label: 'Patient', 
          color: 'text-blue-500',
          gradient: 'from-blue-500 to-cyan-500'
        };
      case 'doctor': 
        return { 
          icon: Stethoscope, 
          label: 'Healthcare Provider', 
          color: 'text-emerald-500',
          gradient: 'from-emerald-500 to-teal-500'
        };
      case 'admin': 
        return { 
          icon: Shield, 
          label: 'Administrator', 
          color: 'text-purple-500',
          gradient: 'from-purple-500 to-pink-500'
        };
      default: 
        return { 
          icon: User, 
          label: 'Patient', 
          color: 'text-blue-500',
          gradient: 'from-blue-500 to-cyan-500'
        };
    }
  };

  const userConfig = getUserTypeConfig(userType);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">DocSpot</span>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome to DocSpot
          </h1>
          <p className="text-gray-600 mt-2">Your gateway to modern healthcare</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardHeader className="space-y-1">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded-xl">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all font-semibold"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-lg transition-all font-semibold"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <CardContent className="p-6">
                {/* Login Form */}
                <TabsContent value="login" className="space-y-4 animate-fade-in">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-semibold text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`pl-12 h-12 bg-white/80 border-2 focus:border-violet-400 rounded-xl transition-all ${
                            errors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                          disabled={isLoading}
                          required
                        />
                        {errors.email && (
                          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-semibold text-gray-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`pl-12 h-12 bg-white/80 border-2 focus:border-violet-400 rounded-xl transition-all ${
                            errors.password ? 'border-red-400' : 'border-gray-200'
                          }`}
                          disabled={isLoading}
                          required
                        />
                        {errors.password && (
                          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.password}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                    >
                      {isLoading ? 'Signing In...' : 'Sign In Securely'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register" className="space-y-4 animate-fade-in">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-type" className="text-sm font-semibold text-gray-700">
                        I am a...
                      </Label>
                      <Select value={userType} onValueChange={(value) => setUserType(value as typeof userType)}>
                        <SelectTrigger className="h-12 bg-white/80 border-2 border-gray-200 focus:border-blue-400 rounded-xl">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl">
                          <SelectItem value="patient">
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-blue-500" />
                              <span className="font-medium">Patient</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="doctor">
                            <div className="flex items-center gap-3">
                              <Stethoscope className="w-5 h-5 text-emerald-500" />
                              <span className="font-medium">Healthcare Provider</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="admin">
                            <div className="flex items-center gap-3">
                              <Shield className="w-5 h-5 text-purple-500" />
                              <span className="font-medium">Administrator</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-sm font-semibold text-gray-700">
                          First Name
                        </Label>
                        <Input
                          id="first-name"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                            errors.firstName ? 'border-red-400' : 'border-gray-200'
                          }`}
                          disabled={isLoading}
                          required
                        />
                        {errors.firstName && (
                          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-3 h-3" />
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-sm font-semibold text-gray-700">
                          Last Name
                        </Label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                            errors.lastName ? 'border-red-400' : 'border-gray-200'
                          }`}
                          disabled={isLoading}
                          required
                        />
                        {errors.lastName && (
                          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-3 h-3" />
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-sm font-semibold text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`pl-12 h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                            errors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                          disabled={isLoading}
                          required
                        />
                        {errors.email && (
                          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-sm font-semibold text-gray-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`pl-12 h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                            errors.password ? 'border-red-400' : 'border-gray-200'
                          }`}
                          disabled={isLoading}
                          required
                        />
                        {errors.password && (
                          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.password}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`pl-12 h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                            errors.confirmPassword ? 'border-red-400' : 'border-gray-200'
                          }`}
                          disabled={isLoading}
                          required
                        />
                        {errors.confirmPassword && (
                          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className={`w-full h-12 bg-gradient-to-r ${userConfig.gradient} hover:shadow-xl transform hover:scale-[1.02] transition-all text-white font-semibold rounded-xl shadow-lg`}
                    >
                      <div className="flex items-center gap-2">
                        <userConfig.icon className="w-5 h-5" />
                        {isLoading ? 'Creating Account...' : `Create ${userConfig.label} Account`}
                      </div>
                    </Button>
                  </form>
                </TabsContent>
              </CardContent>
            </Tabs>
          </CardHeader>
        </Card>

        <div className="text-center text-sm text-gray-600 pt-4">
          By continuing, you agree to our{' '}
          <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium">
            Terms of Service
          </Button>{' '}
          and{' '}
          <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium">
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
