import { useEffect, useState } from "react";
import "./news.css";
import userimg from "../assets/image/WhatsApp Image 2026-01-09 at 5.39.16 PM.jpeg";
import axios from "axios";
import Newsmodel from "./Newsmodel";
import Bookmark from "./Bookmark";
import Wheather from "./Wheather";
import Calender from "./Calender";
import Blog from "./Blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBookmark,
  faBars,
  faXmark,
  faPenNib,
  faFire,
  faGlobe,
  faNewspaper,
  faArrowRight,
  faClock,
  faBuilding,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

// All categories properly spelled
const categories = [
  "General",
  "World",
  "Business",
  "Technology",
  "Entertainment",
  "Sports",
  "Science",
  "Health",
  "Nation",
];

// Rich fallback news dataset across categories
const FALLBACK_ARTICLES = {
  general: [
    {
      title: "Global Leaders Reach Landmark Agreement on Clean Energy Transition",
      description: "International envoys concluded discussions in Geneva with unprecedented commitments to double renewable grid investments by 2030.",
      content: "International climate envoys reached a landmark consensus today, committing over $400 billion toward sovereign clean energy initiatives. The historic declaration focuses on cross-border green hydrogen infrastructure, decentralized solar microgrids, and transparent carbon offset mechanisms across emerging economies.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      source: { name: "Reuters World" },
      url: "https://reuters.com",
    },
    {
      title: "Breakthrough in Solid-State Battery Tech Promises 800-Mile Range",
      description: "Researchers at MIT achieve record energy density in silicon-composite battery cells, bypassing decades-old thermal degradation roadblocks.",
      content: "Engineers announced a breakthrough in silicon-anode solid-state chemistry capable of maintaining 98% capacity over 3,000 rapid charging cycles. Commercial pilot manufacturing is projected to commence late next year.",
      image: "https://images.unsplash.com/photo-1558441719-8b449c6490ec?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      source: { name: "TechCrunch" },
      url: "https://techcrunch.com",
    },
    {
      title: "Deep Space Telescope Detects Atmospheric Water Vapor on Habitable Exoplanet",
      description: "Astrophysicists confirm direct spectroscopic signals of water and methane in the atmosphere of K2-18b.",
      content: "A spectroscopic analysis from the orbital observatory revealed distinct molecular absorption signatures for water vapor and carbon-bearing compounds in an exoplanet 120 light-years away, sparking renewed debate among astrobiologists.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      source: { name: "Nature Science" },
      url: "https://nature.com",
    },
    {
      title: "Modern Minimalist Architecture Takes Center Stage in Global Urban Design",
      description: "Cities worldwide adopt biophilic timber skyscrapers that reduce carbon footprint while enhancing resident well-being.",
      content: "Urban developers are reimagining high-density housing with mass timber construction, living vertical gardens, and passive thermal ventilation, creating tranquil sanctuaries in bustling metropolitan centers.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      source: { name: "Architectural Digest" },
      url: "https://architecturaldigest.com",
    },
    {
      title: "Global Financial Markets Rally as Inflation Cools Across Major Economies",
      description: "Central banks signal impending interest rate adjustments following three consecutive quarters of price stability.",
      content: "Equity indexes advanced strongly across Tokyo, Frankfurt, and New York as core consumer inflation dipped below target projections, boosting consumer confidence and cross-border commercial lending.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 11).toISOString(),
      source: { name: "Bloomberg" },
      url: "https://bloomberg.com",
    },
    {
      title: "Medical Researchers Unveil Personalized mRNA Cancer Vaccines with 80% Success Rate",
      description: "Phase 3 clinical trials demonstrate targeted immune response against stubborn melanoma and pancreatic carcinomas.",
      content: "Tailored antigen synthesizers allow oncologists to sequence patient biopsies and print personalized vaccine therapies within 14 business days, marking a monumental leap in targeted biological medicine.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
      source: { name: "The Lancet" },
      url: "https://thelancet.com",
    },
    {
      title: "Championship Finals Deliver Thrilling Double-Overtime Finish",
      description: "Underdog franchise secures first national trophy in front of 75,000 cheering fans in a dramatic sudden-death finish.",
      content: "A buzzer-beating three-pointer sealed one of the greatest upsets in modern sports history, concluding a breathtaking post-season tournament that captivated millions of viewers globally.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      source: { name: "ESPN Sports" },
      url: "https://espn.com",
    },
  ],
};

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("news"); // 'news' | 'blogs'

  // Modals & Drawers
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bookmark")) || [];
    } catch {
      return [];
    }
  });
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Loading & Toast
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Fetch news data with resilient fallback
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);

      const API_KEY = "fec4d3686fd7f1616eeded058bb2f855";
      let url = `https://gnews.io/api/v4/top-headlines?category=${activeCategory}&lang=en&apikey=${API_KEY}`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          searchQuery
        )}&lang=en&apikey=${API_KEY}`;
      }

      try {
        const response = await axios.get(url, { timeout: 7000 });
        if (
          isMounted &&
          response.data &&
          response.data.articles &&
          response.data.articles.length > 0
        ) {
          const articles = response.data.articles;
          setHeadline(articles[0]);
          setNewsList(articles.slice(1, 10));
          setIsLoading(false);
          return;
        }
      } catch {
        // Fallback gracefully on rate limit / network error
      }

      if (isMounted) {
        // Use curated dataset
        const fallback =
          FALLBACK_ARTICLES[activeCategory] || FALLBACK_ARTICLES.general;
        setHeadline(fallback[0]);
        setNewsList(fallback.slice(1));
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName.toLowerCase());
    setSearchQuery("");
    setSearchInput("");
    setActiveView("news");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSearchQuery(searchInput.trim());
    setActiveView("news");
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  const handleArticleClick = (article) => {
    if (!article) return;
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const handleBookmarkToggle = (article) => {
    if (!article || !article.title) return;

    setBookmarks((prev) => {
      const exists = prev.some((b) => b.title === article.title);
      let updated;
      if (exists) {
        updated = prev.filter((b) => b.title !== article.title);
        showToast("Story removed from bookmarks");
      } else {
        updated = [article, ...prev];
        showToast("Story saved to bookmarks!");
      }
      localStorage.setItem("bookmark", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem("bookmark");
    showToast("All bookmarks cleared");
  };

  const isArticleBookmarked = (article) => {
    if (!article || !article.title) return false;
    return bookmarks.some((b) => b.title === article.title);
  };

  return (
    <div className="news-container-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="news-toast-pill">
          <FontAwesomeIcon icon={faCheck} className="toast-check-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP BRAND HEADER */}
      <header className="news-header">
        <div className="header-brand-wrap">
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation drawer"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
          </button>

          <div
            className="brand-logo"
            onClick={() => {
              setActiveView("news");
              setActiveCategory("general");
              setSearchQuery("");
            }}
          >
            <span className="logo-text">CHRONICLE</span>
            <div className="live-edition-badge">
              <span className="live-dot" />
              <span>LIVE EDITION</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs (Headlines vs Blogs) */}
        <div className="header-view-tabs">
          <button
            type="button"
            className={`view-tab-btn ${activeView === "news" ? "active" : ""}`}
            onClick={() => setActiveView("news")}
          >
            <FontAwesomeIcon icon={faNewspaper} />
            <span>Headlines</span>
          </button>
          <button
            type="button"
            className={`view-tab-btn ${activeView === "blogs" ? "active" : ""}`}
            onClick={() => setActiveView("blogs")}
          >
            <FontAwesomeIcon icon={faPenNib} />
            <span>Community Blogs</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="header-search-wrap">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search world news, topics..."
              className="search-input"
            />
            {searchInput && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
            <button type="submit" className="search-submit-btn" aria-label="Submit search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>

        {/* Header Right Actions */}
        <div className="header-actions-wrap">
          <button
            type="button"
            className="bookmark-shortcut-btn"
            onClick={() => setShowBookmarkModal(true)}
            title="View saved stories"
          >
            <FontAwesomeIcon icon={faBookmark} />
            <span className="bookmark-btn-label">Saved</span>
            {bookmarks.length > 0 && (
              <span className="bookmark-counter-badge">{bookmarks.length}</span>
            )}
          </button>

          <div className="header-user-avatar" title="Nirmal Solanki · Chief Editor">
            <img src={userimg} alt="Nirmal Solanki" className="user-avatar-img" />
          </div>
        </div>
      </header>

      {/* HORIZONTAL CATEGORY PILL STRIP (Mobile / Tablet Quick Nav) */}
      <div className="category-scroll-strip">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-pill ${
              activeCategory === cat.toLowerCase() && activeView === "news"
                ? "active"
                : ""
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MAIN THREE-COLUMN CONTENT WRAPPER */}
      <div className="news-main-grid">
        {/* LEFT COLUMN: User Profile & Category Navigation */}
        <aside
          className={`news-left-sidebar ${mobileMenuOpen ? "mobile-drawer-open" : ""}`}
        >
          <div className="user-profile-card">
            <div className="user-avatar-wrap">
              <img src={userimg} alt="Nirmal Solanki" className="profile-img" />
              <span className="online-indicator" />
            </div>
            <h3 className="profile-name">Nirmal Solanki</h3>
            <span className="profile-role">Executive Editor</span>

            <div className="profile-stats-row">
              <div className="stat-box">
                <span className="stat-number">{bookmarks.length}</span>
                <span className="stat-label">Saved</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-box">
                <span className="stat-number">9</span>
                <span className="stat-label">Topics</span>
              </div>
            </div>
          </div>

          <nav className="categories-sidebar-card">
            <div className="sidebar-card-title-row">
              <FontAwesomeIcon icon={faGlobe} className="sidebar-title-icon" />
              <h4 className="sidebar-title">Categories</h4>
            </div>

            <div className="category-links-list">
              {categories.map((cat) => {
                const isActive =
                  activeCategory === cat.toLowerCase() && activeView === "news";
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`cat-sidebar-link ${isActive ? "active" : ""}`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    <span>{cat}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="link-arrow" />
                  </button>
                );
              })}
            </div>

            <div className="sidebar-bottom-actions">
              <button
                type="button"
                className="sidebar-bookmark-link"
                onClick={() => {
                  setShowBookmarkModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                <div className="bm-link-left">
                  <FontAwesomeIcon icon={faBookmark} />
                  <span>Reading List</span>
                </div>
                <span className="bm-pill">{bookmarks.length}</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Backdrop for Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className="mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* CENTER COLUMN: Feed (News or Blogs) */}
        <main className="news-center-feed">
          {searchQuery && (
            <div className="search-result-banner">
              <span>
                Search results for: <strong>"{searchQuery}"</strong>
              </span>
              <button
                type="button"
                className="clear-search-link"
                onClick={handleClearSearch}
              >
                Clear Search
              </button>
            </div>
          )}

          {activeView === "blogs" ? (
            /* BLOG VIEW */
            <Blog onSelectArticle={handleArticleClick} compact={false} />
          ) : (
            /* NEWS VIEW */
            <>
              {/* FEATURED HEADLINE HERO */}
              {isLoading ? (
                <div className="headline-hero-skeleton">
                  <div className="skeleton-image shimmer" />
                </div>
              ) : headline ? (
                <article
                  className="headline-hero-card"
                  onClick={() => handleArticleClick(headline)}
                >
                  <img
                    src={
                      headline.image ||
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80"
                    }
                    alt={headline.title}
                    className="hero-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80";
                    }}
                  />
                  <div className="hero-gradient-scrim" />

                  <div className="hero-content-overlay">
                    <div className="hero-tags-row">
                      <span className="hero-breaking-badge">
                        <FontAwesomeIcon icon={faFire} /> BREAKING
                      </span>
                      {headline.source?.name && (
                        <span className="hero-source-chip">
                          <FontAwesomeIcon icon={faBuilding} /> {headline.source.name}
                        </span>
                      )}
                      <span className="hero-time-chip">
                        <FontAwesomeIcon icon={faClock} />{" "}
                        {headline.publishedAt
                          ? new Date(headline.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "Today"}
                      </span>
                    </div>

                    <h2 className="headline-hero-title">{headline.title}</h2>
                    {headline.description && (
                      <p className="headline-hero-excerpt">
                        {headline.description}
                      </p>
                    )}

                    <div className="hero-footer-row">
                      <span className="hero-read-action">
                        Read Full Story <FontAwesomeIcon icon={faArrowRight} />
                      </span>

                      <button
                        type="button"
                        className={`hero-bookmark-btn ${
                          isArticleBookmarked(headline) ? "bookmarked" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmarkToggle(headline);
                        }}
                        title={
                          isArticleBookmarked(headline)
                            ? "Remove bookmark"
                            : "Save for later"
                        }
                        aria-label="Bookmark headline"
                      >
                        <FontAwesomeIcon icon={faBookmark} />
                      </button>
                    </div>
                  </div>
                </article>
              ) : null}

              {/* TRENDING NEWS SECTION & GRID */}
              <div className="news-grid-section">
                <div className="section-title-bar">
                  <div className="title-left-group">
                    <FontAwesomeIcon icon={faNewspaper} className="section-title-icon" />
                    <h3 className="section-heading">
                      Trending in{" "}
                      <span className="category-accent-text">
                        {activeCategory.toUpperCase()}
                      </span>
                    </h3>
                  </div>
                  <span className="article-count-label">
                    {newsList.length} Articles
                  </span>
                </div>

                <div className="articles-grid">
                  {isLoading
                    ? [...Array(6).keys()].map((i) => (
                        <div key={i} className="article-card-skeleton shimmer" />
                      ))
                    : newsList.map((article, idx) => {
                        const bookmarked = isArticleBookmarked(article);

                        return (
                          <article
                            key={article.url || idx}
                            className="news-card"
                            onClick={() => handleArticleClick(article)}
                          >
                            <div className="card-thumb-wrap">
                              <img
                                src={
                                  article.image ||
                                  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=80"
                                }
                                alt={article.title}
                                className="card-thumb-img"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=80";
                                }}
                              />
                              {article.source?.name && (
                                <span className="card-source-badge">
                                  {article.source.name}
                                </span>
                              )}
                              <button
                                type="button"
                                className={`card-bookmark-btn ${
                                  bookmarked ? "bookmarked" : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookmarkToggle(article);
                                }}
                                title={
                                  bookmarked
                                    ? "Remove bookmark"
                                    : "Save for later"
                                }
                                aria-label="Bookmark article"
                              >
                                <FontAwesomeIcon icon={faBookmark} />
                              </button>
                            </div>

                            <div className="card-body">
                              <div className="card-date-row">
                                <span>
                                  {article.publishedAt
                                    ? new Date(
                                        article.publishedAt
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })
                                    : "Recent"}
                                </span>
                                <span>·</span>
                                <span>3 min read</span>
                              </div>

                              <h4 className="card-title">{article.title}</h4>

                              {article.description && (
                                <p className="card-excerpt">
                                  {article.description}
                                </p>
                              )}

                              <div className="card-footer">
                                <span className="card-read-more">
                                  Read story{" "}
                                  <FontAwesomeIcon icon={faArrowRight} />
                                </span>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                </div>
              </div>
            </>
          )}
        </main>

        {/* RIGHT COLUMN: Weather + Calendar + Featured Blog Compact Widget */}
        <aside className="news-right-widgets">
          <Wheather />
          <Calender />
          {activeView === "news" && (
            <Blog onSelectArticle={handleArticleClick} compact={true} />
          )}
        </aside>
      </div>

      {/* ARTICLE READER MODAL */}
      <Newsmodel
        show={showArticleModal}
        article={selectedArticle}
        onclose={() => setShowArticleModal(false)}
        onbookmark={handleBookmarkToggle}
        isBookmarked={isArticleBookmarked(selectedArticle)}
        onShare={showToast}
      />

      {/* SAVED BOOKMARKS MODAL */}
      <Bookmark
        show={showBookmarkModal}
        bookmarks={bookmarks}
        onselectarticle={(article) => {
          setShowBookmarkModal(false);
          handleArticleClick(article);
        }}
        ondeletbookmark={handleBookmarkToggle}
        onclearall={handleClearAllBookmarks}
        onclose={() => setShowBookmarkModal(false)}
      />

      {/* FOOTER */}
      <footer className="newsfooter">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-brand-title">CHRONICLE</span>
            <span className="footer-tagline">
              Global Journalism · Independent Opinion · 24/7 Live Broadcast
            </span>
          </div>
          <div className="footer-right">
            <p>&copy; {new Date().getFullYear()} CHRONICLE. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default News;
