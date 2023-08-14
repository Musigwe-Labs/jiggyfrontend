import React from "react";
import HomeFooter from "../../public/home/homeFooter";

export const Wrapper = (Component) => {
  return (
    <>
      <main className="mb-12">
        <Component />
      </main>
      <HomeFooter />
    </>
  );
};
