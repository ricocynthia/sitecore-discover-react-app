import {
  defaultRequests,
  trackPDPViewEvent,
  WidgetDataType,
} from "@sitecore-discover/react";
import { useEffect } from "react";
import { useState } from "react";

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    if (!loading) {
      trackPDPViewEvent(sku);
    }
  }, [loading]);

  const sku = window.location.pathname.split("/")[3];
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
      console.log(error.message)
      setLoading(false);
    });

  return loading ? (
    isLoadingContent
  ) : (
    productDetails ? 
    <DoneLoading sku={productDetails.sku} imgUrl={productDetails.image_url} /> : <div> No Product Found</div>
  );
};

const isLoadingContent = (
  <div style={{ backgroundColor: "black" }}> Loading Product Details...</div>
);

const DoneLoading = ({ sku, imgUrl }) => (
  <div>
    {" "}
    done loading! {sku}
    <img src={imgUrl} />{" "}
  </div>
);

export default ProductDetails;
