import { Container, Grid } from "@material-ui/core";
import { defaultRequests, trackFullPageSearchFacetClickEvent, trackPDPViewEvent, Widget, WidgetDataType } from "@sitecore-discover/react";
import { SearchResultsActions } from "@sitecore-discover/widgets";
import classnames from 'classnames';
import { useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import FacetList from "../components/product-list/facet-list-component";
import PLPFilters from "../components/product-list/filters";
import ProductList from "../components/product-list/product-list";
import './styles/rfk-search-results.component.css';

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
  
  const navigate = useNavigate();
  const routeToPDP = (sku) => {
    navigate(`/products/detail/${sku}`)
  }

  return (
    <Container style={{marginTop: '1rem'}}>
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
            <Grid container>
            <Grid item xs={9}>
              {!loading && totalPages > 0 ? (
                <div>
                  <span>
                    {(page * productsPerPage) - productsPerPage + 1} - {(page * productsPerPage) > totalItems ? totalItems : (page * productsPerPage)} of {totalItems} results
                  </span>
                </div>
              ) : null}
              </Grid>
              {totalItems === 0 ? "No results found" : null}
              <Grid item xs={3}>
                <PLPFilters
                  keyphrase={keyphrase}
                  productsPage={productsPerPage}
                  page={page}
                  sortType={sortType}
                  sortDirection={sortDirection}
                  totalPages={totalPages}
                  sortChoices={sortChoices}
                  onPerPageChange={(numProducts) => {
                    dispatch(SearchResultsActions.RESULTS_PER_PAGE_CHANGED, {
                      numProducts: Number(numProducts),
                    });
                  }}
                  onPageNumberChange={(page) => onPageNumberChange({ page })}
                  onSortChange={(payload) => {
                    onSortChange(payload);
                  }}
                  onSearchChange={onKeyphraseChange}
                />
              </Grid>
            </Grid>
            {keyphrase ? <h3>Top Results for: {keyphrase} </h3> : null}
            <ProductList
              products={products}
              loaded={loaded}
              loading={loading}
              onProductClick={routeToPDP}
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
