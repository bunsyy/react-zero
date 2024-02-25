// import { useEffect, useState } from "react";

// import { cn } from "../../libs/cn";

// const ContentNavBarV1 = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [prevScrollPosition, setPrevScrollPosition] = useState(0);
//   const [sticky, setSticky] = useState(true);
//   const handleScroll = () => {
//     const currentScrollPosition = window.scrollY;

//     /**
//      * - we are scrolling down => currentScrollPosition > prevScrollPosition
//      * - we are scrolling up and the current position is at 500
//      */
//     const scrollingDown = currentScrollPosition > prevScrollPosition;
//     const scrollingUpAndAbove500 =
//       prevScrollPosition > currentScrollPosition &&
//       currentScrollPosition >= 500;
//     // if (currentScrollPosition > prevScrollPosition) {
//     if (scrollingDown) {
//       setSticky(false);
//     } else {
//       setSticky(true);
//     }
//     setPrevScrollPosition(currentScrollPosition);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   });

//   return (
//     <div
//       className={cn(
//         "flex h-10 items-center bg-pink-500",
//         sticky ? "top-8" : "sticky top-0"
//       )}
//     >
//       NEW RELEASE
//     </div>
//   );
// };

// export default ContentNavBarV1;
