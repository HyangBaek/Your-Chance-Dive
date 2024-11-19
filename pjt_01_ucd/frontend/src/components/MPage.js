import React from 'react';
import style from './style/MyPage.module.css';


const MPage = () => {
  return (
    <div className="nav" style={{ width: '90%', marginTop: '80px' }}>
      
      <div className="w3-col m3">
        <div className="nav">네비
      <button className="w3-button w3-block w3-theme-l1 w3-left-align">
                      <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> 스소
                    </button>
      <button className="w3-button w3-block w3-theme-l2 w3-left-align">
                      <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> 스기
                    </button>
      <button className="w3-button w3-block w3-theme-l3 w3-left-align">
                      <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> 스전
                    </button>
      </div></div>
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

export default MPage;