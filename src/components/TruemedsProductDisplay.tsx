import { useState } from 'react';
import { ExternalLink, Tag, Package, Truck, Shield, Heart, Share2, Download } from 'lucide-react';
import { TruemedsProductData } from '../services/api';
import { formatDate, generateImagePlaceholder } from '../utils/helpers';

interface Props { product: TruemedsProductData; }

export default function TruemedsProductDisplay({ product }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { url, scrapedAt, source, product: data } = product;
  const discountPercentage = Math.round(((data.mrp - data.sellingPrice) / data.mrp) * 100);
  const productImages = data.images.filter(img => img.includes('/ProductImage/'));

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = generateImagePlaceholder(400, 400);
  };

  const handleDownloadData = () => {
    const dataStr = JSON.stringify(product, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const objUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objUrl;
    link.download = `truemeds-product-${data.productDetails.productCode}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objUrl);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: data.title, text: data.title, url }); } catch {}
    } else {
      navigator.clipboard.writeText(url);
      alert('Product URL copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{data.brand} Product Details</h1>
              <p className="text-emerald-100 text-sm">Scraped on {formatDate(scrapedAt)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsWishlisted(!isWishlisted)} className={`p-2 rounded-lg ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button onClick={handleShare} className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30"><Share2 className="w-5 h-5" /></button>
            <button onClick={handleDownloadData} className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30"><Download className="w-5 h-5" /></button>
            <a href={url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30"><ExternalLink className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src={productImages[selectedImageIndex] || data.images[0]} alt={data.title} className="w-full h-full object-cover" onError={handleImageError} />
            </div>
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.slice(0, 8).map((image, index) => (
                  <button key={index} onClick={() => setSelectedImageIndex(index)} className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200 hover:border-gray-300'}`}>
                    <img src={image} alt={`${data.title} view ${index + 1}`} className="w-full h-full object-cover" onError={handleImageError} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h2>
              <p className="text-lg text-gray-600">by {data.brand}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹{data.sellingPrice.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through">₹{data.mrp.toLocaleString()}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">{discountPercentage}% OFF</span>
              </div>
              <p className="text-sm text-gray-600">You save ₹{(data.mrp - data.sellingPrice).toLocaleString()}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Product Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Product Code:</span><span className="text-gray-900">{data.productDetails.productCode}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Country of Origin:</span><span className="text-gray-900">{data.productDetails.countryOfOrigin}</span></div>
                {data.productDetails.packSize && (<div className="flex justify-between"><span className="text-gray-600">Pack Size:</span><span className="text-gray-900">{data.productDetails.packSize}</span></div>)}
                {data.productDetails.composition && (<div className="flex justify-between"><span className="text-gray-600">Composition:</span><span className="text-gray-900 text-right">{data.productDetails.composition}</span></div>)}
              </div>
            </div>

            {data.description && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-700">{data.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2"><Truck className="w-4 h-4" /><span>Scraped from: {source}</span></div>
            <div className="flex items-center space-x-2"><Shield className="w-4 h-4" /><span>Data verified: {formatDate(scrapedAt)}</span></div>
            <div className="flex items-center space-x-2"><Package className="w-4 h-4" /><span>Total images: {data.images.length}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}


