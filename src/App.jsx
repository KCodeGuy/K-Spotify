import "./App.css";
import "./assets/base/base.scss";
import DefaultLayout from "./components/defaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { userRoutes } from "./routes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {userRoutes.map((route, index) => {
            const RouteComponent = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.isDefaultLayout ? (
                    <DefaultLayout>
                      <RouteComponent />
                    </DefaultLayout>
                  ) : (
                    <RouteComponent />
                  )
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
