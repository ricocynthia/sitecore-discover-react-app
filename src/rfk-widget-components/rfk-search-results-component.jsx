import { PageController, SearchResultsWidget, trackPDPViewEvent } from "@sitecore-discover/react";
import { Container } from "@material-ui/core";
import FacetList from "../components/product-list/facet-list-component";
import ProductList from "../components/product-list/product-list";
import PLPFilters from "../components/product-list/filters";
import { useCallback } from "react";
import { SearchResultsActions } from "@sitecore-discover/widgets";

const debounce = (func, wait, immediate) => {
  let timeout;
  return function returnFn(...rest) {
    const context = this;
    const args = rest;
    const later = function executeFn() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ACTION PROPS:
// onClearFilters
// onFacetClick
// onKeyphraseChange
// onPageNumberChange
// onResultsPerPageChange
// onSortChange
const RfkSearchResults = ({
  error,
  loaded,
  loading,
  page,
  keyphrase,
  productsPerPage = 10,
  totalPages,
  totalItems,
  sortType,
  sortDirection,
  sortChoices,
  products = [],
  facets = [],
  onClearFilters,
  onFacetClick,
  onKeyphraseChange,
  onPageNumberChange,
  onResultsPerPageChange,
  onSortChange
}) => {
  const styleObject = {
    width : 200, 
    align : "center"
}
const onSearchChangeDebounced = useCallback(
  debounce(
    (keyphrase) =>
      dispatch(SearchResultsActions.KEYPHRASE_CHANGED, {
        keyphrase
      }),
    500
  ),
  []
);

  return (
    <Container>
      {!loading && products.length ? 
      (
        // <div>
        //   <h1> Products For You</h1>
        //   {products.map((product) => (
        //     <div>
        //       <h4>{product.name}</h4>
        //       <div style={styleObject}>
        //         <img width={200} src={product.image_url} />
        //         {product.sku}
        //         <br />
        //         <b>Price: {product.price}</b>
        //         <br />
        //         <button onClick={() => trackPDPViewEvent(product.sku)}>
        //           create pdp view event
        //         </button>
        //       </div>
        //     </div>
        //     ))}
        // </div>
        <div className="rfk-full-page-search">
      {keyphrase
        ? <div className="rfk_msg_prod">
            Top Results for: «{keyphrase}»
          </div>
        : null}
      <div className="rfk_sp rfk-sp">
        <FacetList
          facets={facets}
          onFacetClick={(payload) => {
            dispatch(SearchResultsActions.FACET_CLICKED, payload);
          }}
          onClear={(payload) => {
            dispatch(SearchResultsActions.CLEAR_FILTERS, payload);
          }}
        />
        <div className="rfk_li" data-page={page}>
          <PLPFilters
            keyphrase={keyphrase}
            productsPage={productsPerPage}
            page={page}
            sortType={sortType}
            totalPages={totalPages}
            sortDirection={sortDirection}
            sortChoices={sortChoices}
            onPerPageChange={(numProducts) => {
              dispatch(
                SearchResultsActions.RESULTS_PER_PAGE_CHANGED,
                {
                  numProducts: Number(numProducts)
                }
              );
            }}
            onPageNumberChange={onPageNumberChange}
            onSortChange={(payload) => {
              dispatch(SearchResultsActions.SORT_CHANGED, payload);
            }}
            onSearchChange={onSearchChangeDebounced}
          />
          {!loading && totalPages > 0
            ? <div className="rfk_sp_results_info">
                <span
                  >Shown
                  {page < totalPages ? page * productsPerPage : totalItems}
                  products out of {totalItems};</span
                >
                <span>Page {page} of {totalPages}</span>
              </div>
            : null}
          {totalItems === 0 ? "No results found" : null}
          <ProductList
            products={products}
            loaded={loaded}
            loading={loading}
            onProductClick={(payload) => {
              dispatch(
                trackPDPViewEvent,
                payload
              );
            }}
          />
        </div>
      </div>
    </div>
      ) 
      : (
        <div> Loading ... </div>
      )}
    </Container>
  );
};

export default RfkSearchResults;
