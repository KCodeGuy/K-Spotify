import AlbumList from "../pages/abbumListPage";
import HomePage from "../pages/homePage";
import ListSongs from "../pages/listSongPage";
import Login from "../pages/loginPage";
import Notfound from "../pages/notFoundPage";

const userRoutes = [
  {
    path: "/",
    component: HomePage,
    isDefaultLayout: true,
  },
  {
    path: "/albums",
    component: AlbumList,
    isDefaultLayout: true,
  },
  {
    path: "/songs",
    component: ListSongs,
    isDefaultLayout: true,
  },
  {
    path: "/login",
    component: Login,
    isDefaultLayout: false,
  },
  {
    path: "*",
    component: Notfound,
    isDefaultLayout: false,
  },
];
export { userRoutes };
