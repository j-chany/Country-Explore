import React, { useState } from "react";
import styles from "../styles/container.module.css";
import { getLayout } from "@/service/utils";

const InfoContainer = (props) => {
  const { name, emoji, emojiU, languages, states } = props.queryData;
  const { router } = props;

  const genInfo = (data, styling) => {
    let list = [];

    for (let ele of data) {
      list.push(<span className={`${styles[styling]}`}>{ele.name}</span>);
    }
    return list;
  };
  const [show, setShow] = useState(5);
  const pathname = `${router.pathname}`;
  console.log(pathname);
  return (
    <>
      <div
        className={` ${styles.base} ${getLayout(
          router,
          styles
        )} text-sm md:text-xl lg:text-2xl w-full font-bold`}
      >
        <span>{name}</span>

        <span>{emojiU}</span>

        <span>
          Languages : <span>{genInfo(languages, "languages")}</span>
        </span>
        <span>
          {" "}
          {!states.length ? (
            <div>State: This country does not have states, try another one</div>
          ) : (
            <div className="flex w-full h-full flex-wrap items-center	 ">
              <div className="mr-5">States : </div>
              <div className="gap-2 flex flex-wrap items-center	">
                {genInfo(states, "states").slice(0, `${show}`)}
              </div>
              {pathname == "/simple" ? (
                <div className="mt-5">
                  {" "}
                  Please use a different view to see all states
                </div>
              ) : (
                <>
                  <button
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold mx-2 my-2 py-2 px-2 rounded"
                    onClick={() => {
                      if (show <= 54) setShow(show + 5);
                    }}
                  >
                    More
                  </button>
                  <button
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold mx-2 my-2 py-2 px-2 rounded"
                    onClick={() => {
                      if (show > 5) setShow(show - 5);
                    }}
                  >
                    Less
                  </button>
                </>
              )}
            </div>
          )}
        </span>
        <p className="flex ">
          <span className="duratio:300 hover:scale-150 text-9xl">{emoji}</span>
        </p>
      </div>
    </>
  );
};

export default InfoContainer;
