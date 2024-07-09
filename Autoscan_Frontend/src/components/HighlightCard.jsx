// HighlightCard.js

import React from 'react';

function HighlightCard({ title, description }) {
    return (
        <div className="col-md-3">
            <div className="card bg-none text-center white border-none">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default HighlightCard;
