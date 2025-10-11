import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "../main/home";
import About from "../main/about";
import Contact from "../main/contact";
import ProductStore from "../main/store";
import ProductQuatation from "../../sales/products/productQuatation";
import BoltSeal from "../main/All-product/BoltSeal";
import Product from "../main/All-product/ContainerSeal";
import Padlock from "../main/All-product/Padlock";
import PlasticSeal from "../main/All-product/PlasticSeal";
import ProductList from "../main/All-product/ProductList";
import SealCutter from "../main/All-product/SealCutter";
import axiosInstance from "../../../api/axiosInstance";
import API_PATHS from "../../../api/apiUrl";

function HomeRouters() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.productMaster);
      setProducts(res.data || []);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Map product name to component
  const getComponentByName = (name) => {
    switch (name) {
      case "BoltSeal":
        return BoltSeal;
      case "Padlock":
        return Padlock;
      case "PlasticSeal":
        return PlasticSeal;
      case "SealCutter":
        return SealCutter;
      default:
        return ProductList;
    }
  };

  return (
    <Routes>
      {/* Static Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/store" element={<ProductStore />} />
      <Route path="/quate" element={<ProductQuatation />} />
      <Route path="/bolt" element={<BoltSeal />} />
      <Route path="/container" element={<Product />} />
      <Route path="/padlock" element={<Padlock />} />
      <Route path="/plastic" element={<PlasticSeal />} />
      <Route path="/product" element={<ProductList />} />
      <Route path="/cutter" element={<SealCutter />} />

      {/* Dynamic Routes */}
      {products.filter(Boolean).map((p) => {
        const Component = getComponentByName(p.name);
        return (
          <Route
            key={p._id}
            path={`/product/${p.name}`}
            element={<Component productName={p.name} />}
          />
        );
      })}
    </Routes>
  );
}

export default HomeRouters;
