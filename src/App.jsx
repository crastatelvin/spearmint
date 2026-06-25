import React, { useState } from "react";
import products from "./data/products";
import { getRecommendations } from "./services/groq";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consoleMinimized, setConsoleMinimized] = useState(true);
  const [showDevConsole, setShowDevConsole] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await getRecommendations(query, products);
      setRecommendations(result.recommendations);
      setMetadata(result.metadata);
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
      <header className="header">
        <h1>Spearmint</h1>
        <button onClick={() => setShowDevConsole(!showDevConsole)}>Toggle Dev Mode</button>
      </header>
      <form onSubmit={handleSearch}>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div className="grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {showDevConsole && metadata && (
        <div className={`dev-console ${consoleMinimized ? "minimized" : ""}`}>
          <div onClick={() => setConsoleMinimized(!consoleMinimized)}>Logs</div>
          <pre>{metadata.rawResponse}</pre>
        </div>
      )}
    </div>
  );
}