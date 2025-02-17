import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MemberSearch from "./components/MemberSearch";
import MemberInsert from "./components/MemberInsert";
import MemberEdit from "./components/MemberEdit";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <MemberSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insert"
          element={
            <ProtectedRoute>
              <MemberInsert />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <MemberEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
