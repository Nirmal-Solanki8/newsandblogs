import { useState } from "react";
import "./blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenNib,
  faPlus,
  faXmark,
  faHeart,
  faClock,
  faUser,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

// Initial editorial blog posts
const DEFAULT_BLOGS = [
  {
    id: "blog-1",
    title: "Autonomous Agents & Spatial Computing in 2026",
    category: "Technology",
    author: "Nirmal Solanki",
    date: "Oct 6, 2026",
    readTime: "4 min read",
    likes: 42,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    content:
      "As artificial intelligence transitions from conversational interfaces into autonomous execution engines, our interaction paradigms with digital software are fundamentally shifting. Agents now synthesize multimodal contexts, orchestrate background development pipelines, and deliver real-time reactive experiences across multi-device surfaces.",
    isUserPost: false,
  },
  {
    id: "blog-2",
    title: "Minimalist Architecture: Living in Modern Tokyo",
    category: "Design",
    author: "Elena Rostova",
    date: "Oct 4, 2026",
    readTime: "6 min read",
    likes: 28,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
    content:
      "Space is a luxury in contemporary megacities. Tokyo architects have mastered the delicate balance between structural micro-density and emotional serenity. By manipulating negative space, indirect natural illumination, and raw cedar timber, urban dwellings achieve meditative peace amidst towering neon landscapes.",
    isUserPost: false,
  },
  {
    id: "blog-3",
    title: "The Neurochemistry of Deep Focus & Digital Detox",
    category: "Wellness",
    author: "Dr. Marcus Vance",
    date: "Sep 29, 2026",
    readTime: "5 min read",
    likes: 35,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    content:
      "Continuous algorithmic notifications fragment cognitive attention. Reclaiming sustained focus requires intentional periods of low-dopamine environments. We explore scientific evidence behind 48-hour digital detoxes and how baseline neuroplasticity responds to mindful solitude.",
    isUserPost: false,
  },
];

const PRESET_COVERS = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
];

