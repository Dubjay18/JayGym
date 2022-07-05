import React from "react";
import HorizontalScroll from "./HorizontalScroll";
HorizontalScroll;
function SimilarExercises({ targetMuscleExercises, equipmentExercises }) {
  return (
    <div className="mt-10">
      <p className="font-bold text-lg my-9">
        Similar <span className="text-primary">Target Muscle</span> exercises
      </p>
      <p className="flex relative p-2 overflow-x-scroll">
        {targetMuscleExercises.length !== 0 ? (
          <HorizontalScroll data={targetMuscleExercises} />
        ) : (
          <div className="flex justify-center items-center min-h-16">
            <h1>Loading...</h1>
          </div>
        )}
      </p>
      <p s>
        Similar <span className="text-primary">Equipment</span> exercises
      </p>
      <div className="flex relative p-2 overflow-x-scroll">
        {equipmentExercises.length !== 0 ? (
          <HorizontalScroll data={equipmentExercises} />
        ) : (
          <div className="flex justify-center items-center min-h-16">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SimilarExercises;
