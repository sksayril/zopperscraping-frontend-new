// API service for handling Amazon product scraping requests

export interface AmazonScrapeRequest {
  url: string;
}

export interface AmazonProductData {
  productName: string;
  sellingPrice: string;
  actualPrice: string;
  offers: string[];
  specifications: Record<string, string>;
  description: string;
  color: string;
  mainImage: string;
  additionalImages: string[];
  availability: string;
  rating: string;
  reviewCount: string;
  brand: string;
  model: string;
  url: string;
  scrapedAt: string;
}

export interface AmazonScrapeResponse {
  success: boolean;
  message: string;
  data: AmazonProductData;
}

export interface AmazonCategoryScrapeRequest {
  url: string;
  page: number;
}

export interface AmazonCategoryProduct {
    asin: string;
    productName: string;
    brand: string;
    sellingPrice: string;
    mrp: string;
    discount: string;
    productImage: string;
    productUrl: string;
    rating: string;
    reviewCount: string;
    availability: string;
    isSponsored: boolean;
    isPrime: boolean;
    scrapedAt: string;
}

export interface AmazonCategoryScrapeData {
    page: number;
    url: string;
    products: AmazonCategoryProduct[];
    pagination: {
        currentPage: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    totalProducts: number;
    scrapedAt: string;
}

export interface AmazonCategoryScrapeResponse {
  success: boolean;
  message: string;
  data: AmazonCategoryScrapeData;
}

