import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowRight, HiSearch } from 'react-icons/hi';
import { destinations } from '../utils/dummyData';
import Card from '../components/common/Card';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const featured = destinations.slice(0, 3);

    return (
        <div className="home-page fade-in">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content container">
                    <h1 className="hero-title slide-in">Your Next Adventure Awaits</h1>
                    <p className="hero-subtitle slide-in">Plan, manage, and explore your dream trips with ease.</p>

                    <div className="search-container slide-in">
                        <HiSearch className="search-icon" size={24} />
                        <input type="text" placeholder="Where do you want to go?" />
                        <button className="btn btn-primary">Search</button>
                    </div>

                    <div className="hero-cta slide-in">
                        <Link to="/builder" className="btn btn-primary btn-lg">
                            Start Planning <HiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="featured-section container">
                <div className="section-header flex justify-between align-center">
                    <div>
                        <h2 className="section-title">Popular Destinations</h2>
                        <p className="section-subtitle">Handpicked places for your next getaway.</p>
                    </div>
                    <Link to="/destinations" className="view-all">View All Destinations →</Link>
                </div>

                <div className="destinations-grid grid">
                    {featured.map(dest => (
                        <Card
                            key={dest.id}
                            image={dest.image}
                            title={dest.name}
                            subtitle={dest.country}
                            onClick={() => navigate(`/destination/${dest.id}`)}
                        >
                            <div className="dest-info flex justify-between">
                                <span className="rating">⭐ {dest.rating}</span>
                                <span className="price">Avg. ${dest.avgCostDay}/day</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us container">
                <h2 className="section-title text-center">Plan Smarter, Travel Better</h2>
                <div className="features-grid grid">
                    <div className="feature-item text-center">
                        <div className="feature-icon">📅</div>
                        <h3>Daily Planner</h3>
                        <p>Organize your activities hour by hour.</p>
                    </div>
                    <div className="feature-item text-center">
                        <div className="feature-icon">💰</div>
                        <h3>Budget Tracking</h3>
                        <p>Keep your travel expenses under control.</p>
                    </div>
                    <div className="feature-item text-center">
                        <div className="feature-icon">🎒</div>
                        <h3>Packing Lists</h3>
                        <p>Never forget your essentials again.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
