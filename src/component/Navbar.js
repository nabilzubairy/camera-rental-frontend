import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { cart,setCart  } = useContext(CartContext);


    const logoutHandler = async () => {
        await axios.post("http://localhost:8080/user/logout", {}, { withCredentials: true });
        setIsLoggedIn(false);
        setUser(null);
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/login");
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">CAMEO</Link>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cameras">Cameras</Link></li>



                        {isLoggedIn && user?.role?.toUpperCase() === "USER" && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/cart">Cart ({cart.length})</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/booking">Booking </Link></li>
                            </>
                        )}


                        {isLoggedIn && user?.role?.toUpperCase() === "ADMIN" && (
                            <li className="nav-item"><Link className="nav-link" to="/add-camera">Add Camera</Link></li>
                        )}


                        {isLoggedIn ? (
                            <li className="nav-item"><button className="btn btn-danger ms-3" onClick={logoutHandler}>Logout</button></li>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
