import { Container } from "@material-ui/core";
import {   Actions as CoreActions,
  useRecommendation,
  useRecommendationContextReducer,
  widget,
  WidgetDataType, } from "@sitecore-discover/react";
import { RecommendationActionTypes } from '@sitecore-discover/widgets';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/shared/product-card";

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

const RecommendationComponent = ({ title }) => {
  const navigate = useNavigate();
  const {
    actions: {onNavigationNext, onNavigationPrev, onProductClick},
    queryResult: { isLoading, isFetching, data: { content: { product: { value: products = [] } = {} } = {} } = {} },
    context: { currentSlide }
  } = useRecommendation((q)=>{
    q.getRequest().setNumberProducts(12)
  });

  useRecommendationContextReducer((state, action) => {
    switch (action.type) {
      case CoreActions.REQUEST_SUCCESS:
        return {
          ...state,
          currentSlide: 0,
        };
      case RecommendationActionTypes.NAVIGATION_NEXT:
        return {
          ...state,
          currentSlide: state.currentSlide + 1,
        };
      case RecommendationActionTypes.NAVIGATION_PREV:
        return {
          ...state,
          currentSlide: state.currentSlide - 1,
        };
      default:
        return state;
    }
  }, []);

  const ready = (!isLoading && !isFetching) || products.length > 0;
  
  const onPDPEventBtnClick = (sku) => {
    onProductClick(sku);
    navigate(`/products/detail/${sku}`);
  };

  return <Container style={{height: '100%'}}>
  {ready ? (
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
}

// const RfkRecommendation = ({
//   loading,
//   products = [],
//   onProductClick,
//   onNavigationNext,
//   onNavigationPrev,
//   title,
// }) => {
//   const onPDPEventBtnClick = (sku) => {
//     onProductClick(sku);
//     navigate(`/products/detail/${sku}`);
//   };
//   const responsive = {
//     superLargeDesktop: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 4,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };
//   return (
//     <Container style={{height: '100%'}}>
//       {!loading && products.length ? (
//         <div>
//           <h1> {title}</h1>
//           <Carousel responsive={responsive}>
//             {products.map((product) => (
// 				<div style={{display: 'flex !important'}}>
// 					<ProductCard
// 					  key={product.sku}
// 					  {...product}
// 					  onClick={() => onPDPEventBtnClick(product.sku)}
// 					  isPreviewSearch={false}
// 					/>
// 				</div>
//             ))}
//           </Carousel>
//         </div>
//       ) : (
//         <div> Loading ... </div>
//       )}
//     </Container>
//   );
// };

export default widget(RecommendationComponent, WidgetDataType.RECOMMENDATION);
