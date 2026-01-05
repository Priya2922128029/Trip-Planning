import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiFilter, HiSearch } from 'react-icons/hi';
import { destinations } from '../utils/dummyData';
import Card from '../components/common/Card';
import './Destinations.css';

const Destinations = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        budget: 250,
        climate: 'All',
        type: 'All'
    });

    const filteredDestinations = useMemo(() => {
        return destinations.filter(dest => {
            const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dest.country.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesBudget = dest.avgCostDay <= filters.budget;
            const matchesClimate = filters.climate === 'All' || dest.climate === filters.climate;
            const matchesType = filters.type === 'All' || dest.type === filters.type;

            return matchesSearch && matchesBudget && matchesClimate && matchesType;
        });
    }, [searchTerm, filters]);

    return (
        <div className="destinations-page fade-in container">
            <header className="page-header">
                <h1 className="section-title">Explore Destinations</h1>
                <p className="section-subtitle">Find the perfect place for your next adventure.</p>
            </header>

            <div className="dest-content">
                {/* Filters Sidebar */}
                <aside className="filters-aside glass">
                    <div className="filter-group">
                        <label><HiSearch /> Search</label>
                        <input
                            type="text"
                            placeholder="Search city or country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Max Budget: ${filters.budget}/day</label>
                        <input
                            type="range"
                            min="30"
                            max="300"
                            step="10"
                            value={filters.budget}
                            onChange={(e) => setFilters({ ...filters, budget: parseInt(e.target.value) })}
                            className="range-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Climate</label>
                        <select
                            value={filters.climate}
                            onChange={(e) => setFilters({ ...filters, climate: e.target.value })}
                            className="filter-select"
                        >
                            <option value="All">All Climates</option>
                            <option value="Tropical">Tropical</option>
                            <option value="Mediterranean">Mediterranean</option>
                            <option value="Temperate">Temperate</option>
                            <option value="Cold">Cold</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Travel Type</label>
                        <div className="filter-chips">
                            {['All', 'Adventure', 'Relax', 'Culture'].map(type => (
                                <button
                                    key={type}
                                    className={`chip ${filters.type === type ? 'active' : ''}`}
                                    onClick={() => setFilters({ ...filters, type })}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Results Grid */}
                <main className="dest-grid-container">
                    <div className="results-count">
                        Showing {filteredDestinations.length} destinations
                    </div>

                    <div className="destinations-grid grid">
                        {filteredDestinations.map(dest => (
                            <Card
                                key={dest.id}
                                image={dest.image}
                                title={dest.name}
                                subtitle={dest.country}
                                onClick={() => navigate(`/destination/${dest.id}`)}
                            >
                                <div className="dest-tags flex align-center gap-2">
                                    <span className="tag">{dest.climate}</span>
                                    <span className="tag">{dest.type}</span>
                                </div>
                                <div className="dest-info flex justify-between mt-4">
                                    <span className="rating">⭐ {dest.rating}</span>
                                    <span className="price">${dest.avgCostDay}/day</span>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredDestinations.length === 0 && (
                        <div className="no-results text-center">
                            <h3>No destinations found</h3>
                            <p>Try adjusting your filters.</p>
                            <button className="btn btn-outline mt-4" onClick={() => setFilters({ budget: 250, climate: 'All', type: 'All' })}>Reset Filters</button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Destinations;
