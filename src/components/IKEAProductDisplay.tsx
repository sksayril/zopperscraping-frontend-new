import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, Calendar, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Award, Building, Truck, Heart, Home, Package, Info, Shield, Ruler, Users, Star, Globe } from 'lucide-react';
import { IKEAProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface IKEAProductDisplayProps {
  product: IKEAProductData;
}

export default function IKEAProductDisplay({ product }: IKEAProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Memoize expensive computations
  const allImages = useMemo(() => product.product.images, [product.product.images]);
  
  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Filter out non-product images (logos, category images, etc.)
  const productImages = useMemo(() => allImages.filter(img => 
    !img.includes('brand/ikea.svg') &&
    !img.includes('range-categorisation') &&
    !img.includes('GL-Kreativ') &&
    img.includes('products/') &&
    img.includes('korken-jar-with-lid-clear-glass')
  ), [allImages]);

  // Calculate savings
  const savings = useMemo(() => product.product.mrp - product.product.sellingPrice, [product.product.mrp, product.product.sellingPrice]);
  const savingsPercent = useMemo(() => product.product.discount, [product.product.discount]);

  // Parse product details
  const productDetails = useMemo(() => product.product.productDetails, [product.product.productDetails]);
  const measurements = useMemo(() => product.product.measurements, [product.product.measurements]);

  // Extract clean product information
  const cleanDesigner = useMemo(() => {
    const designerText = productDetails.designer || '';
    return designerText.split('Country of Origin')[0].trim();
  }, [productDetails.designer]);

  const cleanCountryOfOrigin = useMemo(() => {
    const countryText = productDetails.countryOfOrigin || '';
    return countryText.split('Good to know')[0].trim();
  }, [productDetails.countryOfOrigin]);

  const cleanMaterials = useMemo(() => {
    const materialsText = productDetails.materials || '';
    const materialMatch = materialsText.match(/Material([^C]+)/);
    return materialMatch ? materialMatch[1].trim() : 'Not specified';
  }, [productDetails.materials]);

  const cleanCare = useMemo(() => {
    const careText = productDetails.care || '';
    const careMatch = careText.match(/Care([^$]+)/);
    return careMatch ? careMatch[1].trim() : 'See product details';
  }, [productDetails.care]);

  // Parse measurements
  const cleanVolume = useMemo(() => {
    const volumeText = measurements.volume || '';
    return volumeText.split('Packaging')[0].trim();
  }, [measurements.volume]);

  const cleanDiameter = useMemo(() => {
    const diameterText = measurements.diameter || '';
    const diameterMatch = diameterText.match(/(\d+\s*cm\s*\(\d+\s*[^)]+\))/);
    return diameterMatch ? diameterMatch[1] : 'Not specified';
  }, [measurements.diameter]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Home className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">IKEA Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on IKEA</span>
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
                          ? 'border-yellow-500'
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
                  <span>Home Furnishing</span>
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
                        i < Math.floor(product.product.averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-900">{product.product.averageRating}</span>
              </div>
              <div className="text-gray-600">
                ({product.product.totalReviews} review{product.product.totalReviews !== 1 ? 's' : ''})
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-yellow-600">
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
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Product Details</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {cleanDesigner && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Designer:</span>
                    <span className="text-sm text-gray-600">{cleanDesigner}</span>
                  </div>
                )}
                {cleanCountryOfOrigin && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>Origin:</span>
                    </span>
                    <span className="text-sm text-gray-600">{cleanCountryOfOrigin}</span>
                  </div>
                )}
                {cleanMaterials && cleanMaterials !== 'Not specified' && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Materials:</span>
                    <span className="text-sm text-gray-600">{cleanMaterials}</span>
                  </div>
                )}
                {cleanVolume && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Ruler className="w-4 h-4" />
                      <span>Volume:</span>
                    </span>
                    <span className="text-sm text-gray-600">{cleanVolume}</span>
                  </div>
                )}
                {cleanDiameter && cleanDiameter !== 'Not specified' && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-700">Diameter:</span>
                    <span className="text-sm text-gray-600">{cleanDiameter}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* IKEA Features */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Home className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800">IKEA Features</h4>
                  <div className="text-sm text-yellow-700 mt-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Home Delivery Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Quality Assured Products</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>Easy Assembly & Care</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Swedish Design Heritage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            {cleanCare && cleanCare !== 'See product details' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800">Care Instructions</h4>
                    <div className="text-sm text-blue-700 mt-1">
                      {cleanCare}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Information */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800">Delivery Information</h4>
                  <div className="text-sm text-green-700 mt-1 space-y-1">
                    <div>• Home delivery available</div>
                    <div>• Click & collect from store</div>
                    <div>• Assembly service available</div>
                    <div>• Sustainable packaging</div>
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
                    <div>Swedish home furnishing company</div>
                    <div>Democratic design for everyone</div>
                    <div>Sustainable and affordable solutions</div>
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



