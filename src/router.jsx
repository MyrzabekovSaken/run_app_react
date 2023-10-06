import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Client from "@/pages/Client";
import Coach from "@/pages/Coach";
import Login from "@/pages/Login";
import Register from "@/pages/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/client",
    element: <Client />,
  },
  {
    path: "/coach",
    element: <Coach />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
