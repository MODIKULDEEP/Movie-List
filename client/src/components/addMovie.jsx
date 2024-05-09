import { useEffect, useState } from "react";
import AddMovieButton from "./AddMovieButton";
import MovieDataPopup from "./MovieDataPopup";
import CardContainer from "./cardContainer";
import { getMovie } from "../api/movieApis";

export default function AddMovie() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    getMovieData();
    setIsPopupOpen(false);
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
    <div className="relative">
      <AddMovieButton onAddClick={handleAddClick} />
      <input
        type="text"
        id="Search"
        name="Search"
        placeholder="Type To Search"
        value={FilterValues}
        onChange={handleFilter}
        className="border border-gray-300 rounded px-4 py-2"
      />
      <MovieDataPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
      <div className="container mx-auto pt-16 pb-16">
        <CardContainer edit={true} movies={movies} onClose={handleClosePopup} />
      </div>
    </div>
  );
}
