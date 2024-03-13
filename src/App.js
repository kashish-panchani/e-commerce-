import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";

import Login from "./Login";
import Cart from "./components/Cart";
import OpenModel from "./components/OpenModel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Products />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/wishlist" exact element={<Wishlist />} />
        <Route path="/openmodel" exact element={<OpenModel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
