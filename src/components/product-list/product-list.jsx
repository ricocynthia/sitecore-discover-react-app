import { Grid, Container, Paper } from "@material-ui/core";
import { trackPDPViewEvent } from "@sitecore-discover/react";

const Price = ({ max, min, price, finalPrice }) => {
    if (max) {
      return <div className="rfksdk_price">
        <span className="rfksdk_price__range">${min} - ${max}</span>
      </div>;
    }
    const discounted = finalPrice !== price;
    return <div className={discounted ? "rfksdk_price--discounted" : ""}>
      <span className="rfksdk_price__original">${price}</span>
      {discounted && finalPrice
        ? <span className="rfksdk_price__final">${finalPrice}</span>
        : null}
    </div>;
  };
  
const ProductItem = ({
    includeSku,
    className,
    onClick,
    isPreviewSearch = false,
    ...product
  }) => {
    const paperStyles = {
      height: isPreviewSearch ? null : 400,
      width: 300,
    }
    const styleObject = {
      width : isPreviewSearch ? null : 200, 
      align : "center"
    }
    let imgStyles = {
      width: 200
    }
    if (isPreviewSearch) {
      imgStyles = {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 150
      }
    }
    const {
      url,
      name,
      sku,
      final_price_min_formatted,
      final_price_max_formatted,
      final_price,
      price,
      image_url
    } = product;
    return <Grid key={sku} item>
    <Paper style={paperStyles} elevation={0}>
      <div style={styleObject}>
        <img style={imgStyles} src={image_url} />
        <h4>{name}</h4>
        {!isPreviewSearch ? sku : null}
        { !isPreviewSearch ? <Price
          price={price}
          finalPrice={final_price}
          min={final_price_min_formatted}
          max={final_price_max_formatted}
          /> : null}
          <button onClick={() => trackPDPViewEvent(product.sku)}> create pdp view event</button>
      </div>
    </Paper>
  </Grid>
  };

const ProductList = ({ 
  products = [], onProductClick, onDiscoverStyleOpen, loaded, loading,
  isPreviewSearch = false
 }) => {
  const ready = loaded && !loading;
  return (<Container>
      {!ready ? <div> Loading...</div>
      : ready && products.length > 0 
        ? <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {products.map(product => <ProductItem 
            key={product.sku} 
            {...product} 
            onClick={onProductClick} 
            isPreviewSearch={isPreviewSearch}
            />)}
          </Grid>
          </Grid>
        </Grid>	
        : <div> No products available</div>}
    </Container>
  )
};

export default ProductList;
