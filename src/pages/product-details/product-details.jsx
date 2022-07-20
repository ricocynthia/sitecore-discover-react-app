import {
  DataAdapter,
  defaultRequests,
  PageController,
  trackPDPViewEvent,
  WidgetDataType,
} from "@sitecore-discover/react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductDetailsComponent from "../../components/product-details/product-details.component";
import RfkRecommendation from "../../rfk-widget-components/rfk-recommendation";

const ProductDetails = () => {
  const location = useLocation();
  const sku = window.location.pathname.split("/")[3];

  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});

  const setProductData = (response) => {
    let productData;
    if (response.context_values) productData = response.context_values.product.value[0];
    else {
      productData = response.content.product.value[0]
    }
    setProductDetails(productData);
    setLoading(false);
  }

  useEffect(() => {
    if (!loading) {
      trackPDPViewEvent(sku);
    }
  }, [loading]);
  
  console.log('ello')
      // set context for rec widget
      const context = PageController.getContext();
      context.setPageSkus([sku])
      PageController.setContext(context)
  useEffect(() => {    
    console.log(location)  


    // call api to get single product for pdp
    const getSingleProductReq = defaultRequests
      .getDefaultRequestFor(WidgetDataType.SEARCH_RESULTS)
      .setWidgetRfkid("crm-search")
      .addContextPageSku(sku)
      .setContextValues({ product: {} });
      DataAdapter.getData(getSingleProductReq)
      .then((response) => setProductData(response))
      .catch((error) => {
        // process error
        console.log(error.message);
        setLoading(false);
      });
  }, [location]);

  
  return loading ? (
    isLoadingContent
  ) : productDetails ? (
    <div>
      <ProductDetailsComponent
        finalPrice={productDetails.final_price}
        sku={productDetails.sku}
        imgUrl={productDetails.image_url}
        name={productDetails.name}
        price={productDetails.price}
      />
      <RfkRecommendation rfkId="crm-similar-products" title="Similar Products" />
    </div>
  ) : (
    <div> No Product Found</div>
  );
};

const isLoadingContent = (
  <div> Loading Product Details...</div>
);

export default ProductDetails;
