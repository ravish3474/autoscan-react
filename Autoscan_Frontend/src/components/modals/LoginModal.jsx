import React from 'react'
import { useRef } from 'react'
import loginDefaultImage from '../../images/main/user-login.png'
import { Link } from 'react-router-dom'; // Import Link from React Router

function LoginModal({ onClose }) {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    return (
        <div className="defaultModal" id="userLoginModal" ref={modalRef} onClick={closeModal} >
            {/* <button onClick={onClose}>X</button> */}
            <div class="modal-dialog">
                <div class="modal-content">
                    <button onClick={onClose} type="button" class="close border-none" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body">
                        <figure className="text-center"><img src={loginDefaultImage} alt="" /></figure>
                        <h5 className="modal-title">LOGIN USING AUTOSCAN <br /> CREDENCIALS</h5>
                        <form id="loginForm">
                            <div className="form__group field">
                                <input type="email" class="form__field" placeholder="userEmail" name="userEmail" id='userEmail' required />
                                <label for="userEmail" class="form__label">Email ID</label>
                                <p id="emailError" class="error-message validationMessage"></p>
                            </div>
                            <div class="form__group field">
                                <input type="password" class="form__field" placeholder="userPass" name="userPass" id='userPass' required />
                                <a href="#" class="s-anchor togglePassword">Show Password</a>
                                <label for="userPass" class="form__label">Enter Password</label>
                                <p id="passwordError" class="error-message"></p>
                            </div>
                            <div class="form-footer">
                                <button type="button" id="LoginSubmitButton" class="button">SIGN IN</button>
                                <Link to="/profile" class="text-center loginFromAnother" onClick={onClose} type="button"   data-dismiss="modal" aria-label="Close"><div class="theme">LOGIN AS USER</div></Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginModal