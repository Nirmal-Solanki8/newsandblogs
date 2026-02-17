import { useEffect, useState } from "react";
import "./wheather.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faSnowflake,
  faCloudSunRain,
  faLocationDot,
  faCloudRain,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";

const Wheather = () => {
  const [data, setdata] = useState({});
  const [location, setlocation] = useState();

  useEffect(() => {
    const fetchdefaultlocation = async () => {
      const defaultlocation = "mumbai";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultlocation}&units=Metric&appid=77413786de9dfa3df7671dde978ac440`;
      const response = await axios.get(url);
      setdata(response.data);
    };
    fetchdefaultlocation();
  }, []);

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=77413786de9dfa3df7671dde978ac440`;
    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setdata({ notFound: true });
      } else {
        setdata(response.data);
        setlocation("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setdata({ notFound: true });
      } else {
        console.error("An Unexpected error occurred", error);
      }
    }
  };

  console.log(data.name);

  const handleinput = (e) => {
    setlocation(e.target.value);
  };
  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const getweathericon = (weathertype) => {
    switch (weathertype) {
      case "Clear":
        return <FontAwesomeIcon icon={faSun} size={60} color="#ffc87c" />;
      case "Clouds":
        return <FontAwesomeIcon icon={faCloud} size={60} color="#fff" />;
      case "Rain":
        return <FontAwesomeIcon icon={faCloudRain} size={60} color="#5fd1f9" />;
      case "Thunderstorm":
        return (
          <FontAwesomeIcon icon={faCloudSunRain} size={60} color="#154abd" />
        );
      case "Snow":
        return <FontAwesomeIcon icon={faSnowflake} size={60} color="#52e5e7" />;
      case "Haze":
      case "Mist":
        return <FontAwesomeIcon icon={faSun} size={60} color="yellow" />;
      default:
        return (
          <FontAwesomeIcon icon={faLocationDot} size={60} color="yellow" />
        );
    }
  };

  return (
    <>
      <div className="weather">
        <div className="search">
          <div className="search-top">
            <FontAwesomeIcon icon={faLocationDot} />
            <div className="location">{data.name}</div>
          </div>
          <div className="search-location">
            <input
              placeholder="Enter loction"
              onKeyDown={handlekeydown}
              type="text"
              value={location}
              onChange={handleinput}
            />
            <i class="fa fa-search" aria-hidden="true" onClick={search}></i>
          </div>
        </div>
        {data.notFound ? (
          <div className="notfound">Not Found</div>
        ) : (
          <div className="weather-data">
            {data.weather &&
              data.weather[0] &&
              getweathericon(data.weather[0].main)}
            <div className="weather-type">
              {data.weather ? data.weather[0].main : null}
            </div>
            <div className="temp">
              {data.main ? `${Math.floor(data.main.temp)}°` : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wheather;
