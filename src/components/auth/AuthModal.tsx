
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Lock, Stethoscope, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent, type: 'login' | 'register') => {
    e.preventDefault();
    
    // For now, just show a success message
    toast({
      title: type === 'login' ? 'Login Successful!' : 'Registration Successful!',
      description: `Welcome to DocSpot! ${type === 'register' ? 'Please check your email to verify your account.' : ''}`,
    });
    
    onClose();
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'patient': return <User className="w-4 h-4" />;
      case 'doctor': return <Stethoscope className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'patient': return 'Patient';
      case 'doctor': return 'Healthcare Provider';
      case 'admin': return 'Administrator';
      default: return 'Patient';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Welcome to DocSpot
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login" className="space-y-4 animate-fade-in">
            <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 glass border-white/30 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 glass border-white/30 focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center">
              <Button variant="link" className="text-primary-600 hover:text-primary-700">
                Forgot your password?
              </Button>
            </div>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register" className="space-y-4 animate-fade-in">
            <form onSubmit={(e) => handleSubmit(e, 'register')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-type" className="text-sm font-medium text-gray-700">
                  I am a...
                </Label>
                <Select value={userType} onValueChange={(value) => setUserType(value as typeof userType)}>
                  <SelectTrigger className="glass border-white/30 focus:border-primary-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="glass backdrop-blur-xl border-white/20">
                    <SelectItem value="patient">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Patient
                      </div>
                    </SelectItem>
                    <SelectItem value="doctor">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4" />
                        Healthcare Provider
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Administrator
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    className="glass border-white/30 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    className="glass border-white/30 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 glass border-white/30 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-10 glass border-white/30 focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                {getUserTypeIcon(userType)}
                <span className="ml-2">Create {getUserTypeLabel(userType)} Account</span>
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-600">
          By continuing, you agree to our{' '}
          <Button variant="link" className="p-0 h-auto text-primary-600 hover:text-primary-700">
            Terms of Service
          </Button>{' '}
          and{' '}
          <Button variant="link" className="p-0 h-auto text-primary-600 hover:text-primary-700">
            Privacy Policy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
