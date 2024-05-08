import MovieCard from "./MovieCard";

export default function CardContainer() {
  const movies = [
    {
      id: 1,
      image: "../src/assets/images/watcher.jpeg",
      movieName: "test",
      description:
        "dkbfvilasuedgisdfgbyviusdghvbilsudfhjvisudfhbiukgvbhduikkgbhviukk",
    },
    {
      id: 2,
      image: "../src/assets/images/watcher.jpeg",
      movieName: "test",
      description:
        "dkbfvilasuedgisdfgbyviusdghvbilsudfhjvisudfhbiukgvbhduikkgbhviukk",
    },
    {
      id: 3,
      image: "../src/assets/images/watcher.jpeg",
      movieName: "test",
      description:
        "dkbfvilasuedgisdfgbyviusdghvbilsudfhjvisudfhbiukgvbhduikkgbhviukk",
    },
    {
      id: 4,
      image: "../src/assets/images/watcher.jpeg",
      movieName: "test",
      description:
        "dkbfvilasuedgisdfgbyviusdghvbilsudfhjvisudfhbiukgvbhduikkgbhviukk",
    },
    {
      id: 5,
      image: "../src/assets/images/watcher.jpeg",
      movieName: "test",
      description:
        "dkbfvilasuedgisdfgbyviusdghvbilsudfhjvisudfhbiukgvbhduikkgbhviukk",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} />
      ))}
    </div>
  );
}
