import React from 'react';
import './Card.css';

const Card = ({ image, title, subtitle, onClick, children, className = '' }) => {
    return (
        <div className={`card hover-scale ${className}`} onClick={onClick}>
            {image && (
                <div className="card-image">
                    <img src={image} alt={title} />
                </div>
            )}
            <div className="card-content">
                {title && <h3 className="card-title">{title}</h3>}
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
                {children}
            </div>
        </div>
    );
};

export default Card;
