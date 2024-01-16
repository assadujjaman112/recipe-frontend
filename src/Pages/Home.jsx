import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: recipes } = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/recipe");
      return res.data;
    },
  });
  return (
    <div className="my-5 md:my-12 bg-slate-400 w-11/12 md:w-4/5 mx-auto px-8 py-12 rounded-lg">
      <h1 className="text-center text-white text-4xl mb-5 font-bold">
        All Recipes
      </h1>

      <div className="overflow-x-auto ">
        <table className="table table-zebra text-black">
          {/* head */}
          <thead className="text-black text-xl">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recipes?.map((recipe, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{recipe?.title}</td>
                <td><Link to={`/recipe/${recipe._id}`} className="btn btn-outline font-semibold">View Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
