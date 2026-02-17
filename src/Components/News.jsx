import "./news.css";
import userimg from "../assets/image/WhatsApp Image 2026-01-09 at 5.39.16 PM.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import Newsmodel from "./Newsmodel";
import "../Components/model.css";
import Bookmark from "./Bookmark";
import Wheather from "./Wheather";
import Calender from "./Calender";
// import './model.css '

const categories = [
  "General",
  "World",
  "Bussiness",
  "Technology",
  "Entertinment",
  "Sports",
  "Science",
  "Health",
  "Nation",
];
const News = () => {
  const [headline, setHeadline] = useState();
  const [News, setnews] = useState(null);
  const [catesearch, setcatesearch] = useState("general");
  const [searchinput, setsearchinput] = useState("");
  const [searchquery, setsearchquery] = useState("");
  const [showmodel, setshowmodel] = useState(false);
  const [selectarticle, setselectarticle] = useState(false);
  const [bookmarks, setbookmarks] = useState([]);
  const [showbookmarkmodel, setshowbookmarkmodel] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${catesearch}&lang=en&apikey=fec4d3686fd7f1616eeded058bb2f855`;

      if (searchquery) {
        url = `https://gnews.io/api/v4/search?q=${searchquery}&lang=en&apikey=fec4d3686fd7f1616eeded058bb2f855`;
      }

      const response = axios.get(url);
      const filterresp = (await response).data.articles;
      setHeadline(filterresp[0]);
      console.log(filterresp);
      setnews(filterresp.slice(1, 7));

      const savedbookmarks = JSON.parse(localStorage.getItem("bookmark")) || [];
      setbookmarks(savedbookmarks);
    };
    fetchdata();
  }, [catesearch, searchquery]);

  const handelcatesearch = (e, category) => {
    e.preventDefault();

    setcatesearch(category.toLowerCase());
  };

  const handelinput = (e) => {
    e.preventDefault();
    setsearchquery(searchinput);
    setsearchinput("");
  };
  const handelarticleclick = (article) => {
    setselectarticle(article);

    setshowmodel(true);
  };
  const handelbookmarkclicked = (article) => {
    setbookmarks((prebookmarks) => {
      const updatebookmark = prebookmarks.find(
        (bookmark) => bookmark.title === article.title,
      )
        ? prebookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prebookmarks, article];
      localStorage.setItem("bookmark", JSON.stringify(updatebookmark));
      return updatebookmark;
    });
  };

  return (
    <>
      <div className="news">
        <header className="news-header">
          <h1 className="logo">News and Blogs</h1>
          <div className="searchbar">
            <form action="" onSubmit={handelinput}>
              <input
                type="text"
                value={searchinput}
                onChange={(e) => setsearchinput(e.target.value)}
                placeholder="Search news...."
              />
              <button type="submit">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </header>
        <div className="news-content">
          <div className="navbar">
            <div className="user">
              <img src={userimg} alt="a" />
              <p>Nirmal Solanki</p>
            </div>
            <nav className="categories">
              <h1 className="nav-heading">Categories</h1>
              <div className="nav-links">
                {categories.map((category) => (
                  <a
                    href="#"
                    key={category}
                    onClick={(e) => handelcatesearch(e, category)}
                    className="nav-link"
                  >
                    {category}
                  </a>
                ))}
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => setshowbookmarkmodel(true)}
                >
                  Bookmark <i class="fa fa-bookmark" aria-hidden="true"></i>
                </a>
              </div>
            </nav>
          </div>
          <div className="news-section">
            {headline && (
              <div
                className="headlines"
                onClick={() => handelarticleclick(headline)}
              >
                <img src={headline.image || "noImg"} alt={headline.title} />
                <h2 className="headline-title">
                  {headline.title}
                  <i
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === headline.title,
                      )
                        ? "fa fa-bookmark bookmark"
                        : "fa fa-bookmark-o bookmark"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handelbookmarkclicked(headline);
                    }}
                  ></i>
                </h2>
              </div>
            )}
            <div className="grid">
              {News ? 
                News.map((curnews, curindex) => (
                  <div
                    key={curindex}
                    className="grid-item"
                    onClick={() => handelarticleclick(curnews)}
                  >
                    <img src={curnews.image} alt="No image"></img>
                    <h3>
                      {curnews.title}
                      <i
                        className={`${
                          bookmarks.some(
                            (bookmark) => bookmark.title === curnews.title,
                          )
                            ? "fa fa-bookmark bookmark"
                            : "fa fa-bookmark-o bokmark"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handelbookmarkclicked(curnews);
                        }}
                      ></i>
                    </h3>
                  </div>
                )) : 
                <h3 className="error">Please check your network !</h3>
              }
            </div>
          </div>
          <Newsmodel
            show={showmodel}
            article={selectarticle}
            onclose={() => setshowmodel(false)}
          />
          <Bookmark
            show={showbookmarkmodel}
            bookmark={bookmarks}
            onselectarticle={handelarticleclick}
            ondeletbookmark={handelbookmarkclicked}
            onclose={() => setshowbookmarkmodel(false)}
          />
        <div className="myblog">myblog</div>
        <div className="wheather-calender">
          <Wheather />
          <Calender />
        </div>
        </div>

        <footer className="newsfooter">
          <p>
            <span>News & blogs App</span>
          </p>
          <p>&copy; All Right reserved. by Code And Create</p>
        </footer>
      </div>
    </>
  );
};

export default News;
