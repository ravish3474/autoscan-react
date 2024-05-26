import React from 'react'

function BidSuccessfulStatus({ statusTitle }) {
    return (
        <div>
            <div class="RequestStatus">
                <p class="RequestStatusDefault SuccessStatus   ">{statusTitle}</p>
            </div>
        </div>
    )
}

export default BidSuccessfulStatus