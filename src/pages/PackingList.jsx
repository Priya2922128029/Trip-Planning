import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiPlus, HiTrash, HiCheck, HiBriefcase } from 'react-icons/hi';
import { useTrips } from '../context/TripContext';
import './PackingList.css';

const PackingList = () => {
    const { id } = useParams();
    const { trips, updateTrip } = useTrips();
    const trip = trips.find(t => t.id === id);

    const [newItem, setNewItem] = useState({ name: '', category: 'Clothes' });

    if (!trip) return <div>Trip not found</div>;

    const categories = ['Clothes', 'Documents', 'Gadgets', 'Essentials', 'Other'];

    const toggleItem = (itemId) => {
        const updatedTrip = {
            ...trip,
            packing: trip.packing.map(item => item.id === itemId ? { ...item, packed: !item.packed } : item)
        };
        updateTrip(updatedTrip);
    };

    const addItem = (e) => {
        e.preventDefault();
        if (!newItem.name) return;
        const item = { id: Date.now(), item: newItem.name, category: newItem.category, packed: false };
        const updatedTrip = {
            ...trip,
            packing: [...(trip.packing || []), item]
        };
        updateTrip(updatedTrip);
        setNewItem({ ...newItem, name: '' });
    };

    const removeItem = (itemId) => {
        const updatedTrip = {
            ...trip,
            packing: trip.packing.filter(item => item.id !== itemId)
        };
        updateTrip(updatedTrip);
    };

    const packedCount = trip.packing?.filter(i => i.packed).length || 0;
    const totalCount = trip.packing?.length || 0;
    const percent = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

    return (
        <div className="packing-page fade-in">
            <header className="flex justify-between align-center">
                <div>
                    <h1>Packing List</h1>
                    <p className="text-muted">Essentials for your {trip.style} trip.</p>
                </div>
                <div className="progress-circle-container">
                    <div className="progress-text">
                        <strong>{packedCount}/{totalCount}</strong>
                        <span>Packed</span>
                    </div>
                </div>
            </header>

            <div className="progress-bar-container mt-6">
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="mt-2 text-right">{percent.toFixed(0)}% Complete</p>
            </div>

            <div className="packing-grid grid mt-8">
                {/* Add Item form */}
                <div className="add-item-card card padding-6">
                    <h3>Add Custom Item</h3>
                    <form onSubmit={addItem} className="flex flex-col gap-3 mt-4">
                        <input
                            type="text"
                            placeholder="Item name..."
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            required
                        />
                        <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <button className="btn btn-primary">Add Item</button>
                    </form>
                </div>

                {/* Categories */}
                <div className="items-list-container">
                    {categories.map(cat => {
                        const items = trip.packing?.filter(i => i.category === cat) || [];
                        if (items.length === 0 && cat !== 'Other') return null;

                        return (
                            <div key={cat} className="category-section mb-6">
                                <h3 className="cat-title">{cat}</h3>
                                <div className="items-list flex flex-col gap-2 mt-2">
                                    {items.map(item => (
                                        <div key={item.id} className={`packing-item card flex justify-between align-center ${item.packed ? 'packed' : ''}`}>
                                            <div className="flex align-center gap-3">
                                                <button className={`check-toggle ${item.packed ? 'checked' : ''}`} onClick={() => toggleItem(item.id)}>
                                                    {item.packed ? <HiCheck /> : null}
                                                </button>
                                                <span>{item.item}</span>
                                            </div>
                                            <button className="delete-btn" onClick={() => removeItem(item.id)}><HiTrash /></button>
                                        </div>
                                    ))}
                                    {items.length === 0 && <p className="text-muted italic text-sm">No items in this category</p>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PackingList;
