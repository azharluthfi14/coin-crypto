import { RouterProvider } from "react-router-dom";
import router from "./router";

export default function App() {
  return (
    <div className="dark:bg-dark-900 overflow-y-hidden h-full">
      <RouterProvider router={router} />
    </div>
  );
}
