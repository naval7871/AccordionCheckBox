import { useState } from "react";

interface AccordionI {
  defaultExpanded?: boolean;
  title?: React.ReactElement | number | string;
  control?: any;
  children?: React.ReactNode;
}

export default function CustomAccordion({
  defaultExpanded = false,
  title = "",
  control = undefined,
  children = "",
}: AccordionI) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

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
        <div>{title}</div>
        <p>{isOpen ? "Collapse" : "Expand"}</p>
      </div>
    );
  }

  function body() {
    return <div style={{ 
        padding: "11px 8px 11px 16px",
        display: isOpen? 'block': 'none'
    }}>{children}</div>;
  }

  if (!control) {
    return (
      <div>
        {titleElement()}
        {body()}
      </div>
    );
  }
}
