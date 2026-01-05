import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { HiPlus, HiTrash, HiCurrencyDollar } from 'react-icons/hi';
import { useTrips } from '../context/TripContext';
import { expenseCategories } from '../utils/dummyData';
import './BudgetPlanner.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPlanner = () => {
    const { id } = useParams();
    const { trips, updateTrip } = useTrips();
    const trip = trips.find(t => t.id === id);

    const [newExpense, setNewExpense] = useState({ category: 'Transport', amount: '', note: '' });

    if (!trip) return <div>Trip not found</div>;

    const totalSpent = trip.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
    const remaining = trip.budget - totalSpent;
    const progressPercent = Math.min((totalSpent / trip.budget) * 100, 100);

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!newExpense.amount) return;

        const updatedTrip = {
            ...trip,
            expenses: [...(trip.expenses || []), { ...newExpense, amount: parseFloat(newExpense.amount), id: Date.now() }]
        };
        updateTrip(updatedTrip);
        setNewExpense({ category: 'Transport', amount: '', note: '' });
    };

    const removeExpense = (expId) => {
        const updatedTrip = {
            ...trip,
            expenses: trip.expenses.filter(e => e.id !== expId)
        };
        updateTrip(updatedTrip);
    };

    // Chart Data
    const categoryTotals = expenseCategories.map(cat => {
        return (trip.expenses || [])
            .filter(e => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0);
    });

    const chartData = {
        labels: expenseCategories,
        datasets: [{
            data: categoryTotals,
            backgroundColor: ['#2563eb', '#14b8a6', '#f97316', '#8b5cf6', '#ec4899', '#64748b'],
            borderWidth: 0
        }]
    };

    return (
        <div className="budget-page fade-in">
            <h1>Budget Planner</h1>
            <p className="text-muted">Manage your expenses for {trip.name}</p>

            <div className="budget-summary-grid grid mt-8">
                <div className="summary-card card">
                    <h3>Total Budget</h3>
                    <p className="amount">${trip.budget}</p>
                </div>
                <div className={`summary-card card ${remaining < 0 ? 'over-budget' : ''}`}>
                    <h3>Remaining</h3>
                    <p className="amount">${remaining}</p>
                </div>
                <div className="summary-card card">
                    <h3>Total Spent</h3>
                    <p className="amount text-primary">${totalSpent}</p>
                </div>
            </div>

            <div className="progress-container mt-6">
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%`, backgroundColor: progressPercent > 90 ? '#ef4444' : '#2563eb' }}></div>
                </div>
                <div className="flex justify-between mt-2 font-bold">
                    <span>{progressPercent.toFixed(0)}% Spared</span>
                    {remaining < 0 && <span className="text-danger">Over Budget!</span>}
                </div>
            </div>

            <div className="budget-content-grid grid mt-10">
                {/* Left: Add Expense & List */}
                <div className="expense-section">
                    <div className="card padding-6">
                        <h3>Add New Expense</h3>
                        <form className="expense-form mt-4" onSubmit={handleAddExpense}>
                            <select
                                value={newExpense.category}
                                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                            >
                                {expenseCategories.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Note (e.g., Flight to Athens)"
                                value={newExpense.note}
                                onChange={(e) => setNewExpense({ ...newExpense, note: e.target.value })}
                            />
                            <button className="btn btn-secondary">Add</button>
                        </form>
                    </div>

                    <div className="expense-list mt-8">
                        <h3>Recent Expenses</h3>
                        <div className="list-container mt-4">
                            {trip.expenses?.length > 0 ? (
                                trip.expenses.map(exp => (
                                    <div key={exp.id} className="expense-item card">
                                        <div className="flex justify-between align-center">
                                            <div>
                                                <strong>{exp.category}</strong>
                                                <p className="text-muted text-sm">{exp.note}</p>
                                            </div>
                                            <div className="flex align-center gap-4">
                                                <span className="font-bold">${exp.amount}</span>
                                                <button className="delete-btn" onClick={() => removeExpense(exp.id)}><HiTrash /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-6 text-muted">No expenses added yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Chart */}
                <div className="chart-section card padding-6 flex flex-col align-center">
                    <h3>Spending Breakdown</h3>
                    <div className="chart-container mt-8" style={{ width: '300px' }}>
                        {totalSpent > 0 ? (
                            <Pie data={chartData} options={{ plugins: { legend: { position: 'bottom' } } }} />
                        ) : (
                            <div className="text-center py-10">Add expenses to see chart</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetPlanner;
