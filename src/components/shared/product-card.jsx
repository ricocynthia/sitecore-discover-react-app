import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@material-ui/core";
import Price from "./price";


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
      <CardActionArea>
        <CardMedia
          component="img"
          height={isPreviewSearch ? 150 : 300}
          image={image_url}
        />
        <CardContent style={isPreviewSearch ? {height: '35px'} : {}}>
          <Typography gutterBottom variant={isPreviewSearch ? "inherit" : undefined}>
            {name}
          </Typography>
          { !isPreviewSearch ? <Price
              price={price}
              finalPrice={final_price}
              min={final_price_min_formatted}
              max={final_price_max_formatted}
              /> : null}
        </CardContent>
      </CardActionArea>
      <Container>
          {!isPreviewSearch ? <Button fullWidth style={{ marginTop: "1rem", marginBottom: "1rem" }} variant="contained"> Add to Cart </Button> : null}
      </Container>
    </Card>
  </Grid>
  };

  export default ProductCard;