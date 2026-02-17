import './newsmodel.css'

const Newsmodel = ({ onclose, article, show }) => {
  if (!show) {
    return null;
  }
  return (
    <>
      <div className="model-overlay">
        <div className="model-content">
          <span className="closebutton" onClick={onclose}>
            <i class="fa fa-close" aria-hidden="true"></i>
          </span>
          {article && (
            <>
              <img
                src={article.image}
                alt={article.title}
                className="model-image"
              />
              <h2 className="model-title">{article.title}</h2>
              <p className="model-source">Source: {article.source.name}</p>
              <p className="model-date">
                {new Date(article.publishedAt).toLocaleString("en-us", 
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
                  )}
              </p>
              <p className="model-contect-text">{article.content}</p>

              <a href={article.url} rel="noopener noreferrer" target="_blank" className="read-more-link">Read more</a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Newsmodel;
