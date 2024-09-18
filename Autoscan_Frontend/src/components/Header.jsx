import React, { useState, useEffect } from "react";
import logo from "../images/logo/usedcarwalelogo.png"; // Import logo
import "../App.css"; // Import App.css
import { Link, useHistory } from "react-router-dom";

function Header({ setShowUserModal, setShowDealerModal, updateLoginState }) {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authUser");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_info");
      localStorage.removeItem("user_id");
      localStorage.removeItem("logintime");

      setIsLoggedIn(false);
      updateLoginState(false);
      history.push("/");
    }
  };

  const handleLogin = () => {
    updateLoginState(true);
  };
console.log(isLoggedIn);
  return (
    <section className="header" id="header">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12 col-12">
            <div className="card border-none bg-none">
              <nav className="d-flex">
                <Link to="/" className="navbar-brand">
                  <img src={logo} className="App-logo" alt="logo" />
                </Link>
              </nav>
            </div>
          </div>
          <div className="col-xl-6 col-md-6 col-sm-12 col-12 nav-items">
            <div className="card bg-none border-none">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!isLoggedIn ? (
                  <>
                    <li className="navbar-dropdown">
                      <h6 className="DropdownHeading">
                        Login <ion-icon name="chevron-down-outline"></ion-icon>
                      </h6>

                      <div className="dropdown">
                        <button
                          className="loginSubitems"
                          onClick={() => {
                            setShowUserModal(true);
                            handleLogin();
                          }}
                        >
                          <ion-icon name="home-outline"></ion-icon> USER LOGIN
                        </button>
                        {/* <button
                          className="loginSubitems"
                          onClick={() => {
                            setShowDealerModal(true);
                            handleLogin();
                          }}
                        >
                          <ion-icon name="person-add-outline"></ion-icon> Dealer
                          LOGIN
                        </button> */}
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button onClick={handleLogout} className="loginSubitems">
                        Logout
                      </button>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/profile" target="_blank" className="btn">
                    TALK TO AN EXPERT &nbsp;{" "}
                    <ion-icon name="logo-whatsapp"></ion-icon>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