  export interface FlipkartScrapeRequest {
  url: string;
}

export interface FlipkartImage {
  url: string;
  highQualityUrl: string;
  alt: string;
  type: string;
  srcset?: string;
}

export interface FlipkartImages {
  main: FlipkartImage[];
  thumbnails: FlipkartImage[];
  highQuality: string[];
  all: FlipkartImage[];
}

export interface FlipkartOffer {
  type: string;
  description: string;
  hasTnC: boolean;
  index: number;
  selector: string;
  details?: {
    percentage?: string;
    bank?: string;
    paymentMethod?: string;
  };
}

export interface FlipkartBreadcrumb {
  text: string;
  url: string;
}

export interface FlipkartSeller {
  name: string;
  rating: string;
  policies: string[];
}

export interface FlipkartDelivery {
  date: string;
  time: string;
  cost: string;
}

export interface FlipkartProductData {
  id: string;
  title: string;
  url: string;
  currentPrice: string;
  originalPrice: string;
  discount: string;
  rating: string;
  ratingCount: string;
  reviewCount: string;
  images: FlipkartImages;
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  seller: FlipkartSeller;
  offers: FlipkartOffer[];
  viewMoreOffers: {
    exists: boolean;
    text: string;
    count: number;
  };
  breadcrumbs: FlipkartBreadcrumb[];
  availability: string;
  delivery: FlipkartDelivery;
  scrapedAt: string;
}

export interface FlipkartScrapeResponse {
  success: boolean;
  message: string;
  data: FlipkartProductData;
}

export interface FlipkartCategoryScrapeRequest {
  url: string;
  page: number;
}

export interface FlipkartCategoryProduct {
    productId: string;
    productName: string;
    brand: string;
    sellingPrice: string;
    actualPrice: string;
    discount: string;
    productImage: string;
    productUrl: string;
    rating: string;
    reviewCount: string;
    availability: string;
    isWishlisted: boolean;
    scrapedAt: string;
}

export interface FlipkartCategoryScrapeData {
    page: number;
    url: string;
    products: FlipkartCategoryProduct[];
    pagination: {
        currentPage: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    totalProducts: number;
    scrapedAt: string;
}

export interface FlipkartCategoryScrapeResponse {
  success: boolean;
  message: string;
  data: FlipkartCategoryScrapeData;
}

export interface MyntraScrapeRequest {
  url: string;
}

export interface MyntraProductData {
  url: string;
  productId: string;
  title: string;
  brand: string;
  currentPrice: string;
  originalPrice: string;
  discount: string;
  images: string[];
  rating: string;
  reviews: string;
  specifications: Record<string, string>;
  sizes: string[];
  description: string;
  bestOffers: string[];
  deliveryInfo: string;
  returnPolicy: string;
  category: string;
  metadata: {
    totalSpecifications: number;
    totalImages: number;
  };
  scrapedAt: string;
}

export interface MyntraScrapeResponse {
  success: boolean;
  message: string;
  data: MyntraProductData;
}

export interface MyntraCategoryScrapeRequest {
  url: string;
}

export interface MyntraCategoryProduct {
    brand: string;
    productName: string;
    price: string;
    originalPrice: string;
    discount: string;
    productUrl: string;
    imageUrl: string;
}

export interface MyntraCategoryScrapeData {
    products: MyntraCategoryProduct[];
    totalProducts: number;
}

export interface MyntraCategoryScrapeResponse {
  success: boolean;
  data: MyntraCategoryScrapeData;
}

export interface JioMartScrapeRequest {
  url: string;
}

export interface JioMartProductInformation {
  type: string;
  name: string;
  id: string;
  manu: string;
  cate: string;
  subcate: string;
  l4category: string;
  vertical: string;
  sellername: string;
  image: string;
  alternate: string;
  exchange: string;
  price: string;
  tracker: string;
  "3p available": string;
}

export interface JioMartAdditionalInfo {
  packageDimensions: string;
  productId: string;
  articleId: string;
}

export interface JioMartProductData {
  url: string;
  platform: string;
  scrapedAt: string;
  productName: string;
  title: string;
  actualPrice: string;
  sellingPrice: string;
  discount: string;
  rating: string;
  reviewCount: string;
  brand: string;
  category: string;
  subCategory: string;
  productDescription: string;
  productInformation: JioMartProductInformation;
  images: string[];
  availability: string;
  seller: string;
  deliveryInfo: string;
  offers: string[];
  specifications: Record<string, string>;
  additionalInfo: JioMartAdditionalInfo;
}

export interface JioMartScrapeResponse {
  success: boolean;
  message: string;
  data: JioMartProductData;
  savedTo?: string;
}

export interface JioMartCategoryScrapeRequest {
  url: string;
}

export interface JioMartCategoryProduct {
    productUrl: string;
    imageUrl: string;
    brand: string;
    productName: string;
    price: string;
    originalPrice: string;
    discount: string;
}

export interface JioMartCategoryScrapeData {
    products: JioMartCategoryProduct[];
    totalProducts: number;
    scrapedAt: string;
}

export interface JioMartCategoryScrapeResponse {
  success: boolean;
  message: string;
  data: JioMartCategoryScrapeData;
}

export interface AjioScrapeRequest {
  url: string;
}

export interface AjioProductData {
  url: string;
  platform: string;
  scrapedAt: string;
  productName: string;
  title: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  colors: string[];
  sizes: string[];
  rating: string;
  reviewCount: string;
  category: string;
  subCategory: string;
  productDescription: string;
  productDetails: Record<string, string>;
  images: string[];
  availability: string;
  material: string;
  careInstructions: string;
  specifications: Record<string, string>;
  additionalInfo: Record<string, any>;
  // Enhanced fields based on actual API response
  packageContains?: string;
  washCare?: string;
  waistRise?: string;
  fabricComposition?: string;
  mrp?: string;
  marketedBy?: string;
  netQty?: string;
  importedBy?: string;
  manufacturedBy?: string;
  countryOfOrigin?: string;
  customerCareAddress?: string;
  commodity?: string;
  numberOfReviews?: number;
  pdpFaqLink?: string;
  // Product attributes from catalog
  productAttributes?: {
    name: string;
    key: string;
    value: string;
    title: string;
    catalogAttributeName?: string;
    range?: boolean;
    comparable?: boolean;
    featureValues?: Array<{
      value: string;
      title?: string;
    }>;
  }[];
}

export interface AjioScrapeResponse {
  success: boolean;
  message: string;
  data: AjioProductData;
  savedTo?: string;
}

export interface ChromaScrapeRequest {
  url: string;
}

export interface ChromaProductData {
  url: string;
  scrapedAt: string;
  productName: string;
  title: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  discountPercentage: string;
  colors: string[];
  sizes: string[];
  availability: string;
  rating: number;
  reviewCount: number;
  category: string;
  subCategory: string;
  productDescription: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  overview: string;
  images: string[];
  offers: string[];
  superSavings: string[];
  material: string;
  careInstructions: string;
  additionalInfo: {
    warranty?: string;
    ean?: string;
    [key: string]: any;
  };
}

export interface ChromaScrapeResponse {
  success: boolean;
  message: string;
  data: ChromaProductData;
  scrapedAt?: string;
}

export interface VijaySalesScrapeRequest {
  url: string;
}

export interface VijaySalesProductData {
  name: string;
  brand: string;
  model: string;
  sku: string;
  category: string;
  subcategory: string;
  currentPrice: number | null;
  originalPrice: number;
  discount: number | null;
  discountPercentage: number;
  emiOptions: string[];
  rating: number;
  reviewCount: number | null;
  ratingCount: number | null;
  images: Array<{
    url: string;
    alt: string;
    position: string;
  }>;
  mainImage: string;
  features: string[];
  specifications: Record<string, string>;
  description: string;
  offers: string[];
  coupons: string[];
  deals: string[];
  availability: string;
  shippingInfo: string[];
  loyaltyPoints: number;
  warranty: string;
  seller: {
    name: string;
    link: string;
  };
  breadcrumbs: string[];
  productUrl: string;
  scrapedAt: string;
}

export interface VijaySalesScrapeResponse {
  success: boolean;
  message: string;
  data: VijaySalesProductData;
}

export interface NykaaScrapeRequest {
  url: string;
}

export interface NykaaProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    productId: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    sizes: string[];
    rating: number;
    reviews: {
      totalRatings: number;
      totalReviews: number;
    };
    description: string;
    features: string[];
    ingredients: string[];
    category: string[];
    availability: {
      inStock: boolean;
      status: string;
    };
    additionalDetails: {
      authenticity: string;
      delivery: string;
      taxInfo: string;
    };
  };
  savedTo?: string;
  timestamp?: string;
}

