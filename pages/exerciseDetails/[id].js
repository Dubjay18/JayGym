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
import { SocialIcon } from "react-social-icons";
import Head from "next/head";
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
      <Head>
        <title>JayGym</title>
        <meta
          name="description"
          content="A site that recommends exercises that will change your life."
        />

        <meta property="og:url" content="https://jay-gym.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="JayGym" />
        <meta
          property="og:description"
          content="A site that recommends exercises that will change your life."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dubinx/image/upload/v1657130338/Screenshot_2022-07-06_185551_lp0opc.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="jay-gym.vercel.app" />
        <meta property="twitter:url" content="https://jay-gym.vercel.app/" />
        <meta name="twitter:title" content="JayGym" />
        <meta
          name="twitter:description"
          content="A site that recommends exercises that will change your life."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dubinx/image/upload/v1657130338/Screenshot_2022-07-06_185551_lp0opc.jpg"
        />
      </Head>
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
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            className="inline-block fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="font-bold">
            Buitl by{" "}
            <a
              href="https://Jayfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-accent text-lg font-black"
            >
              Dev-jay
            </a>
          </p>
          <p>Copyright © 2022 - All right reserved</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <div>
              <SocialIcon
                url="https://github.com/Dubjay18/"
                fgColor="black"
                bgColor="transparent"
              />
            </div>
            <div>
              <SocialIcon
                url="https://www.linkedin.com/in/oluwayanfunmi-jeje-a023b2210/"
                fgColor="black"
                bgColor="transparent"
              />
            </div>
            <div>
              <SocialIcon
                url="https://twitter.com/@YanfunmiJ"
                fgColor="black"
                bgColor="transparent"
              />
            </div>
          </div>
        </div>
      </footer>
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
