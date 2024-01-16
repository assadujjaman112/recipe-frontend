import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AddRecipe from "../Pages/AddRecipe";
import RecipeDetails from "../components/RecipeDetails";
import UpdateRecipe from "../components/UpdateRecipe";


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
        },
        {
          path : "/recipe/:id",
          element : <RecipeDetails></RecipeDetails>,
          loader : ({params})=> fetch(`http://localhost:5173/recipe/${params.id}`)
        },
        {
          path : "/updateRecipe/:id",
          element : <UpdateRecipe></UpdateRecipe>,
          loader : ({params}) => fetch(`http://localhost:5173/recipe/${params.id}`)
        }
      ]
    },
  ]);

export default router;