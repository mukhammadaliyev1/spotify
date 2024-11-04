// import React, { useEffect, useState } from "react";
// import http from "../axios";
// import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

// function Home() {
//   const [cart, setCart] = useState([]);
//   const [top, setTop] = useState([]);
//   const [made, setMade] = useState([]);
//   const [recently, setRec] = useState([]);
//   const [jump, setJump] = useState([]);
//   const [unique, setUnique] = useState([]);

//   const [showAllTop, setShowAllTop] = useState(false);
//   const [showAllMade, setShowAllMade] = useState(false);
//   const [showAllRecently, setShowAllRecently] = useState(false);
//   const [showAllJump, setShowAllJump] = useState(false);
//   const [showAllUnique, setShowAllUnique] = useState(false);

//   useEffect(() => {
//     http
//       .get("/featured-playlists")
//       .then((data) => {
//         setCart(data.data.playlists.items.slice(0, 6));
//       })
//       .catch((error) => console.error("Error fetching playlists:", error));
//   }, []);

//   useEffect(() => {
//     http
//       .get("categories/toplists/playlists")
//       .then((data) => {
//         if (data.status === 200) {
//           setTop(data.data.playlists.items);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     http
//       .get("categories/0JQ5DAqbMKFHOzuVTgTizF/playlists")
//       .then((data) => {
//         if (data.status === 200) {
//           setMade(data.data.playlists.items);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     http.get("categories/0JQ5DAqbMKFQ00XGBls6ym/playlists").then((data) => {
//       if (data.status === 200) {
//         setRec(data.data.playlists.items);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     http.get("categories/0JQ5DAqbMKFLVaM30PMBm4/playlists").then((data) => {
//       if (data.status === 200) {
//         setJump(data.data.playlists.items);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     http.get("categories/0JQ5DAqbMKFCbimwdOYlsl/playlists").then((data) => {
//       if (data.status === 200) {
//         setUnique(data.data.playlists.items);
//       }
//     });
//   }, []);

//   const handleSeeAllToggle = (setter, toggleState) => {
//     setter(!toggleState);
//   };

//   const renderSection = (title, data, showAll, setShowAll) => (
//     <div className="flex flex-col my-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-white text-4xl font-bold">{title}</h1>
//         <p
//           className="cursor-pointer text-gray-300"
//           onClick={() => handleSeeAllToggle(setShowAll, showAll)}
//         >
//           {showAll ? "Show less" : "See all"}
//         </p>
//       </div>
//       <div className="flex flex-wrap gap-4 cursor-pointer">
//         {(showAll ? data : data.slice(0, 4)).map((item) => (
//           <div
//             className="flex items-center p-4 rounded-md bg-[#121212] w-[200px] text-white flex-col"
//             key={item.id}
//           >
//             {item.images && item.images.length > 0 && (
//               <img
//                 className="w-24 h-full mr-5 rounded"
//                 src={item.images[0].url}
//                 alt={item.name}
//               />
//             )}
//             <h1 className="text-white">{item.name}</h1>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <div className="h-[500px] w-[60vw] p-4 pt-5 bg-gradient-to-t mx-auto from-cyan-900 to-purple-800 container pl-10 pr-10">
//         <div className="flex flex-wrap gap-4 ml-4">
//           <FaCircleArrowLeft className="text-white text-2xl" />
//           <FaCircleArrowRight className="text-white text-2xl" />
//         </div>
//         <h1 className="mt-10 text-4xl text-white">Good afternoon</h1>

//         <div className="flex flex-wrap justify-between mt-10 cursor-pointer">
//           {cart.length > 0 &&
//             cart.map((song) => (
//               <div
//                 key={song.id}
//                 className="flex items-center bg-white/30 p-3 m-2 rounded-lg shadow-lg w-[45%] h-[80px]"
//               >
//                 {song.images && song.images.length > 0 && (
//                   <img
//                     className="w-16 h-full mr-5 rounded"
//                     src={song.images[0].url}
//                     alt={song.name}
//                   />
//                 )}
//                 <h1 className="text-white font-semibold text-xl">
//                   {song.name}
//                 </h1>
//               </div>
//             ))}
//         </div>
//       </div>

