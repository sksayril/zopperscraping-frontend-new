import { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { apiService, IKEAScrapeRequest, IKEAScrapeResponse, IKEAProductData } from '../services/api';
import IKEAProductDisplay from './IKEAProductDisplay';
import { validateIKEAUrl, formatDate, generateImagePlaceholder } from '../utils/helpers';

export default function IKEAScraper() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedProduct, setScrapedProduct] = useState<IKEAProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scrapeHistory, setScrapeHistory] = useState<IKEAProductData[]>([]);

  const handleScrape = async () => {
    if (!url.trim()) {
      setError('Please enter a valid IKEA product URL');
      return;
    }

    // Basic URL validation
    if (!validateIKEAUrl(url)) {
      setError('Please enter a valid IKEA product URL (must contain ikea.com and /p/)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: IKEAScrapeRequest = { url: url.trim() };
      const response: IKEAScrapeResponse = await apiService.scrapeIKEAProduct(request);
      
      if (response.success && response.data) {
        setScrapedProduct(response.data);
        setScrapeHistory(prev => [response.data, ...prev.slice(0, 4)]); // Keep last 5 items
        setUrl(''); // Clear the input after successful scrape
      } else {
        setError(response.message || 'Failed to scrape product data');
      }
    } catch (err) {
      console.error('Scraping error:', err);
      setError('Failed to connect to the scraping service. Please check if the API server is running on https://7cvccltb-3100.inc1.devtunnels.ms');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleScrape();
    }
  };

  const clearResults = () => {
    setScrapedProduct(null);
    setError(null);
  };

  const retryScrape = () => {
    if (url.trim()) {
      handleScrape();
    }
  };

  return (
    <div className="space-y-6">
      {/* Scraping Interface */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-5 h-5 text-yellow-600" />
          <h2 className="text-xl font-semibold text-gray-900">IKEA Product Scraper</h2>
        </div>
        
        <div className="space-y-4">
          {/* URL Input */}
          <div>
            <label htmlFor="ikea-url" className="block text-sm font-medium text-gray-700 mb-2">
              IKEA Product URL
            </label>
            <div className="flex space-x-3">
              <input
                id="ikea-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="https://www.ikea.com/in/en/p/product-name-12345678/"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleScrape}
                disabled={isLoading || !url.trim()}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scraping...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Scrape</span>
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Enter a valid IKEA product URL to scrape home furnishing details, images, and pricing information.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">Scraping Failed</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={retryScrape}
                      className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors"
                    >
                      Retry
                    </button>
                    <button
                      onClick={clearResults}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {scrapedProduct && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Product Scraped Successfully</h3>
                  <p className="text-sm text-green-700">
                    Found: {scrapedProduct.product.title}
                  </p>
                </div>
                <button
                  onClick={clearResults}
                  className="ml-auto text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scraped Product Display */}
      {scrapedProduct && (
        <IKEAProductDisplay product={scrapedProduct} />
      )}

      {/* Scrape History */}
      {scrapeHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Scrapes</h3>
            <button
              onClick={() => setScrapeHistory([])}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear History
            </button>
          </div>
          
          <div className="space-y-3">
            {scrapeHistory.map((product) => (
              <div
                key={`${product.url}-${product.scrapedAt}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.product.images[12] || product.product.images[0]} // Use product image, not category images
                    alt={product.product.title}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = generateImagePlaceholder(48, 48);
                    }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {product.product.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatDate(product.scrapedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-yellow-600">
                    ₹{product.product.sellingPrice}
                  </span>
                  <button
                    onClick={() => setScrapedProduct(product)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="View Details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


