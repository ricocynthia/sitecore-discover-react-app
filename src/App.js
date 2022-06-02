import './App.css';
import NavBar from './components/nav-bar/nav-bar-component';
import Home from './pages/home/home';
import { BrowserRouter as Router, Route, Routes, UNSAFE_NavigationContext, useLocation } from "react-router-dom";
import PageNotFound from './pages/page-not-found/page-not-found';
import React, { useState, useEffect, useContext } from 'react';
import ProductListPageByGender from './pages/product-list/product-list-page-by-gender';


function App() {
  const [showPreviewSearch, setShowPreviewSearch] = useState(false);
  const [keyphrase, setKeyPhrase] = useState('');
  const searchOnClick = (e) => {
    console.log('user clicked into search bar');
    setShowPreviewSearch(true)
  };
  const searchOnChange = (e) => {
    const keyphrase = e.target.value;
    setKeyPhrase(keyphrase)
  }
  return (
    <div>
      <NavBar 
        handleOnClick={searchOnClick}
        handleOnChange={searchOnChange}
      />
    <Routes>
      <Route path="/" element={<Home showPreviewSearch={showPreviewSearch}
      keyphrase={keyphrase} />} />
      <Route key="products-gender" path="/products/:gender" element={<ProductListPageByGender />} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </div>
    
  );
}

export default App;
