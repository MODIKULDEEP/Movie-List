import { deleteMovie } from "../api/movieApis";

const url = import.meta.env.VITE_BACKEND_APP_URI;
export default function MovieCard({ movie, edit }) {
  const deleteMovieData = async (id) => {
    const deletedMovie = await deleteMovie(id);
    console.log(deletedMovie);
  };
  console.log(movie);
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={`${url}/image/${movie.movie_photo}`}
          alt={movie.movieName}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movie.movieName}
          </h5>
        </a>
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
              // type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
