// MyPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItems } from "../api/itemApi";
import { fetchSales } from "../api/saleApi";
import { hideParentElement } from './scripts/hide.js';
import style from './style/MyPage.module.css';

const MyPage = ({ user, setUser }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [userSales, setUserSales] = useState([]);
  const [userPurchases, setUserPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState('Tab1');
  const navigate = useNavigate();
  const spanRef = useRef(null);

  useEffect(() => {
    setActiveTab('Tab1'); // 기본적으로 첫 번째 탭을 활성화합니다.

    if (user) {
      console.log("User:", user); // 로그로 user 객체 확인
      //fetchUserInfo();
      fetchItems()
        .then(setItems)
        .catch((error) => console.error("Error:", error));

      fetchSales()
        .then(setUserSales)
        .catch((error) => console.error("Error:", error));
        }
    }, [user]);

  const handleCellClick = (type, id) => {
    // 상세 페이지로 이동
    if(type==='item') {
      navigate(`/items/${id}`);
    } else {
      navigate(`/books/${id}`);
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
  return (
    <>
      <div className={style}>
        <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: '80px' }}>
          <div className="w3-row">
            <div className="w3-col m3">
              <div className="w3-card w3-round w3-white">
                <br />
                <h4 className="w3-center">My Page</h4>
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
              <br />
              <div className="w3-card w3-round w3-white w3-hide-small">
                <div className="w3-container">
                  <br />
                  <p>Interests</p>
                  <p>
                    <span className="w3-tag w3-small w3-theme-d5">JavaScript</span>
                    <span className="w3-tag w3-small w3-theme-d4">Python</span>
                    <span className="w3-tag w3-small w3-theme-d3">HTML</span>
                    <span className="w3-tag w3-small w3-theme-d2">CSS</span>
                    <span className="w3-tag w3-small w3-theme-d1">AI</span>
                    <span className="w3-tag w3-small w3-theme">빅데이터</span>
                    <span className="w3-tag w3-small w3-theme-l1">컴퓨터일반</span>
                    <span className="w3-tag w3-small w3-theme-l2">통계학</span>
                    <span className="w3-tag w3-small w3-theme-l3">데이터베이스</span>
                    <span className="w3-tag w3-small w3-theme-l4">JSP</span>
                    <span className="w3-tag w3-small w3-theme-l5">AWS</span>
                  </p>
                </div>
              </div>
              <br />
              <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                <span ref={spanRef} onClick={() => { hideParentElement(spanRef) }} className="w3-button w3-theme-l3 w3-display-topright">
                  <i className="fa fa-remove"></i>
                </span>
                <br />
                <p><strong>Hey!</strong></p>
                <p>People are looking at your profile. Find out who.</p>
              </div>
              <div className="w3-card w3-round w3-white">
                <div className="w3-card w3-round">
                  <div className="w3-white">
                    <TabLink linkName="Tab1" setActiveTab={setActiveTab}>판매 중인 상품</TabLink>
                    <TabLink linkName="Tab2" setActiveTab={setActiveTab}>예약 중인 상품</TabLink>
                    <TabLink linkName="Tab3" setActiveTab={setActiveTab}>구매 완료 상품</TabLink>
                    <TabLink linkName="Tab4" setActiveTab={setActiveTab}>판매 완료 상품</TabLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="w3-col m7">
              <div className="w3-row-padding">
                <div className="w3-col m12">
                  <div className="w3-card w3-round w3-white w3-hide-small">
                    <div className="w3-container w3-padding">
                      <div className="w3-container">
                        <p className="w3-center"><br /><img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle" style={{ height: '106px', width: '106px' }} alt="Avatar" /></p>
                      </div>
                      <h6 className="w3-opacity">한 줄 소개</h6>
                      <p contentEditable="true" suppressContentEditableWarning={true} className="w3-border w3-padding">Status: Feeling Blue</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w3-card w3-white w3-round w3-margin">
                <div className="btn-group">
                  <button className={style.button}>판매 중 {userSales.length} 건</button>
                  <button className={style.button}>거래 중 0 건</button>
                  <button className={style.button}>거래 취소 0건</button>
                  <button className={style.button}>거래 완료 0 건</button>
                </div>
              </div>

              <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
                <TabContent linkName="Tab1" activeTab={activeTab}>
                  <div className="w3-container">
                    <h6>판매 중인 상품</h6>
                    <br />
                    <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
                      <thead><tr><th>상품명</th><th>가격</th></tr></thead>
                      <tbody>
                        {userSales.length > 0 ? (
                          userSales.map((sale) => {
                            const saleId = sale.item_id ?? sale.book_id; // item_id 또는 book_id를 사용
                            const saleType = sale.item_id ? "item" : "book"; // item/book 구분

                            return (
                              <tr
                                key={`${saleType}-${saleId}`} // 고유 key 설정
                                onClick={() => handleCellClick(saleType, saleId)} // 상세 페이지 이동 핸들러
                                style={{ cursor: "pointer" }}>
                                <td>{sale.item_name || sale.book_title}</td>
                                <td className={style.price}>
                                  {(sale.item_price ?? sale.book_price) === 0
                                    ? "0원"
                                    : `${sale.item_price ?? sale.book_price}원`}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr><td colSpan="2">판매 내역이 없습니다.</td></tr>
                        )}
                      </tbody>
                    </table><br />
                    <button className="w3-button w3-dark-grey">More <i className="fa fa-arrow-right"></i></button>
                  </div>
                </TabContent>
                <TabContent linkName="Tab2" activeTab={activeTab}>
                  <div className="w3-container">
                    <h6>예약 중인 상품</h6>
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
                          <tr><td colSpan="2">요청 내역이 없습니다.</td></tr>
            )}
                      </tbody>
                    </table><br />
                    <button className="w3-button w3-dark-grey">More <i className="fa fa-arrow-right"></i></button>
                  </div>
                </TabContent>
                <TabContent linkName="Tab3" activeTab={activeTab}>
                  <div className="w3-container">
                    <h6>구매 완료 상품</h6>
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
                          <tr><td colSpan="2">구매 내역이 없습니다.</td></tr>
                        )}
                      </tbody>
                    </table><br />
                    <button className="w3-button w3-dark-grey">More <i className="fa fa-arrow-right"></i></button>
                  </div>
                </TabContent>
                <TabContent linkName="Tab4" activeTab={activeTab}>
                  <div className="w3-container">
                    <h6>판매 완료 상품</h6>
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
                          <tr><td colSpan="2">판매 완료 내역 없습니다.</td></tr>
            )}
                      </tbody>
                    </table><br />
                    <button className="w3-button w3-dark-grey">More <i className="fa fa-arrow-right"></i></button>
                  </div>
                </TabContent>
                <br />
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
  );
};
export default MyPage;