// Utility functions for the application

export const formatPrice = (price: string): string => {
  const numPrice = parseFloat(price.replace(/[^\d.]/g, ''));
  return isNaN(numPrice) ? price : `₹${numPrice.toLocaleString()}`;
};

export const extractRating = (ratingText: string): number => {
  const match = ratingText.match(/(\d+\.?\d*)\s+out\s+of\s+5\s+stars/);
  return match ? parseFloat(match[1]) : 0;
};

export const extractReviewCount = (reviewText: string): number => {
  const match = reviewText.match(/\((\d+)\)/);
  return match ? parseInt(match[1]) : 0;
};

export const calculateDiscountPercentage = (actualPrice: string, sellingPrice: string): number => {
  const actual = parseFloat(actualPrice.replace(/[^\d.]/g, ''));
  const selling = parseFloat(sellingPrice.replace(/[^\d.]/g, ''));
  
  if (isNaN(actual) || isNaN(selling) || actual === 0) return 0;
  
  return Math.round(((actual - selling) / actual) * 100);
};

export const validateAmazonUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const validHostnames = ['amazon.in', 'amazon.com', 'amazon.co.uk', 'amazon.ca', 'amazon.de', 'amazon.fr'];
    return validHostnames.some(hostname => urlObj.hostname.includes(hostname)) && 
           (urlObj.pathname.includes('/dp/') || urlObj.pathname.includes('/gp/product/'));
  } catch {
    return false;
  }
};

export const validateFlipkartUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('flipkart.com') && urlObj.pathname.includes('/p/');
  } catch {
    return false;
  }
};

export const validateMyntraUrl = (url: string): boolean => {
  return url.includes('myntra.com') && url.includes('/buy');
};

export const validateJioMartUrl = (url: string): boolean => {
  return url.includes('jiomart.com') && url.includes('/p/');
};

export const validateAjioUrl = (url: string): boolean => {
  return url.includes('ajio.com') && url.includes('/p/');
};

export const validateChromaUrl = (url: string): boolean => {
  return url.includes('croma.com') && url.includes('/p/');
};

export const validateVijaySalesUrl = (url: string): boolean => {
  return url.includes('vijaysales.com') && url.includes('/p/');
};

export const validateNykaaUrl = (url: string): boolean => {
  return url.includes('nykaa.com') && url.includes('/p/');
};

export const validateOneMgUrl = (url: string): boolean => {
  return url.includes('1mg.com') && (url.includes('/otc/') || url.includes('/p/'));
};

export const validatePharmEasyUrl = (url: string): boolean => {
  return url.includes('pharmeasy.in') && url.includes('/online-medicine-order/');
};

export const validateNetmedsUrl = (url: string): boolean => {
  return url.includes('netmeds.com') && url.includes('/product/');
};

export const validateBlinkitUrl = (url: string): boolean => {
  return url.includes('blinkit.com') && url.includes('/prn/') && url.includes('/prid/');
};

export const validateSwiggyInstamartUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('swiggy.com') && 
           urlObj.pathname.includes('/instamart/item/') && 
           urlObj.searchParams.has('storeId');
  } catch {
    return false;
  }
};

export const validateZeptoUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('zeptonow.com') && 
           urlObj.pathname.includes('/pn/') && 
           urlObj.pathname.includes('/pvid/');
  } catch {
    return false;
  }
};

export const validateBigBasketUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('bigbasket.com') && 
           urlObj.pathname.includes('/pd/');
  } catch {
    return false;
  }
};

export const validatePepperfryUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('pepperfry.com') && 
           urlObj.pathname.includes('/product/') && 
           urlObj.pathname.includes('.html');
  } catch {
    return false;
  }
};

export const validateHomeCentreUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('homecentre.in') && 
           urlObj.pathname.includes('/p/');
  } catch {
    return false;
  }
};

export const validateShoppersStopUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('shoppersstop.com') && 
           urlObj.pathname.includes('/p-');
  } catch {
    return false;
  }
};

export const validateUrbanicUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('urbanic.com') && 
           urlObj.pathname.includes('/details/');
  } catch {
    return false;
  }
};

export const validateIKEAUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('ikea.com') && 
           urlObj.pathname.includes('/p/');
  } catch {
    return false;
  }
};

export const validateBIBAUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('biba.in') && 
           urlObj.pathname.includes('/') && 
           urlObj.pathname.includes('.html');
  } catch {
    return false;
  }
};

export const validateLifestyleStoresUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('lifestylestores.com') && 
           urlObj.pathname.includes('/p/');
  } catch {
    return false;
  }
};

export const validateMedPlusMartUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('medplusmart.com') && 
           urlObj.pathname.includes('/product/');
  } catch {
    return false;
  }
};

export const validateTruemedsUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('truemeds.in') && 
           urlObj.pathname.includes('/medicine/');
  } catch {
    return false;
  }
};

export const validateApolloPharmacyUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('apollopharmacy.in') && 
           (urlObj.pathname.includes('/otc/') || urlObj.pathname.includes('/medicine/'));
  } catch {
    return false;
  }
};

export const validateDMartUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('dmart.in') && 
           urlObj.pathname.includes('/product/');
  } catch {
    return false;
  }
};

export const validateLiciousUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('licious.in') && 
           (urlObj.pathname.includes('/seafood/') || urlObj.pathname.includes('/meat/') || urlObj.pathname.includes('/chicken/'));
  } catch {
    return false;
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateImagePlaceholder = (width: number = 200, height: number = 200): string => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#99a3af" text-anchor="middle" dy=".3em">Image not available</text>
    </svg>
  `)}`;
};

// Security and Input Sanitization Utilities
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL is required' };
  }

  const sanitizedUrl = sanitizeInput(url);
  
  if (sanitizedUrl.length === 0) {
    return { isValid: false, error: 'URL cannot be empty' };
  }

  try {
    const urlObj = new URL(sanitizedUrl);
    
    // Check for valid protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'URL must use HTTP or HTTPS protocol' };
    }

    // Check for valid hostname
    if (!urlObj.hostname || urlObj.hostname.length < 3) {
      return { isValid: false, error: 'Invalid hostname' };
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /file:/i,
      /ftp:/i
    ];

    if (suspiciousPatterns.some(pattern => pattern.test(sanitizedUrl))) {
      return { isValid: false, error: 'URL contains suspicious content' };
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid URL format' };
  }
};

export const sanitizeHtml = (html: string): string => {
  if (typeof html !== 'string') return '';
  
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Performance Utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Error Handling Utilities
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred';
};

export const logError = (error: unknown, context?: string): void => {
  const message = getErrorMessage(error);
  const timestamp = new Date().toISOString();
  
  console.error(`[${timestamp}] ${context ? `[${context}] ` : ''}${message}`, error);
  
  // In production, you might want to send this to an error tracking service
  if (import.meta.env.PROD) {
    // Example: sendToErrorTrackingService(error, context);
  }
};
