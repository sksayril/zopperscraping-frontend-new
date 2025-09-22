import { ExternalLink } from 'lucide-react';
import { JioMartCategoryScrapeData, JioMartCategoryProduct } from '../services/api';
import { generateImagePlaceholder } from '../utils/helpers';

interface JioMartCategoryProductDisplayProps {
  data: JioMartCategoryScrapeData;
}

const ProductCard = ({ product }: { product: JioMartCategoryProduct }) => (
  <div className="border rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div>
      <img
        src={product.imageUrl || generateImagePlaceholder(200, 200)}
        alt={product.productName}
        className="w-full h-48 object-contain mb-4"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = generateImagePlaceholder(200, 200);
        }}
      />
      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.productName}</h3>
      <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
    </div>
    <div className="mt-4">
      <div className="flex items-baseline mb-2">
        <span className="text-lg font-bold text-gray-900">{product.price}</span>
        {product.originalPrice && (
          <span className="text-xs text-gray-500 line-through ml-2">{product.originalPrice}</span>
        )}
      </div>
      {product.discount && (
        <p className="text-sm font-semibold text-green-600 mb-2">{product.discount}</p>
      )}
      <a
        href={product.productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        View Product
        <ExternalLink className="w-4 h-4 ml-2" />
      </a>
    </div>
  </div>
);

export default function JioMartCategoryProductDisplay({ data }: JioMartCategoryProductDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Scraped Category Products</h2>
        <p className="text-sm text-gray-500">
          Found {data.totalProducts} products. Scraped at {new Date(data.scrapedAt).toLocaleString()}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product, index) => (
          <ProductCard key={`${product.productUrl}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}
