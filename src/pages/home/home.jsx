import { BannerWidget, Widget } from "@sitecore-discover/react";
import RfkRecommendation from "../../rfk-widget-components/rfk-recommendation";

const Home = () => {
  return (
    // data-rfkid is a workaround for the banner widget to appear
    <div>
      <BannerWidget rfkId="sdk-demo-homepage-banner" />
      <RfkRecommendation rfkId="crm-recommendation-widget" title="Popular Products" />
      {/* <Widget rfkId="crm-recommendation-widget" title="Popular Products" /> */}
    </div>
  );
};

export default Home;
