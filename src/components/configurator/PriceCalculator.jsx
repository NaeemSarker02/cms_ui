import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp } from 'lucide-react';

/**
 * Real-Time Price Calculator with Smooth Animations
 */
const PriceCalculator = ({ 
  basePrice = 0, 
  quantity = 1, 
  customizations = [],
  total = 0 
}) => {
  const customizationTotal = customizations.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 sticky top-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Price Breakdown</h3>
      </div>

      {/* Price Details */}
      <div className="space-y-4 mb-6">
        {/* Base Price */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <span className="text-gray-600">Base Price</span>
          <motion.span
            key={basePrice}
            initial={{ scale: 1.2, color: '#3b82f6' }}
            animate={{ scale: 1, color: '#4b5563' }}
            className="font-semibold text-gray-700"
          >
            ${basePrice.toLocaleString()}
          </motion.span>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <span className="text-gray-600">Quantity</span>
          <motion.span
            key={quantity}
            initial={{ scale: 1.2, color: '#3b82f6' }}
            animate={{ scale: 1, color: '#4b5563' }}
            className="font-semibold text-gray-700"
          >
            × {quantity}
          </motion.span>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <span className="text-gray-600">Subtotal</span>
          <motion.span
            key={basePrice * quantity}
            initial={{ scale: 1.2, color: '#3b82f6' }}
            animate={{ scale: 1, color: '#4b5563' }}
            className="font-semibold text-gray-700"
          >
            ${(basePrice * quantity).toLocaleString()}
          </motion.span>
        </div>

        {/* Customizations */}
        <AnimatePresence>
          {customizations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {customizations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-500">{item.name}</span>
                  <span className="font-medium text-gray-600">
                    +${item.price.toLocaleString()}
                  </span>
                </motion.div>
              ))}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 pt-2">
                <span className="text-gray-600">Customizations Total</span>
                <motion.span
                  key={customizationTotal}
                  initial={{ scale: 1.2, color: '#3b82f6' }}
                  animate={{ scale: 1, color: '#4b5563' }}
                  className="font-semibold text-gray-700"
                >
                  ${customizationTotal.toLocaleString()}
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Total Price */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4">
        <div className="flex items-center justify-between text-white mb-2">
          <span className="text-lg font-semibold">Total Price</span>
          <TrendingUp className="w-5 h-5" />
        </div>
        <motion.div
          key={total}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-4xl font-bold text-white"
        >
          ${total.toLocaleString()}
        </motion.div>
        <p className="text-blue-100 text-sm mt-2">
          Price updates in real-time as you configure
        </p>
      </div>

      {/* Per Unit Price */}
      {quantity > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-blue-50 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Price per unit</span>
            <span className="text-sm font-semibold text-blue-600">
              ${(total / quantity).toLocaleString(undefined, { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
              })}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PriceCalculator;