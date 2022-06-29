import { useRoutes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/nav-bar/nav-bar-component";
import Home from "./pages/home/home";
import PageNotFound from "./pages/page-not-found/page-not-found";
import ProductListPage from "./pages/product-list/product-list-page";
import ProductDetails from "./pages/product-details/product-details";
import "./config/reflektion-config";

function App() {
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
      <NavBar />
      {routes}
    </div>
  );
}

export default App;
