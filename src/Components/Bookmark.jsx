import "./model.css";
import "./bookmark.css";

const Bookmark = ({
  show,
  bookmarks,
  onclose,
  onselectarticle,
  ondeletbookmark,
}) => {
  if (!show) {
    return null;
  }
  return (
    <>
      <div className="model-overlay">
        <div className="model-content">
          <sapn className="closebutton" onClick={onclose}>
            <i class="fa fa-close" aria-hidden="true"></i>
          </sapn>
          <h2 className="bookmark-heading">Bookmarked News</h2>
          <div className="bookmark-list">
            {bookmarks.map((article, index) => (
              <div
                className="bookmark-item"
                key={index}
                onClick={onselectarticle(article)}
              >
                <img src={article.image || "No image"} alt={"no img"} />
                <h3>{article.title}</h3>
                <sapn
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    ondeletbookmark(article);
                  }}
                >
                  <i class="fa fa-close" aria-hidden="true"></i>
                </sapn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
