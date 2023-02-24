export const CountryQuery = `
query CountryByCode($code: ID!) {
  country(code: $code) {
    emoji
    emojiU
    languages {
      name
    }
    name
    code
  }
}
`;

export const getAllContries = `query Query  {
    countries {
      code
      name
    }
  }
  `;

export const countryCodes = (data) => {
  const countryObj = {};
  for (const country of data) {
    countryObj[country["name"]] = country["code"];
  }

  return countryObj;
};
