import React, { useState } from 'react';
import { 
  ExternalLink, 
  Star, 
  Tag, 
  Package, 
  Truck, 
  Shield, 
  Heart,
  Share2,
  Download,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { LifestyleStoresProductData } from '../services/api';
import { formatPrice, formatDate, generateImagePlaceholder } from '../utils/helpers';

interface LifestyleStoresProductDisplayProps {
  product: LifestyleStoresProductData;
}

export default function LifestyleStoresProductDisplay({ product }: LifestyleStoresProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    url,
    scrapedAt,
    source,
    product: productData
  } = product;

  const discountPercentage = Math.round(((productData.mrp - productData.sellingPrice) / productData.mrp) * 100);

  // Filter out banner and icon images, get actual product images
  const productImages = productData.images.filter((img, index) => 
    index >= 4 && !img.includes('banner') && !img.includes('icon') && !img.includes('loading')
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = generateImagePlaceholder(400, 400);
  };

  const handleDownloadData = () => {
    const dataStr = JSON.stringify(product, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lifestylestores-product-${productData.productDetails.productCode}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productData.title,
          text: `Check out this ${productData.brand} product: ${productData.title}`,
          url: url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Product URL copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{productData.brand} Product Details</h1>
              <p className="text-blue-100 text-sm">Scraped on {formatDate(scrapedAt)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-lg transition-colors ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              title="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownloadData}
              className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              title="Download product data"
            >
              <Download className="w-5 h-5" />
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              title="View original product"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImageIndex] || productData.images[0]}
                alt={productData.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.slice(0, 8).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productData.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Brand */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{productData.title}</h2>
              <p className="text-lg text-gray-600">by {productData.brand}</p>
            </div>

            {/* Overview */}
            {productData.overview && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Product Overview</h3>
                <p className="text-sm text-gray-700">{productData.overview}</p>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{productData.sellingPrice.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{productData.mrp.toLocaleString()}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                  {discountPercentage}% OFF
                </span>
              </div>
              <p className="text-sm text-gray-600">
                You save ₹{(productData.mrp - productData.sellingPrice).toLocaleString()}
              </p>
            </div>

            {/* Product Code */}
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Product Code:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {productData.productDetails.productCode}
              </span>
            </div>

            {/* Colors */}
            {productData.colors && productData.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.colors.slice(0, 5).map((color, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {color}
                    </span>
                  ))}
                  {productData.colors.length > 5 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                      +{productData.colors.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Sizes */}
            {productData.sizes && productData.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Product Details */}
            {productData.productDetails.details && productData.productDetails.details.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Product Details</h3>
                <div className="space-y-2">
                  {(showAllDetails ? productData.productDetails.details : productData.productDetails.details.slice(0, 8)).map((detail, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{detail}</span>
                    </div>
                  ))}
                  {productData.productDetails.details.length > 8 && (
                    <button
                      onClick={() => setShowAllDetails(!showAllDetails)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {showAllDetails ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>Show Less</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Show All Details</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Offers */}
            {productData.offers && productData.offers.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Special Offers</h3>
                <div className="space-y-2">
                  {productData.offers.map((offer, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">{offer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Package className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-600">Sold By:</span>
                    <span className="text-gray-900 ml-1">{productData.productDetails.soldBy}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-600">Country of Origin:</span>
                    <span className="text-gray-900 ml-1">{productData.productDetails.countryOfOrigin}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-600">Manufacturer:</span>
                    <span className="text-gray-900 ml-1">{productData.productDetails.manufacturer}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-600">Customer Care:</span>
                    <span className="text-gray-900 ml-1">{productData.productDetails.customerCare}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Scraped from: {source}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Data verified: {formatDate(scrapedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Total images: {productData.images.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
