import "./Landingpage.css";
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/themify-icons.css";
import "./js/script";
import { useEffect, useState } from "react";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Scene";
import Car from "../../assets/car-30984_640.png";
import iphonex from "./images/iphonex.png";
import client_logos from "./images/client-logos.png";
import perspective_phone from "./images/perspective.png";
import appleicon from "./images/appleicon.png";
import client from "./images/client.png";
import dualphone from "./images/dualphone.png";
// import graphic from "./images/graphic.png";
import graphic from "../../assets/IMG_20240725_173925.png";
// import logo from "./images/logo.png";
import playicon from "./images/playicon.png";
import screen1 from "./images/screen1.jpg";
import screen2 from "./images/screen2.jpg";
import screen3 from "./images/screen3.jpg";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const Landingpage = () => {
  const [getuser, setGetuser] = useState("");
  useEffect(() => {
    $(function () {
      "use strict";

      /*-----------------------------------
       * FIXED  MENU - HEADER
       *-----------------------------------*/
      function menuscroll() {
        var $navmenu = $(".nav-menu");
        if ($(window).scrollTop() > 50) {
          $navmenu.addClass("is-scrolling");
        } else {
          $navmenu.removeClass("is-scrolling");
        }
      }
      menuscroll();
      $(window).on("scroll", function () {
        menuscroll();
      });
      /*-----------------------------------
       * NAVBAR CLOSE ON CLICK
       *-----------------------------------*/

      $(".navbar-nav > li:not(.dropdown) > a").on("click", function () {
        $(".navbar-collapse").collapse("hide");
      });
      /*
       * NAVBAR TOGGLE BG
       *-----------------*/
      var siteNav = $("#navbar");
      siteNav.on("show.bs.collapse", function (e) {
        $(this).parents(".nav-menu").addClass("menu-is-open");
      });
      siteNav.on("hide.bs.collapse", function (e) {
        $(this).parents(".nav-menu").removeClass("menu-is-open");
      });

      /*-----------------------------------
       * ONE PAGE SCROLLING
       *-----------------------------------*/
      // Select all links with hashes
      $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[data-toggle="tab"]')
        .on("click", function (event) {
          // On-page links
          if (
            location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
          ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length
              ? target
              : $("[name=" + this.hash.slice(1) + "]");
            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $("html, body").animate(
                {
                  scrollTop: target.offset().top,
                },
                1000,
                function () {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) {
                    // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  }
                }
              );
            }
          }
        });
      /*-----------------------------------
       * OWL CAROUSEL
       *-----------------------------------*/
      var $testimonialsDiv = $(".testimonials");
      if ($testimonialsDiv.length && $.fn.owlCarousel) {
        $testimonialsDiv.owlCarousel({
          items: 1,
          nav: true,
          dots: false,
          navText: [
            '<span class="ti-arrow-left"></span>',
            '<span class="ti-arrow-right"></span>',
          ],
        });
      }

      var $galleryDiv = $(".img-gallery");
      if ($galleryDiv.length && $.fn.owlCarousel) {
        $galleryDiv.owlCarousel({
          nav: false,
          center: true,
          loop: true,
          autoplay: true,
          dots: true,
          navText: [
            '<span class="ti-arrow-left"></span>',
            '<span class="ti-arrow-right"></span>',
          ],
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 3,
            },
          },
        });
      }
    }); /* End Fn */
    const user = localStorage.getItem("userinfo");
    console.log(user);
    setGetuser(user);
  }, []);

  return (
    <div>
      <Layout>
        <div>
          {/*  3d car moving model component */}

          {/* <div
            style={{
              height: "40px",
              width: "70%",
              padding: "0px",
              bottom: "10px",
            }}
          >
            <Canvas
              camera={{ position: [3, 20, 14.25], fov: 19 }}
              style={{
                backgroundColor: "#111a21",
                width: "100vw",
                height: "100vh",
              }}
            >
              <ambientLight intensity={"1.25"} />
              <ambientLight intensity={"0.1"} />
              <directionalLight intensity={"0.4"} />

              <Suspense fallback={null}>
                <Model position={[0, -0.1, 0]} />
              </Suspense>
              <OrbitControls autoRotate />
            </Canvas>
          </div> */}

          {/* Header content below the model */}
          {}
          <header className="bg-gradient" id="home">
            <div className="container mt-5">
              <h1>Welcome to Car Galary</h1>
              <p className="tagline">Manage cars in one place.</p>
            </div>
            <Container className="buttonedit">
              <div className="center">
                {!getuser && (
                  <>
                    <Link to="/Signin">
                      <button className="btn btn-outline-light btn1">
                        Login
                      </button>
                    </Link>
                    <Link to="/Register" className="btn">
                      <button className="btn-primary">Sign up</button>
                    </Link>
                  </>
                )}
              </div>
            </Container>

            {/* Replace the image with the Canvas model */}
            {/* <div
              className="model-holder mt-3"
              style={{
                height: "90vh",
                width: "60%",
                padding: "0px",
                bottom: "10px",
                border: "8px solid black",
                margin: "auto", // center the Canvas within the header
              }}
            >
              <Canvas
                camera={{ position: [3, 10, 14.25], fov: 20 }}
                style={{
                  width: "100%", // adjust to fit within the parent div
                  height: "90%", // adjust to fit within the parent div
                }}
                gl={{ alpha: true }} // transparent background
              >
                <ambientLight intensity={"1.50"} />
                <ambientLight intensity={"0.6"} />
                <directionalLight intensity={"1.9"} />
                <Suspense fallback={null}>
                  <Model position={[0, -0.1, 0]} />
                </Suspense>
                <OrbitControls autoRotate minDistance={5} maxDistance={15} />
              </Canvas>

            </div> */}
            <div className="img-holder mt-3" style={{ marginBottom: "30px" }}>
              <img src={Car} alt="phone" className="img-fluid" />
            </div>
          </header>

          <div className="client-logos my-5">
            <div className="container text-center">
              <img
                src={client_logos}
                alt="client logos"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="section light-bg" id="features">
            <div className="container">
              <div className="section-title">
                <small>HIGHLIGHTS</small>
                <h3>Features you love</h3>
              </div>
              <div className="row">
                <div className="col-12 col-lg-4">
                  <div className="card features">
                    <div className="card-body">
                      <div className="media">
                        <span className="ti-face-smile gradient-fill ti-3x mr-3" />
                        <div className="media-body">
                          <h4 className="card-title">Simple</h4>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer rutrum, urna eu pellentesque{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="card features">
                    <div className="card-body">
                      <div className="media">
                        <span className="ti-settings gradient-fill ti-3x mr-3" />
                        <div className="media-body">
                          <h4 className="card-title">Customize</h4>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer rutrum, urna eu pellentesque{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="card features">
                    <div className="card-body">
                      <div className="media">
                        <span className="ti-lock gradient-fill ti-3x mr-3" />
                        <div className="media-body">
                          <h4 className="card-title">Secure</h4>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer rutrum, urna eu pellentesque{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // end .section */}
          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-6">
                  <div className="box-icon">
                    <span className="ti-mobile gradient-fill ti-3x" />
                  </div>
                  <h2>Discover our App</h2>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Obcaecati vel exercitationem eveniet vero maxime ratione{" "}
                  </p>
                  <a href="#" className="btn btn-primary">
                    Read more
                  </a>
                </div>
              </div>
              <div className="perspective-phone">
                <img
                  src={perspective_phone}
                  alt="perspective phone"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          {/* // end .section */}
          <div className="section light-bg">
            <div className="container">
              <div className="section-title">
                <small>FEATURES</small>
                <h3>Do more with our app</h3>
              </div>
              <ul className="nav nav-tabs nav-justified" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#communication"
                  >
                    Communication
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#schedule">
                    Scheduling
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#messages">
                    Messages
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#livechat">
                    Live Chat
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="communication">
                  <div className="d-flex flex-column flex-lg-row">
                    <img
                      src={graphic}
                      alt="graphic"
                      className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"
                    />
                    <div>
                      <h2>Communicate with ease</h2>
                      <p className="lead">
                        Uniquely underwhelm premium outsourcing with proactive
                        leadership skills.{" "}
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer rutrum, urna eu pellentesque pretium, nisi nisi
                        fermentum enim, et sagittis dolor nulla vel sapien.
                        Vestibulum sit amet mattis ante. Ut placerat dui eu
                        nulla congue tincidunt ac a nibh. Mauris accumsan
                        pulvinar lorem placerat volutpat. Praesent quis
                        facilisis elit. Sed condimentum neque quis ex porttitor,
                      </p>
                      <p>
                        {" "}
                        malesuada faucibus augue aliquet. Sed elit est, eleifend
                        sed dapibus a, semper a eros. Vestibulum blandit
                        vulputate pharetra. Phasellus lobortis leo a nisl
                        euismod, eu faucibus justo sollicitudin. Mauris
                        consectetur, tortor sed tempor malesuada, sem nunc porta
                        augue, in dictum arcu tortor id turpis. Proin aliquet
                        vulputate aliquam.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="schedule">
                  <div className="d-flex flex-column flex-lg-row">
                    <div>
                      <h2>Scheduling when you want</h2>
                      <p className="lead">
                        Uniquely underwhelm premium outsourcing with proactive
                        leadership skills.{" "}
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer rutrum, urna eu pellentesque pretium, nisi nisi
                        fermentum enim, et sagittis dolor nulla vel sapien.
                        Vestibulum sit amet mattis ante. Ut placerat dui eu
                        nulla congue tincidunt ac a nibh. Mauris accumsan
                        pulvinar lorem placerat volutpat. Praesent quis
                        facilisis elit. Sed condimentum neque quis ex porttitor,
                      </p>
                      <p>
                        {" "}
                        malesuada faucibus augue aliquet. Sed elit est, eleifend
                        sed dapibus a, semper a eros. Vestibulum blandit
                        vulputate pharetra. Phasellus lobortis leo a nisl
                        euismod, eu faucibus justo sollicitudin. Mauris
                        consectetur, tortor sed tempor malesuada, sem nunc porta
                        augue, in dictum arcu tortor id turpis. Proin aliquet
                        vulputate aliquam.
                      </p>
                    </div>
                    <img
                      src={graphic}
                      alt="graphic"
                      className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"
                    />
                  </div>
                </div>
                <div className="tab-pane fade" id="messages">
                  <div className="d-flex flex-column flex-lg-row">
                    <img
                      src={graphic}
                      alt="graphic"
                      className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"
                    />
                    <div>
                      <h2>Realtime Messaging service</h2>
                      <p className="lead">
                        Uniquely underwhelm premium outsourcing with proactive
                        leadership skills.{" "}
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer rutrum, urna eu pellentesque pretium, nisi nisi
                        fermentum enim, et sagittis dolor nulla vel sapien.
                        Vestibulum sit amet mattis ante. Ut placerat dui eu
                        nulla congue tincidunt ac a nibh. Mauris accumsan
                        pulvinar lorem placerat volutpat. Praesent quis
                        facilisis elit. Sed condimentum neque quis ex porttitor,
                      </p>
                      <p>
                        {" "}
                        malesuada faucibus augue aliquet. Sed elit est, eleifend
                        sed dapibus a, semper a eros. Vestibulum blandit
                        vulputate pharetra. Phasellus lobortis leo a nisl
                        euismod, eu faucibus justo sollicitudin. Mauris
                        consectetur, tortor sed tempor malesuada, sem nunc porta
                        augue, in dictum arcu tortor id turpis. Proin aliquet
                        vulputate aliquam.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="livechat">
                  <div className="d-flex flex-column flex-lg-row">
                    <div>
                      <h2>Live chat when you needed</h2>
                      <p className="lead">
                        Uniquely underwhelm premium outsourcing with proactive
                        leadership skills.{" "}
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer rutrum, urna eu pellentesque pretium, nisi nisi
                        fermentum enim, et sagittis dolor nulla vel sapien.
                        Vestibulum sit amet mattis ante. Ut placerat dui eu
                        nulla congue tincidunt ac a nibh. Mauris accumsan
                        pulvinar lorem placerat volutpat. Praesent quis
                        facilisis elit. Sed condimentum neque quis ex porttitor,
                      </p>
                      <p>
                        {" "}
                        malesuada faucibus augue aliquet. Sed elit est, eleifend
                        sed dapibus a, semper a eros. Vestibulum blandit
                        vulputate pharetra. Phasellus lobortis leo a nisl
                        euismod, eu faucibus justo sollicitudin. Mauris
                        consectetur, tortor sed tempor malesuada, sem nunc porta
                        augue, in dictum arcu tortor id turpis. Proin aliquet
                        vulputate aliquam.
                      </p>
                    </div>
                    <img
                      src={graphic}
                      alt="graphic"
                      className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // end .section */}
          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img src={dualphone} alt="dual phone" className="img-fluid" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div>
                    <div className="box-icon">
                      <span className="ti-rocket gradient-fill ti-3x" />
                    </div>
                    <h2>Launch your App</h2>
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Obcaecati vel exercitationem eveniet vero maxime ratione{" "}
                    </p>
                    <a href="#" className="btn btn-primary">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // end .section */}
          <div className="section light-bg">
            <div className="container">
              <div className="row">
                <div className="col-md-8 d-flex align-items-center">
                  <ul className="list-unstyled ui-steps">
                    <li className="media">
                      <div className="circle-icon mr-4">1</div>
                      <div className="media-body">
                        <h5>Create an Account</h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer rutrum, urna eu pellentesque pretium
                          obcaecati vel exercitationem{" "}
                        </p>
                      </div>
                    </li>
                    <li className="media my-4">
                      <div className="circle-icon mr-4">2</div>
                      <div className="media-body">
                        <h5>Share with friends</h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer rutrum, urna eu pellentesque pretium
                          obcaecati vel exercitationem eveniet
                        </p>
                      </div>
                    </li>
                    <li className="media">
                      <div className="circle-icon mr-4">3</div>
                      <div className="media-body">
                        <h5>Enjoy your life</h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer rutrum, urna eu pellentesque pretium
                          obcaecati vel exercitationem{" "}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <img src={iphonex} alt="iphone" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          {/* // end .section */}
          <div className="section">
            <div className="container">
              <div className="section-title">
                <small>TESTIMONIALS</small>
                <h3>What our Customers Says</h3>
              </div>
              <div className="testimonials owl-carousel">
                <div className="testimonials-single">
                  <img src={client} alt="client" className="client-img" />
                  <blockquote className="blockquote">
                    Uniquely streamline highly efficient scenarios and 24/7
                    initiatives. Conveniently embrace multifunctional ideas
                    through proactive customer service. Distinctively
                    conceptualize 2.0 intellectual capital via user-centric
                    partnerships.
                  </blockquote>
                  <h5 className="mt-4 mb-2">Crystal Gordon</h5>
                  <p className="text-primary">United States</p>
                </div>
                <div className="testimonials-single">
                  <img src={client} alt="client" className="client-img" />
                  <blockquote className="blockquote">
                    Uniquely streamline highly efficient scenarios and 24/7
                    initiatives. Conveniently embrace multifunctional ideas
                    through proactive customer service. Distinctively
                    conceptualize 2.0 intellectual capital via user-centric
                    partnerships.
                  </blockquote>
                  <h5 className="mt-4 mb-2">Crystal Gordon</h5>
                  <p className="text-primary">United States</p>
                </div>
                <div className="testimonials-single">
                  <img src={client} alt="client" className="client-img" />
                  <blockquote className="blockquote">
                    Uniquely streamline highly efficient scenarios and 24/7
                    initiatives. Conveniently embrace multifunctional ideas
                    through proactive customer service. Distinctively
                    conceptualize 2.0 intellectual capital via user-centric
                    partnerships.
                  </blockquote>
                  <h5 className="mt-4 mb-2">Crystal Gordon</h5>
                  <p className="text-primary">United States</p>
                </div>
              </div>
            </div>
          </div>
          {/* // end .section */}
          {/* // end .section */}
          <div className="section" id="pricing">
            <div className="container">
              <div className="section-title">
                <small>PRICING</small>
                <h3>Upgrade to Pro</h3>
              </div>
              <div className="card-deck">
                <div className="card pricing">
                  <div className="card-head">
                    <small className="text-primary">PERSONAL</small>
                    <span className="price">
                      $14<sub>/m</sub>
                    </span>
                  </div>
                  <ul className="list-group list-group-flush">
                    <div className="list-group-item">10 Projects</div>
                    <div className="list-group-item">5 GB Storage</div>
                    <div className="list-group-item">Basic Support</div>
                    <div className="list-group-item">
                      <del>Collaboration</del>
                    </div>
                    <div className="list-group-item">
                      <del>Reports and analytics</del>
                    </div>
                  </ul>
                  <div className="card-body">
                    <a href="#" className="btn btn-primary btn-lg btn-block">
                      Choose this Plan
                    </a>
                  </div>
                </div>
                <div className="card pricing popular">
                  <div className="card-head">
                    <small className="text-primary">FOR TEAMS</small>
                    <span className="price">
                      $29<sub>/m</sub>
                    </span>
                  </div>
                  <ul className="list-group list-group-flush">
                    <div className="list-group-item">Unlimited Projects</div>
                    <div className="list-group-item">100 GB Storage</div>
                    <div className="list-group-item">Priority Support</div>
                    <div className="list-group-item">Collaboration</div>
                    <div className="list-group-item">Reports and analytics</div>
                  </ul>
                  <div className="card-body">
                    <a href="#" className="btn btn-primary btn-lg btn-block">
                      Choose this Plan
                    </a>
                  </div>
                </div>
                <div className="card pricing">
                  <div className="card-head">
                    <small className="text-primary">ENTERPRISE</small>
                    <span className="price">
                      $249<sub>/m</sub>
                    </span>
                  </div>
                  <ul className="list-group list-group-flush">
                    <div className="list-group-item">Unlimited Projects</div>
                    <div className="list-group-item">Unlimited Storage</div>
                    <div className="list-group-item">Collaboration</div>
                    <div className="list-group-item">Reports and analytics</div>
                    <div className="list-group-item">Web hooks</div>
                  </ul>
                  <div className="card-body">
                    <a href="#" className="btn btn-primary btn-lg btn-block">
                      Choose this Plan
                    </a>
                  </div>
                </div>
              </div>
              {/* // end .pricing */}
            </div>
          </div>
          {/* // end .section */}
          <div className="section pt-0">
            <div className="container">
              <div className="section-title">
                <small>FAQ</small>
                <h3>Frequently Asked Questions</h3>
              </div>
              <div className="row pt-4">
                <div className="col-md-6">
                  <h4 className="mb-3">Can I try before I buy?</h4>
                  <p className="light-font mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer rutrum, urna eu pellentesque pretium, nisi nisi
                    fermentum enim, et sagittis dolor nulla vel sapien.
                    Vestibulum sit amet mattis ante.{" "}
                  </p>
                  <h4 className="mb-3">What payment methods do you accept?</h4>
                  <p className="light-font mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer rutrum, urna eu pellentesque pretium, nisi nisi
                    fermentum enim, et sagittis dolor nulla vel sapien.
                    Vestibulum sit amet mattis ante.{" "}
                  </p>
                </div>
                <div className="col-md-6">
                  <h4 className="mb-3">Can I change my plan later?</h4>
                  <p className="light-font mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer rutrum, urna eu pellentesque pretium, nisi nisi
                    fermentum enim, et sagittis dolor nulla vel sapien.
                    Vestibulum sit amet mattis ante.{" "}
                  </p>
                  <h4 className="mb-3">Do you have a contract?</h4>
                  <p className="light-font mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer rutrum, urna eu pellentesque pretium, nisi nisi
                    fermentum enim, et sagittis dolor nulla vel sapien.
                    Vestibulum sit amet mattis ante.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* // end .section */}
          <div className="section bg-gradient">
            <div className="container">
              <div className="call-to-action">
                <div className="box-icon">
                  <span className="ti-mobile gradient-fill ti-3x" />
                </div>
                <h2>Download Anywhere</h2>
                <p className="tagline">
                  Available for all major mobile and desktop platforms.
                  Rapidiously visualize optimal ROI rather than enterprise-wide
                  methods of empowerment.{" "}
                </p>
                <div className="my-4">
                  <a href="#" className="btn btn-light">
                    <img src={appleicon} alt="icon" /> App Store
                  </a>
                  <a href="#" className="btn btn-light">
                    <img src={playicon} alt="icon" /> Google play
                  </a>
                </div>
                <p className="text-primary">
                  <small>
                    <i>*Works on iOS 10.0.5+, Android Kitkat and above. </i>
                  </small>
                </p>
              </div>
            </div>
          </div>
          {/* // end .section */}
          <div className="light-bg py-5" id="contact">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 text-center text-lg-left">
                  <p className="mb-2">
                    {" "}
                    <span className="ti-location-pin mr-2" /> 1485 Pacific St,
                    Brooklyn, NY 11216 USA
                  </p>
                  <div className=" d-block d-sm-inline-block">
                    <p className="mb-2">
                      <span className="ti-email mr-2" />{" "}
                      <a className="mr-4" href="mailto:support@mobileapp.com">
                        support@mobileapp.com
                      </a>
                    </p>
                  </div>
                  <div className="d-block d-sm-inline-block">
                    <p className="mb-0">
                      <span className="ti-headphone-alt mr-2" />{" "}
                      <a href="tel:51836362800">518-3636-2800</a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="social-icons">
                    <a href="#">
                      <span className="ti-facebook" />
                    </a>
                    <a href="#">
                      <span className="ti-twitter-alt" />
                    </a>
                    <a href="#">
                      <span className="ti-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // end .section */}
          <footer className="my-5 text-center">
            {/* Copyright removal is not prohibited! */}
            <p className="mb-2">
              <small>
                COPYRIGHT © 2017. ALL RIGHTS RESERVED. MOBAPP TEMPLATE BY{" "}
                <a href="https://colorlib.com">COLORLIB</a>
              </small>
            </p>
            <small>
              <a href="#" className="m-2">
                PRESS
              </a>
              <a href="#" className="m-2">
                TERMS
              </a>
              <a href="#" className="m-2">
                PRIVACY
              </a>
            </small>
          </footer>

          {/* jQuery and Bootstrap */}
          {/* Plugins JS */}
          {/* Custom JS */}
          {/* <script src="js/jquery-3.2.1.min.js"></script>
          <script src="js/bootstrap.bundle.min.js"></script>

          <script src="js/owl.carousel.min.js"></script>

          <script src="js/script.js"></script> */}
        </div>
      </Layout>
    </div>
  );
};

export default Landingpage;
