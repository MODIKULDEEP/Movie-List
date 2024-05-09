import NavHeader from "../components/NavHeader";
import Banner from "../components/Banner";
import CardContainer from "../components/cardContainer";
import { getMovie } from "../api/movieApis";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = async () => {
    const movieData = await getMovie();
    console.log(movieData.movies);
    setMovies(movieData.movies);
  };
  return (
    <>
      <NavHeader />
      <div className="container mx-auto pt-20">
        {/* <Banner /> */}
        <CardContainer edit={false} movies={movies} />
      </div>
    </>
  );
}
