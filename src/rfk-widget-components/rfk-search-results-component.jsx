import { Container, Grid } from "@material-ui/core";
import { setWidget, trackFullPageSearchFacetClickEvent, trackPDPViewEvent, Widget, WidgetDataType } from "@sitecore-discover/react";
import { SearchResultsActions } from "@sitecore-discover/widgets";
import classnames from 'classnames';
import { useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { useLocation } from "react-router-dom";
import FacetList from "../components/product-list/facet-list-component";
import PLPFilters from "../components/product-list/filters";
import ProductList from "../components/product-list/product-list";
import RfkSeoComponent from "./rfk-seo-component";
import './styles/rfk-search-results.component.css';

const rfkPLPSeoConfig = {
  type: WidgetDataType.SEO,
  component: RfkSeoComponent
}
setWidget('crm-plp-seo', rfkPLPSeoConfig);
// ACTION PROPS:
// onClearFilters
// onFacetClick
// onKeyphraseChange
// onPageNumberChange
// onResultsPerPageChange
// onSortChange
const RfkSearchResults = ({
  loaded,
  loading,
  page = 1,
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
  const reset = () => {
    onClearFilters();
    onPageNumberChange({page: 1})
    if (keyphrase) {
      onKeyphraseChange(null)
    }
  }
  useEffect(() => {
    return () => {
      reset();
    }
  }, []);

  const handlePageClick = (e) => {
    const page = e.selected + 1;
    onPageNumberChange({ page })
  }
  const handleOnFacetClick = (payload) => {
    onFacetClick(payload)
    trackFullPageSearchFacetClickEvent('crm-search', payload.facetType, payload.facetValue, payload.facetValueIndex, payload.facetIndex);
  }
  return (
    <Container>
      <Widget rfkId="crm-plp-seo"/>
      {!loading && products.length ? (
        <Grid container spacing={3}>
          {/* Facets */}
          <Grid item xs={4}>
            <FacetList
              facets={facets}
              onFacetClick={handleOnFacetClick}
              onClear={onClearFilters}
            />
          </Grid>
          {/* Products + Filters */}
          <Grid item xs={8}>
            {!loading && totalPages > 0 ? (
              <div>
                <span>
                  Shown
                  {page < totalPages ? page * productsPerPage : totalItems}
                  products out of {totalItems};
                </span>
                <span>
                  Page {page} of {totalPages}
                </span>
              </div>
            ) : null}
            {totalItems === 0 ? "No results found" : null}
            <PLPFilters
              keyphrase={keyphrase}
              productsPage={productsPerPage}
              page={page}
              sortType={sortType}
              totalPages={totalPages}
              sortDirection={sortDirection}
              sortChoices={sortChoices}
              onPerPageChange={(numProducts) => {
                dispatch(SearchResultsActions.RESULTS_PER_PAGE_CHANGED, {
                  numProducts: Number(numProducts),
                });
              }}
              onPageNumberChange={(page) => onPageNumberChange({ page })}
              onSortChange={(payload) => {
                dispatch(SearchResultsActions.SORT_CHANGED, payload);
              }}
              onSearchChange={onKeyphraseChange}
            />
            {keyphrase ? <h3>Top Results for: {keyphrase} </h3> : null}
            <ProductList
              products={products}
              loaded={loaded}
              loading={loading}
              onProductClick={(payload) => {
                dispatch(trackPDPViewEvent, payload);
              }}
            />
          </Grid>
          <div className={classnames('issuesPagination', 'pagination')}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            forcePage={page-1}
          />
      </div>
        </Grid>
      ) 
      : 
      (<div> {loading ? "Loading ..." : "No products found"} </div>)
      }
    </Container>
  );
};

export default RfkSearchResults;
