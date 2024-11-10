import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../../store/likeSlice";

function Likes() {
  const likedTracks = useSelector((state) => state.likes);
  const dispatch = useDispatch();

  const handleToggleLike = (track) => {
    dispatch(toggleLike(track));
  };

  if (!likedTracks || likedTracks.length === 0) {
    return <div className="text-center py-8 text-gray-300 text-2xl">No liked songs found.</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Liked Songs</h1>
      <div className="space-y-4">
        {likedTracks.map((track, index) => (
          <div
            key={track.id}
            className="grid grid-cols-12 items-center p-2 rounded hover:bg-gray-800 transition duration-150"
          >
            <div className="col-span-1 text-gray-400 text-center">{index + 1}</div>
            <div className="col-span-10 flex items-center space-x-4">
              {track.album?.images?.[0]?.url ? (
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="w-12 h-12 rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div>
                <h3 className="font-medium text-lg text-white">{track.name}</h3>
                <p className="text-gray-400 text-sm">
                  {track.artists?.map((artist) => artist.name).join(", ") || "Unknown Artist"}
                </p>
              </div>
            </div>
            <div className="col-span-1 text-gray-400 text-right">
              {Math.floor(track.duration_ms / 60000)}:
              {("0" + Math.floor((track.duration_ms % 60000) / 1000)).slice(-2)}
            </div>
            <div className="col-span-1 text-gray-400 text-right space-x-2">
              <button
                onClick={() => handleToggleLike(track)}
                className="text-red-500 hover:text-white"
              >
                Unlike
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Likes;
