import { init,  setCredentials, setWidget, WidgetDataType } from '@sitecore-discover/react';
import RfkRecommendation from '../rfk-widget-components/rfk-recommendation';

setCredentials({
  env: process.env.REACT_APP_ENVIRONMENT,
  customerKey: process.env.REACT_APP_CUSTOMER_KEY,
  apiKey: process.env.REACT_APP_API_KEY,
  useToken: true
});

const rfkRecommendationConfig = {
  type: WidgetDataType.RECOMMENDATION,
  component: RfkRecommendation,
};

setWidget('hs-homepage-top-products', rfkRecommendationConfig);


init();
