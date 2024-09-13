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
    <div className="w-full">
      <Header />
      <div className="grid grid-cols-12 gap-4 md:my-3 max-[639px]:mt-14 max-[768px]:mt-2">
        <div className="min-[200px]:col-span-12 lg:col-span-3 bg-dark-secondary rounded-lg max-[1023px]:h-max h-full-screen-lg overflow-y-scroll scrollable-content">
          <SideBar
            setTypePlaying={setTypePlaying}
            favoriteSongs={favoriteSongs}
            setFavoriteSongs={setFavoriteSongs}
            setCurrentSong={setCurrentSong}
          />
        </div>
        <div className="min-[200px]:col-span-12 lg:col-span-9 rounded-lg-important">
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
