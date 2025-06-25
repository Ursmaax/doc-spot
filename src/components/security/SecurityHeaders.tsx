
import { useEffect } from 'react';

const SecurityHeaders = () => {
  useEffect(() => {
    // Set security-related meta tags
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[${name.startsWith('http-equiv') ? 'http-equiv' : 'name'}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('http-equiv')) {
          meta.setAttribute('http-equiv', name.replace('http-equiv=', ''));
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Content Security Policy (basic client-side)
    setMetaTag('http-equiv=Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https:; " +
      "frame-ancestors 'none';"
    );

    // X-Content-Type-Options
    setMetaTag('http-equiv=X-Content-Type-Options', 'nosniff');

    // X-Frame-Options
    setMetaTag('http-equiv=X-Frame-Options', 'DENY');

    // Referrer Policy
    setMetaTag('referrer', 'strict-origin-when-cross-origin');

    // Permissions Policy
    setMetaTag('http-equiv=Permissions-Policy', 
      'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
    );

    // Disable autocomplete for sensitive forms
    const sensitiveInputs = document.querySelectorAll('input[type="password"], input[data-sensitive="true"]');
    sensitiveInputs.forEach(input => {
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('spellcheck', 'false');
    });

  }, []);

  return null;
};

export default SecurityHeaders;
