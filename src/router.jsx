import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

import IndexPage from "./pages/IndexPage";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/:coinId",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
