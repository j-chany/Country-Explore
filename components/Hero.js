import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GraphQLClient } from "graphql-request";
import styles from "../styles/hero.module.css";
import InfoContainer from "./infoContainer";
import { useForm } from "react-hook-form";
import { countryCodes, getAllContries, CountryQuery } from "@/service/query";
import { getLayout } from "@/service/utils";

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

  // configure endpoint for GraphQL
  const endpoint = "https://countries.trevorblades.com/graphql";
  const client = new GraphQLClient(endpoint);

  // state variable to store all country codes
  const [codes, setCodes] = useState(null);
  // state variable to store the query data
  const [queryData, setQueryData] = useState("");
  // if error, we will print an error message
  const [error, setError] = useState(false);

  // query for every country code and name and store all of it in codes variable
  useEffect(() => {
    client
      .request(getAllContries)
      .then((data) => {
        setCodes(countryCodes(data.countries));
      })
      .catch((e) => console.error(e));
  }, []);

  // show error message for only 3.5s
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3500);
  }, [error]);

  const handleSearch = (data) => {
    // If user inputs 2 letter, we assum its country code so we capitlize it else we will cap only first letter
    let cleanData;
    if (data.country.length == 2) {
      cleanData = data.country.toUpperCase();
    } else {
      // edge case is countries like 'Hong Kong' or 'Bosnia and Herzegovina' where its split into 2 or more words
      let cleaning = data.country.split(" ");
      cleaning = cleaning
        .map((el) => {
          if (el !== "and")
            return (
              el.charAt(0).toUpperCase() +
              el.substring(0).slice(1).toLowerCase()
            );
          else return el;
        })
        .join(" ");
      cleanData = cleaning;
    }
    if (!(cleanData in codes) && !Object.values(codes).includes(cleanData)) {
      // return error if the input is not a valid code or country name
      setError(true);
    } else if (Object.values(codes).includes(cleanData)) {
      // if user have entered a code we will query for the data
      const variables = {
        code: cleanData,
      };
      client.request(CountryQuery, variables).then((data) => {
        setQueryData(data.country);
      });
    } else if (cleanData in codes) {
      // if user enter a valid name, we find the right country code and query it
      const code = codes[cleanData];
      const variables = {
        code,
      };
      client
        .request(CountryQuery, variables)
        .then((data) => setQueryData(data.country));
    }
    reset();
  };

  return (
    <div className={`${styles.hero} ${getLayout(router, styles)}`}>
      <div className="flex text-sm md:text-2xl lg:text-5xl justify-between items-center w-full">
        <h1 className="font-bold w-full">Learn Something New Everyday!</h1>
        <button type="button" onClick={() => router.push("/")}>
          <i className="fa-solid fa-xmark duration-300 hover:scale-150 hover:text-red-600"></i>
        </button>
      </div>

      <form
        className="flex items-stretch w-10/12"
        onSubmit={handleSubmit(handleSearch)}
      >
        <input
          type="text"
          placeholder="Select a country!"
          className="text-slate-900 text-base md:text-3xl lg:text-4xl text-sm outline-none p-3 flex-1 w-full"
          {...register("country", { required: true })}
          aria-invalid={errors.country ? "true" : "false"}
        ></input>
        <button
          type="submit"
          className="w-fit px-4 text-base font-bold bg-pink-700  "
        >
          <i className="text-2xl fa-solid fa-magnifying-glass duration-300 hover:text-3xl "></i>
        </button>
      </form>
      {errors.country?.type === "required" && (
        <p className="text-2xl text-vagrao-pink animate-pulse " role="alert">
          We need something to work with
        </p>
      )}
      {error && (
        <div className="text-2xl text-vagrao-pink animate-pulse ">
          {" "}
          Please enter valid country code or check your spelling{" "}
        </div>
      )}
      {queryData && <InfoContainer router={router} queryData={queryData} />}
    </div>
  );
};

export default Hero;
