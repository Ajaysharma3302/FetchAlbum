import { useEffect, useState } from "react";

function AlbumGallery() {
  const [album, setAlbum] = useState([]);
  const [newalbumTitle, setNewAlbumTitle] = useState("");
  useEffect(() => {
    async function fetchAlbum() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const albumList = await response.json();
        setAlbum(albumList);
        // console.log(albumList)
      } catch (error) {
        console.error("error in fetching", error);
      }
    }
    fetchAlbum();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newalbumTitle.trim()) return;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1, // Simulating userId (since the JSONPlaceholder API needs it)
            title: newalbumTitle,
          }),
        }
      );
      const newAlbum = await response.json(); // Get the added album data (with ID)

      // Add the new album at the top of the list
      setAlbum([newAlbum, ...album]); // Prepend the new album to the list

      // Clear the input field after submission
      setNewAlbumTitle("");
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };
  return (
    <div>
      <h1>Album Gallery</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="albumtitle"></label>
        <input
          id="albumtitle"
          value={newalbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
        />
        <button type="Submit">Add Album</button>
      </form>
      <div className="album-list">
        {album.map((item) => {
          return (
            <div key={item.id} className="album-card">
              <h4>{item.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default AlbumGallery;
