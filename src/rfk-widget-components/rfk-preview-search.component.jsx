import ProductList from "../components/product-list/product-list";
import { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
import {
  Container,
  debounce,
  Grid,
  List,
  Link,
  ListItem,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { usePreviewSearch, widget, WidgetDataType } from "@sitecore-discover/react";

const RfkPreviewSearch = (props) => {
  const navigate = useNavigate();
  const { 
    actions: {
      onKeyphraseChange
    },
    context: { keyphrase },
    queryResult: {
    isError,
    isLoading,
    isFetching,
    data: {
      content: { product: { value: products = [] } = {} } = {},
      suggestion
    } = {},
  }} = usePreviewSearch((query) => {
    return {
      keyphrase: props.keyphrase
    }
  })
  const onFocus = (keyphrase) => {
    changeKeyphrase({ value: keyphrase });
  };

  const changeKeyphrase = useCallback(
    debounce(
      (target) =>
        onKeyphraseChange({
          keyphrase: target.value,
        }),
      500
    ),
    []
  );

  const inputQuerySelector = document.getElementById('rfkInput');

    const [open, setOpen] = useState(false);

    const inputFocusFn = () => {
      setOpen(true);
      onFocus(keyphrase);
    };
    
    const containerRef = useRef(null);

    useClickOutside(containerRef, () => {
      setOpen(false);
      onKeyphraseChange(null);
      // clear keyphrase in input
      const inputRef = document.querySelector('#rfkInput');
      inputRef.value = "";
    });

    useEffect(() => {
      const inputRef = document.querySelector("#rfkInput");
      // if (inputRef){
      inputRef.addEventListener("keyup", (e) => {
        switch (e.key) {
          case "Escape":
            setOpen(false);
            inputRef.value = "";
            break;
          case "Enter":
            window.location = `${redirectUrl}${e.target.value}`;
            break;
          default:
            setOpen(true);
            changeKeyphrase(e.target);
            break;
        }
      });
      inputRef.addEventListener("focus", inputFocusFn);
      return () => {
        inputRef.removeEventListener("change", changeKeyphrase);
        inputRef.removeEventListener("focus", inputFocusFn);
      };
    }, [inputQuerySelector]);

    const routeToPDP = (sku) => {
      navigate(`/products/detail/${sku}`)
    };
    

  return isLoading ? (
    <div> Loading... </div>
  ) : open ? (
    <Grid
      container
      style={{ backgroundColor: "white", color: "black" }}
      ref={containerRef}
    >
      <Container fixed>
        <Grid item xs={2}>
          {suggestion && suggestion.keyphrase?.length ? (
            <div>
              <h3>Did you mean?</h3>
              <List>
                {suggestion.keyphrase.map((suggestion) => (
                  <ListItem key={suggestion.text}>
                    <Link
                      href={`/products?q=${suggestion.text}`}
                      underline="none"
                    >
                      {suggestion.text}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={10}>
          {keyphrase ? (
            <h3>Top results for {keyphrase}</h3>
          ) : (
            <h3> Top Results </h3>
          )}
          <ProductList
            products={products?.slice(0, 6)}
            loaded={!isLoading}
            loading={isLoading}
            onProductClick={routeToPDP}
            isPreviewSearch={true}
          />
        </Grid>
      </Container>
    </Grid>
  ) : null;
};
export default widget(RfkPreviewSearch, WidgetDataType.PREVIEW_SEARCH);

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    if (window.PointerEvent) {
      document.addEventListener("pointerdown", listener);
    } else {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }
    return () => {
      if (window.PointerEvent) {
        document.removeEventListener("pointerdown", listener);
      } else {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      }
    };
  }, [ref, handler]);
};
