import { useState } from 'react';
import { Star, ExternalLink, Calendar, Package, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Truck, Shield, Award, ShoppingBag, Zap, Gift, CheckCircle, Heart, Sparkles, Droplets } from 'lucide-react';
import { NykaaProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface NykaaProductDisplayProps {
  product: NykaaProductData;
}

export default function NykaaProductDisplay({ product }: NykaaProductDisplayProps) {
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
    ? Object.entries(product.product.additionalDetails)
    : Object.entries(product.product.additionalDetails).slice(0, 6);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Nykaa Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Nykaa</span>
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
                {product.product.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>{product.product.brand}</span>
                </span>
                <span>•</span>
                <span>ID: {product.product.productId}</span>
                {product.product.category.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{product.product.category.join(' > ')}</span>
                  </>
                )}
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
                <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.product.discount}% OFF
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Availability: <span className={`font-medium ${product.product.availability.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.product.availability.status}
                </span>
              </div>
            </div>

            {/* Rating and Reviews */}
            {product.product.rating > 0 && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-gray-900">{product.product.rating}</span>
                </div>
                <div className="text-gray-600">
                  {product.product.reviews.totalReviews.toLocaleString()} reviews
                </div>
                <div className="text-gray-500 text-sm">
                  ({product.product.reviews.totalRatings.toLocaleString()} ratings)
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        size.includes('Select') 
                          ? 'border-gray-300 text-gray-500 bg-gray-50'
                          : 'border-gray-300 hover:border-pink-500 hover:text-pink-600 cursor-pointer'
                      }`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="space-y-2">
                  {product.product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 capitalize">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.product.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                <div className="space-y-2">
                  {product.product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{ingredient}</span>
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

          {/* Right Column - Specifications and Details */}
          <div className="space-y-6">
            {/* Category */}
            {product.product.category.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {product.product.category.map((cat, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-pink-100 text-pink-800 rounded-lg text-sm font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            {Object.keys(product.product.additionalDetails).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                <div className="space-y-3">
                  {displayedSpecs.map(([key, value], index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-gray-600 text-right max-w-xs">{value}</span>
                    </div>
                  ))}
                  {Object.entries(product.product.additionalDetails).length > 6 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                    >
                      {showAllSpecs ? 'Show Less' : `Show All ${Object.entries(product.product.additionalDetails).length} Details`}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Authenticity */}
            {product.product.additionalDetails.authenticity && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Authenticity</h3>
                </div>
                <p className="text-sm text-gray-700">{product.product.additionalDetails.authenticity}</p>
              </div>
            )}

            {/* Delivery Information */}
            {product.product.additionalDetails.delivery && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Delivery</h3>
                </div>
                <p className="text-sm text-gray-700">{product.product.additionalDetails.delivery}</p>
              </div>
            )}

            {/* Tax Information */}
            {product.product.additionalDetails.taxInfo && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Tax Information</h3>
                </div>
                <p className="text-sm text-gray-700">{product.product.additionalDetails.taxInfo}</p>
              </div>
            )}

            {/* Product ID */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Product Information</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <div>Product ID: {product.product.productId}</div>
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
