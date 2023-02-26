// dynamic render layouts/color base on 3 unique page routes
export const getLayout = (router, styles) => {
  switch (router.pathname) {
    case "/regular":
      return styles.layout1;
    case "/simple":
      return styles.layout2;
    case "/color":
      return styles.layout3;
    default:
      return styles.layout1;
  }
};

// anytime we need to generate a list of data we can reuse this function 

