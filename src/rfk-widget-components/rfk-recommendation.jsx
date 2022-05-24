// Recommendation Widget declaration
import { useState } from "react";

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
	};

	const onNextClick = () => {
		if ( index === products.length-1 ){
			setIndex(0);
		} else {
			setIndex(index+1);
		}
		onNavigationNext({ index });
	};
	const [index, setIndex] = useState(0);
	const styleObject = {
		width : 200, 
		align : "center"
	}
	return (
        <div>
		{ !loading && products.length ?  ( <div><h1>{products[index].name}</h1>
					<button onClick={onPrevClick}>Prev</button>
					<div style={styleObject}>
						<img width={200} src={products[index].image_url} />
						{products[index].name}
						<br />
						<b>Product #: {index+1}</b>
						<br />{products[index].image_url}
					</div>
					<button onClick={onNextClick}>Next</button></div>
			) : ( <div> Loading ... </div > )
		}
		</div>
	)
};

export default RfkRecommendation;