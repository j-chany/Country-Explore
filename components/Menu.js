import React from "react";

import styles from "../styles/home.module.css";

const Menu = () => {
  return (
    <main className="flex justify-center">
      <div className={styles.menu}>
        <h1 className="text-3xl font-bold">
          Get to Know the World: Explore Countries with Us!
        </h1>

        <div className="my-8 text-xl">
          Customize Your Layout: Choose Your Preferred Style
        </div>
        <div className="">
          <button className="px-4 py-2 rounded-lg bg-gray-200 font-medium duration-300 hover:bg-gray-300 mr-5">
            Regular
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-200 font-medium duration-300 hover:bg-gray-300 mr-5">
            Simple
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-200 font-medium duration-300 hover:bg-gray-300 mr-5">
            Compact
          </button>
        </div>
      </div>
    </main>
  );
};

export default Menu;
