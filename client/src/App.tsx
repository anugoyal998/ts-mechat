import React from "react";

import useRefresh from "./hooks/useRefresh";
import useAuth from "./states/useAuth";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  const auth = useAuth((state) => state.auth);
  useRefresh();

  return (
    <Routes>
      <Route
        path="/"
        element={auth.isAuth ? <Chat /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!auth.isAuth ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!auth.isAuth ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/settings"
        element={
          auth.isAuth ? <Settings /> : <Navigate to="/?redirect_to=settings" />
        }
      />
    </Routes>
  );
};

export default App;
