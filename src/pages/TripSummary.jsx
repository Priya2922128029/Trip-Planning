import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiDownload, HiShare, HiChevronDown } from 'react-icons/hi';
import { useTrips } from '../context/TripContext';
import './TripSummary.css';

const TripSummary = () => {
    const { id } = useParams();
    const { trips } = useTrips();
    const trip = trips.find(t => t.id === id);

    if (!trip) return <div>Trip not found</div>;

    const totalSpent = trip.expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;
    const packedPercent = trip.packing?.length > 0
        ? (trip.packing.filter(i => i.packed).length / trip.packing.length) * 100
        : 0;

    return (
        <div className="summary-page fade-in container">
            <header className="flex justify-between align-end mb-8">
                <div>
                    <h1>Trip Summary</h1>
                    <p className="text-muted">Final overview of your {trip.name}</p>
                </div>
                <div className="flex gap-4">
                    <button className="btn btn-outline"><HiShare /> Share</button>
                    <button className="btn btn-primary"><HiDownload /> Download PDF</button>
                </div>
            </header>

            <div className="summary-grid grid">
                <div className="summary-left">
                    <section className="card padding-6 mb-6">
                        <h3>Destinations & Dates</h3>
                        <div className="flex justify-between mt-4">
                            <div>
                                <p className="label">Destination</p>
                                <p className="value">{trip.destination}</p>
                            </div>
                            <div>
                                <p className="label">Travel Dates</p>
                                <p className="value">{trip.startDate} to {trip.endDate}</p>
                            </div>
                            <div>
                                <p className="label">Travelers</p>
                                <p className="value">{trip.travelers} Persons</p>
                            </div>
                        </div>
                    </section>

                    <section className="card padding-6 mb-6">
                        <h3>Itinerary Overview</h3>
                        <div className="itinerary-list mt-4">
                            {trip.activities.length > 0 ? (
                                trip.activities.slice(0, 5).map((act, i) => (
                                    <div key={i} className="summary-act flex justify-between">
                                        <span>Day {act.day}: {act.activity}</span>
                                        <span className="text-muted">{act.time}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No activities planned.</p>
                            )}
                            {trip.activities.length > 5 && <Link to={`/trip/${id}/plan`} className="view-more text-primary">View all activities →</Link>}
                        </div>
                    </section>
                </div>

                <div className="summary-right">
                    <section className="card padding-6 mb-6">
                        <h3>Financial Stats</h3>
                        <div className="stat mt-4">
                            <div className="flex justify-between mb-2">
                                <span>Budget Utilization</span>
                                <span>${totalSpent} / ${trip.budget}</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${Math.min((totalSpent / trip.budget) * 100, 100)}%` }}>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="card padding-6">
                        <h3>Packing Checklist</h3>
                        <div className="stat mt-4">
                            <div className="flex justify-between mb-2">
                                <span>Items Packed</span>
                                <span>{packedPercent.toFixed(0)}%</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill bg-teal"
                                    style={{ width: `${packedPercent}%` }}>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TripSummary;
