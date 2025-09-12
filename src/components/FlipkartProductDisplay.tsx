import { useState } from 'react';
import { Star, ExternalLink, Calendar, Package, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Truck, Shield, Award } from 'lucide-react';
import { FlipkartProductData } from '../services/api';
import { formatPrice, extractRating, extractReviewCount, calculateDiscountPercentage, formatDate, generateImagePlaceholder } from '../utils/helpers';

interface FlipkartProductDisplayProps {
  product: FlipkartProductData;
}

export default function FlipkartProductDisplay({ product }: FlipkartProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);

  // Filter out non-product images and get only actual product images
  const productImages = product.images.all.filter(img => 
    img.type === 'product' && 
    !img.url.includes('static-assets-web.flixcart.com') &&
    !img.url.includes('promos') &&
    !img.url.includes('cms-brand') &&
    !img.url.includes('YoutubeLogo') &&
    !img.url.includes('InstagramLogo') &&
    !img.url.includes('payment-method')
  );

  const allImages = productImages.length > 0 ? productImages : product.images.thumbnails;
  
  const rating = extractRating(product.rating);
  const reviewCount = extractReviewCount(product.reviewCount);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const displayedSpecs = showAllSpecs 
    ? Object.entries(product.specifications)
    : Object.entries(product.specifications).slice(0, 8);

  const displayedOffers = showAllOffers 
    ? product.offers
    : product.offers.slice(0, 5);

  const displayedHighlights = product.highlights.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Flipkart Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Flipkart</span>
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
                  <span className="hover:text-blue-600 cursor-pointer">{crumb.text}</span>
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
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Image Display */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                <img
                  src={allImages[selectedImageIndex]?.highQualityUrl || allImages[selectedImageIndex]?.url}
                  alt={allImages[selectedImageIndex]?.alt || product.title}
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
                        ? 'border-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `Product view ${index + 1}`}
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
                  <span>Product ID: {product.id}</span>
                </span>
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
                Availability: <span className="font-medium text-green-600">In Stock</span>
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
                {product.ratingCount}
              </div>
            </div>

            {/* Highlights */}
            {product.highlights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {displayedHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Seller Information */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Seller Information</h3>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Seller:</span> {product.seller.name}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Rating:</span> {product.seller.rating} ⭐
                </p>
                {product.seller.policies.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Policies:</p>
                    <ul className="space-y-1">
                      {product.seller.policies.map((policy, index) => (
                        <li key={index} className="text-sm text-gray-600">• {policy}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Specifications and Offers */}
          <div className="space-y-6">
            {/* Key Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="space-y-3">
                {displayedSpecs.map(([key, value], index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600 text-right max-w-xs">{value}</span>
                  </div>
                ))}
                {Object.entries(product.specifications).length > 8 && (
                  <button
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    {showAllSpecs ? 'Show Less' : `Show All ${Object.entries(product.specifications).length} Specifications`}
                  </button>
                )}
              </div>
            </div>

            {/* Offers */}
            {product.offers.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Offers & Deals</h3>
                <div className="space-y-2">
                  {displayedOffers.map((offer, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{offer.type}</p>
                          <p className="text-sm text-gray-700">{offer.description}</p>
                          {offer.details && (
                            <div className="mt-1 text-xs text-gray-600">
                              {offer.details.percentage && <span>Save {offer.details.percentage}</span>}
                              {offer.details.bank && <span> • {offer.details.bank}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {product.offers.length > 5 && (
                    <button
                      onClick={() => setShowAllOffers(!showAllOffers)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      {showAllOffers ? 'Show Less' : `Show All ${product.offers.length} Offers`}
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
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Delivery Date:</span> {product.delivery.date}
                </p>
                {product.delivery.time && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Time:</span> {product.delivery.time}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-2">{product.availability}</p>
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
              <Shield className="w-4 h-4" />
              <span>Product ID: {product.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
