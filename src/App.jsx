import React, { useState, useEffect } from "react";
import products from "./data/products";
import { getRecommendations } from "./services/groq";
import ProductCard from "./components/ProductCard";

const SUGGESTIONS = [
  "Phone under $500",
  "Laptops for work and travel",
  "Noise-cancelling headphones",
  "Entertainment and gaming gear"
];

export default function App() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consoleMinimized, setConsoleMinimized] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [showDevConsole, setShowDevConsole] = useState(false);

  // Live API Traffic States
  const [apiStatus, setApiStatus] = useState("idle"); // "idle", "transmitting", "success", "error"
  const [lastLatency, setLastLatency] = useState(null);
  const [apiTraffic, setApiTraffic] = useState([]);

  useEffect(() => {
    // Check if Groq API key is configured
    if (!import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GROQ_API_KEY.includes("your_groq_api_key_here")) {
      setHasApiKey(false);
    } else {
      setHasApiKey(true);
    }
  }, []);

  const triggerRecommendations = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError("");
    setRecommendations([]);
    setApiStatus("transmitting");

    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      method: "POST",
      endpoint: "api.groq.com/openai/v1/chat/completions",
      status: "PENDING",
      latency: null
    };
    setApiTraffic(prev => [newLog, ...prev]);

    try {
      const result = await getRecommendations(searchQuery, products);
      setRecommendations(result.recommendations);
      setMetadata(result.metadata);
      setLastLatency(result.metadata.latencyMs);
      setApiStatus("success");

      setApiTraffic(prev => prev.map(log => 
        log.id === newLog.id 
          ? { ...log, status: "SUCCESS (200 OK)", latency: `${result.metadata.latencyMs}ms` } 
          : log
      ));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to retrieve recommendations. Please check your setup.");
      setApiStatus("error");

      setApiTraffic(prev => prev.map(log => 
        log.id === newLog.id 
          ? { ...log, status: "ERROR (FAIL)", latency: "N/A" } 
          : log
      ));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    triggerRecommendations(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    triggerRecommendations(suggestion);
  };

  // Map product catalog details onto recommendation IDs
  const recommendedItems = recommendations.map(rec => {
    const item = products.find(p => p.id === rec.id);
    return item ? { ...item, reason: rec.reason } : null;
  }).filter(Boolean);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Spearmint</h1>
        <p>AI-Powered Product Recommendation Engine</p>
        
        {/* Toggle Dev Mode control in header */}
        <div className="header-actions">
          <button 
            className={`dev-toggle-btn ${showDevConsole ? "active" : ""}`}
            onClick={() => setShowDevConsole(!showDevConsole)}
            title="Toggle Developer Terminal Logs"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            {showDevConsole ? "Hide Dev Console" : "Show Dev Console"}
          </button>
        </div>
      </header>

      {/* API Key Alert Banner */}
      {!hasApiKey && (
        <div className="warning-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <div>
            <strong>API Key Missing:</strong> Please update the <code>VITE_GROQ_API_KEY</code> environment variable in your local <code>.env</code> file to enable AI recommendations.
          </div>
        </div>
      )}

      {/* Search Console */}
      <div className="search-wrapper glass-panel">
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Describe what you are looking for (e.g. A laptop under $800 with 16GB RAM)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="search-btn" disabled={loading || !hasApiKey}>
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s infinite linear" }}>
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Search
              </>
            )}
          </button>
        </form>

        {/* Live API Traffic Monitor Bar */}
        <div className="api-monitor-row">
          <div className="api-status-badge">
            <span className={`status-dot ${apiStatus}`}></span>
            <span className="status-label">
              Groq Endpoint: <code>POST /v1/chat/completions</code> | Status:{" "}
              <strong>
                {apiStatus === "idle" && "CONNECTED (IDLE)"}
                {apiStatus === "transmitting" && "SENDING REQUEST PAYLOAD..."}
                {apiStatus === "success" && `200 OK (${lastLatency}ms)`}
                {apiStatus === "error" && "FAILED"}
              </strong>
            </span>
          </div>
          
          {apiTraffic.length > 0 && (
            <div className="traffic-flash">
              <span className="flash-label">Console Log:</span>
              <code className="flash-code">
                [{apiTraffic[0].timestamp}] {apiTraffic[0].endpoint} → {apiTraffic[0].status} {apiTraffic[0].latency ? `(${apiTraffic[0].latency})` : ""}
              </code>
            </div>
          )}
        </div>

        <div className="suggestions-container">
          <span className="suggestion-label">Suggestions:</span>
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-pill"
              disabled={loading || !hasApiKey}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Error Output */}
      {error && <div className="error-state">{error}</div>}

      {/* Loading Overlay State */}
      {loading && (
        <div className="loading-wrapper">
          <div className="spinner"></div>
          <p className="pulse-text">Consulting Groq Llama 3.3 Model...</p>
        </div>
      )}

      {/* AI Recommendations Section */}
      {!loading && recommendedItems.length > 0 && (
        <div style={{ marginBottom: "50px" }}>
          <h2 className="section-title" style={{ color: "var(--accent-gold)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            AI Recommendations
          </h2>
          <div className="grid">
            {recommendedItems.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                recommended={true}
                reason={item.reason}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty Recommendations Match Check */}
      {!loading && metadata && recommendedItems.length === 0 && (
        <div className="glass-panel empty-state" style={{ marginBottom: "50px" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px", color: "var(--text-secondary)" }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>No products match your preference query. Try adjusting your price range or specifications.</p>
        </div>
      )}

      {/* All Products Section */}
      <div>
        <h2 className="section-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l-7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          Product Catalog ({products.length} Items)
        </h2>
        <div className="grid">
          {products.map(product => {
            const isRecommended = recommendations.some(r => r.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                recommended={false}
              />
            );
          })}
        </div>
      </div>

      {/* Developer API Console (Rendered only when showDevConsole is true) */}
      {showDevConsole && metadata && (
        <div className={`dev-console ${consoleMinimized ? "minimized" : ""}`}>
          <div className="dev-console-header" onClick={() => setConsoleMinimized(!consoleMinimized)}>
            <div className="dev-console-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              Developer Console
              <span className="telemetry-tag">{metadata.model}</span>
              <span className="telemetry-tag">Latency: {metadata.latencyMs}ms</span>
            </div>
            <button className="dev-console-toggle">
              {consoleMinimized ? "▲ Expand API Logs" : "▼ Collapse Logs"}
            </button>
          </div>
          <div className="dev-console-body">
            <div className="console-pane">
              <div className="pane-header">
                <span>System + User Prompt Sent</span>
              </div>
              <div className="pane-content raw-prompt">
                {metadata.systemPrompt}
                {"\n\n"}
                {metadata.userPrompt}
              </div>
            </div>
            <div className="console-pane">
              <div className="pane-header">
                <span>Raw JSON Response Received</span>
              </div>
              <div className="pane-content">
                {metadata.rawResponse}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
