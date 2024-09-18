import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import LandingPageForm from "./components/LandingPage/LandingPageForm";
import TrackerPage from "./components/TrackerPage/TrackerPage";
import "./index.css";
import store from "./redux/Store";
import reportWebVitals from "./reportWebVitals";

if (window.Cypress) {
  window.store = store;
}


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPageForm />,
      },
      {
        path: "/tracker",
        element: <TrackerPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
