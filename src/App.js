import { useRoutes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/nav-bar/nav-bar-component";
import Home from "./pages/home/home";
import PageNotFound from "./pages/page-not-found/page-not-found";
import ProductListPage from "./pages/product-list/product-list-page";
import ProductDetails from "./pages/product-details/product-details";
import {  WidgetsProvider } from "@sitecore-discover/react";

function App() {
  const DiscoverConfig = {
    env: process.env.REACT_APP_ENVIRONMENT,
    customerKey: process.env.REACT_APP_CUSTOMER_KEY,
    apiKey: process.env.REACT_APP_API_KEY,
    useToken: true,
  };

  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "products",
      element: <ProductListPage />,
      children: [{ path: ":gender" }, { path: ":gender:category" }],
    },
    {
      path: "/products/detail/:sku",
      element: <ProductDetails />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div>
      <WidgetsProvider {...DiscoverConfig}>
      <NavBar />
        {routes}
      </WidgetsProvider>
    </div>
  );
}

export default App;
