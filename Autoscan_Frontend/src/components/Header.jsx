// components/Header.js
import React from 'react';
import logo from '../images/logo/AutoScanLogo.png'; // Import logo
import '../App.css'; // Import App.css
import { Link } from 'react-router-dom';

function Header({ setShowUserModal, setShowDealerModal }) {
    return (
        <section className="header" id="header">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                        <div className="card border-none bg-none">
                            <nav className="d-flex">
                                <Link to="/" className="navbar-brand">  <img src={logo} className="App-logo" alt="logo" /></Link>
                            </nav>
                        </div>
                    </div>
                    <div className="col-xl-6  col-md-6 col-sm-12  col-12 nav-items">
                        <div className="card bg-none border-none">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="navbar-dropdown">
                                    {/* <Link to="/profile" target="_blank">LOGIN <ion-icon name="chevron-down-outline"></ion-icon></Link> */}
                                    <h6 className='DropdownHeading'>Login <ion-icon name="chevron-down-outline"></ion-icon></h6>
                                    <div className="dropdown">
                                        <button className='loginSubitems' onClick={() => setShowUserModal(true)}><ion-icon name="home-outline"></ion-icon> USER LOGIN</button>
                                        <button className='loginSubitems' onClick={() => setShowDealerModal(true)}><ion-icon name="person-add-outline"></ion-icon> Dealer LOGIN</button>
        
                                    </div>
                                </li>
                                <Link to="/profile" target="_blank" class="btn"> TALK TO AN EXPERT  &nbsp; <ion-icon name="logo-whatsapp"></ion-icon></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;
