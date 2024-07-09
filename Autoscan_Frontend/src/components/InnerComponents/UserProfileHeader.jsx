import React from 'react'

function UserProfileHeader(getHeaderTitle, getTotalCount, getHeaderDescription,) {
    return (
        <div>
            <div class="head">
                <h5>{getHeaderTitle} <span>{getTotalCount} </span> : {getHeaderDescription}</h5>
            </div>
        </div>
    )
}

export default UserProfileHeader