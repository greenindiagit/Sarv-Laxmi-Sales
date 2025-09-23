import { Route, Router, Routes } from "react-router-dom";
import Home from "../main/home";
import About from "../main/about";
import Contact from "../main/contact";
import ProductStore from "../main/store";
import ProductQuatation from "../../sales/products/productQuatation";
import BoltSeal from "../main/All-product/BoltSeal"
import Product from "../main/All-product/ContainerSeal"
import Padlock from "../main/All-product/Padlock"
import PlasticSeal from "../main/All-product/PlasticSeal"
import ProductList from "../main/All-product/ProductList"
import SealCutter from "../main/All-product/SealCutter"
function HomeRouters() {
    return ( 

        <div>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/store" element={<ProductStore/>}/>
                <Route path="/quate" element={<ProductQuatation/>}/>
                <Route path="/bolt" element={<BoltSeal/>}/>
                <Route path="/container" element={<Product/>}/>
                <Route path="/padlock" element={<Padlock/>}/>
                <Route path="/plastic" element={<PlasticSeal/>}/>
                <Route path="/product" element={<ProductList/>}/>
                <Route path="/cutter" element={<SealCutter/>}/>
                 
            </Routes>
        </div>  
     );
}

export default HomeRouters;