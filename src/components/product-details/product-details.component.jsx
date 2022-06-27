import { Container, Grid, Typography, Button} from "@material-ui/core";

const priceStyles = {
    textDecoration: 'line-through',
    color: '#8c8c8c',
    marginRight: '5px'
  }

const ProductDetailsComponent = ({ sku, imgUrl, name, price, finalPrice }) => (
    <Container style={{ paddingTop: "1rem" }}>
      <Grid container>
        <Grid item xs={6}>
          <img src={imgUrl} />
        </Grid>
        <Grid item xs={6}>
          <Grid item>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="caption"> SKU: {sku}</Typography>
          </Grid>
          <Grid item style={{ paddingTop: "2rem" }}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              {parseFloat(price) !== parseFloat(finalPrice) ? (
                <span style={priceStyles}>
                  ${parseFloat(price)}
                </span>
              ) : null}
              ${parseFloat(finalPrice)}
            </Typography>
            <Button
              variant="contained"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              Add to Cart
            </Button>
          </Grid>
          <Grid item style={{ paddingTop: "2rem" }}>
            <Typography variant="caption">Description</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac
              sodales ipsum. Mauris bibendum, mauris pulvinar egestas aliquet,
              tortor mauris aliquet nisi, eget tempor libero sem ut libero.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Praesent et tortor sapien. Curabitur egestas nec nisl in volutpat.
              Fusce aliquam, nisl et porta posuere, arcu mi lobortis mi, vel
              facilisis enim tortor nec sem. Nunc viverra volutpat neque, non
              scelerisque ex iaculis in. Suspendisse sed porttitor libero.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
  
export default ProductDetailsComponent;