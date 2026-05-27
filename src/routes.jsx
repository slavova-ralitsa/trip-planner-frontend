import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/create-trip", element: <CreateTrip /> },
      { path: "/login", element: <Login /> }, 
    ],
  },
]);