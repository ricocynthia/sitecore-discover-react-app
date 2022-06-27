import { Button, Container, Grid, Typography } from "@material-ui/core";
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
    <DoneLoading finalPrice={productDetails.final_price} sku={productDetails.sku} imgUrl={productDetails.image_url} name={productDetails.name} price={productDetails.price} /> : <div> No Product Found</div>
  );
};

const isLoadingContent = (
  <div style={{ backgroundColor: "black" }}> Loading Product Details...</div>
);

const DoneLoading = ({ sku, imgUrl, name, price, finalPrice }) => (
  <Container style={{paddingTop: '1rem'}}>
    <Grid container>
      <Grid item xs={6}>
      <img src={imgUrl} />
      </Grid>
      <Grid item xs={6}>
        <Grid item>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="caption"> SKU: {sku}</Typography>
        </Grid>
        <Grid item style={{paddingTop: '2rem'}}>
          <Typography  variant="h5" style={{fontWeight: 600}}> {parseFloat(price) !== parseFloat(finalPrice) ? <span style={{textDecoration: 'line-through', color: 'rgb(140, 140, 140)'}}>${parseFloat(price)}</span> : null}  ${parseFloat(finalPrice)}</Typography>
          <Button variant="contained" style={{marginTop: '1rem', marginBottom: '1rem'}}> Add to Cart</Button>
        </Grid>
        <Grid item style={{paddingTop: '2rem'}}>
          <Typography variant="caption">Description</Typography>
          <Typography variant="body1"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac sodales ipsum. Mauris bibendum, mauris pulvinar egestas aliquet, tortor mauris aliquet nisi, eget tempor libero sem ut libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent et tortor sapien. Curabitur egestas nec nisl in volutpat. Fusce aliquam, nisl et porta posuere, arcu mi lobortis mi, vel facilisis enim tortor nec sem. Nunc viverra volutpat neque, non scelerisque ex iaculis in. Suspendisse sed porttitor libero.</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default ProductDetails;
