import React, { useState } from "react";
import products from "./data/products";
import { getRecommendations } from "./services/groq";

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
    <div className="container" style={{ padding: "40px" }}>
      <h1>Spearmint AI Recommendations</h1>
      <form onSubmit={handleSearch}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Query preferences..." />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {loading && <p>Loading recommendations...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {recommendedItems.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          <div className="grid">
            {recommendedItems.map(item => (
              <div key={item.id} className="card" style={{ borderColor: "gold" }}>
                <h3>{item.name} (Recommended)</h3>
                <p>{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}