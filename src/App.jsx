import React, { useState } from "react";
import products from "./data/products";
import { getRecommendations } from "./services/groq";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await getRecommendations(query, products);
      setRecommendations(result.recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const recommendedItems = recommendations.map(rec => {
    const item = products.find(p => p.id === rec.id);
    return item ? { ...item, reason: rec.reason } : null;
  }).filter(Boolean);

  return (
    <div className="container">
      <h1>Spearmint AI Recommendations</h1>
      <form onSubmit={handleSearch}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Query preferences..." />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}