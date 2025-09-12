import { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { 
  apiService, 
  TruemedsScrapeRequest, 
  TruemedsScrapeResponse, 
  TruemedsProductData 
} from '../services/api';
import TruemedsProductDisplay from './TruemedsProductDisplay';
import { 
  validateTruemedsUrl, 
  formatDate, 
  generateImagePlaceholder, 
  validateUrl, 
  sanitizeInput, 
  logError 
} from '../utils/helpers';

export default function TruemedsScraper() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedProduct, setScrapedProduct] = useState<TruemedsProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scrapeHistory, setScrapeHistory] = useState<TruemedsProductData[]>([]);

  const handleScrape = async () => {
    const sanitizedUrl = sanitizeInput(url);
    if (!sanitizedUrl) {
      setError('Please enter a valid Truemeds product URL');
      return;
    }
    const urlValidation = validateUrl(sanitizedUrl);
    if (!urlValidation.isValid) {
      setError(urlValidation.error || 'Invalid URL format');
      return;
    }
    if (!validateTruemedsUrl(sanitizedUrl)) {
      setError('Please enter a valid Truemeds product URL (must contain truemeds.in and /medicine/)');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const request: TruemedsScrapeRequest = { url: sanitizedUrl };
      const response: TruemedsScrapeResponse = await apiService.scrapeTruemedsProduct(request);
      if (response.success && response.data) {
        setScrapedProduct(response.data);
        setScrapeHistory(prev => [response.data, ...prev.slice(0, 4)]);
        setUrl('');
      } else {
        setError(response.message || 'Failed to scrape product data');
      }
    } catch (err) {
      logError(err, 'TruemedsScraper.handleScrape');
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

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    setUrl(sanitizedValue);
    setError(null);
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-900">Truemeds Product Scraper</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="truemeds-url" className="block text-sm font-medium text-gray-700 mb-2">Truemeds Product URL</label>
            <div className="flex space-x-3">
              <input
                id="truemeds-url"
                type="url"
                value={url}
                onChange={handleUrlChange}
                onKeyPress={handleKeyPress}
                placeholder="https://www.truemeds.in/medicine/PRODUCT-NAME_CODE"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                disabled={isLoading}
                autoComplete="url"
                spellCheck="false"
              />
              <button
                onClick={handleScrape}
                disabled={isLoading || !url.trim()}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>Scraping...</span></>) : (<><Search className="w-4 h-4" /><span>Scrape</span></>)}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">Enter a valid Truemeds product URL to scrape product details, images, and pricing information.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">Scraping Failed</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  <div className="mt-3 flex space-x-2">
                    <button onClick={retryScrape} className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors">Retry</button>
                    <button onClick={clearResults} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition-colors">Clear</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {scrapedProduct && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Product Scraped Successfully</h3>
                  <p className="text-sm text-green-700">Found: {scrapedProduct.product.title}</p>
                </div>
                <button onClick={clearResults} className="ml-auto text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded transition-colors">Clear</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {scrapedProduct && (<TruemedsProductDisplay product={scrapedProduct} />)}

      {scrapeHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Scrapes</h3>
            <button onClick={() => setScrapeHistory([])} className="text-sm text-gray-500 hover:text-gray-700">Clear History</button>
          </div>
          <div className="space-y-3">
            {scrapeHistory.map((product) => (
              <div key={`${product.url}-${product.scrapedAt}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.product.images[2] || product.product.images[0]}
                    alt={product.product.title}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => { (e.target as HTMLImageElement).src = generateImagePlaceholder(48, 48); }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{product.product.title}</h4>
                    <p className="text-xs text-gray-500">{formatDate(product.scrapedAt)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-emerald-600">₹{product.product.sellingPrice}</span>
                  <button onClick={() => setScrapedProduct(product)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="View Details">
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


