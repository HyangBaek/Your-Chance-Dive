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
            <span onClick={openNav} class="w3-button w3-top w3-white w3-text-grey" style={{ width: 'auto', right: 0, 'margin-top': '8px', 'margin-right': '8px' }}><i class="fa fa-bars"></i></span>


            {/* <!-- Hidden Sidebar (reveals when clicked on menu icon)--> */}
            <nav class="w3-sidebar w3-white w3-animate-right w3-large w3-right w3-card" id="mySidebar" style={{ width: isSidebarOpen ? '20%' : '0', right: 0, display: isSidebarOpen ? 'block' : 'none', 'margin-top': '18px' }}>
                <a href="javascript:void(0)" onclick="closeNav()" class="w3-button w3-light-gray w3-large w3-display-topright w3-center" style={{ padding: `0 '12px'`, 'margin-top': '8px', 'margin-right': '8px' }}>
                    <i class="fa fa-remove" onClick={closeNav}></i>
                </a>
                <div class="w3-bar-block" style={{ 'margin-top': '60px' }}>
                    <a href="/" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">Home</a>
                    <a href="/mypage" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">My Porfile</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">My Events</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">My Message</a>
                    <a href="/additem" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">판매 상품 등록</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">판매 중인 상품</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">예약 중인 상품</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">구매 완료 상품</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">판매 완료 상품</a>
                    <a href="/introduce" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">About</a>
                    <a href="#contact" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">Contact</a>
                </div>
            </nav>
        </>
    );
};
export default Sideber;