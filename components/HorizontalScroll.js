import React, { useContext, useRef } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import BodyPartCard from "./BodyPartCard";
import ExerciseCard from "./ExerciseCard";
function HorizontalScroll({ data, bodyParts, setBodyPart, bodyPart }) {
  const scrool = useRef();
  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
      <div
        onClick={() => {
          scrollPrev();
          console.log(scrollPrev);
        }}
        className="right-arrow btn btn-circle btn-ghost"
      >
        <ArrowLeftIcon
          onClick={() => scrollPrev()}
          className="w-7 text-primary cursor-pointer"
        />
      </div>
    );
  };
  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);

    return (
      <div className="left-arrow btn btn-circle btn-ghost">
        <ArrowRightIcon
          onClick={() => {
            scrool.current.scrollIntoView({
              left: scrool.current.scrollX + 100,
              behavior: "smooth",
            });
            console.log(scrool.current.scrollX);
          }}
          className="w-7 text-primary cursor-pointer"
        />
      </div>
    );
  };
  return (
    <div className="">
      <div className="py-10 flex overflow-x-auto" ref={scrool}>
        {data &&
          data?.map((e, i) => {
            return (
              <div key={`${e}${i}`} itemID={`${e}${i}`} title={`${e}${i}`}>
                {bodyParts ? (
                  <BodyPartCard
                    item={e}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart}
                  />
                ) : (
                  <>
                    <ExerciseCard item={e} similar />
                  </>
                )}
              </div>
            );
          })}
      </div>
      <RightArrow />
    </div>
  );
}

export default HorizontalScroll;
