import { useState, useCallback } from 'react';
import { ConfiguratorContext } from './ConfiguratorContext';

/**
 * Configurator State Management
 * Manages product configuration state and price calculations
 */
export const ConfiguratorProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({});

  /**
   * Calculate total price
   * Formula: Total = (Variant Price * Quantity) + Customizations
   */
  const calculateTotal = useCallback(() => {
    if (!selectedVariant) return 0;

    const basePrice = selectedVariant.price * quantity;
    
    // Add customization costs
    const customizationCost = Object.values(customizations).reduce(
      (sum, customization) => sum + (customization.price || 0),
      0
    );

    return basePrice + customizationCost;
  }, [selectedVariant, quantity, customizations]);

  /**
   * Reset configuration
   */
  const resetConfiguration = useCallback(() => {
    setSelectedProduct(null);
    setSelectedVariant(null);
    setQuantity(1);
    setCustomizations({});
  }, []);

  /**
   * Update quantity with validation
   */
  const updateQuantity = useCallback((newQuantity) => {
    const qty = Math.max(1, Math.min(1000, parseInt(newQuantity) || 1));
    setQuantity(qty);
  }, []);

  const value = {
    // State
    selectedProduct,
    selectedVariant,
    quantity,
    customizations,

    // Actions
    setSelectedProduct,
    setSelectedVariant,
    updateQuantity,
    setCustomizations,
    resetConfiguration,
    
    // Computed
    totalPrice: calculateTotal(),
  };

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
};

export default ConfiguratorProvider;