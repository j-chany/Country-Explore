import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GraphQLClient } from "graphql-request";
import styles from "../styles/hero.module.css";
import InfoContainer from "./infoContainer";
import { useForm } from "react-hook-form";
import { countryCodes, getAllContries, CountryQuery } from "@/service/query";
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

  // state variable to store all country codes
  const [codes, setCodes] = useState(null);
  // query for every country code and name and store all of it in codes variable
  useEffect(() => {
    client
      .request(getAllContries)
      .then((data) => {
        setCodes(countryCodes(data.countries));
      })
      .catch((e) => console.error(e));
  }, []);

  // state variable to store the query data
  const [queryData, setQueryData] = useState("");

  const handleSearch = (data) => {
    // If user inputs 2 letter, we assum its country code so we capitlize it else we will cap only first letter
    let cleanData;
    if (data.country.length == 2) {
      cleanData = data.country.toUpperCase();
    } else {
      cleanData =
        data.country.charAt(0).toUpperCase() +
        data.country.substring(0).slice(1).toLowerCase();
    }
    if (!(cleanData in codes) && !Object.values(codes).includes(cleanData)) {
      // return error if the input is not a valid code or country name
      console.log(Object.values(codes).includes(cleanData));
      console.log(cleanData);
      console.log(Object.values(codes));
    } else if (Object.values(codes).includes(cleanData)) {
      // if user have entered a code we will query for the data
      console.log("ENTERED CODE");
      console.log(cleanData);
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
        .then((data) => console.log(data.country));
    }
  };

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

      <form
        className="flex items-stretch w-10/12"
        onSubmit={handleSubmit(handleSearch)}
      >
        <input
          type="text"
          placeholder="Select a country!"
          className="text-slate-900 text-base sm:text-3xl outline-none p-3 flex-1"
          {...register("country", { required: true })}
          aria-invalid={errors.country ? "true" : "false"}
        ></input>
        <button
          type="submit"
          className="w-fit px-4 text-base font-bold   bg-pink-700 "
        >
          <i className="text-2xl fa-solid fa-magnifying-glass duration-300 hover:text-3xl "></i>
        </button>
      </form>
      <InfoContainer queryData={queryData} />
      
      {queryData && <div>{codes.Andorra}</div>}
    </div>
  );
};

export default Hero;
