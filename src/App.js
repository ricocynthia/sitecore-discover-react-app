import './App.css';
import { Widget } from '@sitecore-discover/react';
import './config/reflektion-config'

function App() {
  return (
    <div className="App">
      product recommendations:
      <Widget rfkId="hs-homepage-top-products"/>
    </div>
  );
}

export default App;
