
// Security utilities for input validation and sanitization
import DOMPurify from 'dompurify';

// Email validation with enhanced security
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (email.length > 320) {
    return { isValid: false, error: 'Email address too long' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  // Check for common malicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
  }
  
  return { isValid: true };
};

// Password strength validation
export const validatePassword = (password: string): { isValid: boolean; error?: string; strength?: string } => {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, error: 'Password too long' };
  }
  
  // Check for common weak passwords
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123', 
    'password123', 'admin', 'letmein', 'welcome', '123456789'
  ];
  
  if (commonPasswords.includes(password.toLowerCase())) {
    return { isValid: false, error: 'Password is too common' };
  }
  
  // Strength checking
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const criteriaCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
  
  if (criteriaCount < 3) {
    return { isValid: false, error: 'Password must contain at least 3 of: uppercase, lowercase, numbers, special characters' };
  }
  
  const strength = criteriaCount === 4 ? 'Strong' : criteriaCount === 3 ? 'Medium' : 'Weak';
  
  return { isValid: true, strength };
};

// Sanitize user input
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Remove script tags and other dangerous HTML
  const sanitized = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
  
  // Trim whitespace and limit length
  return sanitized.trim().substring(0, 1000);
};

// Validate name inputs
export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required' };
  }
  
  const sanitizedName = sanitizeInput(name);
  
  if (sanitizedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (sanitizedName.length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  
  // Only allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(sanitizedName)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  
  return { isValid: true };
};

// Rate limiting helper (client-side)
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return false; // Rate limited
    }
    
    recentAttempts.push(now);
    attempts.set(identifier, recentAttempts);
    
    return true; // Allow request
  };
};

// XSS protection for displaying user content
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// CSRF token generator (for future backend integration)
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
