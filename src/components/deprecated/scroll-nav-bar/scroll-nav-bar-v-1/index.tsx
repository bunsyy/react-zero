import React, { useEffect, useState } from "react";

const ScrollNavBarV1 = () => {
  // State variables to manage scroll behavior
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  // console.log(window.pageYOffset);
  const [top, setTop] = useState(0);
  // console.log(top);
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // console.log(window.scrollY);
      const currentScrollPos = window.pageYOffset;
      // if (prevScrollpos > currentScrollPos && window.scrollY <= 50) {
      //   setTop(0); // Show navbar
      // } else {
      //   setTop(-50); // Hide navbar
      // }
      if (prevScrollpos > currentScrollPos && window.scrollY <= 30) {
        setTop(0); // Show navbar
      } else {
        setTop(-50); // Hide navbar
      }
      setPrevScrollpos(currentScrollPos);
    };
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);
  // Styles for the navbar and links
  const navbarStyle = {
    backgroundColor: "#333",
    position: "fixed",
    top: `${top}px`,
    width: "100%",
    display: "block",
  } as React.CSSProperties;
  const linkStyle = {
    float: "left",
    display: "block",
    color: "#f2f2f2",
    textAlign: "center",
    padding: "15px",
    textDecoration: "none",
    fontSize: "17px",
  } as React.CSSProperties;
  return (
    <div>
      <nav id="navbar" style={navbarStyle}>
        <a href="#home" style={linkStyle}>
          Home
        </a>
        <a href="#news" style={linkStyle}>
          News
        </a>
        <a href="#contact" style={linkStyle}>
          Contact
        </a>
      </nav>
      {/* <p className="sticky top-0 bg-white"> */}
      {/* <p>
        <b>
          This example demonstrates how to hide a navbar when the user starts to
          scroll the page.
        </b>
      </p> */}
    </div>
  );
};
export default ScrollNavBarV1;
