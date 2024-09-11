import AlbumList from "../pages/abbumListPage";
import HomePage from "../pages/homePage";
import ListSongs from "../pages/listSongPage";
import Login from "../pages/loginPage";
import Notfound from "../pages/notFoundPage";
import SearchPage from "../pages/searchPage";
import ViewAllItems from "../pages/viewAllPage";

const userRoutes = [
  {
    path: "/",
    component: HomePage,
    isDefaultLayout: true,
  },
  {
    path: "/search/:txtSearch",
    component: SearchPage,
    isDefaultLayout: true,
  },
  {
    path: "/albums",
    component: AlbumList,
    isDefaultLayout: true,
  },
  {
    path: "/playlist/:type/:id",
    component: ListSongs,
    isDefaultLayout: true,
  },
  {
    path: "/viewAll/:listName",
    component: ViewAllItems,
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
