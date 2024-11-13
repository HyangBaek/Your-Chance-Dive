// MyPage.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const MyPage = ({ user, setUser }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userSales, setUserSales] = useState([]);
    const [userPurchases, setUserPurchases] = useState([]);

    useEffect(() => {
        if (user) {
            console.log("User:", user); // 로그로 user 객체 확인
            //fetchUserInfo();
        }
    }, [user]);
  
    // 사용자 정보 가져오기
/*    const fetchUserInfo = async () => {
        if (!user || !user.id) return; // user 또는 user.id가 없으면 함수 종료
        
        try {
            const userToken = localStorage.getItem('token'); // 로그인 시 저장된 토큰 가져오기

            const response = await fetch(`http://localhost:3000/api/users?=${user.id}`, {
                method: 'GET', // 기본이므로 생략 가능
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`, // 인증 토큰 포함
                },
            });

        if (!response.ok) {
            console.error(`Error fetching user purchases: ${response.status} - ${response.statusText}`);
            return;
        }
      
        const data = await response.json();
        console.log('Fetched data:', data);
        setUserInfo(data); // 사용자 정보를 상태로 저장
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
*/
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

    // 사용자 구매 내역 가져오기
    const fetchUserPurchases = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/purchases?buyerId=${user.id}`);
            const data = await response.json();
            setUserPurchases(data);
        } catch (error) {
            console.error('Error fetching user purchases:', error);
        }
    };

    return (
        <>
          <div>
            <h2>사용자 정보</h2>
            {user ? (
              <div>
                <p>이름: {user.username}</p>
                <p>이메일: {user.email}</p>
              </div>
            ) : (
              <p>사용자 정보를 가져오는 중...</p>
            )}
        
            <h2>판매 내역</h2>
            {userSales.length > 0 ? (
              <ul>
                {userSales.map((sale) => (
                  <li key={sale.id}>{sale.itemName} - {sale.price}원</li>
                ))}
              </ul>
            ) : (
              <p>판매 내역이 없습니다.</p>
            )}

            <h2>구매 내역</h2>
            {userPurchases.length > 0 ? (
              <ul>
                {userPurchases.map((purchase) => (
                  <li key={purchase.id}>{purchase.itemName} - {purchase.price}원</li>
                ))}
              </ul>
            ) : (
              <p>구매 내역이 없습니다.</p>
            )}
        </div>
    </>
  );
};
export default MyPage;