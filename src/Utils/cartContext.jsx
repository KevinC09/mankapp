import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev =>
      prev.find(item => item.id === product.id)
        ? prev.map(item =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prev, { ...product, qty: 1 }]
    );
  };

  // NUEVO: Actualizar cantidad de un producto
  const updateQty = (id, qty) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  // NUEVO: Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      cartCount,
      updateQty,        // <-- agrega esto
      removeFromCart,   // <-- agrega esto
      setCart           // <-- opcional, si lo necesitas
    }}>
      {children}
    </CartContext.Provider>
  );
};