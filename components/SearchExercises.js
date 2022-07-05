import React, { useEffect, useState } from "react";
import { fetchData, defaultOptions } from "../utils/fetchData";
import HorizontalScroll from "./HorizontalScroll";

function SearchExercises({ setExercises, bodyPart, setBodyPart }) {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        defaultOptions
      );

      if (bodyPartsData) {
        setBodyParts(["all", ...bodyPartsData]);
      }
    };
    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        defaultOptions
      );

      const searchedExercises = exerciseData?.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      console.log(searchedExercises);
      setSearch("");
      setExercises(searchedExercises);
    }
  };
  return (
    <div className="min-h-[50vh] pt-20 ">
      <h2 className="font-bold text-2xl flex justify-center mt-3">
        Awesome Exercises You Should Know
      </h2>
      <div className="w-full flex justify-center my-10">
        {" "}
        <form className="flex items-center mx-auto ">
          <input
            type="search"
            className="input rounded-none input-md border-2 border-accent focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <button
            className="btn btn-secondary rounded-none btn-md"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>
      <div className="relative w-[100%]">
        <HorizontalScroll
          data={bodyParts}
          bodyParts
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </div>
    </div>
  );
}

export default SearchExercises;
