import React, { useState, useEffect } from 'react';

const Sideber = ({ user, setUser }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const openNav = () => {
        setSidebarOpen(true);
    };

    const closeNav = () => {
        setSidebarOpen(false);
    };

    return (
        <>
            {/* <!-- Menu icon to open sidebar --> */}
            <span onClick={openNav} className="w3-button w3-top w3-white w3-text-grey" style={{ width: 'auto', right: 0, 'marginTop': '8px', 'marginRight': '8px' }}><i className="fa fa-bars"></i></span>


            {/* <!-- Hidden Sidebar (reveals when clicked on menu icon)--> */}
            <nav className="w3-sidebar w3-white w3-animate-right w3-large w3-right w3-card" id="mySidebar" style={{ width: isSidebarOpen ? '20%' : '0', right: 0, display: isSidebarOpen ? 'block' : 'none', 'marginTop': '18px' }}>
                <a href="#" onClick={() =>{closeNav()}} className="w3-button w3-light-gray w3-large w3-display-topright w3-center" style={{ padding: `0 '12px'`, 'marginTop': '8px', 'marginRight': '8px' }}>
                    <i className="fa fa-remove" onClick={closeNav}></i>
                </a>
                <div className="w3-bar-block" style={{ 'marginTop': '60px' }}>
                    <a href="/" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>Home</a>
                    <a href="/mypage" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>My Porfile</a>
                    <a href="#" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>My Events</a>
                    <a href="#" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>My Message</a>
                    <a href="/additem" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>판매 상품 등록</a>
                    <a href="/items" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>판매 중인 상품</a>
                    <a href="/addbook" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>중고 도서 등록</a>
                    <a href="/books" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>등록 도서 목록</a>
                    <a href="#" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>예약 중인 상품</a>
                    <a href="#" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>구매 완료 상품</a>
                    <a href="#" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>판매 완료 상품</a>
                    <a href="/introduce" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>About</a>
                    <a href="#contact" className="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onClick={() =>{closeNav()}}>Contact</a>
                </div>
            </nav>
        </>
    );
};
export default Sideber;