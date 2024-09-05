import Header from "../header";
import SideBar from "../sideBar";
import PlayingNavigation from "../playingNavigation";

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  return (
    <div className="w-full ">
      <Header />
      <div className="grid grid-cols-12 gap-4 my-3">
        <div className="col-span-3">
          <SideBar />
        </div>
        <div className="col-span-9 rounded-lg-important h-full-screen">
          <div>{children}</div>
        </div>
      </div>
      <PlayingNavigation />
    </div>
  );
}

export default DefaultLayout;
