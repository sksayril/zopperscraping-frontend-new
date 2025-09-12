import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, Calendar, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Award, Building, Truck, Heart, ShoppingBag, Package, Info, Shield, Ruler, Users, Droplets } from 'lucide-react';
import { ShoppersStopProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface ShoppersStopProductDisplayProps {
  product: ShoppersStopProductData;
}

export default function ShoppersStopProductDisplay({ product }: ShoppersStopProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Memoize expensive computations
  const allImages = useMemo(() => product.product.images, [product.product.images]);
  
  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Filter out non-product images (UI elements, tracking pixels, etc.)
  const productImages = useMemo(() => allImages.filter(img => 
    !img.includes('cmsimages.shoppersstop.com') &&
    !img.includes('s2s.shoppersstop.com') &&
    !img.includes('/icons/') &&
    !img.includes('twitter') &&
    !img.includes('Instagram') &&
    !img.includes('fashion_') &&
    !img.includes('search_') &&
    !img.includes('shoppersstopthree_') &&
    img.includes('images-magento.shoppersstop.com')
  ), [allImages]);

  // Calculate savings
  const savings = useMemo(() => product.product.mrp - product.product.sellingPrice, [product.product.mrp, product.product.sellingPrice]);
  const savingsPercent = useMemo(() => product.product.discountPercent, [product.product.discountPercent]);

  // Parse product details
  const productDetails = useMemo(() => product.product.productDetails, [product.product.productDetails]);

  // Extract clean product information
  const cleanGender = useMemo(() => {
    const genderText = productDetails.gender || '';
    return genderText.split('Unit Size:')[0].trim();
  }, [productDetails.gender]);

  const cleanUnitSize = useMemo(() => {
    const unitText = productDetails.unitSize || '';
    return unitText.split('Formulation:')[0].trim();
  }, [productDetails.unitSize]);

  const cleanFormulation = useMemo(() => {
    const formulationText = productDetails.formulation || '';
    return formulationText.split('Product Type:')[0].trim();
  }, [productDetails.formulation]);

  const cleanProductType = useMemo(() => {
    const typeText = productDetails.productType || '';
    return typeText.split('Description')[0].trim();
  }, [productDetails.productType]);

  const cleanCountryOfOrigin = useMemo(() => {
    const countryText = productDetails.countryOfOrigin || '';
    return countryText.split('Manufacturer Details:')[0].trim();
  }, [productDetails.countryOfOrigin]);

  const cleanProductCode = useMemo(() => {
    const codeText = productDetails.productCode || '';
    return codeText.split('Country of Origin:')[0].trim();
  }, [productDetails.productCode]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">ShoppersStop Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on ShoppersStop</span>
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
                  <span>ID: {cleanProductCode}</span>
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-pink-600">
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

            {/* Offers */}
            {product.product.offers.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Tag className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Available Offers</h4>
                    <div className="text-sm text-yellow-700 mt-1 space-y-1">
                      {product.product.offers.map((offer, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span>•</span>
                          <span>{offer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Product Details</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {cleanGender && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Gender:</span>
                    </span>
                    <span className="text-sm text-gray-600">{cleanGender}</span>
                  </div>
                )}
                {cleanUnitSize && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Ruler className="w-4 h-4" />
                      <span>Size:</span>
                    </span>
                    <span className="text-sm text-gray-600">{cleanUnitSize}</span>
                  </div>
                )}
                {cleanFormulation && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Droplets className="w-4 h-4" />
                      <span>Formulation:</span>
                    </span>
                    <span className="text-sm text-gray-600">{cleanFormulation}</span>
                  </div>
                )}
                {cleanProductType && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Type:</span>
                    <span className="text-sm text-gray-600">{cleanProductType}</span>
                  </div>
                )}
                {cleanCountryOfOrigin && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Origin:</span>
                    <span className="text-sm text-gray-600">{cleanCountryOfOrigin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* ShoppersStop Features */}
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <ShoppingBag className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-pink-800">ShoppersStop Features</h4>
                  <div className="text-sm text-pink-700 mt-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Free Delivery Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Authentic Products Guaranteed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>Easy Returns & Exchanges</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Premium Fashion & Beauty</span>
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
                    <div>• Free delivery on orders above ₹999</div>
                    <div>• Standard delivery: 2-4 business days</div>
                    <div>• Express delivery available</div>
                    <div>• Cash on delivery option</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Tag className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Payment Options</h4>
                  <div className="text-sm text-blue-700 mt-1 space-y-1">
                    <div>• Credit & Debit Cards</div>
                    <div>• Net Banking</div>
                    <div>• Digital Wallets</div>
                    <div>• Cash on Delivery</div>
                    <div>• EMI Options Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Building className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Brand Information</h4>
                  <div className="text-sm text-gray-700 mt-1">
                    <div>Brand: {product.product.brand}</div>
                    <div>Premium fashion and beauty retailer</div>
                    <div>Authentic products from top brands</div>
                    {productDetails.contact && (
                      <div>Contact: {productDetails.contact}</div>
                    )}
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