export interface NykaaScrapeResponse {
  success: boolean;
  message: string;
  data: NykaaProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface OneMgScrapeRequest {
  url: string;
}

export interface OneMgProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    productId: number;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    discountPercent: string;
    images: string[];
    sizes: string[];
    rating: {
      overallRating: number;
      totalRatings: number;
      totalReviews: number;
      ratingBreakdown: Array<{
        colorCode: string;
        rating: number;
        value: number;
      }>;
    };
    description: string;
    highlights: string[];
    manufacturer: {
      name: string;
      address: string;
    };
    marketer: {
      name: string;
      address: string;
    };
    specifications: Array<{
      displayText: string;
      colorCode: string | null;
    }>;
    quantities: Array<{
      value: string;
      displayText: string;
      quantity: number;
    }>;
    availability: {
      inStock: boolean;
      status: string;
    };
    offers: string[];
    standardPack: string;
    standardPackLabel: string;
    vendorInfo: string;
    tags: string[];
  };
  savedTo?: string;
  timestamp?: string;
}

export interface OneMgScrapeResponse {
  success: boolean;
  message: string;
  data: OneMgProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface PharmEasyScrapeRequest {
  url: string;
}

export interface PharmEasyProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    description: string;
    images: string[];
    mrp: number;
    sellingPrice: number;
    discount: number;
    summary: string;
    manufacturer: string;
    packSize: string;
    brand: string;
    uses: string;
    dosage: string;
    precautions: string;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface PharmEasyScrapeResponse {
  success: boolean;
  message: string;
  data: PharmEasyProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface NetmedsScrapeRequest {
  url: string;
}

export interface NetmedsProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    manufacturer: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    description: string;
    composition: string;
    uses: string;
    sideEffects: string;
    howItWorks: string;
    category: string;
    images: string[];
  };
  savedTo?: string;
  timestamp?: string;
}

