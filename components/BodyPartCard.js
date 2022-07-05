import React from "react";

function BodyPartCard({ item, setBodyPart, bodyPart }) {
  return (
    <div
      className={`card bg-base-200 py-10 px-20 w-52 mx-10 flex items-center shadow justify-center transition-all cursor-pointer duration-300 my-10 ${
        bodyPart === item &&
        " border-secondary scale-110 shadow-lg rounded-none border-t-2 "
      }`}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <h3>{item}</h3>
    </div>
  );
}

export default BodyPartCard;
