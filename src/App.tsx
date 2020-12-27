import React, { FC, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./rootReducer/rootReducer";
import "./App.css";
import DiaryEntriesList from "./component/DiaryEntryList";

const Auth = lazy(() => import("./features/auth/Auth"));
const Home = lazy(() => import("./features/home/Home"));

const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Suspense fallback={<p>Loading...</p>}>
            {isLoggedIn ? <Home /> : <Auth />}
          </Suspense>
        </Route>
        <Route
          path="diary/:id"
          element={isLoggedIn ? <DiaryEntriesList /> : <Auth />}
        />
      </Routes>
    </Router>
  );
};

export default App;