export interface NetmedsScrapeResponse {
  success: boolean;
  message: string;
  data: NetmedsProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface BlinkitScrapeRequest {
  url: string;
}

export interface BlinkitProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    category: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    productDetails: {
      Type: string;
    };
    description: string;
    units: Array<{
      size: string;
      price: number;
    }>;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface BlinkitScrapeResponse {
  success: boolean;
  message: string;
  data: BlinkitProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface SwiggyInstamartScrapeRequest {
  url: string;
}

export interface SwiggyInstamartProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discountPercent: number;
    discount: number;
    images: string[];
    highlights: string[];
    description: string;
    weight: string;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface SwiggyInstamartScrapeResponse {
  success: boolean;
  message: string;
  data: SwiggyInstamartProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface ZeptoScrapeRequest {
  url: string;
}

export interface ZeptoProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    offers: string[];
    highlights: string[];
    information: {
      weight?: string;
      dimensions?: string;
      voltage?: string;
      material?: string;
      color?: string;
      customerCare?: string;
      disclaimer?: string;
      [key: string]: string | undefined;
    };
  };
  savedTo?: string;
  timestamp?: string;
}

export interface ZeptoScrapeResponse {
  success: boolean;
  message: string;
  data: ZeptoProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface BigBasketScrapeRequest {
  url: string;
}

export interface BigBasketBrand {
  name: string;
  slug: string;
  url: string;
}

export interface BigBasketPrice {
  sp: string | null;
  icon: {
    base_url: string | null;
    image: string | null;
    format: string | null;
  } | null;
  desc: string | null;
  base_price: string;
  base_unit: string;
  background?: string | null;
}

export interface BigBasketDiscount {
  mrp: string;
  d_text: string;
  d_avail: string;
  prim_price: BigBasketPrice;
  sec_price: BigBasketPrice | null;
  offer_entry_text: string;
  offer_available: string;
}

export interface BigBasketPackageSize {
  id: string;
  description: string;
  weight: string;
  discount: BigBasketDiscount;
}

export interface BigBasketProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: BigBasketBrand;
    packSize: string;
    images: string[];
    discount: BigBasketDiscount;
    packageSizes: BigBasketPackageSize[];
    productId: string;
    productUrl: string;
    information: {
      category: string;
      [key: string]: string;
    };
  };
  savedTo?: string;
  timestamp?: string;
}

export interface BigBasketScrapeResponse {
  success: boolean;
  message: string;
  data: BigBasketProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface PepperfryScrapeRequest {
  url: string;
}

export interface PepperfryProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    collection: string;
    mrp: number;
    sellingPrice: number;
    discountPercent: number;
    discount: number;
    images: string[];
    rating: number;
    offers: string[];
    productDetails: {
      brand: string;
      assembly: string;
      collections: string;
      colour: string;
      dimensions: string;
      primaryMaterial: string;
      roomType: string;
      warranty: string;
      weight: string;
      sku: string;
      [key: string]: string;
    };
    specifications: string[];
  };
  savedTo?: string;
  timestamp?: string;
}

