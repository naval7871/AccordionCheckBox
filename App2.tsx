import React, {useState} from 'react';
import TagContainer from './TagContainer';

let data = [
    "Naval",
    "Kishore",
    "Amazon",
    "Google",
    "Alphabet",
    "Microsoft",
    "Facebook",
    "Twitter",
    "RedHat",
    "GitHub",
    "Netflix",
    "AWS",
    "Azure",
    "GCloud",
    "Sonar",
    "TypeScript",
    "JavaScript",
    "MicroFrontend",
    "Acer",
    "Dell",
    "Jio",
    "Airtel",
    "JSLovers",
    "Jio Cinema",
    "Fan",
    "Bluetooth",
    "Keyboard",
    "TCS",
    "Infosys",
    "BlueStart"
  ];


  function App2(){

    const [dataState, setDataState] = useState(data);
    return <TagContainer  dataState={dataState}/>

  }

  export default App2