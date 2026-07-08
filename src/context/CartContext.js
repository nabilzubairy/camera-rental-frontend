// src/context/CartContext.js
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const { user, isLoggedIn } = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    // ⬇ Load cart items from backend
    const fetchCart = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`http://localhost:8080/cart/${user.id}`, {
                withCredentials: true,
            });
            setCart(res.data);
        } catch (error) {
            console.error("Error fetching cart", error);
        }
    };

    useEffect(() => {
        if (isLoggedIn && user) {
            fetchCart();
        }
    }, [isLoggedIn, user]);

    // ⬇ Add item to cart
    const addToCart = async (camera) => {
        console.log("Add to cart clicked:", camera); // Debug
        console.log("User:", user); // Debug

        if (!user) {
            alert("Please login to add items to cart");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/cart/add?userId=${user.id}&cameraId=${camera.id}`,
                {},
                { withCredentials: true }
            );


            console.log("Add to cart response:", response); // Debug

            alert("Item Added Successfully!");
            fetchCart();
        } catch (err) {
            console.error("Add to cart error:", err);
            alert("Failed to add cart item");
        }
    };


    // ⬇ Remove item from cart
    const removeFromCart = async (cartItemId) => {
        try {
            await axios.delete(`http://localhost:8080/cart/${cartItemId}`, {
                withCredentials: true,
            });
            alert("Item Removed Successfully From Cart!");
            fetchCart();
        } catch (err) {
            console.error("Remove error:", err);
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart,addToCart, removeFromCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
}
