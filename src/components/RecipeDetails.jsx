import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data: recipe, refetch} = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/recipe/${id}`);
      return res.data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/recipe/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
    console.log(id);
  };
  return (
    <div className="flex justify-center mt-5 md:mt-10 w-11/12 md:w-3/5 mx-auto">
      <div className="bg-slate-400 px-6 py-10 rounded-lg w-full">
        <div className="w-full">
          <img src={recipe?.image} alt="" className="rounded-lg h-80 w-full" />
        </div>
        <div className="mt-5 text-zinc-950">
          <h1 className="font-semibold text-md">
            <span className="text-lg font-bold">Title : </span>
            {recipe?.title}
          </h1>
          <div className="flex gap-5">
            <span className="font-bold text-lg">Ingredients : </span>
            <ol>
              {recipe?.ingredients?.map((ingredient, i) => (
                <li key={i}>
                  {i + 1}. {ingredient.label}
                </li>
              ))}
            </ol>
          </div>
          <p className=" ">
            <span className="text-lg font-bold">Instructions : </span>
            {recipe?.instruction}
          </p>
        </div>
        <div className="flex gap-5 mt-5 w-11/12 mx-auto">
          <Link
            to={`/updateRecipe/${id}`}
            className="btn bg-stone-600 border-none hover:text-black text-white w-1/2"
          >
            Edit <FaEdit></FaEdit>
          </Link>
          <button
            onClick={() => handleDelete(id)}
            className="btn bg-stone-600 border-none hover:text-black text-white w-1/2"
          >
            Delete <FaTrashAlt></FaTrashAlt>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
