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
    <div>
      <span style={discounted ? priceStyles : {}}>${price}</span>
      {discounted && finalPrice ? <span>${finalPrice}</span> : null}
    </div>
  );
};
export default Price;
