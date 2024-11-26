import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div>
        <h4>중고거래사이트</h4>
        <nav>
          <Link to="/notice" style={{ margin: "0 10px" }}>
            공지사항
          </Link>
          <Link to="/introduce" style={{ margin: "0 10px" }}>
            {" "}
            {/* 수정된 부분 */}
            브랜드소개
          </Link>
          <Link to="/sustainability" style={{ margin: "0 10px" }}>
            지속가능성
          </Link>
          <Link to="/contact" style={{ margin: "0 10px" }}>
            상품문의
          </Link>
          <Link to="/customer" style={{ margin: "0 10px" }}>
            고객사
          </Link>
          <Link to="/b2b" style={{ margin: "0 10px" }}>
            B2B 문의
          </Link>
        </nav>
      </div>
      <div style={{ marginTop: "10px", fontSize: "12px" }}>
        <p>
          대표: 홍길동 | 상호: (주)중고거래사이트 | 사업자번호: 123-45-67890
        </p>
        <p>주소: 경상남도 진주시 가좌동012 | 고객센터: 02-1234-5678</p>
        <p>
          개인정보 처리방침 | 이용약관 | 개인정보보호책임자: 홍길동
          (privacy@secondhand.com)
        </p>
        <p>&copy; 2024 중고 거래 사이트. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
