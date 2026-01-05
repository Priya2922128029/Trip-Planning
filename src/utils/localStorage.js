const STORAGE_KEY = 'travel_planner_data';

export const getFromLS = (key) => {
    try {
        const data = localStorage.getItem(key || STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage', error);
        return null;
    }
};

export const saveToLS = (data, key) => {
    try {
        localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage', error);
    }
};

export const clearLS = () => {
    localStorage.removeItem(STORAGE_KEY);
};

// Specific Trip Helpers
export const getAllTrips = () => getFromLS('trips') || [];

export const saveTrip = (trip) => {
    const currentTrips = getAllTrips();
    const existingIdx = currentTrips.findIndex(t => t.id === trip.id);

    if (existingIdx > -1) {
        currentTrips[existingIdx] = trip;
    } else {
        currentTrips.push(trip);
    }

    saveToLS(currentTrips, 'trips');
};

export const deleteTrip = (tripId) => {
    const currentTrips = getAllTrips();
    const filtered = currentTrips.filter(t => t.id !== tripId);
    saveToLS(filtered, 'trips');
};

export const getUserSettings = () => getFromLS('user_settings') || {
    theme: 'light',
    currency: 'USD',
    language: 'English',
    notifications: true
};

export const saveUserSettings = (settings) => {
    saveToLS(settings, 'user_settings');
};
