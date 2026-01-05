import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Destinations = lazy(() => import('./pages/Destinations'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const TripBuilder = lazy(() => import('./pages/TripBuilder'));
const DayPlanner = lazy(() => import('./pages/DayPlanner'));
const BudgetPlanner = lazy(() => import('./pages/BudgetPlanner'));
const PackingList = lazy(() => import('./pages/PackingList'));
const MapPage = lazy(() => import('./pages/MapPage'));
const Bookings = lazy(() => import('./pages/Bookings'));
const TripSummary = lazy(() => import('./pages/TripSummary'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

const Loading = () => <div className="loading-screen flex align-center justify-center" style={{ height: '100vh' }}><h2>Loading Adventure...</h2></div>;

function App() {
  return (
    <TripProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="destination/:id" element={<DestinationDetail />} />
              <Route path="builder" element={<TripBuilder />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />

              {/* Trip Specific Routes with Sidebar */}
              <Route path="trip/:id">
                <Route path="plan" element={<DayPlanner />} />
                <Route path="budget" element={<BudgetPlanner />} />
                <Route path="packing" element={<PackingList />} />
                <Route path="map" element={<MapPage />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="summary" element={<TripSummary />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </TripProvider>
  );
}

export default App;
