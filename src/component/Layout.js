import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';



function Layout({children, isLoggedIn, setIsLoggedIn}) {
    

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <main className="flex-fill page-container">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout;