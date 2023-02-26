import React from "react";

const InfoContainer = (props) => {
  const { name, emoji, emojiU, languages } = props.queryData;
  // replace the link so we can use it as background
  const imgLink = emojiU.replaceAll("U+", "/").replace(/\s/g, "");

  const genLang = () => {
    let languageList = [];

    for (let language of languages) {
      languageList.push(<span className="mx-2">{language.name}</span>);
    }

    console.log(languageList);
    return languageList;
  };
  return (
    <>
      <div className="text-xl gap-3 font-bold flex flex-col items-start w-full">
        <p>Name : {name}</p>

        <p>Unicode URL : {emojiU}</p>
        <p>Languages : {genLang()}</p>
      </div>
      <p className="flex ">
        <span className="duratio:300 hover:scale-150 text-9xl">
          {emoji}
        </span>
      </p>
    </>
  );
};

export default InfoContainer;
