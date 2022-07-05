import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import Head from "next/head";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useStateValue } from "../stateProvider";
import headIcon from "../svgs/he2.svg";
import ogIcon from "../svgs/logoj.svg";
import { SocialIcon } from "react-social-icons";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";

export default function Home() {
  const [{ darkmode }, dispatch] = useStateValue();
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  async function AlertDismissible(words, error) {
    if (!error) {
      toast.success(words, {
        position: "top-right",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(words, {
        position: "top-right",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div
      data-theme={"cupcake"}
      className={" overflow-hidden bg-base-100 font-poppins"}
    >
      <Head>
        <title>Dev-Jay</title>
        <link rel="icon" href={headIcon.src} sizes="16x16 32x32" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
        <meta property="og:title" content="Jay's Gym" />
        <meta property="og:description" content="Get to work" />

        <meta property="og:image" content={ogIcon} />
      </Head>

      <div className="min-h-screen bg-base-100">
        <Navbar />
        <Hero />
        <SearchExercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
        <Exercises
          exercises={exercises}
          setExercises={setExercises}
          bodyPart={bodyPart}
        />
      </div>
    </div>
  );
}
