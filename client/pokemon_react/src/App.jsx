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
import Type from "./pages/Type";
import "./App.css"

function App() {
 const router = createBrowserRouter([
  {
    path: 'pokemon/:tier/meta',
    element: <Tier>Add</Tier>,
  },
  {
    path: 'pokemon/:tier/:name',
    element: <Pokemon />,
  },
  {
    path: 'pokemon/:tier/types/:type',
    element: <Type />,
  },
  {
    path: 'pokemon/:tier',
    element: <Pokemon />,
  },
  {
    path: 'add',
    element: <div>Add</div>,
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
}


export default App
