// Recommendation Widget declaration
import { useState } from "react";
import { trackPDPViewEvent } from "@sitecore-discover/react";
import { Container } from "@material-ui/core";

const RfkRecommendation = ({
	loading,
	title,
	products = [],
	dispatch,
	onNavigationNext,
	onNavigationPrev,
	onProductClick
}) => {
	const onPrevClick = () => {
		if ( index === 0 ){
			setIndex(products.length-1);
		} else {
			setIndex(index-1);
		}
    	onNavigationPrev({ index });
		trackPDPViewEvent('831847072')
	};
	const onNextClick = (sku) => {
		if ( index === products.length-1 ){
			setIndex(0);
		} else {
			setIndex(index+1);
		}
		onNavigationNext({ index });
		trackPDPViewEvent(sku ?? '831828850')
	};
	const [index, setIndex] = useState(0);
	const styleObject = {
		width : 200, 
		align : "center"
	}
	return (
    <Container>
      {!loading && products.length ? (
        <div><h1> Products For You</h1>
			{products.map(product => (
				<div>
			  <h4>{product.name}</h4>
			  <div style={styleObject}>
				<img width={200} src={product.image_url} />
				{product.sku}
				<br />
				<b>Price: {product.price}</b>
				<br />
				<button onClick={() => onProductClick(product.sku)}> create pdp view event</button>
			  </div>
			  </div>
			))}
        </div>
      ) : (
        <div> Loading ... </div>
      )}
    </Container>
  );
};

export default RfkRecommendation;