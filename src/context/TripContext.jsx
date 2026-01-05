import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllTrips, getUserSettings, saveTrip as saveTripToLS, deleteTrip as deleteFromLS, saveUserSettings } from '../utils/localStorage';
import { sampleTrips } from '../utils/dummyData';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [trips, setTrips] = useState([]);
    const [currentTripId, setCurrentTripId] = useState(null);
    const [settings, setSettings] = useState(getUserSettings());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedTrips = getAllTrips();
        if (storedTrips.length === 0) {
            // Load sample data if first time
            setTrips(sampleTrips);
            saveToLS(sampleTrips, 'trips');
        } else {
            setTrips(storedTrips);
        }

        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);
        setLoading(false);
    }, [settings.theme]);

    const addTrip = (trip) => {
        const updated = [...trips, trip];
        setTrips(updated);
        saveTripToLS(trip);
    };

    const updateTrip = (trip) => {
        const updated = trips.map(t => t.id === trip.id ? trip : t);
        setTrips(updated);
        saveTripToLS(trip);
    };

    const removeTrip = (id) => {
        const updated = trips.filter(t => t.id !== id);
        setTrips(updated);
        deleteFromLS(id);
    };

    const updateSettings = (newSettings) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        saveUserSettings(updated);
        document.documentElement.setAttribute('data-theme', updated.theme);
    };

    const currentTrip = trips.find(t => t.id === currentTripId) || null;

    return (
        <TripContext.Provider value={{
            trips,
            currentTrip,
            currentTripId,
            setCurrentTripId,
            addTrip,
            updateTrip,
            removeTrip,
            settings,
            updateSettings,
            loading
        }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTrips = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error('useTrips must be used within a TripProvider');
    }
    return context;
};

// Internal helper for initial setup
function saveToLS(data, key) {
    localStorage.setItem(key, JSON.stringify(data));
}