//       <div className="w-[60vw] mx-auto bg-black p-4">
//         {renderSection("Your top mixes", top, showAllTop, setShowAllTop)}
//         {renderSection("Made for You", made, showAllMade, setShowAllMade)}
//         {renderSection(
//           "Recently played",
//           recently,
//           showAllRecently,
//           setShowAllRecently
//         )}
//         {renderSection("Jump back in", jump, showAllJump, setShowAllJump)}
//         {renderSection(
//           "Uniquely yours",
//           unique,
//           showAllUnique,
//           setShowAllUnique
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate ni import qilamiz
import http from "../axios";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

function Home() {
  const navigate = useNavigate(); // navigate ni inicializatsiya qilamiz
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
    http.get("/featured-playlists").then((data) => {
      setCart(data.data.playlists.items.slice(0, 6));
    }).catch((error) => console.error("Pleylistsni olishda xato:", error));
  }, []);

  useEffect(() => {
    http.get("categories/toplists/playlists").then((data) => {
      if (data.status === 200) {
        setTop(data.data.playlists.items);
      }
    }).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http.get("categories/0JQ5DAqbMKFHOzuVTgTizF/playlists").then((data) => {
      if (data.status === 200) {
        setMade(data.data.playlists.items);
      }
    }).catch((err) => console.log(err));
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

  const handleSeeAllToggle = (setter, toggleState) => {
    setter(!toggleState);
  };

  const handleCartClick = (playlistId) => {

    navigate(`/playlists/${playlistId}`); 
  };

  const renderSection = (title, data, showAll, setShowAll) => (
    <div className="flex flex-col my-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-4xl font-bold">{title}</h1>
        <p
          className="cursor-pointer text-gray-300"
          onClick={() => handleSeeAllToggle(setShowAll, showAll)}
        >
          {showAll ? "Kamroq ko'rsat" : "Barchasini ko'rsat"}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 cursor-pointer">
        {(showAll ? data : data.slice(0, 4)).map((item) => (
          <div
            className="flex items-center p-4 rounded-md bg-[#121212] w-[200px] text-white flex-col"
            key={item.id}
            onClick={() => handleCartClick(item.id)} // Cartga bosilganda
          >
            {item.images && item.images.length > 0 && (
              <img
                className="w-24 h-full mr-5 rounded"
                src={item.images[0].url}
                alt={item.name}
              />
            )}
            <h1 className="text-white">{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="h-[500px] w-[60vw] p-4 pt-5 bg-gradient-to-t mx-auto from-cyan-900 to-purple-800 container pl-10 pr-10">
        <div className="flex flex-wrap gap-4 ml-4">
          <FaCircleArrowLeft className="text-white text-2xl" />
          <FaCircleArrowRight className="text-white text-2xl" />
        </div>
        <h1 className="mt-10 text-4xl text-white">Assalomu alaykum</h1>

        <div className="flex flex-wrap justify-between mt-10 cursor-pointer">
          {cart.length > 0 &&
            cart.map((song) => (
              <div
                key={song.id}
                className="flex items-center bg-white/30 p-3 m-2 rounded-lg shadow-lg w-[45%] h-[80px] cursor-pointer"
                onClick={() => handleCartClick(song.id)} // Cartga bosilganda
              >
                {song.images && song.images.length > 0 && (
                  <img
                    className="w-16 h-full mr-5 rounded"
                    src={song.images[0].url}
                    alt={song.name}
                  />
                )}
                <h1 className="text-white font-semibold text-xl">{song.name}</h1>
              </div>
            ))}
        </div>
      </div>

      <div className="w-[60vw] mx-auto bg-black p-4">
        {renderSection("Sizning eng yaxshi aralashmalaringiz", top, showAllTop, setShowAllTop)}
        {renderSection("Siz uchun tayyorlangan", made, showAllMade, setShowAllMade)}
        {renderSection("Yaqinda tinglanganlar", recently, showAllRecently, setShowAllRecently)}
        {renderSection("Qaytadan boshlash", jump, showAllJump, setShowAllJump)}
        {renderSection("O'ziga xos", unique, showAllUnique, setShowAllUnique)}
      </div>
    </div>
  );
}

export default Home;
