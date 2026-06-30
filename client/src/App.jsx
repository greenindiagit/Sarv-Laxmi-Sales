
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout/layout";
import Home from "./pages/homePage/home";
import About from "./pages/homePage/about";
import Contact from "./pages/homePage/contact";
import ProductStore from "./pages/homePage/store";
import ProductQuatation from "./pages/quotation/productQuatation";
import BoltSeal from "./pages/products/BoltSeal";
import Container from "./pages/products/ContainerSeal";
import Padlock from "./pages/products/Padlock";
import PlasticSeal from "./pages/products/PlasticSeal";
import ProductList from "./pages/products/ProductList";
import SealCutter from "./pages/products/SealCutter";
import Disclaimer from "./pages/quick/disclaimer";

import TermsConditions from "./pages/quick/terms-conditions";
import Parivacy from "./pages/quick/parivacy-policy";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/store" element={<ProductStore />} />
          <Route path="/quate" element={<ProductQuatation />} />
          <Route path="/bolt" element={<BoltSeal />} />
          <Route path="/container" element={<Container />} />
          <Route path="/padlock" element={<Padlock />} />
          <Route path="/plastic" element={<PlasticSeal />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/cutter" element={<SealCutter />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/term-condition" element={<TermsConditions />} />
          <Route path="/parivacy-policy" element={<Parivacy />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
