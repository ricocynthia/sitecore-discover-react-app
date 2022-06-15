import { Widget } from "@sitecore-discover/react";
import "../../config/reflektion-config";

const Home = () => {
  return (
    <div>
      <Widget rfkId="sdk-demo-homepage-banner" />
      <Widget rfkId="crm-recommendation-widget" />
      <Widget rfkId="crm-seo-widget" />
    </div>
  );
};

export default Home;
