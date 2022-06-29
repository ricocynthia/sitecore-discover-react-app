import { Typography } from "@material-ui/core";

const priceStyles = {
  textDecoration: "line-through",
  color: "#8c8c8c",
  marginRight: "5px",
};

const Price = ({ max, min, price, finalPrice }) => {
  if (max) {
    return (
      <div>
        <span>
          ${min} - ${max}
        </span>
      </div>
    );
  }
  const discounted = parseFloat(finalPrice) !== parseFloat(price);
  return (
    <Typography variant="body2">
      <span style={discounted ? priceStyles : {}}>${price}</span> {discounted && finalPrice ? <span>${finalPrice}</span> : null}
    </Typography>
  );
};
export default Price;
