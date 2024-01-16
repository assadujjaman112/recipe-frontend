import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";

const UpdateRecipe = () => {
  const [ingredients, setIngredients] = useState();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (selectedIngredient) => {
    setSelectedIngredients(selectedIngredient);
  };
  const onSubmit = (data) => {
    const recipe = {
      title: data.title,
      instruction: data.instruction,
      image: data.image,
      ingredients: selectedIngredients,
    };
    axios.patch(`http://localhost:5000/recipe/${id}`, recipe).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Successfully updated a recipe!",
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
    fetch("/ingredients.json")
      .then((res) => res.json())
      .then((data) => setIngredients(data));
  }, []);
  return (
    <div className="mt-5 md:mt-8 lg:mt-12 w-11/12  md:w-4/5 mx-auto bg-slate-400 p-5 md:p-8 rounded-lg">
      <h1 className="text-center text-4xl mb-5 font-bold">Update Recipe</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 mb-2">
          <div className="w-1/2">
            <label className="label">
              <span className="label-text">Recipe Title</span>
            </label>
            <input
              placeholder="Recipe Title"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-700 mt-1 font-semibold">
                Title is Required
              </p>
            )}
          </div>
          <div className="w-1/2">
            <label className="label">
              <span className="label-text">Recipe Instruction</span>
            </label>
            <input
              placeholder="Recipe Instruction"
              {...register("instruction", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.instruction && (
              <p className="text-red-700 mt-1 font-semibold">
                Instruction is Required
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-1/2">
            <label className="label">
              <span className="label-text">Recipe Image URL</span>
            </label>
            <input
              placeholder=" Image URL"
              {...register("image", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.image && (
              <p className="text-red-700 mt-1 font-semibold">
                Instruction is Required
              </p>
            )}
          </div>
          <div className="w-1/2">
            <label className="label">
              <span className="label-text">Recipe Ingredients</span>
            </label>
            <Select
              required
              options={ingredients}
              value={selectedIngredients}
              onChange={handleChange}
              isMulti={true}
            ></Select>
          </div>
        </div>

        <input
          type="submit"
          value="Update Recipe"
          className="btn btn-block mt-5 bg-zinc-700 border-none text-white"
        />
      </form>
    </div>
  );
};

export default UpdateRecipe;
