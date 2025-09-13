import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { FlipkartCategoryScrapeData, FlipkartCategoryProduct } from '../services/api';
import { formatPrice, generateImagePlaceholder } from '../utils/helpers';

interface FlipkartCategoryProductDisplayProps {
  data: FlipkartCategoryScrapeData;
}

const ProductCard = ({ product }: { product: FlipkartCategoryProduct }) => (
  <div className="border rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div>
      <img
        src={product.productImage || generateImagePlaceholder(200, 200)}
        alt={product.productName}
        className="w-full h-48 object-contain mb-4"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = generateImagePlaceholder(200, 200);
        }}
      />
      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.productName}</h3>
      <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
      <div className="flex items-center mt-1">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
        {product.reviewCount && <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reviews)</span>}
      </div>
    </div>
    <div>
      <div className="mt-4">
        <p className="text-lg font-bold text-gray-900">{formatPrice(product.sellingPrice)}</p>
        {product.actualPrice && product.actualPrice !== product.sellingPrice && (
          <div className="flex items-center text-sm">
            <p className="text-gray-500 line-through">{formatPrice(product.actualPrice)}</p>
            <p className="text-green-600 font-semibold ml-2">{product.discount}</p>
          </div>
        )}
      </div>
      <a
        href={`https://flipkart.com${product.productUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg text-center text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        <ExternalLink className="w-4 h-4 mr-2"/>
        View on Flipkart
      </a>
    </div>
  </div>
);

export default function FlipkartCategoryProductDisplay({ data }: FlipkartCategoryProductDisplayProps) {
  const [currentPage, setCurrentPage] = useState(data.pagination.currentPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= data.pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Scraped Category Results</h2>
        <p className="text-sm text-gray-500 mb-4">
          Showing {data.products.length} of {data.totalProducts} total products. Page {data.pagination.currentPage} of {data.pagination.totalPages}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>

        {data.pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!data.pagination.hasPreviousPage}
              className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {data.pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!data.pagination.hasNextPage}
              className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
