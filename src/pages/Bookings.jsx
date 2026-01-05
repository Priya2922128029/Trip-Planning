import React, { useState } from 'react';
import { HiTicket, HiHome, HiCheckCircle, HiArrowRight } from 'react-icons/hi';
import './Bookings.css';

const Bookings = () => {
    const [bookedItems, setBookedItems] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const flights = [
        { id: 'f1', airline: 'SkyConnect', from: 'LHR', to: 'ATH', price: 299, time: '10:30 AM' },
        { id: 'f2', airline: 'GlobalAir', from: 'JFK', to: 'ATH', price: 850, time: '08:15 PM' },
    ];

    const hotels = [
        { id: 'h1', name: 'Azure Boutique Hotel', stars: 5, price: 180, location: 'Oia' },
        { id: 'h2', name: 'Cliffview Suites', stars: 4, price: 120, location: 'Firostefani' },
    ];

    const handleBook = (item) => {
        setBookedItems([...bookedItems, item]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="bookings-page fade-in">
            <h1>Bookings</h1>
            <p className="text-muted">Secure your travel and accommodation.</p>

            {showSuccess && (
                <div className="success-toast glass slide-in">
                    <HiCheckCircle color="#10b981" size={24} />
                    <span>Booking Successful!</span>
                </div>
            )}

            <div className="bookings-grid grid mt-8">
                {/* Flights */}
                <section className="booking-section">
                    <h2 className="section-title-sm"><HiTicket /> Flights</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        {flights.map(flight => (
                            <div key={flight.id} className="booking-item-card card flex justify-between align-center">
                                <div className="flight-info">
                                    <div className="airline font-bold text-primary">{flight.airline}</div>
                                    <div className="route flex align-center gap-2 mt-1">
                                        <span>{flight.from}</span>
                                        <HiArrowRight size={14} />
                                        <span>{flight.to}</span>
                                    </div>
                                    <div className="time text-muted text-sm">{flight.time}</div>
                                </div>
                                <div className="price-action flex flex-col align-end">
                                    <span className="price font-bold">${flight.price}</span>
                                    <button className="btn btn-primary btn-sm mt-2" onClick={() => handleBook(flight)}>Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Hotels */}
                <section className="booking-section">
                    <h2 className="section-title-sm"><HiHome /> Hotels</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        {hotels.map(hotel => (
                            <div key={hotel.id} className="booking-item-card card flex justify-between align-center">
                                <div className="hotel-info">
                                    <div className="name font-bold">{hotel.name}</div>
                                    <div className="stars text-sm" style={{ color: '#f59e0b' }}>
                                        {'★'.repeat(hotel.stars)}
                                    </div>
                                    <div className="loc text-muted text-sm">{hotel.location}</div>
                                </div>
                                <div className="price-action flex flex-col align-end">
                                    <span className="price font-bold">${hotel.price}/night</span>
                                    <button className="btn btn-secondary btn-sm mt-2" onClick={() => handleBook(hotel)}>Select</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="booking-history mt-10">
                <h3>My Bookings</h3>
                <div className="history-list mt-4">
                    {bookedItems.length > 0 ? (
                        bookedItems.map((item, i) => (
                            <div key={i} className="history-item glass mb-2 flex justify-between">
                                <span>{item.airline || item.name}</span>
                                <span className="text-success font-bold">Confirmed</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No active bookings yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Bookings;
