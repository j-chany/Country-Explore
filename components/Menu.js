import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/home.module.css";

const Menu = () => {
  // create router object
  const router = useRouter();

  // on each buton click, redirect to the new route which will be passed in according to the button
  const handleClick = (route) => {
    router.push(`/${route}`);
  };

  return (
    <main className="flex justify-center mt-10 ">
      <div className={styles.menu}>
        <h1 className="text-3xl font-bold">
          Get to Know the World: Explore Countries with Us!
        </h1>

        <div className="my-8 text-xl">
          Customize Your Layout: Choose Your Preferred Style
        </div>
        <div className="">
          <button
            className="px-4 py-2 rounded-lg bg-slate-200 font-medium duration-300 hover:bg-gray-300 mr-5"
            onClick={() => handleClick("regular")}
          >
            Regular
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-orange-300 font-medium duration-300 hover:bg-orange-400 mr-5"
            onClick={() => handleClick("simple")}
          >
            Simple
          </button>
          <button
            className="px-4 py-2 rounded-lg text-black bg-rose-400 font-medium duration-300 hover:bg-rose-500  mr-5"
            onClick={() => handleClick("color")}
          >
            Color
          </button>
        </div>
      </div>
    </main>
  );
};

export default Menu;
