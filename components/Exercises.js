import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { fetchData, defaultOptions } from "./../utils/fetchData";
import ReactPaginate from "react-paginate";

function Exercises({ exercises, bodyPart, setExercises, Data, exercisesRef }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(16);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          defaultOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          defaultOptions
        );
      }

      setExercises(exercisesData);
    };
    console.log(currentExercises);

    fetchExercisesData();
  }, [bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (event) => {
    setCurrentPage(event.selected + 1);

    window.scrollTo({ top: 1250, behavior: "smooth" });
  };

  if (!currentExercises.length)
    return (
      <div className="flex justify-center items-center min-h-16">
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div className="min-h-[80vh] mx-4 exercise" ref={exercisesRef}>
      <h1 className="text-base-content my-7 text-lg">Showing results</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {currentExercises.map((e, i) => {
          return <ExerciseCard key={i} item={e} />;
        })}
      </div>
      <div className="flex items-center justify-center">
        {exercises.length > 16 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={paginate}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(exercises.length / exercisesPerPage)}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            initialPage={currentPage}
            className="btn-group  my-10"
            previousLinkClassName="btn btn-outline btn-primary"
            nextLinkClassName="btn btn-outline btn-primary"
            activeLinkClassName="btn btn-active btn-primary"
            pageLinkClassName="btn btn-outline btn-primary"
          />
        )}
      </div>
    </div>
  );
}

export default Exercises;
export const getServerSideProps = async (context) => {
  let Data = await fetchData(
    "https://exercisedb.p.rapidapi.com/exercises",
    defaultOptions
  );
  return {
    props: {
      Data,
    },
  };
};
