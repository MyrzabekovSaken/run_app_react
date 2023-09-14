import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Client from "@/pages/Client";
import Coach from "@/pages/Coach";


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
]);

export default router;
