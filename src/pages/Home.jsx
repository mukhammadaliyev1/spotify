import React, { useEffect, useState } from "react";
import http from "../axios";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

function Home() {
  const [cart, setCart] = useState([]);
  const [top, setTop] = useState([]);
  const [made, setMade] = useState([]);
  const [recently, setRec] = useState([]);
  const [jump, setJump] = useState([]);
  const [unique, setUnique] = useState([]);

  const [showAllTop, setShowAllTop] = useState(false);
  const [showAllMade, setShowAllMade] = useState(false);
  const [showAllRecently, setShowAllRecently] = useState(false);
  const [showAllJump, setShowAllJump] = useState(false);
  const [showAllUnique, setShowAllUnique] = useState(false);

  useEffect(() => {
    http
      .get("/featured-playlists")
      .then((data) => {
        setCart(data.data.playlists.items);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    http
      .get("categories/toplists/playlists")
      .then((data) => {
        if (data.status === 200) {
          setTop(data.data.playlists.items);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http
      .get("categories/0JQ5DAqbMKFHOzuVTgTizF/playlists")
      .then((data) => {
        if (data.status === 200) {
          setMade(data.data.playlists.items);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http.get("categories/0JQ5DAqbMKFQ00XGBls6ym/playlists").then((data) => {
      if (data.status === 200) {
        setRec(data.data.playlists.items);
      }
    });
  }, []);

  useEffect(() => {
    http.get("categories/0JQ5DAqbMKFLVaM30PMBm4/playlists").then((data) => {
      if (data.status === 200) {
        setJump(data.data.playlists.items);
      }
    });
  }, []);

  useEffect(() => {
    http.get("categories/0JQ5DAqbMKFCbimwdOYlsl/playlists").then((data) => {
      if (data.status === 200) {
        setUnique(data.data.playlists.items);
      }
    });
  }, []);

  const toggleShowAll = (section) => {
    switch (section) {
      case "top":
        setShowAllTop((prev) => !prev);
        break;
      case "made":
        setShowAllMade((prev) => !prev);
        break;
      case "recently":
        setShowAllRecently((prev) => !prev);
        break;
      case "jump":
        setShowAllJump((prev) => !prev);
        break;
      case "unique":
        setShowAllUnique((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const renderPlaylists = (data, showAll) => {
    const itemsToDisplay = showAll ? data : data.slice(0, 4);
    return itemsToDisplay.map((item) => (
      <div
        key={item.id}
        className="flex items-center bg-white/30 p-3 m-2 rounded-lg shadow-lg w-[45%] h-[80px]"
      >
        {item.images && item.images.length > 0 && (
          <img
            className="w-16 h-full mr-5 rounded"
            src={item.images[0].url}
            alt={item.name}
          />
        )}
        <h1 className="text-white font-semibold text-xl">{item.name}</h1>
      </div>
    ));
  };

  return (
    <div>
      <div className="h-[500px] w-[60vw] p-4 pt-5 bg-gradient-to-t mx-auto from-cyan-900 to-purple-800 container pl-10 pr-10">
        <div className="flex flex-wrap gap-4 ml-4">
          <FaCircleArrowLeft className="text-white text-2xl" />
          <FaCircleArrowRight className="text-white text-2xl" />
        </div>
        <h1 className="mt-10 text-4xl text-white">Good afternoon</h1>
        <div className="flex flex-wrap justify-between mt-10">
          {renderPlaylists(cart, true)}
        </div>
      </div>

      <div className="w-[60vw] mx-auto bg-black p-4">
        <div className="your top mixes">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-white text-4xl font-bold">Your top mixes</h1>
            <p
              className="cursor-pointer text-gray-300"
              onClick={() => toggleShowAll("top")}
            >
              {showAllTop ? "See less" : "See all"}
            </p>
          </div>
          {renderPlaylists(top, showAllTop)}
        </div>

        <div className="made for you">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-white text-4xl font-bold">Made for You</h1>
            <p
              className="cursor-pointer text-gray-300"
              onClick={() => toggleShowAll("made")}
            >
              {showAllMade ? "See less" : "See all"}
            </p>
          </div>
          {renderPlaylists(made, showAllMade)}
        </div>

        <div className="recently played">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-white text-4xl font-bold">Recently played</h1>
            <p
              className="cursor-pointer text-gray-300"
              onClick={() => toggleShowAll("recently")}
            >
              {showAllRecently ? "See less" : "See all"}
            </p>
          </div>
          {renderPlaylists(recently, showAllRecently)}
        </div>

        <div className="jump back in">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-white text-4xl font-bold">Jump back in</h1>
            <p
              className="cursor-pointer text-gray-300"
              onClick={() => toggleShowAll("jump")}
            >
              {showAllJump ? "See less" : "See all"}
            </p>
          </div>
          {renderPlaylists(jump, showAllJump)}
        </div>

        <div className="uniquely">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-white text-4xl font-bold">Uniquely yours</h1>
            <p
              className="cursor-pointer text-gray-300"
              onClick={() => toggleShowAll("unique")}
            >
              {showAllUnique ? "See less" : "See all"}
            </p>
          </div>
          {renderPlaylists(unique, showAllUnique)}
        </div>
      </div>
    </div>
  );
}

export default Home;
