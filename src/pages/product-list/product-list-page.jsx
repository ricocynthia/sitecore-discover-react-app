import { Container } from "@material-ui/core";
import { SearchResultsWidget, Widget } from "@sitecore-discover/react";
import React from "react";
import RfkSearchResultsComponent from "../../rfk-widget-components/rfk-search-results-component";


const ProductListPage = () => {
  return (
          <Container>
              <RfkSearchResultsComponent rfkId="crm-search" initialProductsPerPage={10} page={2} />
          </Container>
      )
}

export default ProductListPage;