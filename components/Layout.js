import React from "react";
const Layout = (props) => {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen relative text-match-blue bg-space  bg-cover ">
      <main className="flex-1 flex flex-col p-4">{children}</main>
    </div>
  );
};

export default Layout;
