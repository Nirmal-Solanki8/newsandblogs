import "./model.css";
import "./bookmark.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faXmark,
  faTrashCan,
  faArrowUpRightFromSquare,
  faFolderOpen,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useMemo } from "react";

const Bookmark = ({
  show,
  bookmarks = [],
  onclose,
  onselectarticle,
  ondeletbookmark,
  onclearall,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookmarks = useMemo(() => {
    if (!searchTerm.trim()) return bookmarks;
    const term = searchTerm.toLowerCase();
    return bookmarks.filter(
      (b) =>
        b.title?.toLowerCase().includes(term) ||
        b.source?.name?.toLowerCase().includes(term) ||
        b.description?.toLowerCase().includes(term)
    );
  }, [bookmarks, searchTerm]);

  if (!show) {
    return null;
  }

  return (
    <div className="model-overlay" onClick={onclose}>
      <div
        className="model-content bookmark-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bookmark-modal-header">
          <div className="bookmark-title-group">
            <div className="bookmark-icon-badge">
              <FontAwesomeIcon icon={faBookmark} />
            </div>
            <div>
              <h2 className="bookmark-heading">Saved Articles</h2>
              <p className="bookmark-subheading">
                {bookmarks.length} {bookmarks.length === 1 ? "story" : "stories"} bookmarked for later
              </p>
            </div>
          </div>

          <button
            type="button"
            className="bookmark-close-btn"
            onClick={onclose}
            aria-label="Close bookmarks"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Search within bookmarks & Clear all */}
        {bookmarks.length > 0 && (
          <div className="bookmark-tools-row">
            <div className="bookmark-search-wrap">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="bm-search-icon" />
              <input
                type="text"
                placeholder="Filter saved stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bookmark-search-input"
              />
            </div>

            {onclearall && (
              <button
                type="button"
                className="bookmark-clear-all-btn"
                onClick={() => {
                  if (window.confirm("Remove all saved bookmarks?")) {
                    onclearall();
                  }
                }}
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Bookmark List / Empty State */}
        <div className="bookmark-list">
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((article, index) => (
              <div
                className="bookmark-item"
                key={article.url || article.title || index}
                onClick={() => {
                  if (onselectarticle) onselectarticle(article);
                }}
              >
                <div className="bookmark-thumb-wrap">
                  <img
                    src={article.image || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80"}
                    alt={article.title || "News"}
                    className="bookmark-thumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80";
                    }}
                  />
                  {article.source?.name && (
                    <span className="bookmark-source-tag">
                      {article.source.name}
                    </span>
                  )}
                </div>

                <div className="bookmark-info">
                  <h3 className="bookmark-item-title">{article.title}</h3>
                  <div className="bookmark-meta-row">
                    <span className="bookmark-date">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "Recent"}
                    </span>
                    <span className="bookmark-dot">·</span>
                    <span className="bookmark-read-action">
                      Read article <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="delete-button"
                  title="Remove from bookmarks"
                  aria-label="Remove bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (ondeletbookmark) ondeletbookmark(article);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            ))
          ) : (
            <div className="bookmark-empty-state">
              <div className="empty-icon-wrap">
                <FontAwesomeIcon icon={faFolderOpen} />
              </div>
              <h3 className="empty-title">
                {searchTerm ? "No matching bookmarks" : "Your reading list is empty"}
              </h3>
              <p className="empty-desc">
                {searchTerm
                  ? "Try searching for a different keyword or topic."
                  : "Tap the bookmark icon on any headline or story to save it here for later reading."}
              </p>
              {!searchTerm && (
                <button
                  type="button"
                  className="browse-news-btn"
                  onClick={onclose}
                >
                  Explore Top Stories
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
