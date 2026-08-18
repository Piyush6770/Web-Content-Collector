import { useState } from 'react';

function App() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // NEW: Theme State (Defaults to dark mode based on standard developer preferences)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // ==========================================
  // API INTERACTION LOGIC
  // ==========================================
  const handleScrape = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const targetUrl = encodeURIComponent(url);
    const API_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(
        `${API_URL}/api/scrap?url=${targetUrl}`
    );

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Scraping failed:", err);
      setError('Connection failed. Ensure your Spring Boot backend is running and @CrossOrigin is enabled.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI RENDERING
  // ==========================================
  return (
    // NEW: The outermost div controls the theme by toggling the 'dark-mode' class
    <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="app-container">

        {/* HEADER SECTION */}
        <header className="header">
          <h1 className="header-title">ScrapeEngine</h1>
          {/* NEW: Theme Toggle Button */}
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </header>

        {/* INPUT FORM */}
        <form className="search-form" onSubmit={handleScrape}>
          <input
            type="url"
            className="search-input"
            placeholder="Enter URL to analyze (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Processing...' : 'Extract Data'}
          </button>
        </form>

        {/* ERROR HANDLING */}
        {error && <div className="error-message">{error}</div>}

        {/* SCRAPED DATA RESULTS */}
        {data && (
          <div className="results-container">

            {/* Images */}
            <section className="results-section">
              <h2>Extracted Images ({data.images?.length || 0})</h2>
              {data.images && data.images.length > 0 ? (
                <div className="image-grid">
                  {data.images.map((imgSrc, index) => (
                    <img key={index} src={imgSrc} alt={`Scraped ${index}`} className="scraped-image" />
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>No images detected on this page.</p>
              )}
            </section>

            {/* Videos */}
            <section className="results-section">
              <h2>HTML5 Videos ({data.videos?.length || 0})</h2>
              {data.videos && data.videos.length > 0 ? (
                <ul className="data-list">
                  {data.videos.map((vidSrc, index) => (
                    <li key={index}><a href={vidSrc} target="_blank" rel="noopener noreferrer">{vidSrc}</a></li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>No standard video tags found.</p>
              )}
            </section>

            {/* Links */}
            <section className="results-section">
              <h2>Discovered Links ({data.links?.length || 0})</h2>
              {data.links && data.links.length > 0 ? (
                <ul className="data-list">
                  {data.links.map((linkHref, index) => (
                    <li key={index}><a href={linkHref} target="_blank" rel="noopener noreferrer">{linkHref}</a></li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>No anchor tags found.</p>
              )}
            </section>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;