import PlayingNavigation from "../playingNavigation";
import React, { useEffect, useState } from "react";

import Header from "../header";
import SideBar from "../sideBar";

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [typePlaying, setTypePlaying] = useState("");
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    const result = localStorage.getItem("favoriteSongs");
    if (result) {
      try {
        setFavoriteSongs(JSON.parse(result));
      } catch (error) {
        console.error("Error parsing playlists from localStorage", error);
      }
    }
  }, []);
  return (
    <div className="w-full ">
      <Header />
      <div className="grid grid-cols-12 gap-4 my-3">
        <div className="col-span-3">
          <SideBar
            setTypePlaying={setTypePlaying}
            favoriteSongs={favoriteSongs}
            setFavoriteSongs={setFavoriteSongs}
            setCurrentSong={setCurrentSong}
          />
        </div>
        <div className="col-span-9 rounded-lg-important h-full-screen">
          {React.cloneElement(children, {
            setCurrentSong,
            setTypePlaying,
          })}
        </div>
      </div>
      <PlayingNavigation
        favoriteSongs={favoriteSongs}
        song={currentSong}
        type={typePlaying}
        setFavoriteSongs={setFavoriteSongs}
      />
    </div>
  );
}

export default DefaultLayout;
