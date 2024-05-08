import { useState } from "react";
import AddMovieButton from "./AddMovieButton";
import MovieDataPopup from "./MovieDataPopup";

export default function AddMovie() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative">
      <AddMovieButton onAddClick={handleAddClick} />
      <MovieDataPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}
