import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { PageController } from "@sitecore-discover/react";
import { useNavigate } from "react-router-dom";
import Price from "./price";

const updateContextSku = (sku) => {
    const context = PageController.getContext();
    context.setPageSkus([sku])
}

const ProductCard = ({
    includeSku,
    className,
    onClick,
    isPreviewSearch = false,
    ...product
  }) => {
    let cardStyles = {
      width: 300,
    }
    if (isPreviewSearch) {
      cardStyles = {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 200
      }
    }
    const {
      name,
      sku,
      final_price_min_formatted,
      final_price_max_formatted,
      final_price,
      price,
      image_url
    } = product;
    return <Grid key={sku} item style={{flex: '1 !important'}}>
      <Card style={cardStyles} onClick={() => onClick(product.sku)}>
      <CardActionArea >
        <CardMedia
          component="img"
          height={isPreviewSearch ? 150 : 300}
          image={image_url}
        />
        <CardContent style={isPreviewSearch ? {height: '35px'} : {}}>
          <Typography gutterBottom variant={isPreviewSearch ? "inherit" : undefined}>
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
          {!isPreviewSearch ? <Button fullWidth style={{ marginTop: "1rem", marginBottom: "1rem" }} variant="contained"> Add to Cart </Button> : null}
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  };

  export default ProductCard;