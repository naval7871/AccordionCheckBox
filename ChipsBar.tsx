import './App.css'
import BasicDemo from './CybChipsBar';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useState } from 'react';

const data = [{label: 'action'}, 

{label: 'action1'},
{label: 'action2'},
// {label: 'action3'},
// {label: 'action4'},
// {label: 'action5'},
// {label: 'action6'},
// {label: 'action7'},
]

function App() {

const [stateData, steStateData] = useState(data);

  return (
    <div style={{
      // width: 500
    }}>
    <BasicDemo chips = {stateData}/>
    <button className='mt-8' onClick={() => {
      let stateCopy = [...stateData]
      steStateData([...stateCopy, {label: 'Added', removable: true}])
    }}>Add here</button>
    <button className='mt-8'>Delete here</button>

    </div>
  )
}

export default App






import React, { useEffect, useRef, useState } from "react";
import { Chip, ChipProps } from "primereact/chip"; // Import Chip and ChipProps
import { OverlayPanel } from "primereact/overlaypanel";

interface ChipsBarProps {
  chips: ChipProps[]; // Directly use PrimeReact ChipProps
}

const NUM_CHIP_WIDTH = 80;

const ChipsBar: React.FC<ChipsBarProps> = ({ chips }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(Infinity);
  const [chipsState, setChipsState] = useState(chips);
  console.log(chipsState)

  useEffect(() => {
    setChipsState(chips);
  }, [chips]);

  useEffect(() => {
    const calculateChips = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      let totalWidth = 0;

      for (let i = 0; i < chipsState.length; i++) {
        const chipElement = chipRefs.current[i];
        if (chipElement) {
          totalWidth += chipElement.offsetWidth + 8; // Account for spacing
          const totalWidthWithNums = totalWidth + NUM_CHIP_WIDTH;
          if (totalWidthWithNums > containerWidth) {
            setLastVisibleIndex(i - 1);
            break;
          }
        }
      }
    };

    calculateChips();
    window.addEventListener("resize", calculateChips);

    return () => window.removeEventListener("resize", calculateChips);
  }, [chipsState]);


  const onChipDelete = (chip, index) => {
   const stateCopy = [...chipsState];
  stateCopy.splice(index, 1);
   setChipsState(stateCopy)
  }


  return (
    <div ref={containerRef} className="flex flex-wrap gap-2">
      {chipsState.map((chip, index) => {     
        return index > lastVisibleIndex ? (
          chips.length === index + 1 ? (
            <ExtraNumChips key={`${chip.label}_${index}`} chips={chips.slice(lastVisibleIndex + 1)} chipRefs = {chipRefs}/>
          ) : null
        ) : (
          <div
            key={`${chip.label}_${index}`}
            ref={(el) => {
              chipRefs.current[index] = el;
            }}
          >
            <Chip {...chip} removable={true} onRemove={() => onChipDelete(chip, index)} />
          </div>
        );
      })}
    </div>
  );
};

const ExtraNumChips: React.FC<ChipsBarProps> = ({ chips, chipRefs }) => {
  const overlayRef = useRef<OverlayPanel>(null);
  return (
    <>
      <Chip
        label={`+${chips.length}`}
        className="p-chip-hidden"
        onClick={(e) => overlayRef.current?.toggle(e)}
        style={{ cursor: "pointer", background: "#d1d1d1" }}
      />
      <OverlayPanel ref={overlayRef}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {chips.map((chip, index) => (
            <Chip key={index} {...chip}  ref={(el) => {
                chipRefs.current[index] = el;
              }}/>
          ))}
        </div>
      </OverlayPanel>
    </>
  );
};

export default ChipsBar;






















