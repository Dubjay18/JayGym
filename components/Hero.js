import Image from "next/image";
import React from "react";
import banner from "../assets/images/banner.png";
function Hero() {
  return (
    <div className="hero">
      {/* <div className="relative h-52 w-full">
        <Image src={banner} layout="fill" />
      </div> */}
      <div
        class="hero min-h-[110vh]"
        style={{ backgroundImage: `url(${banner.src})` }}
      >
        <div className="rounded-full left-11 h-52 w-52 absolute bg-accent opacity-40 animate-bounce"></div>
        <div className="rounded-full right-11 h-52 w-52 absolute bg-accent opacity-40 animate-bounce"></div>
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h3 class="mb-5  font-bold">Fitness Club</h3>
            <p class="mb-5 text-5xl">Sweat, Smile And Repeat</p>
            <p>Check out the most effective exercises</p>
            <button class="btn btn-primary">Explore exercises</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
