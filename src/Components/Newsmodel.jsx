import "./newsmodel.css";
import "./model.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBookmark,
  faArrowUpRightFromSquare,
  faShareNodes,
  faCalendarDays,
  faBuilding,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Newsmodel = ({
  onclose,
  article,
  show,
  onbookmark,
  isBookmarked,
  onShare,
}) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onclose();
      }
    };
    if (show) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [show, onclose]);

  if (!show || !article) {
    return null;
  }

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(article.url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      if (onShare) onShare("Link copied to clipboard!");
    }
  };

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Just now";

  // Calculate estimated reading time (~200 words per minute)
  const textWords = (
    (article.title || "") +
    " " +
    (article.description || "") +
    " " +
    (article.content || "")
  ).split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(textWords / 60));

  return (
    <div className="model-overlay" onClick={onclose}>
      <div
        className="model-content news-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="closebutton"
          onClick={onclose}
          aria-label="Close article modal"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Hero Image Wrap */}
        <div className="article-modal-media">
          <img
            src={
              article.image ||
              "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80"
            }
            alt={article.title}
            className="article-modal-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80";
            }}
          />
          <div className="media-overlay-gradient"></div>
          {article.source?.name && (
            <span className="article-source-chip">
              <FontAwesomeIcon icon={faBuilding} /> {article.source.name}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="article-modal-body">
          {/* Metadata Row */}
          <div className="article-modal-meta">
            <span className="meta-item">
              <FontAwesomeIcon icon={faCalendarDays} className="meta-icon" />
              {formattedDate}
            </span>
            <span className="meta-separator">·</span>
            <span className="meta-item">
              <FontAwesomeIcon icon={faClock} className="meta-icon" />
              {readTime} min read
            </span>
          </div>

          <h2 className="article-modal-title">{article.title}</h2>

          {article.description && (
            <p className="article-modal-lead">{article.description}</p>
          )}

          <div className="article-modal-content-text">
            {article.content ? (
              <p>
                {article.content.replace(/\[\+\d+ chars\]$/, "")}
              </p>
            ) : (
              <p>
                The complete in-depth investigation and editorial coverage for
                this story is available directly via the official publication.
                Follow the link below to explore full reporting, context, and
                reactions.
              </p>
            )}
          </div>

          {/* Action Footer */}
          <div className="article-modal-actions">
            <div className="action-buttons-left">
              {article.url && (
                <a
                  href={article.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="read-original-btn"
                >
                  <span>Read Full Article</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
              )}

              {onbookmark && (
                <button
                  type="button"
                  className={`modal-action-btn ${isBookmarked ? "bookmarked" : ""}`}
                  onClick={() => onbookmark(article)}
                  title={isBookmarked ? "Remove Bookmark" : "Save Article"}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                  <span>{isBookmarked ? "Saved" : "Save"}</span>
                </button>
              )}

              <button
                type="button"
                className="modal-action-btn"
                onClick={handleShareClick}
                title="Share link"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faShareNodes} />
                <span>{copied ? "Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsmodel;
