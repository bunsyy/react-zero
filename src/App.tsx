import ContentNavBarV1 from "./components/content-nav-bar/ContentNavBarV1";
import LongContent from "./components/long-content";
import ScrollNavBarV2 from "./components/scroll-nav-bar/ScrollNavBarV2";
import ScrollNavBarV3 from "./components/scroll-nav-bar/ScrollNavBarV3";
import ScrollNavBarV4 from "./components/scroll-nav-bar/ScrollNavBarV4";
import ScrollNavBarSubV1 from "./scroll-nav-bar-sub/ScrollNavBarSubV1";

function App() {
  return (
    <>
      {/* <ScrollNavBarVOne /> */}
      {/* <ScrollNavBarV2 /> */}
      {/* <ScrollNavBarV3 /> */}
      <ScrollNavBarV4 />
      {/* <ContentNavBarV1 /> */}

      <div className="pt-16">
        <ScrollNavBarSubV1 />
        <LongContent />
      </div>
      {/* <div
        style={{
          padding: "30px 15px 2500px",
          fontSize: "30px",
          marginTop: "30px",
        }}
      >
        <p className="sticky top-0 bg-white">
          <b>
            This example demonstrates how to hide a navbar when the user starts
            to scroll the page.
          </b>
        </p>
        <LongContent />
      </div> */}
    </>
  );
}

export default App;
