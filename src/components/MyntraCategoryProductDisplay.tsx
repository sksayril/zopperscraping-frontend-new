import { ExternalLink } from 'lucide-react';
import { MyntraCategoryScrapeData, MyntraCategoryProduct } from '../services/api';
import { generateImagePlaceholder } from '../utils/helpers';

interface MyntraCategoryProductDisplayProps {
  data: MyntraCategoryScrapeData;
}

const ProductCard = ({ product }: { product: MyntraCategoryProduct }) => (
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
    <div>
      <div className="mt-4">
        <p className="text-lg font-bold text-gray-900">{product.price}</p>
        {product.originalPrice && product.originalPrice !== product.price && (
          <div className="flex items-center text-sm">
            <p className="text-gray-500 line-through">{product.originalPrice}</p>
            <p className="text-green-600 font-semibold ml-2">{product.discount}</p>
          </div>
        )}
      </div>
      <a
        href={product.productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg text-center text-sm font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center"
      >
        <ExternalLink className="w-4 h-4 mr-2"/>
        View on Myntra
      </a>
    </div>
  </div>
);

export default function MyntraCategoryProductDisplay({ data }: MyntraCategoryProductDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Scraped Category Results</h2>
        <p className="text-sm text-gray-500 mb-4">
          Found {data.totalProducts} products.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.products.map((product, index) => (
            <ProductCard key={`${product.productUrl}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
