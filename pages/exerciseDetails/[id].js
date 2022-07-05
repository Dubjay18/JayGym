import React, { useState } from "react";
import {
  fetchData,
  defaultOptions,
  youtubeOptions,
} from "../../utils/fetchData";
import { useEffect } from "react";
import BodyPartImage from "../../assets/icons/body-part.png";
import TargetImage from "../../assets/icons/target.png";
import EquipmentImage from "../../assets/icons/equipment.png";
import Navbar from "../../components/Navbar";
import ExerciseVideos from "../../components/ExerciseVideos";
import SimilarExercises from "../../components/SimilarExercises";
function ExercisesDetails({ exerciseDetailData }) {
  const [exerciseDetail, setExerciseDetail] = React.useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  useEffect(() => {
    const youtubeSearchUrl =
      "https://youtube-search-and-download.p.rapidapi.com";

    setExerciseDetail(exerciseDetailData);

    const fetchExercisesData = async () => {
      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
        youtubeOptions
      );

      setExerciseVideos(exerciseVideosData.contents);
    };
    fetchExercisesData();
  }, []);
  useEffect(async () => {
    const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
    if (exerciseDetail) {
      const targetMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetail.target}`,
        defaultOptions
      );
      setTargetMuscleExercises(targetMuscleExercisesData);
      console.log(targetMuscleExercisesData, "targetMuscleExercisesData");
      const equimentExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetail.equipment}`,
        defaultOptions
      );
      setEquipmentExercises(equimentExercisesData);
    }
  }, [exerciseDetail]);
  const extraDetail = [
    {
      icon: BodyPartImage,
      name: exerciseDetail.bodyPart,
    },
    {
      icon: TargetImage,
      name: exerciseDetail.target,
    },
    {
      icon: EquipmentImage,
      name: exerciseDetail.equipment,
    },
  ];
  return (
    <div
      data-theme={"cupcake"}
      className={" bg-base-100 font-poppins min-h-screen overflow-x-hidden"}
    >
      <Navbar detailPage={true} />
      <div className="grid md:grid-cols-2 gap-4 mx-10 h-full ">
        <div>
          <img
            src={exerciseDetail.gifUrl}
            alt=""
            width={"100%"}
            height={"100%"}
            className="shadow rounded-lg"
          />
        </div>
        <div className="h-full">
          <h3 className="md:text-4xl text-2xl my-10 underline decoration-dashed decoration-accent">
            {exerciseDetail.name}
          </h3>
          <p>
            {" "}
            Exercises keep you strong.{" "}
            <span style={{ textTransform: "capitalize" }}>
              {exerciseDetail.name}
            </span>{" "}
            bup is one of the best <br /> exercises to target your{" "}
            {exerciseDetail.target}. It will help you improve your <br /> mood
            and gain energy.
          </p>
          {extraDetail?.map((item) => (
            <div key={item.name} className="flex items-center my-7">
              <button className="btn btn-accent rounded-md flex items-center justify-center min-h-[70px]">
                <img
                  src={item.icon.src}
                  alt={"bodyPart"}
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
              <p className="text-lg capitalize mx-3">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <ExerciseVideos vids={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </div>
  );
}

export default ExercisesDetails;
export const getServerSideProps = async ({ params }) => {
  let id = params.id;
  const exerciseDetailData = await fetchData(
    `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
    defaultOptions
  );
  return {
    props: {
      exerciseDetailData,
    },
  };
};
