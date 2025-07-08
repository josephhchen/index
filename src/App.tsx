import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import RecommendationPanel from './components/RecommendationPanel';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface SearchResponse {
  products: Product[];
  count: number;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post<SearchResponse>('http://localhost:8000/search', {
        query,
        limit: 20
      });
      setSearchResults(response.data.products);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = async (product: Product) => {
    setSelectedProduct(product);
    setShowRecommendations(true);
    
    try {
      const response = await axios.get<SearchResponse>(`http://localhost:8000/recommendations?product=${encodeURIComponent(product.name)}&limit=8`);
      setRecommendations(response.data.products.filter(p => p.name !== product.name));
    } catch (error) {
      console.error('Recommendations error:', error);
      setRecommendations([]);
    }
  };

  const closeRecommendations = () => {
    setShowRecommendations(false);
    setSelectedProduct(null);
    setRecommendations([]);
  };

  useEffect(() => {
    if (searchQuery) {
      const delayedSearch = setTimeout(() => {
        handleSearch(searchQuery);
      }, 300);
      return () => clearTimeout(delayedSearch);
    }
  }, [searchQuery]);

  return (
    <div className="app">
      <ParticleBackground />
      <div className="app-container">
        <motion.header 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="logo-icon" />
              <span className="logo-text">index</span>
            </motion.div>
            <p className="tagline">Find any product in seconds.</p>
          </div>
        </motion.header>

        <motion.section 
          className="search-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </motion.section>

        <motion.section 
          className="results-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div 
                className="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="loading-spinner" />
                <p>Searching products...</p>
              </motion.div>
            )}

            {!isLoading && searchResults.length > 0 && (
              <motion.div 
                className="search-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="results-title">
                  Found {searchResults.length} products
                </h2>
                <div className="products-grid">
                  {searchResults.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {!isLoading && searchQuery && searchResults.length === 0 && (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Search className="no-results-icon" />
                <h3>No products found</h3>
                <p>Try searching for something else</p>
              </motion.div>
            )}

            {!searchQuery && !isLoading && (
              <motion.div 
                className="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="example-queries">
                  <p>Try searching for:</p>
                  <div className="query-examples">
                    <button 
                      className="example-query"
                      onClick={() => setSearchQuery('professional camera for photography')}
                    >
                      "professional camera for photography"
                    </button>
                    <button 
                      className="example-query"
                      onClick={() => setSearchQuery('laptop for coding and development')}
                    >
                      "laptop for coding and development"
                    </button>
                    <button 
                      className="example-query"
                      onClick={() => setSearchQuery('wireless headphones for music')}
                    >
                      "wireless headphones for music"
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <AnimatePresence>
          {showRecommendations && (
            <RecommendationPanel
              product={selectedProduct}
              recommendations={recommendations}
              onClose={closeRecommendations}
              onProductClick={handleProductClick}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;