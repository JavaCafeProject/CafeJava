import React from 'react';
import './ReportCard.css'; 

const ReportCard = ({ title, children }) => {
    return (
        <div className="report-card">
            <h3 className="report-card-title">
                {title}
            </h3>

            <div className="report-card-content">
                {children}
            </div>
        </div>
    );
};

export default ReportCard;