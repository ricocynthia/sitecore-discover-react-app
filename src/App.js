import { Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/nav-bar/nav-bar-component';
import Home from './pages/home/home';
import PageNotFound from './pages/page-not-found/page-not-found';
import ProductListPageByGender from './pages/product-list/product-list-page-by-gender';
import "./config/reflektion-config";
import ProductDetails from "./pages/product-details/product-details";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="products" element={<ProductListPageByGender />} />
      <Route key="products-gender" path="/products/:gender" element={<ProductListPageByGender />} />
      <Route key="products-gender" path="/products/:gender/:category" element={<ProductListPageByGender />} />
      <Route key="product-details" path="/products/detail/:sku" element={<ProductDetails/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </div>
    
  );
}

export default App;
