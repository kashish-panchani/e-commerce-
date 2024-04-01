export const settings = {
  dots: true,
  infinite: true,
  speed: 300,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const productmodal = (product, openModal, setSearchTerm) => {
  openModal(product);
  setSearchTerm("");
};
export const openModal = (product,setSelectedProduct,cartItems,setAddedToCart) => {
  setSelectedProduct(product);
  const isInCart = cartItems?.some((item) => item.id === product.id);
  setAddedToCart(isInCart);
  localStorage.setItem("selectedProduct", JSON.stringify(product));
};
