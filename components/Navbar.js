import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import logo from "../assets/images/Logo.png";
function Navbar({ detailPage, refScroll, exercisesRef }) {
  const [notTrans, setNotTrans] = useState(false);
  const changeNavBg = () => {
    window.scrollY >= 90 ? setNotTrans(true) : setNotTrans(false);
  };
  useEffect(() => {
    console.log(window.scrollY);
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);
  return (
    <div onScroll={() => console.log(window.scrollY)}>
      <div
        className={` z-30 bg-transparent  navbar ${
          !detailPage && "fixed text-white "
        } ${notTrans && "bg-white shadow-lg text-gray-400"}`}
      >
        <div className="navbar-start">
          <img src={logo.src} alt="" className="w-16 h-16" />
        </div>
        <div className="navbar-end mr-6">
          <ul className="flex items-center justify-between md:w-1/2 w-full">
            <li className={`${!detailPage && "border-b-2 border-primary"}`}>
              <Link href={"/"}>Home</Link>
            </li>
            {refScroll ? (
              <li onClick={refScroll}>Exercises</li>
            ) : (
              <li className={`${detailPage && "border-b-2 border-primary"}`}>
                Exercises
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
