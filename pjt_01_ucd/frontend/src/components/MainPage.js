import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { hideParentElement } from './scripts/hide.js';
import ItemList from './ItemList.js';
import ItemForm from './ItemForm.js';



const MainPage = ({ user, setUser }) => {

  const [userInfo, setUserInfo] = useState(null);
  const [userSales, setUserSales] = useState([]);
  const [userPurchases, setUserPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState('Tab1');
  const spanRef = useRef(null);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [view, setView] = useState('items');
  useEffect(() => {


    setActiveTab('Tab1'); // 기본적으로 첫 번째 탭을 활성화합니다.

    if (user) {
      console.log("User:", user); // 로그로 user 객체 확인
      //fetchUserInfo();
    }
  }, [user]);


  // 사용자 정보 가져오기
  // user에 있는 정보 사용

  // 사용자 판매 내역 가져오기
  const fetchUserSales = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/sales?sellerId=${user.id}`);
      const data = await response.json();
      setUserSales(data);
    } catch (error) {
      console.error('Error fetching user sales:', error);
    }
  };
  const TabLink = ({ linkName, setActiveTab, children }) => {
    const handleClick = (evt) => { setActiveTab(linkName); };
    return (
      <button className="tablink w3-button w3-block w3-theme-l1 w3-left-align" onClick={handleClick}><i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> {children} </button>
    );
  };
  const TabContent = ({ linkName, activeTab, children }) => (
    <div id={linkName} className="myLink" style={{ display: activeTab === linkName ? 'block' : 'none' }}> {children}
    </div>
  );
  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  fetchItems();
  const handleUpdateStatus = async (itemId, status) => {
    try {
      const response = await fetch('http://localhost:3000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ itemId, status, saleDate: new Date().toISOString(), buyerId: user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }

      const updatedItem = await response.json();
      alert(`상태가 '${status}'로 업데이트되었습니다.`);
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div className="nav" style={{ width: '90%', marginTop: '80px' }}>

        <ul className="nav" >
          <li><a className="w3-button w3-block w3-theme-l1 w3-right-align" style={{ width: '200px' }}>
            <i className="fa fa-circle-o-notch fa-fw w3-margin-left"></i> 스소
          </a></li>
          <li><a className="w3-button w3-block w3-theme-l2 w3-left-align">
            <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> 스기
          </a></li>
          <li><a className="w3-button w3-block w3-theme-l3 w3-left-align">
            <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> 스전
          </a></li>
        </ul></div>
      <div className="w3-card w3-round" style={{ width: '100%', height: '350px', marginTop: '30px', backgroundColor: 'grey' }}>
      </div>

      <div className="w3-card w3-round" style={{ width: '100%', marginTop: '30px' }}>


        <p className="  w3-left" style={{ Float: 'left', width: '48%', maxWidth: '48%', backgroundColor: 'grey', position: 'left' }}>

          <TabLink linkName="Tab1" setActiveTab={setActiveTab}>판매 중인 상품</TabLink>
          <TabContent linkName="Tab1" activeTab={activeTab}>
            <div className="w3-container">
              <h6>판매 중인 상품</h6>
              <br />

              <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
                <thead><tr><th>상품명</th><th>가격</th></tr></thead>
                <tbody>
                  {userSales.length > 0 ? (
                    <>
                      {userSales.map((sale) => (
                        <tr>
                          <td key={sale.id}>{sale.itemName}</td><td>{sale.itemPrice}원</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr><td colSpan="2">판매 내역이 없습니다.</td></tr>
                  )}
                </tbody>
              </table><br />
              <button className="w3-button w3-dark-grey">More <i className="fa fa-arrow-right"></i></button>
            </div>
          </TabContent>
        </p>

        <div className=" w3-right" style={{ Float: 'right', marginLeft: 'auto', width: '48%', maxWidth: '48%', backgroundColor: 'black', position: 'right' }}>
          <TabLink linkName="Tab1" setActiveTab={setActiveTab}>내가 올린 상품</TabLink>
          <TabContent linkName="Tab1" activeTab={activeTab}>
            <div className="w3-container">
              <h6>판매 중인 상품</h6>
              <br />
              <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
                <ItemList items={items} user={user} onUpdateStatus={handleUpdateStatus} />
                <thead><tr><th>상품명</th><th>가격</th></tr></thead>
                <tbody>

                  {userSales.length > 0 ? (
                    <>
                      {userSales.map((sale) => (
                        <tr>
                          <td key={sale.id}>{sale.itemName}</td><td>{sale.itemPrice}원</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr><td colSpan="2">판매 내역이 없습니다.</td></tr>
                  )}
                </tbody>
              </table><br />
              <button className="w3-button w3-dark-grey">More <i className="fa fa-arrow-right"></i></button>
            </div>
          </TabContent>

        </div>
      </div>
      <div className="w3-container w3-content" style={{ width: '90%', marginTop: '80px' }}>
        <div className="w3-row m3">
          <div className="w3-col ">
            <div className="w3-card w3-round w3-white">
              <br />
              <h4 className="w3-center">Main Page</h4>
              <br />
              <div className="w3-card w3-round">
                <div className="w3-white">
                  <button className="w3-button w3-block w3-theme-l1 w3-left-align">
                    <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Profile
                  </button>
                  <button className="w3-button w3-block w3-theme-l1 w3-left-align">
                    <i className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events
                  </button>
                  <button className="w3-button w3-block w3-theme-l1 w3-left-align">
                    <i className="fa fa-users fa-fw w3-margin-right"></i> My Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;