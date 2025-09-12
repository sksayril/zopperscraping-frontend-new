import { useState } from 'react';
import { Star, ExternalLink, Calendar, Package, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Truck, Shield, Award, ShoppingBag, Zap, Gift, CheckCircle, CreditCard, MapPin, Crown } from 'lucide-react';
import { VijaySalesProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface VijaySalesProductDisplayProps {
  product: VijaySalesProductData;
}

export default function VijaySalesProductDisplay({ product }: VijaySalesProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const allImages = product.images;
  
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const displayedSpecs = showAllSpecs 
    ? Object.entries(product.specifications)
    : Object.entries(product.specifications).slice(0, 6);

  // Calculate current price display
  const displayPrice = product.currentPrice || product.originalPrice;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Vijay Sales Product Details</h1>
          </div>
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Vijay Sales</span>
          </a>
        </div>
      </div>

      <div className="p-6">
        {/* Breadcrumbs */}
        {product.breadcrumbs.length > 0 && (
          <div className="mb-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              {product.breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">›</span>}
                  <span className={index === product.breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}>
                    {crumb}
                  </span>
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Product Images */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <ImageIcon className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
            <span className="text-sm text-gray-500">({allImages.length} images)</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Image Display */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                <img
                  src={allImages[selectedImageIndex]?.url || product.mainImage}
                  alt={allImages[selectedImageIndex]?.alt || product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = generateImagePlaceholder();
                  }}
                />
                
                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="mt-2 text-center text-sm text-gray-500">
                  {selectedImageIndex + 1} of {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
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

        {/* Product Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>{product.brand}</span>
                </span>
                <span>•</span>
                <span>{product.model}</span>
                <span>•</span>
                <span>SKU: {product.sku}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{displayPrice?.toLocaleString()}
                  </div>
                  {hasDiscount && (
                    <div className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>
                {hasDiscount && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.discountPercentage}% OFF
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Availability: <span className="font-medium text-green-600">{product.availability}</span>
              </div>
            </div>

            {/* Rating and Reviews */}
            {product.rating > 0 && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                </div>
                {(product.reviewCount || product.ratingCount) && (
                  <div className="text-gray-600">
                    {product.reviewCount || product.ratingCount} reviews
                  </div>
                )}
              </div>
            )}

            {/* Loyalty Points */}
            {product.loyaltyPoints > 0 && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-gray-900">Loyalty Points</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  Earn {product.loyaltyPoints} loyalty points with this purchase
                </p>
              </div>
            )}

            {/* Warranty */}
            {product.warranty && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Warranty</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{product.warranty}</p>
              </div>
            )}

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMI Options */}
            {product.emiOptions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">EMI Options</h3>
                <div className="space-y-2">
                  {product.emiOptions.map((emi, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{emi}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Specifications and Details */}
          <div className="space-y-6">
            {/* Description */}
            {product.description && product.description.trim() && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.description.trim()}
                  </p>
                </div>
              </div>
            )}

            {/* Deals */}
            {product.deals.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Gift className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Special Deals</h3>
                </div>
                <div className="space-y-2">
                  {product.deals.map((deal, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      • {deal}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offers */}
            {product.offers.length > 0 && (
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Offers</h3>
                </div>
                <div className="space-y-2">
                  {product.offers.map((offer, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      • {offer}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coupons */}
            {product.coupons.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Available Coupons</h3>
                </div>
                <div className="space-y-2">
                  {product.coupons.map((coupon, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      • {coupon}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Information */}
            {product.seller && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Seller Information</h3>
                </div>
                <p className="text-sm text-gray-700">{product.seller.name}</p>
                {product.seller.link && (
                  <a
                    href={product.seller.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-600 hover:text-red-700 mt-1 inline-block"
                  >
                    Visit Store
                  </a>
                )}
              </div>
            )}

            {/* Shipping Information */}
            {product.shippingInfo.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Shipping Information</h3>
                </div>
                <div className="space-y-2">
                  {product.shippingInfo.map((info, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      • {info}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {displayedSpecs.map(([key, value], index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-600 text-right max-w-xs">{value}</span>
                    </div>
                  ))}
                  {Object.entries(product.specifications).length > 6 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      {showAllSpecs ? 'Show Less' : `Show All ${Object.entries(product.specifications).length} Specifications`}
                    </button>
                  )}
                </div>
              </div>
            )}
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
              <span>Platform: Vijay Sales</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
