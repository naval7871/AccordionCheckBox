// import React, { useEffect, useRef, useState } from "react";

// const MAX_HEIGHT = 42;

// function TagContainer({ dataState }) {
//   const [localData, setLocalData] = useState(structuredClone(dataState));
//   const [isOverFlowing, setIsOverFlowing] = useState(false);
//   const [showMoreClicked, setShowMoreClicked] = useState(false);

//   const divRef = useRef(null);
//   const childRef = useRef(null);

//   useEffect(() => {
//     let childRefWidth = childRef.current.clientWidth;
//     let maxWidth = divRef.current.clientWidth - 300;

//     if (childRefWidth > maxWidth) {
//       setIsOverFlowing(true);
//     }

//     // console.log(divRef.current.clientWidth);
//     console.log(childRefWidth)
//   });

//   return (
//     <div ref={divRef}
//     style={{overflow: showMoreClicked? 'auto': 'hidden'}}
//     >
//       {
//         <div
//           ref={childRef}
//           style={{ display: 'inline-flex', flexWrap: showMoreClicked? "wrap": "nowrap", gap: 8 }}
//         >
//           {localData.map((el) => (
//             <div
//             key={el}
//               style={{
//                 display: "flex",
//                 padding: 8,
//                 gap: 8,
//                 border: "1px solid gray",
//               }}
//             >
//               <span>{el}</span>
//               <span>X</span>
//             </div>
//           ))}
//           {isOverFlowing ? <span
//           style={{
//             position: 'absolute',
//             right: 20,
//             top: 0
//           }}
//           onClick={() => setShowMoreClicked(true)}>Show More</span>: ''}
//         </div>
//       }
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";

function TagContainer({ dataState }) {
  const [visibilityDisplay, setVisibilityDisplay] = useState(
    dataState.map(() => ({ visibility: "hidden", display: "flex" }))
  );
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const tagRefs = useRef([]);
  const containerRef = useRef(null);


  function manageTagsVisibility(){
    const MAX_WIDTH = containerRef.current.offsetWidth - 90;
    let currentLength = 0;
    let visibilityDisplayCopy = structuredClone(visibilityDisplay);
    let showMore = false;
    tagRefs.current.map((el, index) => {
      currentLength = currentLength + el?.offsetWidth + 8;

      if (currentLength < MAX_WIDTH) {
        visibilityDisplayCopy[index] = {
          visibility: "visible",
          display: "flex",
        };
      } else {
        visibilityDisplayCopy[index] = {
          visibility: "hidden",
          display: "none",
        };
        showMore = true;
      }

      setVisibilityDisplay(visibilityDisplayCopy);
      setShowMore(showMore);
    });
  }

  useEffect(() => {
    manageTagsVisibility();
  }, [dataState]);

  function showMoreClickHandler(){
    setShowMore(false);
    setShowLess(true);
    setVisibilityDisplay(prev => {
      return prev.map(el => ({visibility: 'visible', display: 'flex'}))
    })
  }

  function showLessClickHandler(){
    setShowLess(false);
    setShowMore(true);
    manageTagsVisibility();
  }

  return (
    <div ref={containerRef}>
      <div style={{ display: "inline-flex", gap: 8, flexWrap: "wrap" }}>
        {dataState.map((el, index) => {
          return (
            <div
            key={el}
            style={{
              visibility: visibilityDisplay[index].visibility,
              display: visibilityDisplay[index].display,
            }}
            >
            <div              
              style={{                
                border: "1px solid gray",
                padding: 8,
              }}
              ref={(currentElement) => tagRefs.current.push(currentElement)}
            >
              <span style={{marginRight: 8}}>{el}</span>
              <span>X</span>
            </div>
          {index === dataState.length -1 && (showLess && <span style={{padding: 8}}onClick={showLessClickHandler}>showLess</span>)}
            </div>
          );
        })}
      </div>

      {showMore && <span onClick = {showMoreClickHandler} style={{padding: 8}}>showMore</span>}
    </div>
  );
}

export default TagContainer;
