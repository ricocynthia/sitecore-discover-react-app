const Price = ({ max, min, price, finalPrice }) => {
    if (max) {
      return <div className="rfksdk_price">
        <span className="rfksdk_price__range">${min} - ${max}</span>
      </div>;
    }
    const discounted = finalPrice !== price;
    return <div className={discounted ? "rfksdk_price--discounted" : ""}>
      <span className="rfksdk_price__original">${price}</span>
      {discounted && finalPrice
        ? <span className="rfksdk_price__final">${finalPrice}</span>
        : null}
    </div>;
  };
  
const ProductItem = ({
    includeSku,
    className,
    onClick,
    ...product
  }) => {
    const {
      url,
      name,
      sku,
      final_price_min_formatted,
      final_price_max_formatted,
      final_price,
      price,
      image_url
    } = product;
    return <div>
      <div>
        <a href={url} onClick={onClick}
          ><img src={image_url} alt={name}
        /></a>
      </div>
      <div >
        <a href={url}>
          {includeSku
            ? <div>{sku}</div>
            : null}
          <div>{name}</div>
        </a>
        <Price
          className="rfksdk_product__price"
          price={price}
          finalPrice={final_price}
          min={final_price_min_formatted}
          max={final_price_max_formatted}
        />
        <a href={url} onClick={onClick} className="rfksdk_product__view-details"
          >View</a
        >
      </div>
    </div>;
  };

const ProductList = ({ products = [], onProductClick, onDiscoverStyleOpen, loaded, loading }) => {
  const ready = loaded && !loading;
  return <ul className="rfk_products" style={{width: '100%'}}>
    {!ready ? `...loading` : null}
    {ready &&
    products.map(
      (product) => <li key={product.sku}>
        <ProductItem
          {...product}
          onClick={onProductClick}
        />
      </li>,
    )}
  </ul>;
};

export default ProductList;
