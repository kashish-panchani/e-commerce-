import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import Login from "./components/Login";
import Cart from "./components/Cart";
import ProductsDetail from "./components/ProductsDetail";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import ErrorPage from "./components/ErrorPage";
import CategoryFilter from "./components/CategoryFilter";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/all" exact element={<Products />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/wishlist" exact element={<Wishlist />} />
        <Route path="/ProductsDetail" exact element={<ProductsDetail />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route
          path="/CategoryFilter/:type"
          exact
          element={<CategoryFilter />}
        />
        <Route path="/*" exact element={<ErrorPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
