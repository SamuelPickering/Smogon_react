import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Pokemon from "./pages/Pokemon"
import Add from "./pages/Add"
import Tier from "./pages/Tier"

function App() {
 const router = createBrowserRouter([
  {
    path: "pokemon/:tier/:name",
    element: (
       <Pokemon></Pokemon>
     
    ),
  },
  {
    path: "add",
    element: <div>Add</div>,
  },
  {
    path: "pokemon/:tier",
    element: <Tier>Add</Tier>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
}


export default App
