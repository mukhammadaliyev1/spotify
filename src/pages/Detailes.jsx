import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../store/likeSlice";
import http from "../axios";

function Detailes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const likedTracks = useSelector((state) => state.likes);
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    http
      .get(`playlists/${id}`)
      .then((response) => {
        setPlaylist(response.data);
        setTracks(response.data.tracks.items);
      })
      .catch((error) => console.error("Error loading playlist:", error));
  }, [id]);

  const togglePlayPause = (trackUrl, track) => {
    if (audioRef.current.src === trackUrl && !audioRef.current.paused) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      if (audioRef.current.src !== trackUrl) {
        audioRef.current.src = trackUrl;
        setCurrentTrack(track);
      }
      audioRef.current.play();
      setPlaying(true);
    }
  };

  // Like/Unlike funksiyasi
  const handleLike = (trackId) => {
    dispatch(toggleLike(trackId));
  };

  if (!playlist) {
    return (
      <div className="text-center py-8 text-gray-300 text-2xl">Loading...</div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="flex items-center space-x-6 mb-8">
        {playlist.images && playlist.images[0] && (
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            className="w-56 h-56 object-cover rounded-md shadow-lg"
          />
        )}
        <div>
          <p className="uppercase text-sm font-semibold tracking-wider text-gray-400">
            Playlist
          </p>
          <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
          <p className="text-gray-300 text-sm max-w-lg">
            {playlist.description}
          </p>
          <p className="text-gray-400 mt-2">
            {playlist.owner?.display_name} • {playlist.tracks.total} songs
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {tracks.map((song, index) => (
          <div
            key={song?.track?.id}
            className="grid grid-cols-12 items-center p-2 rounded hover:bg-gray-800 transition duration-150"
          >
            <div className="col-span-1 text-gray-400 text-center">
              {index + 1}
            </div>
            <div className="col-span-10 flex items-center space-x-4">
              {song.track.album.images && song.track.album.images[0] && (
                <img
                  src={song.track.album.images[0].url}
                  alt={song.track.name}
                  className="w-12 h-12 rounded"
                />
              )}
              <div>
                <h3 className="font-medium text-lg text-white">
                  {song.track.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {song.track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
            <div className="col-span-1 text-gray-400 text-right">
              {Math.floor(song.track.duration_ms / 60000)}:
              {(
                "0" + Math.floor((song.track.duration_ms % 60000) / 1000)
              ).slice(-2)}
            </div>
            <div className="col-span-1 text-gray-400 text-right flex items-center space-x-4">
              <button
                onClick={() =>
                  togglePlayPause(song.track.preview_url, song.track)
                }
                className={`${
                  currentTrack?.id === song.track.id && playing
                    ? "text-green-500"
                    : "text-gray-400"
                } hover:text-white`}
              >
                {currentTrack?.id === song.track.id && playing
                  ? "Pause"
                  : "Play"}
              </button>
              <button
                onClick={() => handleLike(song.track.id)}
                className={`${
                  likedTracks.includes(song.track.id)
                    ? "text-red-500"
                    : "text-gray-400"
                } hover:text-white`}
              >
                {likedTracks.includes(song.track.id) ? "Unlike" : "Like"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

export default Detailes;
