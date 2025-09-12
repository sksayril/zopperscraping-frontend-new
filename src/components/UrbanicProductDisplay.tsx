import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, Calendar, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Award, Building, Truck, Heart, ShoppingBag, Package, Info, Shield, Ruler, Users, Palette } from 'lucide-react';
import { UrbanicProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface UrbanicProductDisplayProps {
  product: UrbanicProductData;
}

export default function UrbanicProductDisplay({ product }: UrbanicProductDisplayProps) {
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
    !img.includes('static.mfrcdn.com') &&
    !img.includes('static2.urbanic.com') &&
    !img.includes('t.co') &&
    !img.includes('analytics.twitter.com') &&
    !img.includes('bat.bing.com') &&
    !img.includes('star.png') &&
    !img.includes('close.png') &&
    img.includes('img101.urbanic.com') &&
    img.includes('goods-pic')
  ), [allImages]);

  // Calculate savings
  const savings = useMemo(() => product.product.mrp - product.product.sellingPrice, [product.product.mrp, product.product.sellingPrice]);
  const savingsPercent = useMemo(() => product.product.discount, [product.product.discount]);

  // Parse product details
  const productDetails = useMemo(() => product.product.productDetails, [product.product.productDetails]);

  // Extract clean product information
  const cleanColor = useMemo(() => {
    const colorText = productDetails.color || '';
    return colorText.split('SIZE')[0].trim();
  }, [productDetails.color]);

  const cleanSize = useMemo(() => {
    const sizeText = productDetails.size || '';
    const sizeMatch = sizeText.match(/One-Size|XS|S|M|L|XL|XXL|\d+/);
    return sizeMatch ? sizeMatch[0] : 'One-Size';
  }, [productDetails.size]);

  // Parse about product information
  const aboutProductInfo = useMemo(() => {
    const aboutText = product.aboutProduct || '';
    const info: Record<string, string> = {};
    
    // Extract key information
    const fabricMatch = aboutText.match(/Main Fabric:\s*([^S]+)/);
    if (fabricMatch) info.fabric = fabricMatch[1].trim();
    
    const stretchMatch = aboutText.match(/Stretchability:\s*([^F]+)/);
    if (stretchMatch) info.stretchability = stretchMatch[1].trim();
    
    const fitMatch = aboutText.match(/Fit Type:\s*([^Q]+)/);
    if (fitMatch) info.fitType = fitMatch[1].trim();
    
    const quantityMatch = aboutText.match(/Quantity:\s*([^B]+)/);
    if (quantityMatch) info.quantity = quantityMatch[1].trim();
    
    const necklineMatch = aboutText.match(/Neckline:\s*([^S]+)/);
    if (necklineMatch) info.neckline = necklineMatch[1].trim();
    
    const sleeveMatch = aboutText.match(/Sleeve Type:\s*([^S]+)/);
    if (sleeveMatch) info.sleeveType = sleeveMatch[1].trim();
    
    const sleeveLengthMatch = aboutText.match(/Sleeve Length:\s*([^L]+)/);
    if (sleeveLengthMatch) info.sleeveLength = sleeveLengthMatch[1].trim();
    
    const lengthMatch = aboutText.match(/Length:\s*([^M]+)/);
    if (lengthMatch) info.length = lengthMatch[1].trim();
    
    return info;
  }, [product.aboutProduct]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Urbanic Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Urbanic</span>
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
                          ? 'border-indigo-500'
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
                  <span>Fashion</span>
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-indigo-600">
                    ₹{product.product.sellingPrice.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ₹{product.product.mrp.toLocaleString()}
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {savingsPercent.toFixed(1)}% OFF
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                You Save: ₹{savings.toLocaleString()}
              </div>
              {productDetails.taxInfo && (
                <div className="mt-2 text-sm text-green-600 font-medium">
                  {productDetails.taxInfo}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Product Details</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {cleanColor && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Palette className="w-4 h-4" />
                      <span>Color:</span>
                    </span>
                    <span className="text-sm text-gray-600">{cleanColor}</span>
                  </div>
                )}
                {cleanSize && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Ruler className="w-4 h-4" />
                      <span>Size:</span>
                    </span>
                    <span className="text-sm text-gray-600">{cleanSize}</span>
                  </div>
                )}
                {aboutProductInfo.fabric && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Fabric:</span>
                    <span className="text-sm text-gray-600">{aboutProductInfo.fabric}</span>
                  </div>
                )}
                {aboutProductInfo.fitType && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Fit:</span>
                    <span className="text-sm text-gray-600">{aboutProductInfo.fitType}</span>
                  </div>
                )}
                {aboutProductInfo.sleeveLength && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Sleeve:</span>
                    <span className="text-sm text-gray-600">{aboutProductInfo.sleeveLength}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* Urbanic Features */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-indigo-800">Urbanic Features</h4>
                  <div className="text-sm text-indigo-700 mt-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Free Shipping Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Trendy Fashion Products</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>Easy Returns & Exchanges</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Affordable Fashion</span>
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
                    <div>• Free shipping on this product</div>
                    <div>• Standard delivery: 3-5 business days</div>
                    <div>• Cash on delivery available</div>
                    <div>• Express delivery options</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            {Object.keys(aboutProductInfo).length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800">Product Specifications</h4>
                    <div className="text-sm text-blue-700 mt-1 space-y-1">
                      {aboutProductInfo.stretchability && (
                        <div>• Stretchability: {aboutProductInfo.stretchability}</div>
                      )}
                      {aboutProductInfo.quantity && (
                        <div>• Quantity: {aboutProductInfo.quantity}</div>
                      )}
                      {aboutProductInfo.neckline && (
                        <div>• Neckline: {aboutProductInfo.neckline}</div>
                      )}
                      {aboutProductInfo.sleeveType && (
                        <div>• Sleeve Type: {aboutProductInfo.sleeveType}</div>
                      )}
                      {aboutProductInfo.length && (
                        <div>• Length: {aboutProductInfo.length}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Brand Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Building className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Brand Information</h4>
                  <div className="text-sm text-gray-700 mt-1">
                    <div>Brand: {product.product.brand}</div>
                    <div>Trendy fashion for modern lifestyle</div>
                    <div>Affordable and stylish clothing</div>
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
