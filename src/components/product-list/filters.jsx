import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PLPFilters = ({
  totalPages,
  productsPage,
  page,
  sortChoices = [],
  sortType,
  sortDirection,
  onSortChange,
}) => {
  const sortBy = sortType && sortDirection ? `${sortType}-${sortDirection}` : '';
  const onSortByChange = ({target}) => {
    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location;
      const qparams = getQueryParams(target.value)
      const newUrl = `${protocol}//${host}${pathname}${qparams}`;
      window.history.pushState({}, '', newUrl);
    }
    const sort = target.value.split('-');
    const payload = {
      sortType: sort[0],
      sortDirection: sort[1]
    }
      onSortChange(payload);
  }

  const getQueryParams = (sortByValue) => {
    let qparams = [];
    const paramString = window.location.search.slice(1);
    paramString.split('&').forEach(p => {
      if (p)
      {
        const key = p.split('=')[0]
        const value = key === 'sortBy' ? sortByValue : p.split('=')[1]
        qparams = [...qparams, `${key}=${value}`]
      }
    })
    if (!paramString.includes('sortBy')) {
      qparams.push(`sortBy=${sortByValue}`)
    }
    return `?${qparams.join('&')}`;
  }

  return <div>
    <FormControl variant="outlined" margin="dense" fullWidth>
      <InputLabel id="sortby">Sort By</InputLabel>
      <Select 
       labelId="sortby" 
        id="sortby"
        value={sortBy}
        label="Sort By"
        onChange={onSortByChange}>
          {sortChoices.map(
          ({ label, name, order }) => 
          <MenuItem key={`${name}-${order}`}
                    value={`${name}-${order}`}>
            {label}
          </MenuItem>
        )}
      </Select>
    </FormControl>
    </div>;
};

export default PLPFilters;
