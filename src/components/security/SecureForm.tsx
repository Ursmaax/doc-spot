
import React, { useState, useEffect } from 'react';
import { AlertCircle, Shield, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createRateLimiter } from '@/utils/security';

interface SecureFormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => Promise<void>;
  className?: string;
  rateLimitKey?: string;
  maxAttempts?: number;
  windowMs?: number;
}

const SecureForm: React.FC<SecureFormProps> = ({
  children,
  onSubmit,
  className = '',
  rateLimitKey = 'default',
  maxAttempts = 5,
  windowMs = 300000, // 5 minutes
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [rateLimiter] = useState(() => createRateLimiter(maxAttempts, windowMs));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!rateLimiter(rateLimitKey)) {
      setSecurityError(`Too many attempts. Please wait ${Math.ceil(windowMs / 60000)} minutes before trying again.`);
      return;
    }

    setIsSubmitting(true);
    setSecurityError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      await onSubmit(data);
    } catch (error) {
      setSecurityError('An error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {securityError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {securityError}
          </AlertDescription>
        </Alert>
      )}
      
      {children}
      
      <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
        <Shield className="w-4 h-4" />
        <span>Your data is protected with security measures</span>
      </div>
    </form>
  );
};

export default SecureForm;
