// AboutPage.js
import React from "react";
import './style/AboutPage.css';

const AboutPage = () => {
  return (
    <>
      {/* Navigation */}
      <br /><br /><br /><br />

      {/* Masthead */}
      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading">Welcome To Our Site!</div>
          <div className="masthead-heading text-uppercase">교재 중고 거래 사이트</div>
          <a className="btn btn-primary btn-xl text-uppercase" href="#services">
            Tell Me More
          </a>
        </div>
      </header>

      {/* Services */}
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Services</h2>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Used Textbook Trading</h4>
              <p className="text-muted">
                중고 교재를 보다 더 간편하고 싸게 구매 가능합니다
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Easy Online Purchase</h4>
              <p className="text-muted">
                인터넷을 통한 구매로 어디서나 언제나 이용 가능
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Web Security</h4>
              <p className="text-muted">철저한 웹 보안 보장</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="page-section" id="about">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">About</h2>
            <h3 class="section-subheading text-muted">사이트 알아보기</h3>
          </div>
          <ul className="timeline">
            <li>
              <div className="timeline-image">
                <span className="fa-stack fa-5x">
                  <i className="fas fa-solid fa-users fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <h4>숨참고 유찬 Dive</h4>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <p className="text-muted">
                    팀명
                  </p>
                  <h4 className="subheading">유찬 Dive</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    유찬다이브(YouChan Dive)<br />
                    유저에게 찬스를 제공하며, <br />
                    중고 거래의 세계를 탐험하도록 돕습니다
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image ">
                <span className="fa-stack fa-5x">
                  <i className="fas fa-regular fa-thumbs-up fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <p className="text-muted">
                    프로젝트명
                  </p>
                  <h4>숨참고</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                  숨겨둔 보물 같은<br />중고 거래의 가치 있는 깊이 있는 발견을 의미합니다<br /><br />
                  사용자가 좋은 중고 물품을 찾아낼 때<br />
                  마치 물속으로 깊이 다이빙하듯, 신중하게 탐색하며<br />
                  숨을 고르게 만드는 경험을 상징하죠<br /><br />
                  이 플랫폼에서는 누구나 숨을 참고 보물을 찾듯<br />
                  각 제품의 가치를 새롭게 발견할 수 있습니다<br /><br />
                  이를 통해 "숨참고"는 단순한 중고 거래를 넘어<br />
                  가치 있는 발견의 즐거움을 제공하는 공간을 지향합니다
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <h4>
                  Be Part
                  <br />
                  Of Our
                  <br />
                  Story!
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="page-section" id="contact">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Contact Us</h2>
            <h3 className="section-subheading text-muted">
              Lorem ipsum dolor sit amet consectetur.
            </h3>
          </div>
          <form id="contactForm">
            <div className="row align-items-stretch mb-5">
              <div className="col-md-6">
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="Your Name *"
                />
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="Your Email *"
                />
                <input
                  className="form-control"
                  id="phone"
                  type="tel"
                  placeholder="Your Phone *"
                />
              </div>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  id="message"
                  placeholder="Your Message *"
                ></textarea>
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary btn-xl text-uppercase"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
