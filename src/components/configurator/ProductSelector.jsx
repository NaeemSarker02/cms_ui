import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/helpers';

/**
 * Product Selection Component
 */
const ProductSelector = ({ products, selectedProduct, onSelectProduct }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Select a Product</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => {
          const isSelected = selectedProduct?.id === product.id;
          
          return (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => onSelectProduct(product)}
              className={cn(
                'text-left p-6 rounded-2xl border-2 transition-all duration-200',
                'hover:shadow-xl',
                isSelected
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              {/* Product Image */}
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-16 h-16 text-gray-400" />
                )}
              </div>

              {/* Product Info */}
              <h3 className={cn(
                'text-lg font-bold mb-2',
                isSelected ? 'text-blue-600' : 'text-gray-900'
              )}>
                {product.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Price Range */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Starting at</p>
                  <p className={cn(
                    'text-xl font-bold',
                    isSelected ? 'text-blue-600' : 'text-gray-900'
                  )}>
                    ${product.basePrice?.toLocaleString()}
                  </p>
                </div>
                <ChevronRight className={cn(
                  'w-6 h-6',
                  isSelected ? 'text-blue-600' : 'text-gray-400'
                )} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSelector;