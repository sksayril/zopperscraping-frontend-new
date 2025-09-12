import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, Calendar, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Award, CheckCircle, Building, Truck, Star, Heart, Home, Package, Info, Shield, Wrench } from 'lucide-react';
import { PepperfryProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface PepperfryProductDisplayProps {
  product: PepperfryProductData;
}

export default function PepperfryProductDisplay({ product }: PepperfryProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  // Memoize expensive computations
  const allImages = useMemo(() => product.product.images, [product.product.images]);
  
  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Filter out non-product images (logos, icons, etc.)
  const productImages = useMemo(() => allImages.filter(img => 
    !img.includes('assets/') && 
    !img.includes('w38-') &&
    !img.includes('w23-') &&
    !img.includes('w22-') &&
    !img.includes('w24-') &&
    !img.includes('upArrow') &&
    !img.includes('vip-gallery') &&
    !img.includes('social-') &&
    !img.includes('appstore') &&
    !img.includes('pf-') &&
    !img.includes('bat.bing.com') &&
    !img.includes('ib.adnxs.com') &&
    !img.includes('grey.gif') &&
    img.includes('catalog/product')
  ), [allImages]);

  // Calculate savings
  const savings = useMemo(() => product.product.mrp - product.product.sellingPrice, [product.product.mrp, product.product.sellingPrice]);
  const savingsPercent = useMemo(() => product.product.discountPercent, [product.product.discountPercent]);

  // Parse product details
  const productDetails = useMemo(() => product.product.productDetails, [product.product.productDetails]);

  // Display specifications
  const displayedSpecs = useMemo(() => 
    showAllSpecs 
      ? product.product.specifications
      : product.product.specifications.slice(0, 5), 
    [product.product.specifications, showAllSpecs]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Home className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Pepperfry Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Pepperfry</span>
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
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Package className="w-4 h-4" />
                  <span>{product.product.collection}</span>
                </span>
              </div>
            </div>

            {/* Rating */}
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
                Customer Rating
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-orange-600">
                    ₹{product.product.sellingPrice.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ₹{product.product.mrp.toLocaleString()}
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {savingsPercent}% OFF
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                You Save: ₹{savings.toLocaleString()}
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Product Details</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {productDetails.dimensions && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Dimensions:</span>
                    <span className="text-sm text-gray-600">{productDetails.dimensions}</span>
                  </div>
                )}
                {productDetails.primaryMaterial && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Material:</span>
                    <span className="text-sm text-gray-600">{productDetails.primaryMaterial}</span>
                  </div>
                )}
                {productDetails.roomType && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Room Type:</span>
                    <span className="text-sm text-gray-600">{productDetails.roomType}</span>
                  </div>
                )}
                {productDetails.weight && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Weight:</span>
                    <span className="text-sm text-gray-600">{productDetails.weight} kg</span>
                  </div>
                )}
                {productDetails.sku && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">SKU:</span>
                    <span className="text-sm text-gray-600">{productDetails.sku}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* Offers */}
            {product.product.offers.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Tag className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Available Offers</h4>
                    <div className="text-sm text-yellow-700 mt-1 space-y-1">
                      {product.product.offers.slice(0, 5).map((offer, index) => (
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

            {/* Pepperfry Features */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Home className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-orange-800">Pepperfry Features</h4>
                  <div className="text-sm text-orange-700 mt-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Free Delivery & Assembly</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Extended Warranty Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wrench className="w-4 h-4" />
                      <span>Professional Assembly Service</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>Easy Returns & Exchanges</span>
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
                    <div>• Free Delivery & Assembly</div>
                    <div>• Professional Installation</div>
                    <div>• Contactless Delivery</div>
                    <div>• Real-time Tracking</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warranty Information */}
            {productDetails.warranty && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Award className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-purple-800">Warranty & Protection</h4>
                    <div className="text-sm text-purple-700 mt-1">
                      {productDetails.warranty}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        {product.product.specifications.length > 0 && (
          <div className="mt-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
                {product.product.specifications.length > 5 && (
                  <button
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    {showAllSpecs ? 'Show Less' : `Show All ${product.product.specifications.length} Specifications`}
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {displayedSpecs.map((spec, index) => (
                  <div key={index} className="text-sm text-gray-700 p-2 bg-white rounded border-l-4 border-orange-500">
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
