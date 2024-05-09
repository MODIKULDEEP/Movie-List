import NavHeader from "../components/NavHeader";
import CardContainer from "../components/cardContainer";
import { getMovie } from "../api/movieApis";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [orignalMovies, setOrignalMovies] = useState([]);
  const [FilterValues, setFilterValues] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = async () => {
    try {
      const movieData = await getMovie();
      if (movieData.success) {
        setLoading(false);
        setMovies(movieData.movies);
        setOrignalMovies(movieData.movies);
      } else {
        setLoading(false);
        toast.error(movieData.error.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
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
      <ToastContainer position="top-center" autoClose={3000} />
      <NavHeader />
      {loading ? (
        <h2 className="text-center text-purple-500 font-semibold py-2 px-4 rounded mx-auto pt-20">
          Loading Movie Data Please Wait...........
        </h2>
      ) : (
        <>
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
      )}
    </>
  );
}
