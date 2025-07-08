import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Product } from '../App';
import ProductCard from './ProductCard';

interface RecommendationPanelProps {
  product: Product | null;
  recommendations: Product[];
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  product,
  recommendations,
  onClose,
  onProductClick,
}) => {
  if (!product) return null;

  return (
    <motion.div
      className="recommendation-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="recommendation-panel"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="recommendation-header">
          <div className="recommendation-title">
            <Sparkles className="sparkles-icon" />
            <h2>Recommended for you</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="selected-product">
          <h3>Based on: {product.name}</h3>
          <p className="selected-description">{product.description}</p>
        </div>

        <div className="recommendations-content">
          {recommendations.length > 0 ? (
            <div className="recommendations-grid">
              {recommendations.map((rec, index) => (
                <ProductCard
                  key={rec.id}
                  product={rec}
                  onClick={onProductClick}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="no-recommendations">
              <p>No recommendations found for this product</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecommendationPanel;