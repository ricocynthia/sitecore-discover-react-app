import {
  init,
  PageController,
  setCredentials,
  setWidget,
  setWidgetType,
  WidgetDataType,
} from "@sitecore-discover/react";
import RfkBanner from "../rfk-widget-components/rfk-banner-component";
import RfkSeoComponent from "../rfk-widget-components/rfk-seo-component";
import RfkHeroMessage from "../rfk-widget-components/html-blocks/hero-message-component";
import RfkPreviewSearch from "../rfk-widget-components/rfk-preview-search.component";
import { useLocation } from "react-router-dom";
import RfkSearchResults from "../rfk-widget-components/rfk-search-results-component";

/**
 * WIDGET TYPES IMPLEMENTED IN THIS APP:
 * 1) RECOMMENDATION = "recommendation",
 * 2) SEO = "seo",
 * 3) BANNER = "banner",
 * 4) HTML_BLOCK = "html_block",
 * 5) PREVIEW_SEARCH = "preview_search",
 * 6) SEARCH_RESULTS = "content_grid",
 *
 * CANNOT FIND THESE WIDGET TYPES IN CEC:
 * 1) CONTENT_BLOCK = "content_block",
 * 2) DISCOVER = "discover"
 */
const rfkRecommendationConfig = {
  type: WidgetDataType.RECOMMENDATION,
  component: RfkRecommendation
};

// const rfkBannerConfig = {
//   type: WidgetDataType.BANNER,
//   component: RfkBanner
// }

const rfkSeoConfig = {
  type: WidgetDataType.SEO,
  component: RfkSeoComponent,
};

const rfkPreviewSearchConfig = {
  type: WidgetDataType.PREVIEW_SEARCH,
  component: RfkPreviewSearch,
  global: true,
  options: {
    preRender: true,
    properties: {
      initial: {
        redirectUrl: "/products?q=",
        inputQuerySelector: "#rfkInput",
      },
    },
  },
};
setWidget("crm-preview-search", rfkPreviewSearchConfig);
setWidget("crm-recommendation-widget", rfkRecommendationConfig);
setWidget("crm-seo-widget", rfkSeoConfig);
setWidget("sdk-demo-homepage-banner", { type: WidgetDataType.BANNER });
setWidget("crm-similar-products", rfkRecommendationConfig);

// Search Results logic
// let rfkSearchResultsConfig = {
//   type: WidgetDataType.SEARCH_RESULTS,
//   component: RfkSearchResults,
//   global: true,
//   option: {
//     properties: {
//       initial: {
//         n_item: 12
//       },
//     },
//   }
// };
// if (window.location.search) {
//   const qparams = {};
//   const params = location.search.slice(1).split("&");
//   // let qparams = [];
//   params.forEach((p) => {
//     if (p) {
//       // page, keyphrase, and sort
//       switch (p.split("=")[0]) {
//         case "keyphrase":
//         case "page":
//           qparams[p === "page" ? "page" : "keyphrase"] = p.split("=")[1];
//           break;
//         case "sortBy":
//           qparams["sort"] = {
//             type: p.split("=")[1].split("-")[0],
//             order: p.split("=")[1].split("-")[1],
//           };
//           break;
//         default:
//           break;
//       }
//     }
//   });
//   const searchTerm = location.search.split("=")[1];
//   const options = {
//     properties: {
//       initial: {
//         keyphrase: searchTerm
//       },
//     },
//   };
//   rfkSearchResultsConfig = {
//     ...rfkSearchResultsConfig,
//     options,
//   };
// }
// setWidget("crm-search", rfkSearchResultsConfig);

setCredentials({
  env: process.env.REACT_APP_ENVIRONMENT,
  customerKey: process.env.REACT_APP_CUSTOMER_KEY,
  apiKey: process.env.REACT_APP_API_KEY,
  useToken: true,
});

init();