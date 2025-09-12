import { useState } from 'react';
import { Star, ExternalLink, Calendar, Package, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Truck, Shield, Award, ShoppingBag, Zap, Gift, CheckCircle, Heart, Activity, MapPin, Building, CreditCard, Pill, AlertTriangle, Info } from 'lucide-react';
import { PharmEasyProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface PharmEasyProductDisplayProps {
  product: PharmEasyProductData;
}

export default function PharmEasyProductDisplay({ product }: PharmEasyProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const allImages = product.product.images;
  
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Filter out non-product images (icons, social media, etc.)
  const productImages = allImages.filter(img => 
    img.includes('cdn01.pharmeasy.in/dam/products') && 
    !img.includes('svg') && 
    !img.includes('icon')
  );

  // Parse summary to extract key information
  const parseSummary = (summary: string) => {
    const lines = summary.split('\n').filter(line => line.trim());
    const info: Record<string, string> = {};
    
    lines.forEach(line => {
      if (line.includes('Offer Price')) {
        info.offerPrice = line.replace('Offer Price', '').trim();
      } else if (line.includes('You Save')) {
        info.youSave = line.replace('You Save', '').trim();
      } else if (line.includes('Contains')) {
        info.contains = line.replace('Contains', '').trim();
      } else if (line.includes('Uses')) {
        info.uses = line.replace('Uses', '').trim();
      } else if (line.includes('Side effects')) {
        info.sideEffects = line.replace('Side effects', '').trim();
      } else if (line.includes('Therapy')) {
        info.therapy = line.replace('Therapy', '').trim();
      } else if (line.includes('Brand')) {
        info.brand = line.replace('Brand', '').trim();
      } else if (line.includes('Country of Origin')) {
        info.countryOfOrigin = line.replace('Country of Origin', '').trim();
      } else if (line.includes('Expiry Date')) {
        info.expiryDate = line.replace('Expiry Date', '').trim();
      }
    });
    
    return info;
  };

  const summaryInfo = parseSummary(product.product.summary);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Pill className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">PharmEasy Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on PharmEasy</span>
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
                    alt={product.product.title}
                    className="w-full h-full object-contain"
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
                          ? 'border-blue-500'
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
                  <Tag className="w-4 h-4" />
                  <span>{summaryInfo.brand || product.product.brand}</span>
                </span>
                <span>•</span>
                <span>{product.product.packSize}</span>
                {summaryInfo.countryOfOrigin && (
                  <>
                    <span>•</span>
                    <span>{summaryInfo.countryOfOrigin}</span>
                  </>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{product.product.sellingPrice.toFixed(2)}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ₹{product.product.mrp.toFixed(2)}
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.product.discount}% OFF
                </div>
              </div>
              {summaryInfo.youSave && (
                <div className="mt-2 text-sm text-gray-600">
                  You Save: {summaryInfo.youSave}
                </div>
              )}
            </div>

            {/* Key Information */}
            {summaryInfo.contains && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Pill className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Contains</h3>
                </div>
                <p className="text-sm text-gray-700">{summaryInfo.contains}</p>
              </div>
            )}

            {/* Uses */}
            {summaryInfo.uses && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Uses</h3>
                </div>
                <p className="text-sm text-gray-700">{summaryInfo.uses}</p>
              </div>
            )}

            {/* Therapy */}
            {summaryInfo.therapy && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Therapy</h3>
                </div>
                <p className="text-sm text-gray-700">{summaryInfo.therapy}</p>
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
            {/* Side Effects */}
            {summaryInfo.sideEffects && (
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Side Effects</h3>
                </div>
                <p className="text-sm text-gray-700">{summaryInfo.sideEffects}</p>
              </div>
            )}

            {/* Dosage */}
            {product.product.dosage && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-900">Dosage</h3>
                </div>
                <p className="text-sm text-gray-700">{product.product.dosage}</p>
              </div>
            )}

            {/* Precautions */}
            {product.product.precautions && (
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Precautions and Warnings</h3>
                </div>
                <p className="text-sm text-gray-700">{product.product.precautions}</p>
              </div>
            )}

            {/* Manufacturer Information */}
            {product.product.manufacturer && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Manufacturer</h3>
                </div>
                <p className="text-sm text-gray-700">{product.product.manufacturer}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Product Details</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                {summaryInfo.brand && <div>Brand: {summaryInfo.brand}</div>}
                {summaryInfo.countryOfOrigin && <div>Country of Origin: {summaryInfo.countryOfOrigin}</div>}
                {summaryInfo.expiryDate && <div>Expiry Date: {summaryInfo.expiryDate}</div>}
                <div>Pack Size: {product.product.packSize}</div>
                <div>Source: {product.source}</div>
                {product.savedTo && <div>Saved to: {product.savedTo}</div>}
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800">Medical Disclaimer</h4>
                  <p className="text-sm text-red-700 mt-1">
                    This information is for educational purposes only. Please consult your healthcare provider before taking any medication. 
                    Do not self-medicate.
                  </p>
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
