import { FormControlLabel, FormGroup, Checkbox, Button, Paper, Accordion, AccordionSummary, Typography, AccordionDetails, List, ListItem } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";

const FacetValues = ({
  values,
  tindex,
  facetType,
  onFacetClick
}) => {
  return <FormGroup>
    {values.map(({ index: facetValueIndex, text, count, selected }, index) => {
      return <FormControlLabel key={index} control={<Checkbox checked={selected} onChange={({ target }) =>
              onFacetClick({
                facetType,
                facetValue: text,
                facetValueIndex,
                facetIndex: tindex,
                checked: target.checked
              })} />} label={text} />
          ;
    })}
  </FormGroup>
};

const Facet = ({ name, values, index, acumIndex, type, onFacetClick }) => {
  return <FacetValues
        values={values}
        tindex={index}
        acumIndex={acumIndex}
        facetType={type}
        onFacetClick={onFacetClick}
      />;
};

const FacetList = ({ facets, onFacetClick, onClear }) => {
  let acumIndex = 0;
  const [panelsOpen, setPanelOpen] = useState(new Array(facets.length).fill(true))

  const onAccordionChange = (i) => (event, isExpanded) => {
    const data = panelsOpen;
    data[i] = isExpanded
    setPanelOpen(data)
  };
  

  return <Paper>
    <List>
      <ListItem>
      <Typography variant="h6">Filter By</Typography>
      </ListItem>
      {facets.some(({ values = [] }) =>
        values.some(({ selected }) => selected)
      )
        ? <ListItem> <Button onClick={onClear}> Clear All Filters</Button> </ListItem>
        : null}
    </List>
      {facets.map(({ facetType, values, display_name, selected }, tindex) => 
    <Accordion key={tindex} expanded={panelsOpen[tindex]} onChange={onAccordionChange(tindex)}>
        <AccordionSummary aria-controls={`panel${tindex}a-content`}
        id={`panel${tindex}a-header}`}>
          <Typography> {display_name} </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Facet
            name={display_name}
            index={tindex}
            type={facetType}
            values={values}
            onFacetClick={onFacetClick}
          />
        </AccordionDetails>
        </Accordion>
      )}
  </Paper>;
};

export default FacetList;
