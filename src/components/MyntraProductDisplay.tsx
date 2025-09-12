import { useState } from 'react';
import { Star, ExternalLink, Calendar, Package, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Truck, Shield, Award, ShoppingBag } from 'lucide-react';
import { MyntraProductData } from '../services/api';
import { formatPrice, extractRating, extractReviewCount, calculateDiscountPercentage, formatDate, generateImagePlaceholder } from '../utils/helpers';

interface MyntraProductDisplayProps {
  product: MyntraProductData;
}

export default function MyntraProductDisplay({ product }: MyntraProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);

  const allImages = product.images;
  
  const rating = extractRating(product.rating);
  const reviewCount = extractReviewCount(product.reviews);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const displayedSpecs = showAllSpecs 
    ? Object.entries(product.specifications)
    : Object.entries(product.specifications).slice(0, 6);

  const displayedOffers = showAllOffers 
    ? product.bestOffers
    : product.bestOffers.slice(0, 8);

  // Filter out duplicate and irrelevant offers
  const uniqueOffers = displayedOffers.filter((offer, index, self) => 
    offer && 
    offer.trim() !== '' && 
    !offer.includes('BEST OFFERS') &&
    !offer.includes('Best Price:') &&
    !offer.includes('Applicable on:') &&
    !offer.includes('Coupon code:') &&
    !offer.includes('Coupon Discount:') &&
    !offer.includes('View Eligible Products') &&
    self.indexOf(offer) === index
  ).slice(0, 6);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Myntra Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Myntra</span>
          </a>
        </div>
      </div>

      <div className="p-6">
        {/* Product Images */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <ImageIcon className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
            <span className="text-sm text-gray-500">({product.metadata.totalImages} images)</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Image Display */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                <img
                  src={allImages[selectedImageIndex]}
                  alt={product.title}
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
                        ? 'border-pink-500'
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
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>{product.brand}</span>
                </span>
                <span>•</span>
                <span>{product.category}</span>
                <span>•</span>
                <span>ID: {product.productId}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {product.currentPrice}
                  </div>
                  {product.originalPrice && product.originalPrice !== product.currentPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      {product.originalPrice}
                    </div>
                  )}
                </div>
                {product.discount && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.discount}
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium text-green-600">Available</span>
              </div>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-900">{rating}</span>
              </div>
              <div className="text-gray-600">
                {product.reviews}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-pink-500 hover:text-pink-600 cursor-pointer transition-colors"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Specifications and Offers */}
          <div className="space-y-6">
            {/* Key Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Specifications ({product.metadata.totalSpecifications})
              </h3>
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
                    className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                  >
                    {showAllSpecs ? 'Show Less' : `Show All ${Object.entries(product.specifications).length} Specifications`}
                  </button>
                )}
              </div>
            </div>

            {/* Best Offers */}
            {uniqueOffers.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Offers</h3>
                <div className="space-y-2">
                  {uniqueOffers.map((offer, index) => (
                    <div key={index} className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">{offer}</p>
                      </div>
                    </div>
                  ))}
                  {product.bestOffers.length > 8 && (
                    <button
                      onClick={() => setShowAllOffers(!showAllOffers)}
                      className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                    >
                      {showAllOffers ? 'Show Less' : `Show All ${product.bestOffers.length} Offers`}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Information */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Delivery Information</h3>
              </div>
              <p className="text-sm text-gray-700">{product.deliveryInfo}</p>
            </div>

            {/* Return Policy */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Return Policy</h3>
              </div>
              <p className="text-sm text-gray-700">{product.returnPolicy}</p>
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
              <span>Product ID: {product.productId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
