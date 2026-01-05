import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HiPlus, HiCalendar, HiLocationMarker, HiUserGroup } from 'react-icons/hi';
import { useTrips } from '../context/TripContext';
import { destinations } from '../utils/dummyData';
import './TripBuilder.css';

const TripBuilder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addTrip } = useTrips();

    const [formData, setFormData] = useState({
        name: '',
        destination: location.state?.destination || '',
        dateRange: [null, null],
        style: 'Adventure',
        travelers: 1
    });

    const [startDate, endDate] = formData.dateRange;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.destination || !startDate || !endDate) {
            alert('Please fill in all required fields');
            return;
        }

        const newTrip = {
            id: `trip-${Date.now()}`,
            name: formData.name,
            destination: formData.destination,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            style: formData.style,
            travelers: formData.travelers,
            activities: [],
            expenses: [],
            packing: []
        };

        addTrip(newTrip);
        navigate(`/trip/${newTrip.id}/plan`);
    };

    return (
        <div className="trip-builder-page container fade-in">
            <div className="builder-card glass">
                <header className="builder-header text-center">
                    <h1>Plan Your Trip</h1>
                    <p className="text-muted">Fill in the details to start your journey.</p>
                </header>

                <form className="builder-form" onSubmit={handleSubmit}>
                    <div className="form-group full-width">
                        <label><HiPlus /> Trip Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Summer in Europe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label><HiLocationMarker /> Destination</label>
                            <select
                                value={formData.destination}
                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                required
                            >
                                <option value="">Select a place</option>
                                {destinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                <option value="Custom">Other / Custom</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><HiCalendar /> Dates (Start - End)</label>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => setFormData({ ...formData, dateRange: update })}
                                isClearable={true}
                                placeholderText="Select trip dates"
                                className="date-picker-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label><HiUserGroup /> Travel Style</label>
                            <div className="style-grid">
                                {['Adventure', 'Relax', 'Culture', 'Urban'].map(style => (
                                    <button
                                        key={style}
                                        type="button"
                                        className={`style-btn ${formData.style === style ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, style })}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Number of Travelers</label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={formData.travelers}
                                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="form-actions text-center mt-8">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Create Itinerary
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TripBuilder;
