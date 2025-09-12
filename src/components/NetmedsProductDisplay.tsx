import { useState } from 'react';
import { ExternalLink, Calendar, Tag, Image as ImageIcon, ChevronLeft, ChevronRight, Award, CheckCircle, Building, Pill, AlertTriangle, Info, FlaskConical, Brain, Stethoscope } from 'lucide-react';
import { NetmedsProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface NetmedsProductDisplayProps {
  product: NetmedsProductData;
}

export default function NetmedsProductDisplay({ product }: NetmedsProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const allImages = product.product.images;
  
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Filter out non-product images (icons, UI elements, etc.)
  const productImages = allImages.filter(img => 
    img.includes('netmed/wrkr/products/assets/item') && 
    !img.includes('svg') && 
    !img.includes('icon') &&
    !img.includes('arrow') &&
    !img.includes('add-small')
  );

  // Clean and parse text content
  const cleanText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\\r\\n/g, ' ')
      .replace(/\\n/g, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/\\"/g, '"')
      .replace(/\\/g, '')
      .replace(/u003C/g, '<')
      .replace(/u003E/g, '>')
      .replace(/u002F/g, '/')
      .replace(/u003Ca href="#[^"]*"u003E/g, '')
      .replace(/u003Cu002Fau003E/g, '')
      .replace(/u003Cu002Fdivu003E/g, '')
      .replace(/u003Cdiv[^>]*u003E/g, '')
      .replace(/u003Ch2[^>]*u003E/g, '')
      .replace(/u003Cu002Fh2u003E/g, '')
      .replace(/u003Cpu003E/g, '')
      .replace(/u003Cu002Fpu003E/g, '')
      .replace(/u003Crowu003E/g, '')
      .replace(/u003Cu002Frowu003E/g, '')
      .replace(/u003Ccol-md-12u003E/g, '')
      .replace(/u003Cu002Fcol-md-12u003E/g, '')
      .replace(/u003Cinner-contentu003E/g, '')
      .replace(/u003Cu002Finner-contentu003E/g, '')
      .replace(/u003Cdruginfo_cont[^>]*u003E/g, '')
      .replace(/u003Cu002Fdruginfo_contu003E/g, '')
      .replace(/u003Cprescript-txt[^>]*u003E/g, '')
      .replace(/u003Cu002Fprescript-txtu003E/g, '')
      .replace(/u003Cproduct_desc_info[^>]*u003E/g, '')
      .replace(/u003Cu002Fproduct_desc_infou003E/g, '')
      .replace(/u003Cbottom-line[^>]*u003E/g, '')
      .replace(/u003Cactive[^>]*u003E/g, '')
      .replace(/u003Cdruginfo-dv[^>]*u003E/g, '')
      .replace(/u003Cnp_tab1[^>]*u003E/g, '')
      .replace(/u003Cid="[^"]*"u003E/g, '')
      .replace(/u003Cclass="[^"]*"u003E/g, '')
      .replace(/u003C[^>]*u003E/g, '')
      .replace(/\s+/g, ' ')
      .replace(/^\s*[•:]\s*/g, '')
      .replace(/\s*[•:]\s*$/g, '')
      .trim();
  };

  // Parse category information
  const parseCategory = (category: string) => {
    if (!category) return null;
    try {
      const cleanCategory = cleanText(category);
      const matches = cleanCategory.match(/categorynamelevel1[^"]*"([^"]*)"/);
      return matches ? matches[1] : null;
    } catch {
      return null;
    }
  };

  // Extract specific information from messy data
  const extractInfo = (text: string, type: string) => {
    if (!text) return '';
    const cleaned = cleanText(text);
    
    switch (type) {
      case 'uses':
        // Extract uses information
        if (cleaned.includes('Introduction About')) {
          const introMatch = cleaned.match(/Introduction About[^:]*:?\s*([^.]+)/);
          if (introMatch) return introMatch[1];
        }
        if (cleaned.includes('fever and pain reducing')) {
          return 'Fever and pain reducing medicine';
        }
        return cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned;
      
      case 'sideEffects':
        // Extract side effects
        if (cleaned.includes('safetyprecaution')) {
          const safetyMatch = cleaned.match(/safetyprecaution[^:]*:?\s*([^"]+)/);
          if (safetyMatch) return safetyMatch[1];
        }
        return cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned;
      
      case 'howItWorks':
        // Extract how it works information
        if (cleaned.includes('Introduction About')) {
          const introMatch = cleaned.match(/Introduction About[^:]*:?\s*([^.]+)/);
          if (introMatch) return introMatch[1];
        }
        return cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned;
      
      default:
        return cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned;
    }
  };

  const categoryInfo = parseCategory(product.product.category);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Pill className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Netmeds Product Details</h1>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Netmeds</span>
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
                  <span>{cleanText(product.product.manufacturer)}</span>
                </span>
                {categoryInfo && (
                  <>
                    <span>•</span>
                    <span>{categoryInfo}</span>
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
                  {product.product.mrp !== product.product.sellingPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      ₹{product.product.mrp.toFixed(2)}
                    </div>
                  )}
                </div>
                {product.product.discount > 0 && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.product.discount}% OFF
                  </div>
                )}
              </div>
              {product.product.discount > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  You Save: ₹{(product.product.mrp - product.product.sellingPrice).toFixed(2)}
                </div>
              )}
            </div>

            {/* Composition */}
            {product.product.composition && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FlaskConical className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Composition</h3>
                </div>
                <p className="text-sm text-gray-700">{cleanText(product.product.composition)}</p>
              </div>
            )}

            {/* Uses */}
            {product.product.uses && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Uses</h3>
                </div>
                <p className="text-sm text-gray-700">{extractInfo(product.product.uses, 'uses')}</p>
              </div>
            )}

            {/* How It Works */}
            {product.product.howItWorks && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">How It Works</h3>
                </div>
                <p className="text-sm text-gray-700">{extractInfo(product.product.howItWorks, 'howItWorks')}</p>
              </div>
            )}

            {/* Description */}
            {product.product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{cleanText(product.product.description)}</p>
              </div>
            )}
          </div>

          {/* Right Column - Medical Information */}
          <div className="space-y-6">
            {/* Side Effects */}
            {product.product.sideEffects && (
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Side Effects & Safety</h3>
                </div>
                <p className="text-sm text-gray-700">{extractInfo(product.product.sideEffects, 'sideEffects')}</p>
              </div>
            )}

            {/* Category Information */}
            {categoryInfo && (
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Stethoscope className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-900">Medical Category</h3>
                </div>
                <p className="text-sm text-gray-700">{categoryInfo}</p>
              </div>
            )}

            {/* Manufacturer Information */}
            {product.product.manufacturer && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Manufacturer</h3>
                </div>
                <p className="text-sm text-gray-700">{cleanText(product.product.manufacturer)}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Product Details</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <div>Title: {product.product.title}</div>
                <div>Source: {product.source}</div>
                {product.savedTo && <div>Saved to: {product.savedTo}</div>}
                <div>Scraped: {formatDate(product.scrapedAt)}</div>
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
                    Do not self-medicate. Always follow your doctor's prescription.
                  </p>
                </div>
              </div>
            </div>

            {/* Netmeds Features */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800">Netmeds Features</h4>
                  <div className="text-sm text-green-700 mt-1 space-y-1">
                    <div>• Cash on Delivery (COD) Available</div>
                    <div>• Doorstep Delivery</div>
                    <div>• Authentic Medicines</div>
                    <div>• Prescription Required</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Raw Data Debug Section (Collapsible) */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <button
                onClick={() => setShowAllSpecs(!showAllSpecs)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Info className="w-4 h-4" />
                <span>{showAllSpecs ? 'Hide' : 'Show'} Raw Data</span>
              </button>
              
              {showAllSpecs && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Uses (Raw)</h5>
                    <div className="bg-white p-3 rounded border text-xs text-gray-600 font-mono max-h-32 overflow-y-auto">
                      {product.product.uses}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Side Effects (Raw)</h5>
                    <div className="bg-white p-3 rounded border text-xs text-gray-600 font-mono max-h-32 overflow-y-auto">
                      {product.product.sideEffects}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">How It Works (Raw)</h5>
                    <div className="bg-white p-3 rounded border text-xs text-gray-600 font-mono max-h-32 overflow-y-auto">
                      {product.product.howItWorks}
                    </div>
                  </div>
                </div>
              )}
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
