import React from 'react'
import userProfileImg from '../../images/main/userProfileImg.png'
function ProfileSetting() {
    return (
        <div>


            <div class="head">
                <figure class="UserImg "><img src={userProfileImg}
                    alt="" /><span>AB</span></figure>
            </div>
            <div class="BiddingDetails">
                <div class=" row">
                    <form id="loginForm">
                        <div class="form__group field">
                            <input type="text" class="form__field" placeholder="userName"
                                value="AVIRAL BAHUGUNA" name="userName" id='userName' required
                                readonly />
                        </div>

                        <div class="form__group field">
                            <input type="tel" class="form__field readonly"
                                placeholder="+91 999 999 9999" value="+91 999 999 9999"
                                name="userNumber" id="userNumber" required readonly />
                        </div>
                        <div class="form__group field">
                            <input type="email" class="form__field" placeholder="userEmail"
                                name="userEmail" id="userEmail" required />
                            <label for="userEmail" class="form__label">Email ID</label>
                            <p id="emailError" class="error-message validationMessage"></p>
                        </div>
                        <div class="form-footer">
                            <button type="button" id="LoginSubmitButton" class="button"
                                disabled>SAVE CHANGES</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetting