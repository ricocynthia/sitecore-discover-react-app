// Recommendation Widget declaration
import { useState } from "react";
import { trackPDPViewEvent } from "@sitecore-discover/react";
import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const RfkRecommendation = ({
	loading,
	title,
	products = [],
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
	const paperStyles = {
		height: 400,
		width: 300
	}
	return (
    <Container>
      {!loading && products.length ? (
        <div>
			<h1> Products For You</h1>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" spacing={3}>
						{products.map(product => (
							<Grid key={product.sku} item>
								<Paper style={paperStyles}>
									<h4>{product.name}</h4>
									<div style={styleObject}>
										<img width={200} src={product.image_url} />
										{product.sku}
										<br />
										<b>Price: {product.price}</b>
										<br />
										<button onClick={() => onProductClick(product.sku)}> create pdp view event</button>
									</div>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>			
        </div>
      ) : (
        <div> Loading ... </div>
      )}
    </Container>
  );
};

export default RfkRecommendation;