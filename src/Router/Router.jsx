import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AddRecipe from "../Pages/AddRecipe";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout> ,
      children : [
        {
            path : "/",
            element : <Home></Home>
        },
        {
            path : "/addRecipe",
            element :<AddRecipe></AddRecipe>
        }
      ]
    },
  ]);

export default router;