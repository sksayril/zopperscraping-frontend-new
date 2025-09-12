import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, Calendar, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Award, CheckCircle, Building, ShoppingBag, AlertTriangle, Info, Package, Truck, Clock, Star, Zap, Gift, Heart, MapPin, Zap as ZapIcon } from 'lucide-react';
import { ZeptoProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface ZeptoProductDisplayProps {
  product: ZeptoProductData;
}

export default function ZeptoProductDisplay({ product }: ZeptoProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Memoize expensive computations
  const allImages = useMemo(() => product.product.images, [product.product.images]);
  
  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Filter out non-product images (logos, social media, etc.)
  const productImages = useMemo(() => allImages.filter(img => 
    !img.includes('logo') && 
    !img.includes('header') &&
    !img.includes('super-saver') &&
    !img.includes('social-media') &&
    !img.includes('app-stores') &&
    !img.includes('banner') &&
    !img.includes('bank-icons') &&
    !img.includes('inventory/banner') &&
    img.includes('product_variant')
  ), [allImages]);

  // Calculate savings
  const savings = useMemo(() => product.product.mrp - product.product.sellingPrice, [product.product.mrp, product.product.sellingPrice]);
  const savingsPercent = useMemo(() => Math.round(product.product.discount), [product.product.discount]);

  // Parse information object
  const productInfo = useMemo(() => product.product.information, [product.product.information]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ZapIcon className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Zepto Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Zepto</span>
          </a>
        </div>
      </div>

      <div className="p-6">
        {/* Product Images */}
        {productImages.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
              <span className="text-sm text-gray-500">({productImages.length} images)</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Image Display */}
              <div className="relative">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                  <img
                    src={productImages[selectedImageIndex]}
                    alt={`${product.product.title} - Product image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = generateImagePlaceholder();
                    }}
                  />
                  
                  {/* Navigation Arrows */}
                  {productImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous image"
                        type="button"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next image"
                        type="button"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Image Counter */}
                {productImages.length > 1 && (
                  <div className="mt-2 text-center text-sm text-gray-500">
                    {selectedImageIndex + 1} of {productImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Grid */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Product view ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = generateImagePlaceholder(100, 100);
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                {product.product.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>{product.product.brand}</span>
                </span>
                {productInfo.color && (
                  <>
                    <span>•</span>
                    <span>Color: {productInfo.color}</span>
                  </>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    ₹{product.product.sellingPrice}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ₹{product.product.mrp}
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {savingsPercent}% OFF
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                You Save: ₹{savings.toFixed(2)}
              </div>
            </div>

            {/* Product Highlights */}
            {product.product.highlights.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Product Highlights</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.product.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2 py-1">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Information */}
            {Object.keys(productInfo).length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Product Information</h3>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(productInfo).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex justify-between items-center py-1">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-sm text-gray-600">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* Offers */}
            {product.product.offers.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Gift className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Available Offers</h4>
                    <div className="text-sm text-yellow-700 mt-1 space-y-1">
                      {product.product.offers.map((offer, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>{offer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Zepto Features */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Zepto Features</h4>
                  <div className="text-sm text-blue-700 mt-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>10-Minute Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Free Delivery on Orders Above ₹99</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Fresh & Quality Assured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>Easy Returns & Refunds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800">Delivery Information</h4>
                  <div className="text-sm text-green-700 mt-1 space-y-1">
                    <div>• Ultra Fast 10-Minute Delivery</div>
                    <div>• Available 24/7</div>
                    <div>• Contactless Delivery</div>
                    <div>• Real-time Tracking</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Award className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-800">Quality Assurance</h4>
                  <div className="text-sm text-purple-700 mt-1 space-y-1">
                    <div>• Fresh Products Only</div>
                    <div>• Quality Checked</div>
                    <div>• Hygienic Packaging</div>
                    <div>• Best Before Date Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Scraped on: {formatDate(product.scrapedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Platform: {product.source}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
