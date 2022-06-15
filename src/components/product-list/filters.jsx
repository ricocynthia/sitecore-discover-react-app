const PLPFilters = ({
  totalPages,
  productsPage,
  page,
  sortChoices = [],
  sortType,
  sortDirection,
  onPerPageChange,
  onPageNumberChange,
  onSortChange,
  onSearchChange
}) => {
  return <div className="rfk_sp_controls">
    <div className="rfk_sp_controls__control">
      <label>Sort:</label>
      <select
        onChange={({ target }) => {
          const sort = target.value.split("#");
          onSortChange({ sortType: sort[0], sortDirection: sort[1] });
        }}
      >
        ${sortChoices.map(
          ({ label, name, order }) => <option
          key={`${name}-${order}`}
            value={name === sortType && order === sortDirection}
            
          >
            {label}
          </option>
        )}
      </select>
    </div>
  </div>;
};

export default PLPFilters;
