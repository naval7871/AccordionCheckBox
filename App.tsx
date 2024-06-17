import { useState } from "react";
import CustomAccordion from "./CustomAccordion";
import CheckBoxWithAccordion from "./CheckBoxWithAccordion";

const data = {
  clearAll: false,
  selectAll: false,
  control: 'checklist',
  title: {
    type: 'string/checkbox',
    heading: 'Companies',
  },
  body: {
    type: 'checkbox',
    options: [
      {
        id: "tcs",
        value: "tcs",
        label: "Tata Consulatancy Services",
        checked: true,
      },
      { id: "google", value: "google", label: "Google Limited", checked: true },
      { id: "meta", value: "meta", label: "Meta Limited", checked: false },
      { id: "ms", value: "ms", label: "Microsoft Limited", checked: true },
      { id: "yahoo", value: "yahoo", label: "Yahoo Limited", checked: false },
    ],
    content: ''
  }  
}

const inputArraysData = [
  {
    id: "tcs",
    value: "tcs",
    label: "Tata Consulatancy Services",
    checked: true,
  },
  { id: "google", value: "google", label: "Google Limited", checked: true, disabled: true },
  { id: "meta", value: "meta", label: "Meta Limited", checked: false },
  { id: "ms", value: "ms", label: "Microsoft Limited", checked: true },
  { id: "yahoo", value: "yahoo", label: "Yahoo Limited", checked: false },
];

function App() {
return (
  <>
  <CheckBoxWithAccordion 
  title={{
    type: 'checkbox',
    heading: 'Companies'
  }}
  body={inputArraysData}
  onChange = {(selectedItems) => console.log(selectedItems)}
  />
  <br />
  <br />
  <br />

  {/* <CheckBoxWithAccordion 
  title={{
    type: 'checkbox',
    heading: 'Companies'
  }}
  body={inputArraysData}
  onChange = {(selectedItems) => console.log(selectedItems)}
  /> */}

  </>
)


  // return (
  //   <>
  //     <div style={{ width: 500, fontSize: 17 }}>
  //       <h3>CheckBox as Title Header</h3>
  //       <CustomAccordion
  //         title={
  //           <>
  //             <input
  //               type="checkbox"
  //               id="parent_checkbox"
  //               name="parent_checkbox"
  //               value="parentEle"
  //               onClick={(e) => e.stopPropagation()}
  //             />
  //             <label
  //               htmlFor="parent_checkbox"
  //               onClick={(e) => e.stopPropagation()}
  //             >
  //               Parent Element
  //             </label>
  //           </>
  //         }
  //       >
  //         {inputArrays.map((ele) => {
  //           return (
  //             <div key={ele.id}>
  //               <input
  //                 type="checkbox"
  //                 id={ele.id}
  //                 name={ele.label}
  //                 value={ele.value}
  //                 onClick={(e) => e.stopPropagation()}
  //               />
  //               <label htmlFor={ele.id} onClick={(e) => e.stopPropagation()}>
  //                 {ele.label}
  //               </label>
  //             </div>
  //           );
  //         })}
  //       </CustomAccordion>
  //     </div>

  //     <div style={{ width: 500, fontSize: 17 }}>
  //       <h3>String as CheckBox Header</h3>
  //       <CustomAccordion title={"IT Companies"}>
  //         {inputArrays.map((ele, index) => {
  //           return (
  //             <div key={ele.id}>
  //               <input
  //                 type="checkbox"
  //                 id={ele.id + index}
  //                 name={ele.label}
  //                 value={ele.value}
  //                 onChange={(e) => {
  //                   console.log(e.target);
  //                 }}
  //                 checked={ele.checked}
  //               />
  //               <label htmlFor={ele.id + index}>{ele.label}</label>
  //             </div>
  //           );
  //         })}
  //       </CustomAccordion>
  //     </div>
  //   </>
  // );
}

export default App;

// <>
// <input type="checkbox" id="parent_checkbox" name="parent_checkbox", value = "parentEle"
// onClick={e => e.stopPropagation()}
// />
// <label htmlFor="parent_checkbox"
// onClick={e => e.stopPropagation()}
// >Parent Element</label>
// </>
