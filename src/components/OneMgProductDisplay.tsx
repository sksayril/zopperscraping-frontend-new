import { useState } from 'react';
import { Star, ExternalLink, Calendar, Package, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Truck, Shield, Award, ShoppingBag, Zap, Gift, CheckCircle, Heart, Activity, MapPin, Building, CreditCard } from 'lucide-react';
import { OneMgProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface OneMgProductDisplayProps {
  product: OneMgProductData;
}

export default function OneMgProductDisplay({ product }: OneMgProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const allImages = product.product.images;
  
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const displayedSpecs = showAllSpecs 
    ? product.product.specifications
    : product.product.specifications.slice(0, 6);

  // Parse HTML content in offers and vendor info
  const parseHtmlContent = (htmlString: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || htmlString;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">1mg Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on 1mg</span>
          </a>
        </div>
      </div>

      <div className="p-6">
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
                  src={allImages[selectedImageIndex]}
                  alt={product.product.title}
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
                        ? 'border-green-500'
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
                  <Tag className="w-4 h-4" />
                  <span>{product.product.brand}</span>
                </span>
                <span>•</span>
                <span>ID: {product.product.productId}</span>
                <span>•</span>
                <span>{product.product.standardPackLabel}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{product.product.sellingPrice.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ₹{product.product.mrp.toLocaleString()}
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.product.discountPercent}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Availability: <span className={`font-medium ${product.product.availability.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.product.availability.status}
                </span>
              </div>
            </div>

            {/* Rating and Reviews */}
            {product.product.rating.overallRating > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.product.rating.overallRating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium text-gray-900">{product.product.rating.overallRating}</span>
                  </div>
                  <div className="text-gray-600">
                    {product.product.rating.totalReviews.toLocaleString()} reviews
                  </div>
                  <div className="text-gray-500 text-sm">
                    ({product.product.rating.totalRatings.toLocaleString()} ratings)
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Rating Breakdown</h4>
                  <div className="space-y-2">
                    {product.product.rating.ratingBreakdown.map((breakdown, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700 w-8">{breakdown.rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${(breakdown.value / product.product.rating.totalRatings) * 100}%`,
                              backgroundColor: breakdown.colorCode 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{breakdown.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quantities */}
            {product.product.quantities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Quantities</h3>
                <div className="flex flex-wrap gap-2">
                  {product.product.quantities.map((quantity, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-green-500 hover:text-green-600 cursor-pointer transition-colors"
                    >
                      {quantity.displayText}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {product.product.highlights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h3>
                <div className="space-y-2">
                  {product.product.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.product.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Specifications and Details */}
          <div className="space-y-6">
            {/* Offers */}
            {product.product.offers.length > 0 && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Gift className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-900">Special Offers</h3>
                </div>
                <div className="space-y-3">
                  {product.product.offers.map((offer, index) => (
                    <div key={index} className="text-sm text-gray-700 p-2 bg-white rounded border-l-4 border-yellow-400">
                      <div dangerouslySetInnerHTML={{ __html: offer }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.product.specifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {displayedSpecs.map((spec, index) => (
                    <div key={index} className="flex items-start space-x-2 py-2 border-b border-gray-100 last:border-b-0">
                      <Package className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        <div dangerouslySetInnerHTML={{ __html: spec.displayText }} />
                      </span>
                    </div>
                  ))}
                  {product.product.specifications.length > 6 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      {showAllSpecs ? 'Show Less' : `Show All ${product.product.specifications.length} Specifications`}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Manufacturer Information */}
            {product.product.manufacturer && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Manufacturer</h3>
                </div>
                <p className="text-sm text-gray-700 font-medium">{product.product.manufacturer.name}</p>
                <p className="text-sm text-gray-600 mt-1">{product.product.manufacturer.address}</p>
              </div>
            )}

            {/* Marketer Information */}
            {product.product.marketer && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Marketer</h3>
                </div>
                <p className="text-sm text-gray-700 font-medium">{product.product.marketer.name}</p>
                <p className="text-sm text-gray-600 mt-1">{product.product.marketer.address}</p>
              </div>
            )}

            {/* Vendor Information */}
            {product.product.vendorInfo && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Vendor Information</h3>
                </div>
                <div className="text-sm text-gray-700 prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: product.product.vendorInfo }} />
                </div>
              </div>
            )}

            {/* Product Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Product Information</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <div>Product ID: {product.product.productId}</div>
                <div>Standard Pack: {product.product.standardPack}</div>
                <div>Source: {product.source}</div>
                {product.savedTo && <div>Saved to: {product.savedTo}</div>}
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
