import { Grid, Container, Paper, Button, Typography, IconButton, Card, CardActionArea, CardMedia, CardContent } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const priceStyles = {
  textDecoration: 'line-through',
  color: '#8c8c8c',
  marginRight: '5px'
}

const Price = ({ max, min, price, finalPrice }) => {
    if (max) {
      return <div>
        <span>${min} - ${max}</span>
      </div>;
    }
    const discounted = parseFloat(finalPrice) !== parseFloat(price);
    return <div>
      <span style={discounted ? priceStyles : {}}>${price}</span>
      {discounted && finalPrice
        ? <span>${finalPrice}</span>
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
      width: 300
    }
    if (isPreviewSearch) {
      imgStyles = {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        // height: 200,
        width: 200
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
    const navigate = useNavigate();
    return <Grid key={sku} item>
      <Card style={imgStyles} onClick={() => navigate(`/products/detail/${product.sku}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={imgStyles.height ?? 300}
          image={image_url}
        />
        <CardContent style={!isPreviewSearch ? {height: '75px'} : {}}>
          <Typography gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          { !isPreviewSearch ? <Price
              price={price}
              finalPrice={final_price}
              min={final_price_min_formatted}
              max={final_price_max_formatted}
              /> : null}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
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
        <Grid item xs={isPreviewSearch ? 9 : 12}>
          <Grid container justifyContent="center" spacing={2}>
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
