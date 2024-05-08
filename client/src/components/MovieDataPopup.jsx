import { useState } from "react";

export default function MovieDataPopup({ isOpen, onClose }) {
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSave = () => {
    // Implement save functionality here
    console.log("Saving movie:", { movieName, description, image });
    // Clear form fields after saving
    setMovieName("");
    setDescription("");
    setImage("");
    // Close the popup
    onClose();
  };

  const handleCancel = () => {
    // Clear form fields
    setMovieName("");
    setDescription("");
    setImage("");
    // Close the popup
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
        <div className="mb-4">
          <label htmlFor="movieName" className="block mb-1">
            Movie Name:
          </label>
          <input
            type="text"
            id="movieName"
            value={movieName}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1">
            Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className="mr-4 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
