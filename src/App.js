import './App.css';
import NavBar from './components/nav-bar/nav-bar-component';
import Home from './pages/home/home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from './pages/page-not-found/page-not-found';
import React, { useState } from 'react';
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
    <Router>
      <React.Fragment>
      <NavBar handleOnClick={searchOnClick}
      handleOnChange={searchOnChange}/>
      </React.Fragment>
    <Routes>
      <Route path="/" element={<Home showPreviewSearch={showPreviewSearch}
      keyphrase={keyphrase} />} />
      <Route path="/products/:gender" element={<ProductListPageByGender/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  </Router>
    
  );
}

export default App;
