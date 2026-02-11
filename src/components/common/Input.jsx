import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

/**
 * Premium Input Component with animations
 */
const Input = forwardRef(({
  label,
  error,
  icon,
  className = '',
  containerClassName = '',
  type = 'text',
  ...props
}, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('w-full', containerClassName)}
    >
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'placeholder:text-gray-400',
            error 
              ? 'border-red-300 bg-red-50 focus:ring-red-500' 
              : 'border-gray-200 bg-white hover:border-gray-300',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600 font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
});

Input.displayName = 'Input';

export default Input;