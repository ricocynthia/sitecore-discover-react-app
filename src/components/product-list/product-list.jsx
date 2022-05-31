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
    return <div class="rfksdk_product rfk_sp_product">
      <div class="rfksdk_product__wrapper">
        <a href={url} onClick={onClick}
          ><img class="rfksdk_product__image" src={image_url} alt={name}
        /></a>
      </div>
      <div class="rfksdk_product__info">
        <a href={url}>
          {includeSku
            ? <div class="rfksdk_product__sku">{sku}</div>
            : null}
          <div class="rfksdk_product__name">{name}</div>
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
      (product) => <li class="rfk_product">
        <ProductItem
          {...product}
          key={product.sku}
          onClick={onProductClick}
        />
      </li>,
    )}
  </ul>;
};

export default ProductList;
