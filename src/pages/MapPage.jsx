import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiLocationMarker, HiHome, HiShoppingBag, HiLightningBolt } from 'react-icons/hi';
import { useTrips } from '../context/TripContext';
import './MapPage.css';

const MapPage = () => {
    const { id } = useParams();
    const { trips } = useTrips();
    const trip = trips.find(t => t.id === id);

    const [filter, setFilter] = useState('All');

    if (!trip) return <div>Trip not found</div>;

    // Mock markers for the destination
    const markers = [
        { id: 1, type: 'Hotel', name: 'Grand Resort', x: 30, y: 40 },
        { id: 2, type: 'Activity', name: 'Central Museum', x: 50, y: 30 },
        { id: 3, type: 'Food', name: 'Local Bistro', x: 60, y: 60 },
        { id: 4, type: 'Shopping', name: 'Old Town Market', x: 40, y: 70 },
        { id: 5, type: 'Activity', name: 'Waterfall Trail', x: 80, y: 20 },
    ];

    const filteredMarkers = filter === 'All' ? markers : markers.filter(m => m.type === filter);

    const getIcon = (type) => {
        switch (type) {
            case 'Hotel': return <HiHome />;
            case 'Food': return <HiLightningBolt />;
            case 'Shopping': return <HiShoppingBag />;
            default: return <HiLocationMarker />;
        }
    };

    return (
        <div className="map-page fade-in">
            <header className="flex justify-between align-center mb-6">
                <div>
                    <h1>Trip Map</h1>
                    <p className="text-muted">Explore {trip.destination} visually.</p>
                </div>
                <div className="map-filters flex gap-2">
                    {['All', 'Hotel', 'Activity', 'Food'].map(f => (
                        <button
                            key={f}
                            className={`chip ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            <div className="map-container glass">
                <div className="map-illustration">
                    {/* Simple illustrative background */}
                    <div className="water"></div>
                    <div className="land"></div>

                    {/* Markers */}
                    {filteredMarkers.map(m => (
                        <div
                            key={m.id}
                            className={`marker-container ${m.type.toLowerCase()}`}
                            style={{ left: `${m.x}%`, top: `${m.y}%` }}
                        >
                            <div className="marker-pin">{getIcon(m.type)}</div>
                            <div className="marker-label glass">{m.name}</div>
                        </div>
                    ))}

                    {/* Route lines (mock) */}
                    <svg className="route-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 30 40 L 50 30 L 80 20" fill="none" stroke="var(--primary-blue)" strokeWidth="0.5" strokeDasharray="2" />
                    </svg>
                </div>
            </div>

            <div className="map-legend mt-6 card padding-6 flex gap-6 justify-center">
                <div className="legend-item"><span className="dot hotel"></span> Hotel</div>
                <div className="legend-item"><span className="dot activity"></span> Activity</div>
                <div className="legend-item"><span className="dot food"></span> Food / Safety</div>
                <div className="legend-item"><span className="dot shopping"></span> Shopping</div>
            </div>
        </div>
    );
};

export default MapPage;
