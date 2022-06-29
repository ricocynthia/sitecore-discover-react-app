import { Widget } from "@sitecore-discover/react";

const Home = () => {
  return (
    // data-rfkid is a workaround for the banner widget to appear
    <div data-rfkid>
      <Widget rfkId="sdk-demo-homepage-banner" />
      <Widget rfkId="crm-recommendation-widget" title="Popular Products" />
    </div>
  );
};

export default Home;
