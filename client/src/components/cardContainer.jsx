import { useEffect, useState } from "react";
import { deleteMovie, updateMovie } from "../api/movieApis";
import Pagination from "./Pagination";

const url = import.meta.env.VITE_BACKEND_APP_URI;

export default function CardContainer({ edit, movies = [], onClose }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!movieName || !description) {
      alert("Please Fill All Data");
      return;
    }
    const movieData = { movieName, description, id: editMovie._id };

    try {
      const data = await updateMovie(movieData);
      // Clear form fields after saving
      setMovieName("");
      setDescription("");
      handleClosePopup(); // Close the popup
      onClose();
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleCancel = () => {
    // Clear form fields
    setMovieName("");
    setDescription("");
    handleClosePopup(); // Close the popup
  };
  const deleteMovieData = async (id) => {
    const deletedMovie = await deleteMovie(id);
    onClose();
  };
  const handleEditClick = (movieId) => {
    console.log("Edit button clicked for movie ID:", movieId);
    const movieById = movies.find((m) => m._id === movieId);
    console.log("Movie to edit:", movieById);
    setEditMovie(movieById);
    setMovieName(movieById.movieName);
    setDescription(movieById.description);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {}, [editMovie]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {movies.length === 0 ? (
        <h2 className="text-center text-purple-500 font-semibold py-2 px-4 rounded">
          No Movies avialable
        </h2>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg"
                  src={`${url}/image/${movie.movie_photo}`}
                  alt={movie.movieName}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {movie.movieName}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {movie.description}
                  </p>
                  {edit ? (
                    <div className="flex">
                      <button
                        id={movie._id}
                        onClick={(e) => deleteMovieData(e.target.id)}
                        className="mr-4 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                      <button
                        id={movie._id}
                        onClick={(e) => handleEditClick(e.target.id)}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {isPopupOpen ? (
              <div key={editMovie} className={`fixed inset-0 z-50`}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSave}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
                >
                  <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
                  <div className="mb-4">
                    <label htmlFor="movieName" className="block mb-1">
                      Movie Name:
                    </label>
                    <input
                      type="text"
                      id="movieName"
                      value={movieName}
                      required
                      onChange={(e) => setMovieName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block mb-1">
                      Description:
                    </label>
                    <textarea
                      id="description"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleCancel}
                      className="mr-4 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
          <Pagination
            itemsPerPage={moviesPerPage}
            totalItems={movies.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
}
