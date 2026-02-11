import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShoppingCart, 
  RotateCcw,
  Check,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ConfiguratorContext } from '../../context/ConfiguratorContext';
import ProductSelector from '../../components/configurator/ProductSelector';
import VariantSelector from '../../components/configurator/VariantSelector';
import QuantityInput from '../../components/configurator/QuantityInput';
import PriceCalculator from '../../components/configurator/PriceCalculator';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

/**
 * Main Product Configurator Page
 * Multi-step configuration with real-time price updates
 */
const Configurator = () => {
  const navigate = useNavigate();
  const {
    selectedProduct,
    selectedVariant,
    quantity,
    totalPrice,
    setSelectedProduct,
    setSelectedVariant,
    updateQuantity,
    resetConfiguration,
  } = useContext(ConfiguratorContext);

  const [currentStep, setCurrentStep] = useState(1);
  const [customizations, setCustomizations] = useState([]);

  // Sample products data (would come from API)
  const products = [
    {
      id: 1,
      name: 'Premium Office Desk',
      description: 'Ergonomic standing desk with premium finish',
      basePrice: 1200,
      image: null,
      variants: [
        { 
          id: 101, 
          name: 'Small (120cm)', 
          price: 1200, 
          size: 'S',
          inStock: true 
        },
        { 
          id: 102, 
          name: 'Medium (150cm)', 
          price: 1450, 
          size: 'M',
          inStock: true 
        },
        { 
          id: 103, 
          name: 'Large (180cm)', 
          price: 1700, 
          size: 'L',
          inStock: true 
        },
      ],
      colors: [
        { 
          id: 201, 
          name: 'Natural Oak', 
          price: 0, 
          colorCode: '#D4A574' 
        },
        { 
          id: 202, 
          name: 'Walnut Brown', 
          price: 100, 
          colorCode: '#5D4037' 
        },
        { 
          id: 203, 
          name: 'Matte Black', 
          price: 150, 
          colorCode: '#212121' 
        },
        { 
          id: 204, 
          name: 'Pure White', 
          price: 50, 
          colorCode: '#FFFFFF' 
        },
      ],
    },
    {
      id: 2,
      name: 'Executive Office Chair',
      description: 'Luxury ergonomic chair with lumbar support',
      basePrice: 850,
      image: null,
      variants: [
        { id: 104, name: 'Standard', price: 850, inStock: true },
        { id: 105, name: 'Premium', price: 1100, inStock: true },
        { id: 106, name: 'Executive', price: 1450, inStock: false },
      ],
      colors: [
        { id: 205, name: 'Black Leather', price: 0, colorCode: '#000000' },
        { id: 206, name: 'Brown Leather', price: 50, colorCode: '#8B4513' },
        { id: 207, name: 'Grey Fabric', price: -100, colorCode: '#808080' },
      ],
    },
    {
      id: 3,
      name: 'Custom Cabinet System',
      description: 'Modular storage solution for modern offices',
      basePrice: 2200,
      image: null,
      variants: [
        { id: 107, name: '2-Door', price: 2200, inStock: true },
        { id: 108, name: '3-Door', price: 2800, inStock: true },
        { id: 109, name: '4-Door', price: 3400, inStock: true },
      ],
      colors: [
        { id: 208, name: 'Office White', price: 0, colorCode: '#F5F5F5' },
        { id: 209, name: 'Graphite Grey', price: 150, colorCode: '#464646' },
        { id: 210, name: 'Navy Blue', price: 200, colorCode: '#001F3F' },
      ],
    },
  ];

  const [selectedColor, setSelectedColor] = useState(null);

  // Calculate total price with color
  const calculatedTotal = () => {
    if (!selectedVariant) return 0;
    
    const variantPrice = selectedVariant.price * quantity;
    const colorPrice = selectedColor ? selectedColor.price * quantity : 0;
    const customizationsPrice = customizations.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );
    
    return variantPrice + colorPrice + customizationsPrice;
  };

  // Reset when product changes
  useEffect(() => {
    if (selectedProduct) {
      setSelectedVariant(null);
      setSelectedColor(null);
      setCustomizations([]);
      setCurrentStep(2);
    }
  }, [selectedProduct]);

  // Update variant price when color changes
  useEffect(() => {
    if (selectedColor && selectedVariant) {
      // Create a combined variant with color price added
      const combinedVariant = {
        ...selectedVariant,
        price: selectedVariant.price + (selectedColor.price || 0),
      };
      setSelectedVariant(combinedVariant);
    }
  }, [selectedColor]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Adding to cart:', {
      product: selectedProduct,
      variant: selectedVariant,
      color: selectedColor,
      quantity,
      total: calculatedTotal(),
    });
    
    // Navigate to cart or show success message
    alert('Product added to cart successfully!');
  };

  const handleReset = () => {
    resetConfiguration();
    setSelectedColor(null);
    setCustomizations([]);
    setCurrentStep(1);
  };

  // Progress steps
  const steps = [
    { number: 1, title: 'Select Product' },
    { number: 2, title: 'Choose Size' },
    { number: 3, title: 'Pick Color' },
    { number: 4, title: 'Set Quantity' },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedProduct !== null;
      case 2:
        return selectedVariant !== null;
      case 3:
        return selectedColor !== null;
      case 4:
        return quantity > 0;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Configurator
          </h1>
          <p className="text-gray-600">
            Create your perfect custom product in 4 simple steps
          </p>
        </div>
        
        <Button
          variant="ghost"
          onClick={handleReset}
          icon={<RotateCcw className="w-5 h-5" />}
        >
          Reset
        </Button>
      </motion.div>

      {/* Progress Steps */}
      <Card glass>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold
                    transition-all duration-300
                    ${currentStep >= step.number
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    step.number
                  )}
                </motion.div>
                <p className={`
                  mt-2 text-sm font-medium
                  ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'}
                `}>
                  {step.title}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-1 mx-4 rounded-full transition-all duration-300
                  ${currentStep > step.number
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-200'
                  }
                `} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Area */}
        <div className="lg:col-span-2">
          <Card glass className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Product Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ProductSelector
                    products={products}
                    selectedProduct={selectedProduct}
                    onSelectProduct={setSelectedProduct}
                  />
                </motion.div>
              )}

              {/* Step 2: Size Selection */}
              {currentStep === 2 && selectedProduct && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                  
                  <VariantSelector
                    variants={selectedProduct.variants}
                    selectedVariant={selectedVariant}
                    onSelectVariant={setSelectedVariant}
                    type="size"
                  />
                </motion.div>
              )}

              {/* Step 3: Color Selection */}
              {currentStep === 3 && selectedProduct && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <VariantSelector
                    variants={selectedProduct.colors}
                    selectedVariant={selectedColor}
                    onSelectVariant={setSelectedColor}
                    type="color"
                  />
                </motion.div>
              )}

              {/* Step 4: Quantity */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="py-12"
                >
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                      <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Almost Done!
                      </h2>
                      <p className="text-gray-600">
                        Choose your quantity and we'll calculate the final price
                      </p>
                    </div>

                    <QuantityInput
                      quantity={quantity}
                      onChange={updateQuantity}
                    />

                    {/* Configuration Summary */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl space-y-3">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Configuration Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Product:</span>
                          <span className="font-medium text-gray-900">
                            {selectedProduct?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium text-gray-900">
                            {selectedVariant?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Color:</span>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: selectedColor?.colorCode }}
                            />
                            <span className="font-medium text-gray-900">
                              {selectedColor?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                icon={<ArrowLeft className="w-5 h-5" />}
              >
                Back
              </Button>

              {currentStep < 4 ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={handleAddToCart}
                  disabled={!canProceed()}
                  icon={<ShoppingCart className="w-5 h-5" />}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Price Calculator Sidebar */}
        <div className="lg:col-span-1">
          <PriceCalculator
            basePrice={selectedVariant?.price || 0}
            quantity={quantity}
            customizations={customizations}
            total={calculatedTotal()}
          />
        </div>
      </div>
    </div>
  );
};

export default Configurator;