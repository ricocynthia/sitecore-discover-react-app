import React, { useState } from "react";

const FacetValues = ({
  values,
  tindex,
  acumIndex,
  facetType,
  onFacetClick
}) => {
  return <ul>
    {values.map(({ index: facetValueIndex, text, count, selected }, index) => {
      return <li
        key={index}
        index={index}
        data-index={acumIndex + index || '0'}
        data-type={facetType}
        data-text={text}
        data-level="0"
      >
        <div>
          <input
            type="checkbox"
            checked={selected ? "checked" : ""}
            onChange={({ target }) =>
              onFacetClick({
                facetType,
                facetValue: text,
                facetValueIndex,
                valueIndex: acumIndex + index,
                facetIndex: tindex,
                checked: target.checked
              })}
          />
          <label title="{text}({count})"
            >{text}<span>({count})</span></label
          >
        </div>
      </li>;
    })}
  </ul>;
};

const Facet = ({ name, values, index, acumIndex, type, onFacetClick }) => {
  const [toggle, setToggle] = useState(false);
  return <li data-toggle={toggle ? "1" : "0"}>
    <div
      
      data-toggle={toggle ? "1" : "0"}
      onChange={() => setToggle(!toggle)}
    >
      <span>{name}</span>
    </div>
    <div >
      <span ></span>
      <FacetValues
        values={values}
        tindex={index}
        acumIndex={acumIndex}
        facetType={type}
        onFacetClick={onFacetClick}
      />
    </div>
  </li>;
};

const FacetList = ({ facets, onFacetClick, onClear }) => {
  let acumIndex = 0;
  return <div >
    <div >
      <span>Filter By</span>
      {facets.some(({ values = [] }) =>
        values.some(({ selected }) => selected)
      )
        ? <div onChange={onClear}>
            Clear All
          </div>
        : null}
    </div>
    {facets.map(({ facetType, values, display_name, selected }, tindex) => {
      const componentHtml = <ul
      key={tindex}
        data-type={facetType}
        data-sli="0"
      >
        <Facet
          name={display_name}
          index={tindex}
          type={facetType}
          values={values}
          onFacetClick={onFacetClick}
        />
      </ul>;
      acumIndex = acumIndex + values.length;
      return componentHtml;
    })}
  </div>;
};

export default FacetList;
