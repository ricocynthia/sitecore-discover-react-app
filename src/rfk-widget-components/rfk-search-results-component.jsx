import { Container, Grid } from "@material-ui/core";
// import { defaultRequests, PageController, trackFullPageSearchFacetClickEvent, trackPDPViewEvent, Widget, WidgetDataType } from "@sitecore-discover/react";
import { useSearchResults, widget, WidgetDataType } from '@sitecore-discover/react';
// import { SearchResultsActions } from "@sitecore-discover/widgets";
import classnames from 'classnames';
import { useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import FacetList from "../components/product-list/facet-list-component";
import PLPFilters from "../components/product-list/filters";
import ProductList from "../components/product-list/product-list";
import './styles/rfk-search-results.component.css';

const SearchResultsWidgetComponent = ({ initialProductsPerPage, initialSortType, initialSortDirection }) => {
  const {
    actions: {
      onKeyphraseChange,
      onResultsPerPageChange,
      onPageNumberChange,
      onSortChange,
      onProductClick,
      onDiscoverStyleOpen,
      onFacetClick
    },
    context: {
      page = 1,
      keyphrase,
      productsPerPage = initialProductsPerPage,
      sortType = initialSortType,
      sortDirection = initialSortDirection,
    },
    queryResult: {
      isError,
      isLoading,
      isFetching,
      data: {
        sort: { choices: sortChoices = [] } = {},
        total_item: totalItems,
        total_page: totalPages = 0,
        facet: facets = [],
        facet_names: facetNames = [],
        content: { product: { value: products = [] } = {} } = {},
      } = {},
    },
    query,
  } = useSearchResults((query) => {
    query.getRequest().setContextBrowserDevice('mobile');
    return {
      productsPerPage: initialProductsPerPage,
      sortType: initialSortType,
      sortDirection: initialSortDirection,
    };
  });

  if (isError) {
    return <div>Response error</div>;
  }
  // const reset = () => {
  //   onClearFilters();
  //   onPageNumberChange({page: 1})
  //   if (keyphrase) {
  //     onKeyphraseChange(null)
  //   }
  //   const context = PageController.getContext();
  //   context.setPageUri(window.location.pathname)
  //   PageController.setContext(context)
  // }
  // useEffect(() => {
  //   return () => {
  //     reset();
  //   }
  // }, []);

  const handlePageClick = (e) => {
    const page = e.selected + 1;
    onPageNumberChange({ page })
  }
  const handleOnFacetClick = (payload) => {
    debugger
    onFacetClick({genders: {value: ["female"]}})
    // trackFullPageSearchFacetClickEvent('crm-search', payload.facetType, payload.facetValue, payload.facetValueIndex, payload.facetIndex);
  }
  
  const navigate = useNavigate();
  const routeToPDP = (sku) => {
    navigate(`/products/detail/${sku}`)
  }

  return (
    <Container style={{marginTop: '1rem'}}>
      {!isLoading && products?.length > 0 ? (
        <Grid container spacing={3}>
          {/* Facets */}
          <Grid item xs={4}>
            <FacetList
              list={facetNames}
              facets={facets}
              // facets={facets}
              // facetNames={facetNames}
              // onFacetClick={handleOnFacetClick}
              // onClear={onClearFilters}
            />
          </Grid>
          {/* Products + Filters */}
          <Grid item xs={8}>
            <Grid container>
            <Grid item xs={9}>
              {!isLoading && totalPages > 0 ? (
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
                    // dispatch(SearchResultsActions.RESULTS_PER_PAGE_CHANGED, {
                    //   numProducts: Number(numProducts),
                    // });
                  }}
                  onPageNumberChange={(page) => console.log({ page })}
                  onSortChange={onSortChange}
                  onSearchChange={() => console.log('onKeyphraseChange')}
                />
              </Grid>
            </Grid>
            {keyphrase ? <h3>Top Results for: {keyphrase} </h3> : null}
            <ProductList
              products={products}
              loaded={!isLoading}
              loading={isLoading}
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
      (<div> {isLoading ? "Loading ..." : "No products found"} </div>)
      }
    </Container>
  );
};

export default widget(SearchResultsWidgetComponent, WidgetDataType.SEARCH_RESULTS);
