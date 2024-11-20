// AboutPage.js
import React from "react";

const AboutPage = () => {
  return (
    <>
      {/* Navigation */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="#page-top">
            <img src="assets/img/navbar-logo.svg" alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars ms-1"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Masthead */}
      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading">Welcome To Our Site!</div>
          <div className="masthead-heading text-uppercase">중고거래 사이트</div>
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
                중고교재를 보다 더 간편하고 싸게 구매가능합니다.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Easy Online Purchase</h4>
              <p className="text-muted">
                인터넷을 통한 구매로 어디서나 언제나 이용가능
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
          </div>
          <ul className="timeline">
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src="assets/img/about/1.jpg"
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>팀명</h4>
                  <h4 className="subheading">숨참고 유찬 Dive</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    유찬다이브(YouChan Dive): 유저에게 찬스를 제공하며, 중고
                    거래의 세계를 탐험하도록 돕습니다.
                  </p>
                </div>
              </div>
            </li>
            {/* 추가적인 타임라인 항목 생략 */}
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
