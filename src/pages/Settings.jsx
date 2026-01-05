import React from 'react';
import { HiMoon, HiSun, HiGlobe, HiCurrencyDollar, HiBell } from 'react-icons/hi';
import { useTrips } from '../context/TripContext';
import './Settings.css';

const Settings = () => {
    const { settings, updateSettings } = useTrips();

    const toggleTheme = () => {
        updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
    };

    return (
        <div className="settings-page container fade-in">
            <h1 className="mb-10">Account Settings</h1>

            <div className="settings-grid grid">
                <section className="settings-group card padding-6">
                    <div className="setting-item flex justify-between align-center mb-6">
                        <div className="flex align-center gap-4">
                            <div className="setting-icon"><HiSun /></div>
                            <div>
                                <strong>Dark Mode</strong>
                                <p className="text-muted text-sm">Switch between light and dark themes.</p>
                            </div>
                        </div>
                        <button className={`toggle-switch ${settings.theme === 'dark' ? 'on' : ''}`} onClick={toggleTheme}>
                            <div className="switch-knob"></div>
                        </button>
                    </div>

                    <div className="setting-item flex justify-between align-center mb-6">
                        <div className="flex align-center gap-4">
                            <div className="setting-icon"><HiCurrencyDollar /></div>
                            <div>
                                <strong>Currency</strong>
                                <p className="text-muted text-sm">Select your preferred viewing currency.</p>
                            </div>
                        </div>
                        <select
                            value={settings.currency}
                            onChange={(e) => updateSettings({ currency: e.target.value })}
                            className="settings-select"
                        >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="INR">INR (₹)</option>
                        </select>
                    </div>

                    <div className="setting-item flex justify-between align-center">
                        <div className="flex align-center gap-4">
                            <div className="setting-icon"><HiGlobe /></div>
                            <div>
                                <strong>Language</strong>
                                <p className="text-muted text-sm">Select your interface language.</p>
                            </div>
                        </div>
                        <select
                            value={settings.language}
                            onChange={(e) => updateSettings({ language: e.target.value })}
                            className="settings-select"
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                        </select>
                    </div>
                </section>

                <section className="settings-group card padding-6">
                    <div className="setting-item flex justify-between align-center mb-6">
                        <div className="flex align-center gap-4">
                            <div className="setting-icon"><HiBell /></div>
                            <div>
                                <strong>Notifications</strong>
                                <p className="text-muted text-sm">Receive trip updates and reminders.</p>
                            </div>
                        </div>
                        <button
                            className={`toggle-switch ${settings.notifications ? 'on' : ''}`}
                            onClick={() => updateSettings({ notifications: !settings.notifications })}
                        >
                            <div className="switch-knob"></div>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;
