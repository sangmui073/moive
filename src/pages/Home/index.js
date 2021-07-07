import React, { memo, useLayoutEffect, useRef, useState } from "react";
import "swiper/swiper.scss";
import Header from "../../components/Display/Header";
import Pages from "../../components/Display/Lazyload"


import { useStyles } from "./style"

function Home() {
  const classes = useStyles();
  let refSection = useRef("navCarousel");
  const [sections, setSections] = useState("navCarousel");
  const handleChange = (value) => {
    setSections(value)
  }
  useLayoutEffect(() => {
    const onScroll = e => {
      const offSetY = e.target.documentElement.scrollTop;
      document.querySelectorAll(".page-section").forEach((element, index) => {
        const headerHeigh = document.querySelector("header").clientHeight;
        const searchHeight = document.getElementById("search").clientHeight;
        const offsetElementY = element.offsetTop - (headerHeigh + searchHeight);
        if (offSetY >= offsetElementY) {
          if (refSection.current !== element.getAttribute("id")) {
            refSection.current = element.getAttribute("id")
          }
        }
      });
      if (sections !== refSection.current) {
        setSections(refSection.current)
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);
  return (
    <div className={`${classes.root} box`}>
      <Header title={sections} onChange={handleChange} />
      {Pages.map((pg, index) => {
        const { cls, location, debounce, Component } = pg;
        return (
          <div key={index} className={cls} id={location}>
            <Component />
          </div>
        )
      })}
    </div>
  );
}
export default memo(Home);


// {Elements.map((com, index) => {
//   const { Component, height } = com;
//   return (<div key={index} >

//   </div>
//   )
// })}
// </div>


// import CarouselMain from "../../components/Display/CarouselMain"
// import SearchMoive from "../../components/Display/SearchMoive";
// import CarouselHot from "../../components/Display/CarouselHot";
// import TheatersCluster from "../../components/Display/TheaterCluster"