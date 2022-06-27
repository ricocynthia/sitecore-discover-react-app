import { Button, Container, Grid, Typography } from "@material-ui/core";
import {
  defaultRequests,
  PageController,
  trackPDPViewEvent,
  Widget,
  WidgetDataType,
} from "@sitecore-discover/react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductDetailsComponent from "../../components/product-details/product-details.component";

const ProductDetails = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});

  const sku = window.location.pathname.split("/")[3];
  
  useEffect(() => {
    if (!loading) {
      trackPDPViewEvent(sku);
    }
  }, [loading]);
  
  useEffect(() => {
    const context = PageController.getContext();
    context.setPageSkus([sku])
    PageController.setContext(context)
  }, [location]);

  const singleProductReq = defaultRequests
    .getDefaultRequestFor(WidgetDataType.SEARCH_RESULTS)
    .setRfkId("crm-search")
    .setWidgetRfkid("crm-search")
    .addContextPageSku(sku)
    .setContextValues({ product: {} })
    .resetContent()
    .resetSort()
    .resetFacet()
    .resetPageNumber();

  singleProductReq
    .fetch(singleProductReq)
    .then((response) => {
      // process response right after the promise returns
      const productData = response.context_values.product.value[0];
      setProductDetails(productData);
      setLoading(false);
    })
    .catch((error) => {
      // process error
      console.log(error.message);
      setLoading(false);
    });
  
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
      <Widget rfkId="crm-similar-products" title="Similar Products" />
    </div>
  ) : (
    <div> No Product Found</div>
  );
};

const isLoadingContent = (
  <div style={{ backgroundColor: "black" }}> Loading Product Details...</div>
);

export default ProductDetails;
