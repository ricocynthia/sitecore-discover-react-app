import { FormControlLabel, FormGroup, Checkbox, Button, Paper, Accordion, AccordionSummary, Typography, AccordionDetails, List, ListItem } from "@material-ui/core";
// import React, { useState } from "react";

// import { useSearchResults, useSearchResultsIsSelectedFacet } from '@sitecore-discover/react';
// import { useEffect } from "react";

// const FacetValues = ({ facetType, facetId, text, facetValueIndex, valueIndex, facetIndex, count, onFacetClick }) => {
//   const selected = useSearchResultsIsSelectedFacet(facetType, facetId);
//   // const [toggle, setToggle] = useState(selected || false);
//   // useEffect(() => {
//   //   setToggle(selected);
//   // }, [selected]);
//   return <FormGroup>
//     <FormControlLabel key={valueIndex} control={<Checkbox checked={selected} onChange={({ target }) =>
//     {
//       // setToggle(target.checked)
//       onFacetClick({
//                 facetType,
//                 facetId,
//                 facetValue: text,
//                 facetValueIndex,
//                 valueIndex,
//                 facetIndex,
//                 checked: target.checked,
//               })
//     }
//               } />} label={text} />
//     </FormGroup>
// };

// const Facet = ({ values, tindex, acumIndex, facetType, onFacetClick }) => {
//   return values.map(({ id: facetId, text, count }, index) =>
//   { 
//     console.log(text + facetType+tindex+index+facetId+count)
//         return <FacetValues
//         key={text}
//         text={text}
//         facetType={facetType}
//         facetIndex={tindex}
//         facetValueIndex={index}
//         facetId={facetId}
//         count={count}
//         valueIndex={index}
//         onFacetClick={onFacetClick}
//       />
//   }
//     );
// };

// const FacetList = ({ facets, facetNames, onFacetClick, onClear }) => {
//     const {
//     context: { selectedFacets = {} },
//     actions: { onClearFilters },
//   } = useSearchResults();
//   let acumIndex = 0;
//   const [panelsOpen, setPanelOpen] = useState(new Array(facets.length).fill(true))

//   const onAccordionChange = (i) => (event, isExpanded) => {
//     const data = panelsOpen;
//     data[i] = isExpanded
//     setPanelOpen(data)
//   };

//   return <Paper>
//     <List>
//       <ListItem>
//       <Typography variant="h6">Filter By</Typography>
//       </ListItem>
//       {facetNames?.some((type) => selectedFacets[type]?.length > 0)
      
//         ? <ListItem> <Button onClick={onClear}> Clear All Filters</Button> </ListItem>
//         : null}
//     </List>
//       {facetNames.map((type, tindex) => 
//         { 
//           const { value: values = [], display_name } = facets[type] || {};
//           return <Accordion key={tindex} defaultExpanded={true}>
//             <AccordionSummary aria-controls={`panel${tindex}a-content`} id={`panel${tindex}a-header}`}>
//               <Typography> {display_name} </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Facet
//                 name={display_name}
//                 tindex={tindex}
//                 facetType={type}
//                 values={values}
//                 onFacetClick={onFacetClick}
//               />
//             </AccordionDetails>
//           </Accordion>
//         }
//       )}
//   </Paper>;
// };

// export default FacetList;

import { useSearchResults, useSearchResultsIsSelectedFacet } from '@sitecore-discover/react';
import React, { useEffect, useState } from 'react';

const FacetValue = ({ facetType, facetId, text, facetValueIndex, valueIndex, facetIndex, count, onFacetClick }) => {
  const selected = useSearchResultsIsSelectedFacet(facetType, facetId);
  const [toggle, setToggle] = useState(selected || false);
  useEffect(() => {
    setToggle(selected);
    if (selected) {
      setToggle(false)
    }
  }, [selected]);
  return ( <FormGroup>
     <FormControlLabel key={valueIndex} control={<Checkbox key={text} data-index={valueIndex} checked={toggle} onChange={({ target }) =>
    {
            setToggle(target.checked);
            onFacetClick({
              facetId: facetType,
              facetValueId: facetId,
              facetIndex,
              facetValueIndex,
              facetIndex,
              checked: target.checked,
              })
    }
              } />} label={`${text} (${count})`} />
    </FormGroup>
  );
};

const FacetValues = ({ values, tindex, acumIndex, facetType, onFacetClick }) => {
  return (
    <ul className="rfk_list">
      {values.map(({ index: facetValueIndex, id: facetId, text, count }, index) => {
        return (
          <FacetValue
            key={text}
            text={text}
            facetType={facetType}
            facetIndex={tindex}
            facetValueIndex={facetValueIndex}
            facetId={facetId}
            count={count}
            valueIndex={acumIndex + index}
            onFacetClick={onFacetClick}
          />
        );
      })}
    </ul>
  );
};

const Facet = ({ name, values, index, acumIndex, type, onFacetClick, clearFilters }) => {
  const [toggle, setToggle] = useState(false);
  return (
      <div className="rfkx_lwrap">
        <span className="rfkx_showmore"></span>
        <FacetValues
          values={values}
          tindex={index}
          acumIndex={acumIndex}
          facetType={type}
          onFacetClick={onFacetClick}
        />
      </div>
  );
};

const FacetList = ({ list, facets }) => {
  const {
    context: { selectedFacets = {} },
    actions: { onFacetClick, onClearFilters },
  } = useSearchResults();
  const [clearFilters, setClearFilters] = useState(false)
  let acumIndex = 0;
  return (
    <Paper>
      <List>
        <ListItem>
          <Typography variant="h6">Filter By</Typography>
        </ListItem>
        {
          list.some((type) => selectedFacets[type]?.length > 0) 
            ? <ListItem> <Button onClick={() => { onClearFilters(); setClearFilters(true) }}> Clear All Filters</Button> </ListItem>
            : null
        }
      </List>
      {list.map((type, tindex) => {
        const { value: values = [], display_name } = facets[type] || {};
        return (
          <Accordion key={tindex} defaultExpanded={true}>
             <AccordionSummary aria-controls={`panel${tindex}a-content`} id={`panel${tindex}a-header}`}>
               <Typography> {display_name} </Typography>
             </AccordionSummary>
             <AccordionDetails>
               <Facet
                 name={display_name}
                 tindex={tindex}
                 type={type}
                 values={values}
                 onFacetClick={onFacetClick}
                 clearFilters={clearFilters}
               />
             </AccordionDetails>
           </Accordion>
        );
      })}
    </Paper>
  );
};

export default FacetList;
