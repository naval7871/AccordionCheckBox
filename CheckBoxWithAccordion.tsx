import { useReducer, useState } from "react";

interface optionsI {
  id: string;
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
}

interface titleI {
  type: "checkbox" | string;
  heading: React.ReactNode;
}

interface CheckBoxWithAccordionI {
  title: titleI;
  body: optionsI[];
  defaultExpanded?: boolean;
  onChange?: Function;
}



// function reducer(state, action){

// }


export default function CheckBoxWithAccordion({
  title,
  body,
  defaultExpanded = false,
  onChange = () => {}
}: CheckBoxWithAccordionI) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const [selectedItems, setSelectedItems] = useState(body.content);
  const [isParentSelected, setIsParentSelected] = useState(false);
//   const [state, dispatch] = useReducer(reducer, null, initialState())


  function checkBox( name, id, value, checked, disabled, label, type ) {
    return (
      <>
        <input
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          name={name}
          id={id}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={e => {
            if(!disabled && type === 'child'){
                const newState = selectedItems.map(item => {
                    if(item.id === id){
                        return {...item, checked: !checked}
                    }
                    else return item;
                })

                
                setSelectedItems(newState)
                onChange(newState)
            }
            if(!disabled && type === 'parent'){
                if(!checked){
                    const newState = selectedItems.map(items => ({...items, checked: true}))
                    setIsParentSelected(true)
                    setSelectedItems(newState)
                onChange(newState)

                }
                else {
                    const newState = selectedItems.map(items => ({...items, checked: false}))
                    setIsParentSelected(false)
                    setSelectedItems(newState)
                onChange(newState)

                }
            }
          }}
        />
        <label htmlFor={id} onClick={(e) => e.stopPropagation()}>
          {label}
        </label>
      </>
    );
  }

  function titleElement() {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "11px 8px 11px 16px",
          border: "1px solid gray",
          width: "100%",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <div>
          {title.type === "checkbox" ? (
            <>
             {checkBox(title.heading, title.heading, title.heading, isParentSelected, false, title.heading, 'parent')}
            </>
          ) : (
            title.heading
          )}
        </div>
        <p>{isOpen ? "Collapse" : "Expand"}</p>
      </div>
    );
  }

  function bodyElement() {
  return (
      <div
        style={{
          padding: "11px 8px 11px 16px",
          display: isOpen ? "block" : "none",
        }}
      >
        {
          body.type === 'checkbox' ? selectedItems.map((el, index) => {
          return (
            <div key={el.id}>
                {checkBox(el.label, el.id, el.value, el.checked, el.disabled, el.label, 'child')}
              
            </div>
          );
        }): <>{body.content}</>
    }
      </div>
    );
  }

  return (
    <div>
      {titleElement()}
      {bodyElement()}
    </div>
  );
}
