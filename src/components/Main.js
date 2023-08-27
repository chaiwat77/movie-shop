import react, { useState, useEffect } from "react";
import Card from "./Card";
import "./style.css";

import axios from "axios";

let apiKey = "&api_key=9a1a179c9ffe34b404cd44daa06f8008";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + apiKey;

let arr = ["Popular", "Cinima", "Kids", "Drama", "Comedie"];
const Main = () => {
  const [movieData, setData] = useState([]);
  const [urlGroup, setUrlGroup] = useState(url);
  const [search, setSearch] = useState();

  useEffect(() => {
    loadData();
  }, [urlGroup]);

  const loadData = async () => {
    await axios
      .get(url)
      .then((res) => {
        setData(res.data.results);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(movieData);

  const getData = (movieType) => {
    if (movieType == "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + apiKey;
    }
    if (movieType == "Cinima") {
      url =
        base_url +
        "/discover/movie?primary_release_date.gte=2020-09-15&primary_release_date.lte=2022-12-31" +
        apiKey;
    }
    if (movieType == "Kids") {
      url =
        base_url +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        apiKey;
    }
    if (movieType == "Drama") {
      url =
        base_url +
        "/discover/movie?with_genres=18&primary_release_year=2023" +
        apiKey;
    }
    if (movieType == "Comedie") {
      url =
        base_url +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
        apiKey;
    }
    setUrlGroup(url);
  };

  const searchMovie = (event) => {
    if (event.key == "Enter") {
      url =
        base_url +
        "/search/movie?api_key=9a1a179c9ffe34b404cd44daa06f8008&query=" +
        search;
      setUrlGroup(url);
      setSearch(" ");
    }
  };

  return (
    <>
      <div className="header">
        <nav>
          <ul>
            {arr.map((nameGroup, id) => {
              return (
                <li>
                  <a
                    href="#"
                    key={id}
                    name={nameGroup}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {nameGroup}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="inputText"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyPress={searchMovie}
            ></input>
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        {movieData.length == 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movieData.map((movie, index) => {
            return <Card info={movie} key={index} />;
          })
        )}
      </div>
    </>
  );
};
export default Main;
