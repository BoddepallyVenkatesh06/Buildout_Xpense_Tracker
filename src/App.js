import { Toaster } from "react-hot-toast";
import React from "react";
import { Outlet } from "react-router";
import "./App.css";


function App() {
  // random comment

  return (
    <div className="App">
      <h1 className="app-title">xTracker</h1>
      <Outlet />
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#FFF",
            color: "#000",
            fontWeight: "600",
          },
        }}
      />
    </div>
  );
}

export default App;
