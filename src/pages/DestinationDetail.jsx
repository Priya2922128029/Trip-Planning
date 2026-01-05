import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiStar, HiClock, HiCurrencyDollar, HiCheckCircle, HiArrowLeft } from 'react-icons/hi';
import { destinations } from '../utils/dummyData';
import './DestinationDetail.css';

const DestinationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dest = destinations.find(d => d.id === parseInt(id));

    if (!dest) return <div className="container mt-10"><h2>Destination not found</h2></div>;

    return (
        <div className="dest-detail-page fade-in">
            {/* Detail Header / Gallery Placeholder */}
            <header className="detail-hero" style={{ backgroundImage: `url(${dest.image})` }}>
                <div className="hero-overlay"></div>
                <div className="hero-content container">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <HiArrowLeft /> Back
                    </button>
                    <h1 className="slide-in">{dest.name}, {dest.country}</h1>
                    <p className="slide-in">{dest.subtitle}</p>
                </div>
            </header>

            <div className="container detail-content">
                <main className="main-info">
                    <section className="info-section">
                        <h2 className="section-title">Overview</h2>
                        <p className="description">{dest.description}</p>

                        <div className="meta-grid grid">
                            <div className="meta-item">
                                <HiStar className="icon" />
                                <div>
                                    <strong>Rating</strong>
                                    <p>{dest.rating} / 5.0</p>
                                </div>
                            </div>
                            <div className="meta-item">
                                <HiClock className="icon" />
                                <div>
                                    <strong>Best Season</strong>
                                    <p>{dest.bestSeason}</p>
                                </div>
                            </div>
                            <div className="meta-item">
                                <HiCurrencyDollar className="icon" />
                                <div>
                                    <strong>Avg Cost</strong>
                                    <p>${dest.avgCostDay} / day</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="info-section">
                        <h2 className="section-title">Top Attractions</h2>
                        <div className="attractions-grid grid">
                            {dest.attractions.map((attr, i) => (
                                <div key={i} className="attr-card card">
                                    <img src={attr.image} alt={attr.name} />
                                    <div className="attr-name">{attr.name}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="info-section">
                        <h2 className="section-title">Local Cuisine</h2>
                        <div className="food-tags flex wrap gap-2">
                            {dest.foods.map((food, i) => (
                                <span key={i} className="food-tag">{food}</span>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="booking-sidebar">
                    <div className="booking-card glass slide-in">
                        <h3 className="mb-4">Plan Your Trip to {dest.name}</h3>
                        <p className="text-muted mb-6">Create a personalized itinerary, track budget and organize packing essentials.</p>

                        <ul className="benefits-list mb-8">
                            <li><HiCheckCircle /> Day-by-day itinerary</li>
                            <li><HiCheckCircle /> Expense manager</li>
                            <li><HiCheckCircle /> Smart packing list</li>
                        </ul>

                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => navigate('/builder', { state: { destination: dest.name } })}
                        >
                            Add to My Trips
                        </button>
                    </div>

                    <div className="safety-tips glass mt-6">
                        <h4>Safety Tips</h4>
                        <p className="text-muted mt-2">{dest.safety}</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DestinationDetail;
