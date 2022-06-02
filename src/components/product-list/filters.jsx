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
      <label>Search Term:</label>
      <input type="text" onKeyUp={(e) => onSearchChange(e.target.value)} />
    </div>
    <div className="rfk_sp_controls__control">
      <label>Number of products:</label>
      <select onChange={({ target }) => onPerPageChange(target.value)}>
        <option value={productsPage === 12}>12</option>
        <option value={productsPage === 24} >24</option>
        <option value={productsPage === 36} >36</option>
      </select>
    </div>

    <div>
      <label>#Page:</label>
      <select onChange={({ target }) => {
        console.log(target.value)
        onPageNumberChange(Number(target.value))}}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (p) => <option key={p} value={p}>{p}</option>
        )}
      </select>
    </div>

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
