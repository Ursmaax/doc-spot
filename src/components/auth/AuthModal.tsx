import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Lock, Stethoscope, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateEmail, validatePassword, validateName, sanitizeInput } from '@/utils/security';
import SecureForm from '@/components/security/SecureForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const { toast } = useToast();

  const validateForm = (type: 'login' | 'register') => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error || 'Invalid email';
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error || 'Invalid password';
    } else {
      setPasswordStrength(passwordValidation.strength || '');
    }

    if (type === 'register') {
      // First name validation
      const firstNameValidation = validateName(formData.firstName);
      if (!firstNameValidation.isValid) {
        newErrors.firstName = firstNameValidation.error || 'Invalid first name';
      }

      // Last name validation
      const lastNameValidation = validateName(formData.lastName);
      if (!lastNameValidation.isValid) {
        newErrors.lastName = lastNameValidation.error || 'Invalid last name';
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (data: any) => {
    const type = activeTab as 'login' | 'register';
    
    if (!validateForm(type)) {
      throw new Error('Validation failed');
    }

    // Simulate API call with enhanced security
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: type === 'login' ? '🎉 Welcome back!' : '🚀 Account created successfully!',
      description: type === 'login' 
        ? 'You have been logged in successfully.' 
        : `Welcome to DocSpot! Your ${userType} account is ready to use.`,
    });
    
    // Reset form
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: ''
    });
    setErrors({});
    setPasswordStrength('');
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    // Sanitize input
    const sanitizedValue = field === 'email' ? value.trim() : sanitizeInput(value);
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time password strength checking
    if (field === 'password') {
      const validation = validatePassword(sanitizedValue);
      setPasswordStrength(validation.strength || '');
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

  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Strong': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Weak': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome to DocSpot
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 mt-2">
            Your gateway to modern healthcare
          </DialogDescription>
        </DialogHeader>

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

          {/* Login Form */}
          <TabsContent value="login" className="space-y-6 animate-fade-in">
            <SecureForm 
              onSubmit={handleSubmit}
              rateLimitKey={`login-${formData.email}`}
              maxAttempts={3}
              windowMs={900000} // 15 minutes
            >
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-12 h-12 bg-white/80 border-2 focus:border-violet-400 rounded-xl transition-all ${
                      errors.email ? 'border-red-400' : 'border-gray-200'
                    }`}
                    data-sensitive="true"
                    autoComplete="email"
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
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-12 h-12 bg-white/80 border-2 focus:border-violet-400 rounded-xl transition-all ${
                      errors.password ? 'border-red-400' : 'border-gray-200'
                    }`}
                    autoComplete="current-password"
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
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
              >
                Sign In Securely
              </Button>
            </SecureForm>

            <div className="text-center">
              <Button variant="link" className="text-violet-600 hover:text-violet-700 font-medium">
                Forgot your password?
              </Button>
            </div>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register" className="space-y-6 animate-fade-in">
            <SecureForm 
              onSubmit={handleSubmit}
              rateLimitKey={`register-${formData.email}`}
              maxAttempts={3}
              windowMs={1800000} // 30 minutes
            >
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
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                      errors.firstName ? 'border-red-400' : 'border-gray-200'
                    }`}
                    autoComplete="given-name"
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
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                      errors.lastName ? 'border-red-400' : 'border-gray-200'
                    }`}
                    autoComplete="family-name"
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
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-12 h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                      errors.email ? 'border-red-400' : 'border-gray-200'
                    }`}
                    autoComplete="email"
                    data-sensitive="true"
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
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-12 h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                      errors.password ? 'border-red-400' : 'border-gray-200'
                    }`}
                    autoComplete="new-password"
                    required
                  />
                  {passwordStrength && (
                    <div className={`flex items-center gap-1 mt-1 text-sm ${getPasswordStrengthColor(passwordStrength)}`}>
                      <CheckCircle className="w-4 h-4" />
                      Password strength: {passwordStrength}
                    </div>
                  )}
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
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pl-12 h-12 bg-white/80 border-2 focus:border-blue-400 rounded-xl transition-all ${
                      errors.confirmPassword ? 'border-red-400' : 'border-gray-200'
                    }`}
                    autoComplete="new-password"
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
                className={`w-full h-12 bg-gradient-to-r ${userConfig.gradient} hover:shadow-xl transform hover:scale-[1.02] transition-all text-white font-semibold rounded-xl shadow-lg`}
              >
                <div className="flex items-center gap-2">
                  <userConfig.icon className="w-5 h-5" />
                  Create {userConfig.label} Account
                </div>
              </Button>
            </SecureForm>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-600 border-t pt-4">
          By continuing, you agree to our{' '}
          <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium">
            Terms of Service
          </Button>{' '}
          and{' '}
          <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium">
            Privacy Policy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
