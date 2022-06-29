import { Container } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/shared/product-card";

const RfkRecommendation = ({
  loading,
  products = [],
  onProductClick,
  onNavigationNext,
  onNavigationPrev,
  title,
}) => {
  const navigate = useNavigate();
  const onPDPEventBtnClick = (sku) => {
    onProductClick(sku);
    navigate(`/products/detail/${sku}`);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Container style={{height: '100%'}}>
      {!loading && products.length ? (
        <div>
          <h1> {title}</h1>
          <Carousel responsive={responsive}>
            {products.map((product) => (
				<div style={{display: 'flex !important'}}>
					<ProductCard
					  key={product.sku}
					  {...product}
					  onClick={() => onPDPEventBtnClick(product.sku)}
					  isPreviewSearch={false}
					/>
				</div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div> Loading ... </div>
      )}
    </Container>
  );
};

export default RfkRecommendation;
