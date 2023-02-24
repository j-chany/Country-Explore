import React from "react";

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen relative text-white bg-vagrao-pink">
      <main className="flex-1 flex flex-col p-4">{children}</main>
    </div>
  );
};

export default Layout;
