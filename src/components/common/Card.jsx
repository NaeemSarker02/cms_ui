import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

/**
 * Premium Glassmorphic Card Component
 */
const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5 } : {}}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        glass 
          ? 'glass-card' 
          : 'bg-white shadow-xl hover:shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;