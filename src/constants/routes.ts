// Centralized route constants for the application
export const ROUTES = {
  // Main application routes
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  
  // Dashboard sections
  DASHBOARD_OVERVIEW: '/dashboard/overview',
  SCRAPERS: '/dashboard/scrapers',
  ANALYTICS: '/dashboard/analytics',
  DATA_MANAGEMENT: '/dashboard/data',
  SETTINGS: '/dashboard/settings',
  
  // API endpoints
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://7cvccltb-3100.inc1.devtunnels.ms/api',
    
    // Scraping endpoints
    AMAZON: '/amazon/scrape-product',
    FLIPKART: '/flipkart/scrape-product',
    MYNTRA: '/myntra/scrape-product',
    JIOMART: '/jiomart/scrape',
    AJIO: '/ajio/scrape',
    CHROMA: '/chroma/scrape',
    VIJAYSALES: '/vijaysales/scrape',
    NYKAA: '/nykaa/scrape',
    ONEMG: '/1mg/scrape',
    PHARMEASY: '/pharmeasy/scrape',
    NETMEDS: '/netmeds/scrape',
    BLINKIT: '/blinkit/scrape',
    SWIGGY_INSTAMART: '/swiggy-instamart/scrape',
    ZEPTO: '/zepto/scrape',
    BIGBASKET: '/bigbasket/scrape',
    PEPPERFRY: '/pepperfry/scrape',
    HOMECENTRE: '/homecentre/scrape',
    SHOPPERSSTOP: '/shoppersstop/scrape',
    URBANIC: '/urbanic/scrape',
    IKEA: '/ikea/scrape',
    BIBA: '/biba/scrape',
    LIFESTYLESTORES: '/lifestylestores/scrape',
    MEDPLUSMART: '/medplusmart/scrape',
    TRUEMEDS: '/truemeds/scrape',
    APOLLOPHARMACY: '/apollopharmacy/scrape',
    DMART: '/dmart/scrape',
    LICIOUS: '/licious/scrape',
  },
  
  // External URLs
  EXTERNAL: {
    AMAZON: 'https://amazon.in',
    FLIPKART: 'https://flipkart.com',
    MYNTRA: 'https://myntra.com',
    JIOMART: 'https://jiomart.com',
    AJIO: 'https://ajio.com',
    CHROMA: 'https://croma.com',
    VIJAYSALES: 'https://vijaysales.com',
    NYKAA: 'https://nykaa.com',
    ONEMG: 'https://1mg.com',
    PHARMEASY: 'https://pharmeasy.in',
    NETMEDS: 'https://www.netmeds.com',
    BLINKIT: 'https://blinkit.com',
    SWIGGY_INSTAMART: 'https://swiggy.com/instamart',
    ZEPTO: 'https://zeptonow.com',
    BIGBASKET: 'https://bigbasket.com',
    PEPPERFRY: 'https://pepperfry.com',
    HOMECENTRE: 'https://homecentre.in',
    SHOPPERSSTOP: 'https://shoppersstop.com',
    URBANIC: 'https://urbanic.com',
    IKEA: 'https://ikea.com',
    BIBA: 'https://biba.in',
    LIFESTYLESTORES: 'https://lifestylestores.com',
    MEDPLUSMART: 'https://www.medplusmart.com',
    TRUEMEDS: 'https://www.truemeds.in',
    APOLLOPHARMACY: 'https://www.apollopharmacy.in',
    DMART: 'https://www.dmart.in',
    LICIOUS: 'https://www.licious.in',
  }
} as const;

// Type for route keys
export type RouteKey = keyof typeof ROUTES;
export type ApiRouteKey = keyof typeof ROUTES.API;
export type ExternalRouteKey = keyof typeof ROUTES.EXTERNAL;
