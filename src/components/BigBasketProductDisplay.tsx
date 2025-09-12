import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, Calendar, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Award, CheckCircle, Building, Truck, Clock, Heart, ShoppingCart, Package, Leaf, Info } from 'lucide-react';
import { BigBasketProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface BigBasketProductDisplayProps {
  product: BigBasketProductData;
}

export default function BigBasketProductDisplay({ product }: BigBasketProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);

  // Memoize expensive computations
  const allImages = useMemo(() => product.product.images, [product.product.images]);
  
  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Calculate savings for selected package
  const selectedPackage = useMemo(() => 
    product.product.packageSizes[selectedPackageIndex] || product.product.packageSizes[0], 
    [product.product.packageSizes, selectedPackageIndex]
  );

  const currentPrice = useMemo(() => 
    parseFloat(selectedPackage.discount.prim_price.sp || '0'), 
    [selectedPackage.discount.prim_price.sp]
  );

  const mrp = useMemo(() => 
    parseFloat(selectedPackage.discount.mrp), 
    [selectedPackage.discount.mrp]
  );

  const savings = useMemo(() => mrp - currentPrice, [mrp, currentPrice]);
  const savingsPercent = useMemo(() => 
    Math.round((savings / mrp) * 100), 
    [savings, mrp]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">BigBasket Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on BigBasket</span>
          </a>
        </div>
      </div>

      <div className="p-6">
        {/* Product Images */}
        {allImages.length > 0 && (
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
                    alt={`${product.product.title} - Product image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
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
                  <span>{product.product.brand.name}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Package className="w-4 h-4" />
                  <span>{selectedPackage.weight}</span>
                </span>
              </div>
            </div>

            {/* Package Size Selection */}
            {product.product.packageSizes.length > 1 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Available Sizes</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.product.packageSizes.map((pkg, index) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackageIndex(index)}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        selectedPackageIndex === index
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{pkg.weight}</div>
                          <div className="text-sm text-gray-600">{pkg.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">₹{pkg.discount.prim_price.sp}</div>
                          <div className="text-sm text-gray-500 line-through">₹{pkg.discount.mrp}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{currentPrice}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ₹{mrp}
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {savingsPercent}% OFF
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                You Save: ₹{savings.toFixed(2)}
              </div>
              {selectedPackage.discount.offer_entry_text && (
                <div className="mt-2 text-sm text-orange-600 font-medium">
                  {selectedPackage.discount.offer_entry_text}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Product Information</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-medium text-gray-700">Product ID:</span>
                  <span className="text-sm text-gray-600">{product.product.productId}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-medium text-gray-700">Pack Size:</span>
                  <span className="text-sm text-gray-600">{selectedPackage.weight}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-medium text-gray-700">Base Price:</span>
                  <span className="text-sm text-gray-600">₹{selectedPackage.discount.prim_price.base_price} per {selectedPackage.discount.prim_price.base_unit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* BigBasket Features */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800">BigBasket Features</h4>
                  <div className="text-sm text-green-700 mt-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Same Day Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Free Delivery on Orders Above ₹500</span>
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Truck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Delivery Information</h4>
                  <div className="text-sm text-blue-700 mt-1 space-y-1">
                    <div>• Same Day Delivery Available</div>
                    <div>• Scheduled Delivery Options</div>
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

            {/* Category Information */}
            {product.product.information.category && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Tag className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Category</h4>
                    <div className="text-sm text-gray-700 mt-1">
                      {product.product.information.category.split('/').filter(Boolean).join(' > ')}
                    </div>
                  </div>
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
              <span>Platform: {product.source}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
