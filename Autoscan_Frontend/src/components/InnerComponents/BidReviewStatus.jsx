import React from 'react'

function BidReviewStatus({statusTitle}) {
    return (
        <div>
            <div class="RequestStatus">
                <p class="RequestStatusDefault ReviewStatus ">{statusTitle}</p>
            </div>
        </div>
    )
}

export default BidReviewStatus