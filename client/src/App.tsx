import React from "react";

import useRefresh from "./hooks/useRefresh";
import useAuth from "./states/useAuth";

import { Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

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
    </Routes>
  );
};

export default App;
