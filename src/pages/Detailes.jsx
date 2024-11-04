import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../axios";

function Detailes() {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Playlist tracklarini olish uchun to'g'ri endpoint
    http
      .get(`playlists/${id}/tracks`) 
      .then((response) => {
        console.log(response.data);
        setSongs(response.data.items); // Tracklarni olish
      })
      .catch((error) => console.error("Xatolik:", error));
  }, [id]);

  return (
    <div>
      <h1 className="text-4xl">Playlist</h1>
      <div>
        {songs.map((song) => (
          <div key={song.track.id}>
            <h2>{song.track.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detailes;
