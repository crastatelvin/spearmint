import React from "react";

export default function ProductCard({ product, recommended, reason }) {
  return (
    <div className={`glass-panel card ${recommended ? "recommended" : ""}`}>
      {/* Product Image Container */}
      <div className="product-image-container">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
            loading="lazy" 
          />
        )}
        {recommended && (
          <span className="ai-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            AI Choice
          </span>
        )}
      </div>

      <div className="card-body">
        {/* Category Tag */}
        <div className="product-category-row">
          <span className="category-tag">{product.category}</span>
          <span className="product-price">${product.price}</span>
        </div>

        {/* Product Name */}
        <h3 className="product-name">{product.name}</h3>

        {/* Description */}
        <p className="product-description">{product.description}</p>

        {/* Specifications */}
        {product.specs && (
          <div className="product-specs">
            {Object.entries(product.specs).map(([key, val]) => (
              <span key={key} className="spec-badge">
                <span className="spec-key">{key}:</span> {val}
              </span>
            ))}
          </div>
        )}

        {/* Recommendation Reason */}
        {recommended && reason && (
          <div className="ai-reason">
            <div className="ai-reason-header">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              AI Analysis
            </div>
            <p className="ai-reason-text">{reason}</p>
          </div>
        )}
      </div>

      {/* Card Action Button */}
      <div className="card-footer-action">
        <button className="card-action-btn">
          Select Product
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
