import { trackPDPViewEvent } from "@sitecore-discover/react";
import { Container, Grid, Paper } from "@material-ui/core";

const RfkRecommendation = ({
	loading,
	products = [],
	onProductClick,
	// can i get more context on what/why this is needed? for analytics?
	onNavigationNext,
	onNavigationPrev
}) => {
	const styleObject = {
		width : 200, 
		align : "center"
	}
	const paperStyles = {
		height: 400,
		width: 300
	}
	const onPDPEventBtnClick = (sku) => {
		trackPDPViewEvent(sku)
		onProductClick(sku)
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
									<h5 className="my-3 mx-2">{product.name}</h5>
									<div className="mx-auto" style={styleObject}>
										<img width={200} src={product.image_url} />
										<br />
										<b>Price: {product.price}</b>
										<br />
										<button onClick={() => onPDPEventBtnClick(product.sku)}> create pdp view event</button>
										<button onClick={() => onNavigationNext({index: 3})}> what does this do?</button>
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