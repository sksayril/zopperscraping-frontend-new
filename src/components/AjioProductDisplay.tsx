import { useState } from 'react';
import { Star, ExternalLink, Calendar, Package, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Truck, Shield, Award, ShoppingBag } from 'lucide-react';
import { AjioProductData } from '../services/api';
import { extractRating, formatDate, generateImagePlaceholder } from '../utils/helpers';

interface AjioProductDisplayProps {
  product: AjioProductData;
}

export default function AjioProductDisplay({ product }: AjioProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const allImages = product.images;
  
  const rating = extractRating(product.rating);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const displayedSpecs = showAllSpecs 
    ? Object.entries(product.specifications)
    : Object.entries(product.specifications).slice(0, 6);

  const displayedDetails = showAllSpecs 
    ? Object.entries(product.productDetails)
    : Object.entries(product.productDetails).slice(0, 8);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Ajio Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Ajio</span>
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
                        ? 'border-purple-500'
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
                {product.category && (
                  <>
                    <span>•</span>
                    <span>{product.category}</span>
                  </>
                )}
                {product.subCategory && (
                  <>
                    <span>•</span>
                    <span>{product.subCategory}</span>
                  </>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{product.price}
                  </div>
                  {product.originalPrice && product.originalPrice !== product.price && (
                    <div className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice}
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
                Availability: <span className="font-medium text-green-600">{product.availability}</span>
              </div>
            </div>

            {/* Rating and Reviews */}
            {product.rating && (
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
                {product.reviewCount && (
                  <div className="text-gray-600">
                    {product.reviewCount} reviews
                  </div>
                )}
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-purple-500 hover:text-purple-600 cursor-pointer transition-colors"
                    >
                      {color}
                    </span>
                  ))}
                </div>
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-purple-500 hover:text-purple-600 cursor-pointer transition-colors"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.productDescription && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.productDescription}</p>
              </div>
            )}
          </div>

          {/* Right Column - Specifications and Details */}
          <div className="space-y-6">
            {/* Product Details */}
            {Object.keys(product.productDetails).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="space-y-3">
                  {displayedDetails.map(([key, value], index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-600 text-right max-w-xs break-words">
                        {value.length > 100 ? `${value.substring(0, 100)}...` : value}
                      </span>
                    </div>
                  ))}
                  {Object.entries(product.productDetails).length > 8 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      {showAllSpecs ? 'Show Less' : `Show All ${Object.entries(product.productDetails).length} Details`}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Material Information */}
            {product.material && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Material Information</h3>
                </div>
                <p className="text-sm text-gray-700">{product.material}</p>
              </div>
            )}

            {/* Fabric Composition */}
            {product.fabricComposition && (
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-900">Fabric Composition</h3>
                </div>
                <p className="text-sm text-gray-700">{product.fabricComposition}</p>
              </div>
            )}

            {/* Package Contains */}
            {product.packageContains && (
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Package Contains</h3>
                </div>
                <p className="text-sm text-gray-700">{product.packageContains}</p>
              </div>
            )}

            {/* Wash Care */}
            {product.washCare && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Wash Care</h3>
                </div>
                <p className="text-sm text-gray-700">{product.washCare}</p>
              </div>
            )}

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Care Instructions</h3>
                </div>
                <p className="text-sm text-gray-700">{product.careInstructions}</p>
              </div>
            )}

            {/* Waist Rise */}
            {product.waistRise && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Waist Rise</h3>
                </div>
                <p className="text-sm text-gray-700">{product.waistRise}</p>
              </div>
            )}

            {/* Additional Product Information */}
            {(product.mrp || product.marketedBy || product.importedBy || product.manufacturedBy || product.countryOfOrigin || product.netQty) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
                <div className="space-y-3">
                  {product.mrp && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">MRP</span>
                      <span className="text-gray-600">₹{product.mrp}</span>
                    </div>
                  )}
                  {product.marketedBy && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Marketed By</span>
                      <span className="text-gray-600 text-right max-w-xs">{product.marketedBy}</span>
                    </div>
                  )}
                  {product.importedBy && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Imported By</span>
                      <span className="text-gray-600 text-right max-w-xs">{product.importedBy}</span>
                    </div>
                  )}
                  {product.manufacturedBy && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Manufactured By</span>
                      <span className="text-gray-600 text-right max-w-xs">{product.manufacturedBy}</span>
                    </div>
                  )}
                  {product.countryOfOrigin && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Country of Origin</span>
                      <span className="text-gray-600">{product.countryOfOrigin}</span>
                    </div>
                  )}
                  {product.netQty && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Net Quantity</span>
                      <span className="text-gray-600">{product.netQty}</span>
                    </div>
                  )}
                  {product.commodity && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Commodity</span>
                      <span className="text-gray-600 text-right max-w-xs">{product.commodity}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Customer Care Information */}
            {product.customerCareAddress && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Customer Care</h3>
                </div>
                <p className="text-sm text-gray-700">{product.customerCareAddress}</p>
              </div>
            )}

            {/* Product Attributes */}
            {product.productAttributes && product.productAttributes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Attributes</h3>
                <div className="space-y-3">
                  {product.productAttributes.slice(0, showAllSpecs ? product.productAttributes.length : 8).map((attr, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{attr.title || attr.name}</span>
                      <span className="text-gray-600 text-right max-w-xs">
                        {attr.featureValues && attr.featureValues.length > 0 
                          ? attr.featureValues.map(fv => fv.title || fv.value).join(', ')
                          : attr.value
                        }
                      </span>
                    </div>
                  ))}
                  {product.productAttributes.length > 8 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      {showAllSpecs ? 'Show Less' : `Show All ${product.productAttributes.length} Attributes`}
                    </button>
                  )}
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
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm"
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
            <div className="flex items-center space-x-4">
              {product.pdpFaqLink && (
                <a
                  href={product.pdpFaqLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>FAQ</span>
                </a>
              )}
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Platform: {product.platform}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
