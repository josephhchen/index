import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../App';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, index }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'smartphones': return '📱';
      case 'laptops': return '💻';
      case 'audio': return '🎧';
      case 'tablets': return '📱';
      case 'wearables': return '⌚';
      case 'cameras': return '📷';
      case 'gaming': return '🎮';
      case 'automotive': return '🚗';
      case 'appliances': return '🏠';
      case 'fitness': return '💪';
      case 'e-readers': return '📚';
      default: return '📦';
    }
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(product)}
    >
      <div className="product-card-content">
        <div className="product-header">
          <div className="product-category">
            <span className="category-icon">{getCategoryIcon(product.category)}</span>
            <span className="category-text">{product.category}</span>
          </div>
        </div>
        
        <h3 className="product-name">{product.name}</h3>
        
        <p className="product-description">
          {product.description.length > 120 
            ? `${product.description.substring(0, 120)}...` 
            : product.description}
        </p>
        
        <div className="product-footer">
          <motion.button
            className="view-details-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;