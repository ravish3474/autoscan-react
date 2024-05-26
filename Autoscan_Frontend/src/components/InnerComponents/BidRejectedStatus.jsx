import React from 'react'

function BidRejectedStatus({ statusTitle }) {
    return (
        <div>
            <div class="RequestStatus">
                <p class="RequestStatusDefault RejectStatus  ">{statusTitle}</p>
            </div>
        </div>
    )
}

export default BidRejectedStatus