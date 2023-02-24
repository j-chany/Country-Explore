import React, { useState } from "react";
import { useRouter } from "next/router";
import { GraphQLClient } from "graphql-request";
import styles from "../styles/hero.module.css";
import InfoContainer from "./infoContainer";
import { useForm } from "react-hook-form";

const Hero = () => {
  // initialize form variables
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // set up Nextjs router
  const router = useRouter();
  // dynamic render layouts/color base on 3 unique page routes
  const getLayout = () => {
    switch (router.pathname) {
      case "/regular":
        return styles.layout1;
      case "/simple":
        return styles.layout2;
      case "/compact":
        return styles.layout3;

      default:
        return styles.layout1;
    }
  };
  // configure endpoint for GraphQL
  const endpoint = "https://countries.trevorblades.com/graphql";
  const client = new GraphQLClient(endpoint);

  const [searchFor, setSerachFor] = useState("");

  const [queryData, setQueryData] = useState("");
  return (
    <div className={`${styles.hero} ${getLayout()}`}>
      <div className="flex text-3xl text-white justify-between items-center w-full">
        <h1>
          {router.pathname.substring(1).charAt(0).toUpperCase() +
            router.pathname.substring(1).slice(1)}{" "}
          View
        </h1>
        <button type="button" onClick={() => router.push("/")}>
          <i className="fa-solid fa-xmark duration-300 hover:scale-125"></i>
        </button>
      </div>

      <form className="flex items-stretch w-10/12">
        <input
          type="text"
          placeholder="Select a country!"
          className="text-slate-900 text-base sm:text-3xl outline-none p-3 flex-1"
          {...register("searchfor", { required: true })}
          aria-invalid={errors.searchfor ? "true" : "false"}
        ></input>
        <button
          type="submit"
          className="w-fit px-4 text-base font-bold duration-300 hover:scale-105  bg-pink-700 "
        >
          <i className="text-2xl fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <InfoContainer />
    </div>
  );
};

export default Hero;
