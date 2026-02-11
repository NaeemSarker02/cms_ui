import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

/**
 * Quantity Input Component with +/- buttons
 */
const QuantityInput = ({ quantity, onChange, min = 1, max = 1000 }) => {
  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    onChange(clampedValue);
  };

  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-gray-900">
        Quantity
      </label>
      
      <div className="flex items-center gap-3">
        {/* Decrement Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-5 h-5" />
        </motion.button>

        {/* Quantity Display */}
        <div className="flex-1 max-w-[120px]">
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min={min}
            max={max}
            className="w-full h-12 text-center text-2xl font-bold text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Increment Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Range Info */}
      <p className="text-sm text-gray-500 text-center">
        Min: {min} • Max: {max}
      </p>
    </div>
  );
};

export default QuantityInput;