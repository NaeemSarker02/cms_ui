import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../utils/helpers';

/**
 * Variant Selector Component
 * Allows user to select product variants (Size, Color, etc.)
 */
const VariantSelector = ({ 
  variants, 
  selectedVariant, 
  onSelectVariant,
  type = 'color' // 'color' or 'size'
}) => {
  if (!variants || variants.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No variants available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 capitalize">
        Select {type}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {variants.map((variant, index) => {
          const isSelected = selectedVariant?.id === variant.id;
          
          return (
            <motion.button
              key={variant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectVariant(variant)}
              className={cn(
                'relative p-4 rounded-xl border-2 transition-all duration-200',
                'hover:shadow-lg',
                isSelected
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}

              {/* Color Preview (if color variant) */}
              {type === 'color' && variant.colorCode && (
                <div
                  className="w-full h-16 rounded-lg mb-3 border-2 border-gray-200"
                  style={{ backgroundColor: variant.colorCode }}
                />
              )}

              {/* Variant Name */}
              <p className={cn(
                'font-semibold text-sm mb-1',
                isSelected ? 'text-blue-600' : 'text-gray-900'
              )}>
                {variant.name}
              </p>

              {/* Variant Price */}
              <p className={cn(
                'text-xs font-medium',
                isSelected ? 'text-blue-500' : 'text-gray-500'
              )}>
                ${variant.price.toLocaleString()}
              </p>

              {/* Stock Status */}
              {variant.inStock !== undefined && (
                <span className={cn(
                  'inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full',
                  variant.inStock
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                )}>
                  {variant.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantSelector;