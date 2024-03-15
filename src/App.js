import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import Login from "./Login";
import Cart from "./components/Cart";
import ProductsDetail from "./components/ProductsDetail";
import HomePage from "./HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<HomePage />} />
        <Route path="/all" exact element={<Products />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/wishlist" exact element={<Wishlist />} />
        <Route path="/ProductsDetail" exact element={<ProductsDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
