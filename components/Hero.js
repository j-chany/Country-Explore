import React from "react";
import { useRouter } from "next/router";
import { GraphQLClient } from "graphql-request";
import styles from "../styles/hero.module.css";

const Hero = () => {
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

  return (
    <div className={`${styles.hero} ${getLayout()}`}>
      <h1>Hero Component</h1>
    </div>
  );
};

export default Hero;
