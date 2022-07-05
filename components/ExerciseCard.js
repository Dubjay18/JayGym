import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
function ExerciseCard({ item, similar }) {
  const router = useRouter();
  const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  // if (!item) {
  //   return (
  //     <div className="flex justify-center items-center min-h-16">
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }
  useEffect(() => {
    console.log(item, "item");
  }, []);
  return (
    <div
      className={`card w-auto border-t-2 border-accent bg-base-100 shadow-xl ${
        similar && "w-72 mx-5"
      }`}
      onClick={() => router.push(`/exerciseDetails/${item?.id}`)}
    >
      <figure className={`relative w-full h-[500px] ${similar && "w-72 h-72"}`}>
        {item?.gifUrl && (
          <Image
            src={item?.gifUrl}
            layout="fill"
            className={`
        hover:opacity-75 duration-700 ease-in-out rounded-lg cursor-pointer
        grayscale-0 blur-0 scale-100`}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(700, 475)
            )}`}
            alt="Shoes"
          />
        )}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{item?.name}</h2>
        <div className="card-actions">
          <div className="btn btn-primary">{item?.bodyPart}</div>
          <div className="btn btn-secondary">{item?.target}</div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
