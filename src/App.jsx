import React, { useState } from "react";
import products from "./data/products";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Spearmint Recommendations</h1>
      <input 
        type="text" 
        placeholder="Enter preferences..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <h2>All Products</h2>
      <div>
        {products.map(product => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{product.name}</h3>
            <p>Category: {product.category} | Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}