export interface PepperfryScrapeResponse {
  success: boolean;
  message: string;
  data: PepperfryProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface HomeCentreScrapeRequest {
  url: string;
}

export interface HomeCentreProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    productDetails: {
      color: string;
      soldBy: string;
      productId: string;
      material: string;
      category: string;
      taxInfo: string;
      [key: string]: string;
    };
    overview: string;
    dimensions: string;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface HomeCentreScrapeResponse {
  success: boolean;
  message: string;
  data: HomeCentreProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface ShoppersStopScrapeRequest {
  url: string;
}

export interface ShoppersStopProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discountPercent: number;
    discount: number;
    images: string[];
    offers: string[];
    productDetails: {
      packOf: string;
      gender: string;
      unitSize: string;
      formulation: string;
      productType: string;
      countryOfOrigin: string;
      productCode: string;
      manufacturerDetails: string;
      importerDetails: string;
      contact: string;
      email: string;
      [key: string]: string;
    };
    description: string;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface ShoppersStopScrapeResponse {
  success: boolean;
  message: string;
  data: ShoppersStopProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface UrbanicScrapeRequest {
  url: string;
}

export interface UrbanicProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    productDetails: {
      color: string;
      size: string;
      taxInfo: string;
      [key: string]: string;
    };
    aboutProduct: string;
    measurements: string;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface UrbanicScrapeResponse {
  success: boolean;
  message: string;
  data: UrbanicProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface IKEAScrapeRequest {
  url: string;
}

export interface IKEAMeasurements {
  height: string;
  diameter: string;
  volume: string;
  weight: string;
}

export interface IKEAProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    productDetails: {
      designer: string;
      countryOfOrigin: string;
      materials: string;
      care: string;
      [key: string]: string;
    };
    measurements: IKEAMeasurements;
    averageRating: number;
    totalReviews: number;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface IKEAScrapeResponse {
  success: boolean;
  message: string;
  data: IKEAProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface BIBAScrapeRequest {
  url: string;
}

export interface BIBAProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discountPercent: number;
    discount: number;
    images: string[];
    productDetails: {
      productCode: string;
      manufacturedBy: string;
      countryOfOrigin: string;
      packContains: string;
      unitsInPack: string;
      features: string[];
      washCare: string;
    };
    colors: string[];
    sizes: string[];
    offers: string[];
  };
  savedTo?: string;
  timestamp?: string;
}

export interface BIBAScrapeResponse {
  success: boolean;
  message: string;
  data: BIBAProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface LifestyleStoresScrapeRequest {
  url: string;
}

export interface LifestyleStoresProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    productDetails: {
      productCode: string;
      soldBy: string;
      countryOfOrigin: string;
      manufacturer: string;
      customerCare: string;
      details: string[];
    };
    colors: string[];
    sizes: string[];
    offers: string[];
    overview: string;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface LifestyleStoresScrapeResponse {
  success: boolean;
  message: string;
  data: LifestyleStoresProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface MedPlusMartScrapeRequest {
  url: string;
}

export interface MedPlusMartProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    productDetails: {
      manufacturer: string;
      countryOfOrigin: string;
      composition?: string;
    };
    variants: string[];
    description: string;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface MedPlusMartScrapeResponse {
  success: boolean;
  message: string;
  data: MedPlusMartProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface TruemedsScrapeRequest {
  url: string;
}

export interface TruemedsProductData {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
    productDetails: {
      productCode: string;
      countryOfOrigin: string;
      packSize?: string;
      composition?: string;
    };
    highlights?: string[];
    description?: string;
    ingredients?: string;
  };
  savedTo?: string;
  timestamp?: string;
}

export interface TruemedsScrapeResponse {
  success: boolean;
  message: string;
  data: TruemedsProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface ApolloPharmacyScrapeRequest {
  url: string;
}

export interface ApolloPharmacyProductData {
  scrapedAt: string;
  source: string;
  product: {
    name: string;
    title: string;
    mrp: number;
    sellingPrice: number;
    discountPercent: number;
    discount: number;
    images: string[];
    offers: string[];
    productDetails: {
      manufacturer: string;
      consumeType: string;
      returnPolicy: string;
      countryOfOrigin: string;
      manufacturerAddress: string;
    };
    keyIngredients: string[];
    description: string;
    keyBenefits: string[];
    directionsForUse: string[];
    safetyInformation: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  url: string;
  savedTo?: string;
  timestamp?: string;
}

export interface ApolloPharmacyScrapeResponse {
  success: boolean;
  message: string;
  data: ApolloPharmacyProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface DMartScrapeRequest {
  url: string;
}

export interface DMartProductData {
  scrapedAt: string;
  source: string;
  product: {
    name: string;
    title: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    discountPercent: number;
    images: string[];
    variants: Array<{
      volume: string;
      pricePerUnit: string;
      isSelected?: boolean;
    }>;
    description: string;
    brand: string;
  };
  url: string;
  savedTo?: string;
  timestamp?: string;
}

export interface DMartScrapeResponse {
  success: boolean;
  message: string;
  data: DMartProductData;
  savedTo?: string;
  timestamp?: string;
}

export interface LiciousScrapeRequest {
  url: string;
}

export interface LiciousProductData {
  scrapedAt: string;
  source: string;
  product: {
    name: string;
    title: string;
    mrp: number;
    sellingPrice: number;
    discountPercent: number;
    discount: number;
    images: string[];
    description: string;
    features: {
      included: string[];
      excluded: string[];
    };
  };
  url: string;
  savedTo?: string;
  timestamp?: string;
}

export interface LiciousScrapeResponse {
  success: boolean;
  message: string;
  data: LiciousProductData;
  savedTo?: string;
  timestamp?: string;
}

import { ROUTES } from '../constants/routes';
import { ENV } from '../config/environment';

const API_BASE_URL = ENV.API_BASE_URL;

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use the text or default message
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // Enhanced error handling for different error types
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection and ensure the API server is running.');
      }
      
      throw error;
    }
  }

  async scrapeAmazonProduct(request: AmazonScrapeRequest): Promise<AmazonScrapeResponse> {
    return this.makeRequest<AmazonScrapeResponse>(ROUTES.API.AMAZON, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeAmazonCategory(request: AmazonCategoryScrapeRequest): Promise<AmazonCategoryScrapeResponse> {
    return this.makeRequest<AmazonCategoryScrapeResponse>(ROUTES.API.AMAZON_CATEGORY, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeFlipkartProduct(request: FlipkartScrapeRequest): Promise<FlipkartScrapeResponse> {
    return this.makeRequest<FlipkartScrapeResponse>(ROUTES.API.FLIPKART, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeFlipkartCategory(request: FlipkartCategoryScrapeRequest): Promise<FlipkartCategoryScrapeResponse> {
    return this.makeRequest<FlipkartCategoryScrapeResponse>(ROUTES.API.FLIPKART_CATEGORY, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeMyntraProduct(request: MyntraScrapeRequest): Promise<MyntraScrapeResponse> {
    return this.makeRequest<MyntraScrapeResponse>(ROUTES.API.MYNTRA, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeMyntraCategory(request: MyntraCategoryScrapeRequest): Promise<MyntraCategoryScrapeResponse> {
    return this.makeRequest<MyntraCategoryScrapeResponse>(ROUTES.API.MYNTRA_CATEGORY, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeJioMartProduct(request: JioMartScrapeRequest): Promise<JioMartScrapeResponse> {
    return this.makeRequest<JioMartScrapeResponse>(ROUTES.API.JIOMART, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeJioMartCategory(request: JioMartCategoryScrapeRequest): Promise<JioMartCategoryScrapeResponse> {
    return this.makeRequest<JioMartCategoryScrapeResponse>(ROUTES.API.JIOMART_CATEGORY, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeAjioProduct(request: AjioScrapeRequest): Promise<AjioScrapeResponse> {
    return this.makeRequest<AjioScrapeResponse>(ROUTES.API.AJIO, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeChromaProduct(request: ChromaScrapeRequest): Promise<ChromaScrapeResponse> {
    return this.makeRequest<ChromaScrapeResponse>(ROUTES.API.CHROMA, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeVijaySalesProduct(request: VijaySalesScrapeRequest): Promise<VijaySalesScrapeResponse> {
    return this.makeRequest<VijaySalesScrapeResponse>(ROUTES.API.VIJAYSALES, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeNykaaProduct(request: NykaaScrapeRequest): Promise<NykaaScrapeResponse> {
    return this.makeRequest<NykaaScrapeResponse>(ROUTES.API.NYKAA, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeOneMgProduct(request: OneMgScrapeRequest): Promise<OneMgScrapeResponse> {
    return this.makeRequest<OneMgScrapeResponse>(ROUTES.API.ONEMG, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapePharmEasyProduct(request: PharmEasyScrapeRequest): Promise<PharmEasyScrapeResponse> {
    return this.makeRequest<PharmEasyScrapeResponse>(ROUTES.API.PHARMEASY, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeNetmedsProduct(request: NetmedsScrapeRequest): Promise<NetmedsScrapeResponse> {
    return this.makeRequest<NetmedsScrapeResponse>(ROUTES.API.NETMEDS, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeBlinkitProduct(request: BlinkitScrapeRequest): Promise<BlinkitScrapeResponse> {
    return this.makeRequest<BlinkitScrapeResponse>(ROUTES.API.BLINKIT, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeSwiggyInstamartProduct(request: SwiggyInstamartScrapeRequest): Promise<SwiggyInstamartScrapeResponse> {
    return this.makeRequest<SwiggyInstamartScrapeResponse>(ROUTES.API.SWIGGY_INSTAMART, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeZeptoProduct(request: ZeptoScrapeRequest): Promise<ZeptoScrapeResponse> {
    return this.makeRequest<ZeptoScrapeResponse>(ROUTES.API.ZEPTO, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeBigBasketProduct(request: BigBasketScrapeRequest): Promise<BigBasketScrapeResponse> {
    return this.makeRequest<BigBasketScrapeResponse>(ROUTES.API.BIGBASKET, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapePepperfryProduct(request: PepperfryScrapeRequest): Promise<PepperfryScrapeResponse> {
    return this.makeRequest<PepperfryScrapeResponse>(ROUTES.API.PEPPERFRY, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeHomeCentreProduct(request: HomeCentreScrapeRequest): Promise<HomeCentreScrapeResponse> {
    return this.makeRequest<HomeCentreScrapeResponse>(ROUTES.API.HOMECENTRE, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeShoppersStopProduct(request: ShoppersStopScrapeRequest): Promise<ShoppersStopScrapeResponse> {
    return this.makeRequest<ShoppersStopScrapeResponse>(ROUTES.API.SHOPPERSSTOP, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeUrbanicProduct(request: UrbanicScrapeRequest): Promise<UrbanicScrapeResponse> {
    return this.makeRequest<UrbanicScrapeResponse>(ROUTES.API.URBANIC, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeIKEAProduct(request: IKEAScrapeRequest): Promise<IKEAScrapeResponse> {
    return this.makeRequest<IKEAScrapeResponse>(ROUTES.API.IKEA, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeBIBAProduct(request: BIBAScrapeRequest): Promise<BIBAScrapeResponse> {
    return this.makeRequest<BIBAScrapeResponse>(ROUTES.API.BIBA, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeLifestyleStoresProduct(request: LifestyleStoresScrapeRequest): Promise<LifestyleStoresScrapeResponse> {
    return this.makeRequest<LifestyleStoresScrapeResponse>(ROUTES.API.LIFESTYLESTORES, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeMedPlusMartProduct(request: MedPlusMartScrapeRequest): Promise<MedPlusMartScrapeResponse> {
    return this.makeRequest<MedPlusMartScrapeResponse>(ROUTES.API.MEDPLUSMART, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeTruemedsProduct(request: TruemedsScrapeRequest): Promise<TruemedsScrapeResponse> {
    return this.makeRequest<TruemedsScrapeResponse>(ROUTES.API.TRUEMEDS, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeApolloPharmacyProduct(request: ApolloPharmacyScrapeRequest): Promise<ApolloPharmacyScrapeResponse> {
    return this.makeRequest<ApolloPharmacyScrapeResponse>(ROUTES.API.APOLLOPHARMACY, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeDMartProduct(request: DMartScrapeRequest): Promise<DMartScrapeResponse> {
    return this.makeRequest<DMartScrapeResponse>(ROUTES.API.DMART, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async scrapeLiciousProduct(request: LiciousScrapeRequest): Promise<LiciousScrapeResponse> {
    return this.makeRequest<LiciousScrapeResponse>(ROUTES.API.LICIOUS, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
}

export const apiService = new ApiService();
