import NavHeader from "../components/NavHeader";
import CardContainer from "../components/cardContainer";
import { getMovie } from "../api/movieApis";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [orignalMovies, setOrignalMovies] = useState([]);
  const [FilterValues, setFilterValues] = useState(null);
  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = async () => {
    const movieData = await getMovie();
    console.log(movieData.movies);
    setMovies(movieData.movies);
    setOrignalMovies(movieData.movies);
  };

  // search filter
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setMovies(orignalMovies);
    } else {
      const filterResult = orignalMovies.filter((item) => {
        const lowercaseValue = e.target.value.toLowerCase();
        return (
          (item.movieName &&
            item.movieName.toLowerCase().includes(lowercaseValue)) ||
          (item.description &&
            item.description.toLowerCase().includes(lowercaseValue))
        );
      });
      setMovies(filterResult);
    }
    setFilterValues(e.target.value);
  };

  return (
    <>
      <NavHeader />
      <div className="container mx-auto pt-20">
        <input
          type="text"
          id="Search"
          name="Search"
          placeholder="Type To Search"
          value={FilterValues}
          onChange={handleFilter}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>
      <div className="container mx-auto pt-8 pb-16">
        <CardContainer edit={false} movies={movies} />
      </div>
    </>
  );
}
