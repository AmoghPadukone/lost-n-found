import React from "react";

import Posts from "../components/Posts/Posts";
import Footer from "../components/UI/Footer";
import Navbar from "../components/UI/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Posts />
      <Footer />
    </>
  );
};

export default Home;
