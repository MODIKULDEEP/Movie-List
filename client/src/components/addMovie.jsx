import { useEffect, useState } from "react";
import AddMovieButton from "./AddMovieButton";
import MovieDataPopup from "./MovieDataPopup";
import CardContainer from "./cardContainer";
import { getMovie } from "../api/movieApis";

export default function AddMovie() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = async () => {
    const movieData = await getMovie();
    console.log(movieData.movies);
    setMovies(movieData.movies);
  };

  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    getMovieData();
    setIsPopupOpen(false);
  };

  return (
    <div className="relative">
      <AddMovieButton onAddClick={handleAddClick} />
      <MovieDataPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
      <div className="container mx-auto pt-16 pb-16">
        <CardContainer edit={true} movies={movies} />
      </div>
    </div>
  );
}
