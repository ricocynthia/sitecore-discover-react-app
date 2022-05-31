import { PageController, setWidget, trackPageViewEvent, Widget, WidgetDataType } from "@sitecore-discover/react";
import React from "react";
import RfkSearchResults from "../../rfk-widget-components/rfk-search-results-component";

const ProductListPageByGender = () => {
    const rfkSearchResultsConfig = {
        type: WidgetDataType.SEARCH_RESULTS,
        component: RfkSearchResults,
      }
      setWidget('crm-search', rfkSearchResultsConfig)

      const context = PageController.getContext();
      debugger
      context.setPageUri(window.location.pathname);
      trackPageViewEvent({
          page: {
              uri: context.getPageUri()
          },
          user: {
              uuid: context.getUserUuid()
          }
      })
      return (
          <React.Fragment>
              <Widget rfkId="crm-search" />
          </React.Fragment>
      )
}

export default ProductListPageByGender;