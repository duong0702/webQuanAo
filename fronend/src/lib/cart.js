// src/lib/cart.js

// Helper to get the user-specific cart key
const getCartKey = () => {
  const userData = localStorage.getItem("user");
  let userId = "";
  if (userData) {
    try {
      const user = JSON.parse(userData);
      userId = user._id || user.id || "";
    } catch {
      userId = "";
    }
  }
  return userId ? `cart_${userId}` : "cart";
};

export const getCart = () => {
  const cartKey = getCartKey();
  const cart = localStorage.getItem(cartKey);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  const cartKey = getCartKey();
  localStorage.setItem(cartKey, JSON.stringify(cart));
};

export const addToCart = (item) => {
  const cart = getCart();

  // default qty to 1 if not provided
  const qtyToAdd = typeof item.qty === "number" && item.qty > 0 ? item.qty : 1;

  // match by product id + selected options to deduplicate similar items
  const match = (i) =>
    i.product === item.product &&
    (i.selectedColor || "") === (item.selectedColor || "") &&
    (i.selectedSize || "") === (item.selectedSize || "");

  const exist = cart.find(match);

  if (exist) {
    exist.qty = (exist.qty || 0) + qtyToAdd;
  } else {
    cart.push({
      cartId: crypto.randomUUID(), // ⭐ Unique ID for each cart item
      product: item.product,
      name: item.name || "",
      image: item.image || "",
      price: item.price || 0,
      qty: qtyToAdd,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    });
  }

  saveCart(cart);
};
