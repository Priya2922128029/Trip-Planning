import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlus, HiLogout, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import { useTrips } from '../context/TripContext';
import Card from '../components/common/Card';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const { trips, removeTrip } = useTrips();

    return (
        <div className="profile-page fade-in container">
            <header className="profile-header flex justify-between align-center mb-10">
                <div className="user-info flex align-center gap-6">
                    <div className="avatar">JD</div>
                    <div>
                        <h1>John Doe</h1>
                        <p className="text-muted">Global Explorer • 12 Trips Planned</p>
                    </div>
                </div>
                <button className="btn btn-outline"><HiLogout /> Logout</button>
            </header>

            <section className="trips-section">
                <div className="flex justify-between align-center mb-6">
                    <h2>My Trips</h2>
                    <button className="btn btn-primary" onClick={() => navigate('/builder')}>
                        <HiPlus /> Plan New Trip
                    </button>
                </div>

                <div className="trips-grid grid">
                    {trips.length > 0 ? (
                        trips.map(trip => (
                            <Card
                                key={trip.id}
                                title={trip.name}
                                subtitle={`${trip.destination} • ${trip.style}`}
                                onClick={() => navigate(`/trip/${trip.id}/plan`)}
                                className="trip-card"
                            >
                                <div className="trip-meta flex flex-col gap-2">
                                    <span className="flex align-center gap-2 text-muted text-sm">
                                        <HiCalendar /> {trip.startDate} - {trip.endDate}
                                    </span>
                                    <span className="flex align-center gap-2 text-muted text-sm">
                                        <HiLocationMarker /> {trip.destination}
                                    </span>
                                </div>
                                <div className="card-actions flex gap-2 mt-4">
                                    <button className="btn btn-primary btn-sm flex-1">View Plan</button>
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={(e) => { e.stopPropagation(); removeTrip(trip.id); }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="empty-trips card padding-6 text-center">
                            <h3>No trips planned yet</h3>
                            <p className="text-muted mt-2">Start your journey by creating your first itinerary!</p>
                            <button className="btn btn-primary mt-6" onClick={() => navigate('/builder')}>Plan Now</button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Profile;
