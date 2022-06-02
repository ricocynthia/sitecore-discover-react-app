import { PageController, setWidget, trackPageViewEvent, Widget, WidgetDataType, init } from "@sitecore-discover/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RfkSearchResults from "../../rfk-widget-components/rfk-search-results-component";

const ProductListPageByGender = () => {
    const location = useLocation();
    useEffect(() => {
        const context = PageController.getContext();
        context.setPageUri(window.location.pathname);
        trackPageViewEvent({
            page: {
                uri: context.getPageUri()
            },
            user: {
                uuid: context.getUserUuid()
            }
        })
    }, [location.pathname])
    const rfkSearchResultsConfig = {
        type: WidgetDataType.SEARCH_RESULTS,
        component: RfkSearchResults,
      }
      setWidget('crm-search', rfkSearchResultsConfig)
      return (
          <React.Fragment>
              <Widget rfkId="crm-search" />
          </React.Fragment>
      )
}

export default ProductListPageByGender;