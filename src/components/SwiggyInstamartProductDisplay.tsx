import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, Calendar, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Award, CheckCircle, Building, Truck, Clock, Star, Zap, Gift, Heart, Utensils } from 'lucide-react';
import { SwiggyInstamartProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface SwiggyInstamartProductDisplayProps {
  product: SwiggyInstamartProductData;
}

export default function SwiggyInstamartProductDisplay({ product }: SwiggyInstamartProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Memoize expensive computations
  const allImages = useMemo(() => product.product.images, [product.product.images]);
  
  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Filter out non-product images (social media, app store, etc.)
  const productImages = useMemo(() => allImages.filter(img => 
    !img.includes('play_store') && 
    !img.includes('app_store') &&
    !img.includes('Pinterest') &&
    !img.includes('Instagram') &&
    !img.includes('Twitter') &&
    !img.includes('Logo') &&
    !img.includes('mockup') &&
    !img.includes('portal')
  ), [allImages]);

  // Calculate savings
  const savings = useMemo(() => product.product.mrp - product.product.sellingPrice, [product.product.mrp, product.product.sellingPrice]);
  const savingsPercent = useMemo(() => product.product.discountPercent, [product.product.discountPercent]);

  // Parse highlights to extract key information
  const parseHighlights = useCallback((highlights: string[]) => {
    const parsed: Record<string, string> = {};
    for (let i = 0; i < highlights.length; i += 2) {
      if (i + 1 < highlights.length) {
        const key = highlights[i].replace(':', '').trim();
        const value = highlights[i + 1].trim();
        if (key && value && key !== value) {
          parsed[key] = value;
        }
      }
    }
    return parsed;
  }, []);

  const highlightInfo = useMemo(() => parseHighlights(product.product.highlights), [product.product.highlights, parseHighlights]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Utensils className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Swiggy Instamart Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Swiggy</span>
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
                          ? 'border-orange-500'
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
                {product.product.weight && (
                  <>
                    <span>•</span>
                    <span>{product.product.weight}</span>
                  </>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-orange-600">
                    ₹{product.product.sellingPrice}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ₹{product.product.mrp}
                  </div>
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {savingsPercent}% OFF
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                You Save: ₹{savings.toFixed(2)}
              </div>
            </div>

            {/* Product Highlights */}
            {Object.keys(highlightInfo).length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Product Highlights</h3>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(highlightInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-1">
                      <span className="text-sm font-medium text-gray-700">{key}:</span>
                      <span className="text-sm text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.product.description}</p>
              </div>
            )}
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Product Details</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <div>Brand: {product.product.brand}</div>
                {product.product.weight && <div>Weight: {product.product.weight}</div>}
                <div>Source: {product.source}</div>
                {product.savedTo && <div>Saved to: {product.savedTo}</div>}
              </div>
            </div>

            {/* Swiggy Instamart Features */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Zap className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-orange-800">Swiggy Instamart Features</h4>
                  <div className="text-sm text-orange-700 mt-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Lightning Fast Delivery (15-30 minutes)</span>
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
                      <Gift className="w-4 h-4" />
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
                    <div>• Super Fast Delivery</div>
                    <div>• Available 24/7</div>
                    <div>• Contactless Delivery</div>
                    <div>• Real-time Tracking</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Quality Assurance</h4>
                  <div className="text-sm text-blue-700 mt-1 space-y-1">
                    <div>• Fresh Products Only</div>
                    <div>• Quality Checked</div>
                    <div>• Hygienic Packaging</div>
                    <div>• Best Before Date Verified</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Returns & Refunds */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Heart className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-800">Returns & Refunds</h4>
                  <div className="text-sm text-purple-700 mt-1 space-y-1">
                    <div>• 4 Days Return Policy</div>
                    <div>• Easy Refund Process</div>
                    <div>• Damaged Item Replacement</div>
                    <div>• Incorrect Item Refund</div>
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
