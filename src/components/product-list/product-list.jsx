import { Container, Grid } from "@material-ui/core";
import ProductCard from "../shared/product-card";

const ProductList = ({ 
  products = [], onProductClick, loading,
  isPreviewSearch = false
 }) => {
  const ready = !loading;
  return (<Container>
      {!ready ? <div> Loading...</div>
      : ready && products.length > 0 
        ? <Grid container spacing={2}>
        <Grid item xs={isPreviewSearch ? 9 : 12}>
          <Grid container justifyContent="center" spacing={2}>
            {products.map(product => <ProductCard 
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
