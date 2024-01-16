import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/recipe").then((res) => {
      setAllRecipes(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.search.value;
    const searchedRecipe = allRecipes?.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setAllRecipes(searchedRecipe);
  };

  return (
    <div className="my-5 md:my-12 bg-slate-400 w-11/12 md:w-4/5 mx-auto px-8 py-12 rounded-lg">
      <h1 className="text-center text-white text-4xl mb-5 font-bold">
        All Recipes
      </h1>
      <form onSubmit={handleSearch} action="" className="my-5 w-3/5 mx-auto">
        <input
          type="text"
          name="search"
          id=""
          placeholder="Search...."
          className="py-2 pl-3  rounded-l-lg w-4/5"
        />
        <input
          type="submit"
          value="Search"
          className=" px-5 py-2 bg-gray-800 hover:cursor-pointer rounded-r-lg text-white"
        />
      </form>

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
            {allRecipes?.map((recipe, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{recipe?.title}</td>
                <td>
                  <Link
                    to={`/recipe/${recipe._id}`}
                    className="btn btn-outline font-semibold"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
