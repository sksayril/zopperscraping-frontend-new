import { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle, ExternalLink, RefreshCw, Box, List } from 'lucide-react';
import { apiService, FlipkartScrapeRequest, FlipkartScrapeResponse, FlipkartProductData, FlipkartCategoryScrapeRequest, FlipkartCategoryScrapeResponse, FlipkartCategoryScrapeData } from '../services/api';
import FlipkartProductDisplay from './FlipkartProductDisplay';
import { validateFlipkartUrl, formatPrice, formatDate, generateImagePlaceholder } from '../utils/helpers';
import FlipkartCategoryProductDisplay from './FlipkartCategoryProductDisplay';

export default function FlipkartScraper() {
  const [scrapeType, setScrapeType] = useState<'product' | 'category'>('product');
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedProduct, setScrapedProduct] = useState<FlipkartProductData | null>(null);
  const [scrapedCategoryData, setScrapedCategoryData] = useState<FlipkartCategoryScrapeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scrapeHistory, setScrapeHistory] = useState<FlipkartProductData[]>([]);

  const handleScrape = async () => {
    if (!url.trim()) {
      setError(`Please enter a valid Flipkart ${scrapeType} URL`);
      return;
    }

    if (scrapeType === 'product' && !validateFlipkartUrl(url)) {
      setError('Please enter a valid Flipkart product URL (must contain flipkart.com and /p/)');
      return;
    }

    setIsLoading(true);
    setError(null);
    setScrapedProduct(null);
    setScrapedCategoryData(null);

    try {
      if (scrapeType === 'product') {
        const request: FlipkartScrapeRequest = { url: url.trim() };
        const response: FlipkartScrapeResponse = await apiService.scrapeFlipkartProduct(request);
        
        if (response.success && response.data) {
          setScrapedProduct(response.data);
          setScrapeHistory(prev => [response.data, ...prev.slice(0, 4)]);
          setUrl('');
        } else {
          setError(response.message || 'Failed to scrape product data');
        }
      } else {
        const request: FlipkartCategoryScrapeRequest = { url: url.trim(), page };
        const response: FlipkartCategoryScrapeResponse = await apiService.scrapeFlipkartCategory(request);

        if (response.success && response.data) {
          setScrapedCategoryData(response.data);
          setUrl('');
        } else {
          setError(response.message || 'Failed to scrape category data');
        }
      }
    } catch (err) {
      console.error('Scraping error:', err);
      setError('Failed to connect to the scraping service. Please check if the API server is running.');
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
    setScrapedCategoryData(null);
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
          <Search className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Flipkart Scraper</h2>
        </div>
        
        <div className="space-y-4">
          {/* Scrape Type Selection */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Scrape Type:</label>
            <div className="flex items-center">
              <input
                id="product-scrape-flipkart"
                type="radio"
                value="product"
                checked={scrapeType === 'product'}
                onChange={() => setScrapeType('product')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="product-scrape-flipkart" className="ml-2 block text-sm text-gray-900">
                <Box className="inline w-4 h-4 mr-1" />
                Product
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="category-scrape-flipkart"
                type="radio"
                value="category"
                checked={scrapeType === 'category'}
                onChange={() => setScrapeType('category')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="category-scrape-flipkart" className="ml-2 block text-sm text-gray-900">
                <List className="inline w-4 h-4 mr-1" />
                Category
              </label>
            </div>
          </div>

          {/* URL Input */}
          <div>
            <label htmlFor="flipkart-url" className="block text-sm font-medium text-gray-700 mb-2">
              Flipkart {scrapeType === 'product' ? 'Product' : 'Category'} URL
            </label>
            <div className="flex space-x-3">
              <input
                id="flipkart-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={scrapeType === 'product' 
                  ? "https://www.flipkart.com/product-name/p/itm123456789..."
                  : "https://www.flipkart.com/all/pr?sid=all..."}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              {scrapeType === 'category' && (
                <input
                  type="number"
                  value={page}
                  onChange={(e) => setPage(parseInt(e.target.value, 10))}
                  min="1"
                  className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                  placeholder="Page"
                />
              )}
              <button
                onClick={handleScrape}
                disabled={isLoading || !url.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
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
              {scrapeType === 'product'
                ? "Enter a valid Flipkart product URL to scrape product details."
                : "Enter a category/search results URL and page number to scrape."}
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
          {(scrapedProduct || scrapedCategoryData) && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Scraped Successfully</h3>
                  <p className="text-sm text-green-700">
                    {scrapedProduct ? `Found: ${scrapedProduct.title}` : `Found ${scrapedCategoryData?.totalProducts} products on page ${scrapedCategoryData?.page}`}
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
        <FlipkartProductDisplay product={scrapedProduct} />
      )}
      
      {/* Scraped Category Display */}
      {scrapedCategoryData && (
        <FlipkartCategoryProductDisplay data={scrapedCategoryData} />
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
            {scrapeHistory.map((product, index) => (
              <div
                key={`${product.url}-${product.scrapedAt}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.images.thumbnails[0]?.url || product.images.main[0]?.url}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = generateImagePlaceholder(48, 48);
                    }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {product.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatDate(product.scrapedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-600">
                    {product.currentPrice}
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