const Blog = ({ onSelectArticle, compact = false }) => {
  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem("user_blogs");
      return saved ? JSON.parse(saved) : DEFAULT_BLOGS;
    } catch {
      return DEFAULT_BLOGS;
    }
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [author, setAuthor] = useState("Nirmal Solanki");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0]);

  const saveBlogs = (updated) => {
    setBlogs(updated);
    localStorage.setItem("user_blogs", JSON.stringify(updated));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: `blog-${Date.now()}`,
      title: title.trim(),
      category: category || "General",
      author: author.trim() || "Nirmal Solanki",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 60))} min read`,
      likes: 0,
      image: coverImage,
      content: content.trim(),
      isUserPost: true,
    };

    const updated = [newPost, ...blogs];
    saveBlogs(updated);

    // Reset Form
    setTitle("");
    setContent("");
    setShowCreateModal(false);
  };

  const handleDeletePost = (id) => {
    const updated = blogs.filter((b) => b.id !== id);
    saveBlogs(updated);
  };

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    const updated = blogs.map((b) => {
      if (b.id === id) {
        const currentlyLiked = likedPosts[id];
        return { ...b, likes: currentlyLiked ? b.likes - 1 : b.likes + 1 };
      }
      return b;
    });
    saveBlogs(updated);
  };

  const handleOpenBlogArticle = (b) => {
    if (onSelectArticle) {
      onSelectArticle({
        title: b.title,
        description: b.content.slice(0, 180) + "...",
        content: b.content,
        image: b.image,
        publishedAt: new Date().toISOString(),
        source: { name: b.author || "Editorial Blog" },
        url: "#",
      });
    }
  };

  // Compact Widget Mode for Right Panel
  if (compact) {
    return (
      <div className="blog-compact-widget">
        <div className="blog-compact-header">
          <div className="blog-compact-title-group">
            <FontAwesomeIcon icon={faPenNib} className="blog-accent-icon" />
            <h3 className="blog-compact-heading">Featured Blogs</h3>
          </div>
          <button
            type="button"
            className="blog-write-btn-compact"
            onClick={() => setShowCreateModal(true)}
            title="Write a blog post"
          >
            <FontAwesomeIcon icon={faPlus} /> Write
          </button>
        </div>

        <div className="blog-compact-list">
          {blogs.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="blog-compact-card"
              onClick={() => handleOpenBlogArticle(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="blog-compact-img"
              />
              <div className="blog-compact-details">
                <span className="blog-compact-category">{item.category}</span>
                <h4 className="blog-compact-title">{item.title}</h4>
                <div className="blog-compact-meta">
                  <span>{item.author}</span>
                  <span>·</span>
                  <span>{item.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Blog Modal */}
        {showCreateModal && (
          <CreateBlogModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreatePost}
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            author={author}
            setAuthor={setAuthor}
            content={content}
            setContent={setContent}
            coverImage={coverImage}
            setCoverImage={setCoverImage}
          />
        )}
      </div>
    );
  }

  // Full Feed Mode
  return (
    <div className="blog-full-section">
      <div className="blog-feed-header">
        <div>
          <span className="blog-feed-eyebrow">EDITORIAL OPINION & COMMUNITY</span>
          <h2 className="blog-feed-title">
            The <span>Journal</span>
          </h2>
          <p className="blog-feed-subtitle">
            Long-form essays, tech deep dives, cultural analysis, and personal stories.
          </p>
        </div>

        <button
          type="button"
          className="create-post-main-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <FontAwesomeIcon icon={faPenNib} />
          <span>Write a Post</span>
        </button>
      </div>

      <div className="blog-posts-grid">
        {blogs.map((item) => {
          const isLiked = likedPosts[item.id];

          return (
            <article
              key={item.id}
              className="blog-card"
              onClick={() => handleOpenBlogArticle(item)}
            >
              <div className="blog-card-media">
                <img src={item.image} alt={item.title} className="blog-card-img" />
                <span className="blog-card-tag">{item.category}</span>
                {item.isUserPost && (
                  <span className="blog-card-user-badge">Your Post</span>
                )}
              </div>

              <div className="blog-card-content">
                <div className="blog-author-row">
                  <span className="blog-author-name">
                    <FontAwesomeIcon icon={faUser} className="author-icon" />
                    {item.author}
                  </span>
                  <span className="blog-post-date">{item.date}</span>
                </div>

                <h3 className="blog-post-title">{item.title}</h3>
                <p className="blog-post-excerpt">
                  {item.content.slice(0, 150)}...
                </p>

                <div className="blog-card-footer">
                  <span className="blog-read-time">
                    <FontAwesomeIcon icon={faClock} /> {item.readTime}
                  </span>

                  <div className="blog-card-actions">
                    <button
                      type="button"
                      className={`blog-like-btn ${isLiked ? "liked" : ""}`}
                      onClick={(e) => handleLike(item.id, e)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{item.likes}</span>
                    </button>

                    {item.isUserPost && (
                      <button
                        type="button"
                        className="blog-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Delete this blog post?")) {
                            handleDeletePost(item.id);
                          }
                        }}
                        title="Delete post"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Create Blog Modal */}
      {showCreateModal && (
        <CreateBlogModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          author={author}
          setAuthor={setAuthor}
          content={content}
          setContent={setContent}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
        />
      )}
    </div>
  );
};

// Subcomponent: Create Blog Post Modal
const CreateBlogModal = ({
  onClose,
  onSubmit,
  title,
  setTitle,
  category,
  setCategory,
  author,
  setAuthor,
  content,
  setContent,
  coverImage,
  setCoverImage,
}) => {
  return (
    <div className="model-overlay" onClick={onClose}>
      <div
        className="model-content create-blog-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="closebutton"
          onClick={onClose}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="create-blog-header">
          <div className="create-blog-icon">
            <FontAwesomeIcon icon={faPenNib} />
          </div>
          <div>
            <h2 className="create-blog-title">Write New Article</h2>
            <p className="create-blog-subtitle">
              Publish your story to the community journal feed
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="create-blog-form">
          <div className="form-group">
            <label>Article Title</label>
            <input
              type="text"
              placeholder="e.g., The Future of Edge Computing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="blog-form-input"
            />
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="blog-form-select"
              >
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Wellness">Wellness</option>
                <option value="Science">Science</option>
                <option value="Culture">Culture</option>
              </select>
            </div>

            <div className="form-group">
              <label>Author Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="blog-form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Choose Cover Image</label>
            <div className="preset-cover-grid">
              {PRESET_COVERS.map((img, idx) => (
                <div
                  key={idx}
                  className={`preset-thumb-wrap ${coverImage === img ? "selected" : ""}`}
                  onClick={() => setCoverImage(img)}
                >
                  <img src={img} alt={`Preset ${idx + 1}`} className="preset-thumb" />
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Article Content</label>
            <textarea
              rows={6}
              placeholder="Write your article thoughts, narrative, or analysis here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="blog-form-textarea"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-post-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="publish-post-btn">
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blog;