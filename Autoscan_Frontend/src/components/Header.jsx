// components/Header.js
import React from 'react';
import logo from '../images/logo/AutoScanLogo.png'; // Import logo
import '../App.css'; // Import App.css

function Header() {
    return (
        <section className="header" id="header">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                        <div className="card border-none bg-none">
                            <nav className="d-flex">
                                <a className="navbar-brand" href="/">
                                    <img src={logo} className="App-logo" alt="logo" />
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div className="col-xl-6  col-md-6 col-sm-12  col-12 nav-items">
                        <div className="card bg-none border-none">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="navbar-dropdown">
                                    <a className="/" target="_blank">LOGIN </a>
                                    <div className="dropdown">
                                        <a href="/" target="_blank"
                                        >USER LOGIN</a>
                                        <a href="/" target="_blank"
                                        >DEALER LOGIN</a>
                                    </div>
                                </li>
                                <a target="_blank" href="/" class="btn">
                                    TALK TO AN EXPERT &nbsp; </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;
