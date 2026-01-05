import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiPlus, HiClock, HiLocationMarker, HiTrash, HiCheck } from 'react-icons/hi';
import { useTrips } from '../context/TripContext';
import './DayPlanner.css';

const DayPlanner = () => {
    const { id } = useParams();
    const { trips, updateTrip, setCurrentTripId } = useTrips();
    const trip = trips.find(t => t.id === id);

    const [activeDay, setActiveDay] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [newActivity, setNewActivity] = useState({
        time: '09:00',
        activity: '',
        location: ''
    });

    useEffect(() => {
        setCurrentTripId(id);
    }, [id, setCurrentTripId]);

    if (!trip) return <div className="container"><h2>Trip not found</h2></div>;

    // Calculate number of days
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const currentDayActivities = trip.activities?.filter(a => a.day === activeDay).sort((a, b) => a.time.localeCompare(b.time)) || [];

    const handleAddActivity = (e) => {
        e.preventDefault();
        const updatedTrip = {
            ...trip,
            activities: [
                ...trip.activities,
                { ...newActivity, id: Date.now(), day: activeDay }
            ]
        };
        updateTrip(updatedTrip);
        setShowModal(false);
        setNewActivity({ time: '09:00', activity: '', location: '' });
    };

    const handleDelete = (actId) => {
        const updatedTrip = {
            ...trip,
            activities: trip.activities.filter(a => a.id !== actId)
        };
        updateTrip(updatedTrip);
    };

    return (
        <div className="day-planner-page fade-in">
            <header className="planner-header flex justify-between align-center">
                <div>
                    <h1>{trip.name}</h1>
                    <p className="text-muted">{trip.destination} • {totalDays} Days</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <HiPlus /> Add Activity
                </button>
            </header>

            {/* Day Selector */}
            <div className="day-selector flex">
                {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
                    <button
                        key={day}
                        className={`day-tab ${activeDay === day ? 'active' : ''}`}
                        onClick={() => setActiveDay(day)}
                    >
                        Day {day}
                    </button>
                ))}
            </div>

            {/* Activity Timeline */}
            <div className="timeline-container">
                {currentDayActivities.length > 0 ? (
                    <div className="timeline">
                        {currentDayActivities.map((act) => (
                            <div key={act.id} className="timeline-item slide-in">
                                <div className="time">{act.time}</div>
                                <div className="dot"></div>
                                <div className="act-card card">
                                    <div className="flex justify-between align-center">
                                        <div>
                                            <h3>{act.activity}</h3>
                                            <p className="location"><HiLocationMarker /> {act.location}</p>
                                        </div>
                                        <button className="delete-btn" onClick={() => handleDelete(act.id)}>
                                            <HiTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state text-center">
                        <h3>No activities planned for Day {activeDay}</h3>
                        <p className="text-muted">Click the button above to add your first activity!</p>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {showModal && (
                <div className="modal-overlay flex align-center justify-center">
                    <div className="modal-content glass slide-in">
                        <h2>Add Activity for Day {activeDay}</h2>
                        <form onSubmit={handleAddActivity}>
                            <div className="form-group mb-4">
                                <label>Time</label>
                                <input
                                    type="time"
                                    value={newActivity.time}
                                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label>Activity</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Museum Visit"
                                    value={newActivity.activity}
                                    onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group mb-6">
                                <label>Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Louvre Museum"
                                    value={newActivity.location}
                                    onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" className="btn btn-outline flex-1" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary flex-1">Save Activity</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DayPlanner;
