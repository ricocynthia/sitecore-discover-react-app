import { init,  setCredentials, setWidget, WidgetDataType } from '@sitecore-discover/react';
import RfkRecommendation from '../rfk-widget-components/rfk-recommendation';
import RfkBanner from '../rfk-widget-components/rfk-banner-component'
import RfkSeoComponent from '../rfk-widget-components/rfk-seo-component';

setCredentials({
  env: process.env.REACT_APP_ENVIRONMENT,
  customerKey: process.env.REACT_APP_CUSTOMER_KEY,
  apiKey: process.env.REACT_APP_API_KEY,
  useToken: true
});
/**
 * WIDGET TYPES IMPLEMENTED IN THIS APP:
 * 1) RECOMMENDATION = "recommendation",
 * 2) SEO = "seo", 
 * 3) BANNER = "banner",
 * 4) HTML_BLOCK = "html_block",
 * 5) PREVIEW_SEARCH = "preview_search",
 *      TODO:
 * 6) SEARCH_RESULTS = "content_grid",
 * 
 * CANNOT FIND THESE WIDGET TYPES IN CEC:
 * 1) CONTENT_BLOCK = "content_block",
 * 2) DISCOVER = "discover"
 */
const rfkRecommendationConfig = {
  type: WidgetDataType.RECOMMENDATION,
  component: RfkRecommendation,
};

const rfkBannerConfig = {
  type: WidgetDataType.BANNER,
  component: RfkBanner
}

const rfkSeoConfig = {
  type: WidgetDataType.SEO,
  component: RfkSeoComponent
}

setWidget('crm-recommendation-widget', rfkRecommendationConfig);
setWidget('sdk-demo-homepage-banner', rfkBannerConfig);
setWidget('crm-seo-widget', rfkSeoConfig);


init();
