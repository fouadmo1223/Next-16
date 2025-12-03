"use client";

import Image from "next/image";
import { Button } from "./ui/button";

const ExploreBtn = () => {
  return (
    <Button
      id="explore-btn"
      className="w-fit px-10 group py-5 rounded-full mt-7 mx-auto "
      variant="outline"
    >
      <a href="#events" className="flex items-center">
        Explore Events
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 24"
          className="ml-2 text-white group-hover:text-black transition"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 18L12.5 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.20866 12.0001C5.20866 12.0001 10.5788 19 12.5003 19C14.4218 19 19.792 12 19.792 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </Button>
  );
};

export default ExploreBtn;
