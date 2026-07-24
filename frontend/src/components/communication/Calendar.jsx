import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockMeetings, mockUsers } from '../../data/mockData';
import './Calendar.css';

function Calendar() {
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [meetings, setMeetings] = useState(mockMeetings);
    const [showForm, setShowForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        project_id: null,
    });

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

    const getMeetingsForDay = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return meetings.filter(m => {
            const meetingDate = new Date(m.start_time);
            return meetingDate.toDateString() === date.toDateString();
        });
    };

    const hasMeeting = (day) => {
        return getMeetingsForDay(day).length > 0;
    };

    const isToday = (day) => {
        const today = new Date();
        return today.getDate() === day && 
               today.getMonth() === currentDate.getMonth() && 
               today.getFullYear() === currentDate.getFullYear();
    };

    const handleCreateMeeting = (e) => {
        e.preventDefault();
        const newMeeting = {
            meeting_id: Date.now(),
            ...formData,
            organizer_id: user.user_id,
            organizer_name: user.full_name,
            status: 'scheduled',
            attendee_count: 0,
            attendees: [],
        };
        setMeetings([...meetings, newMeeting]);
        setShowForm(false);
        setFormData({
            title: '',
            description: '',
            start_time: '',
            end_time: '',
            project_id: null,
        });
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
        const dayMeetings = getMeetingsForDay(day);
        if (dayMeetings.length > 0) {
            alert(`Meetings on ${date.toLocaleDateString()}:\n${dayMeetings.map(m => `- ${m.title} (${new Date(m.start_time).toLocaleTimeString()})`).join('\n')}`);
        } else {
            setShowForm(true);
            const dateStr = date.toISOString().split('T')[0];
            setFormData(prev => ({
                ...prev,
                start_time: `${dateStr}T09:00`,
                end_time: `${dateStr}T10:00`,
            }));
        }
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="calendar-nav">
                    <button className="btn-nav" onClick={prevMonth}>◀</button>
                    <span className="calendar-title">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button className="btn-nav" onClick={nextMonth}>▶</button>
                </div>
                <button className="btn-new-meeting" onClick={() => setShowForm(!showForm)}>
                    <i className="fas fa-plus"></i> New Meeting
                </button>
            </div>

            {showForm && (
                <div className="meeting-form">
                    <h4>Schedule Meeting</h4>
                    <form onSubmit={handleCreateMeeting}>
                        <input
                            type="text"
                            placeholder="Meeting Title *"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                            className="form-input"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="form-textarea"
                        />
                        <div className="form-row">
                            <input
                                type="datetime-local"
                                value={formData.start_time}
                                onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                                required
                                className="form-input"
                            />
                            <span>to</span>
                            <input
                                type="datetime-local"
                                value={formData.end_time}
                                onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">Create</button>
                            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="calendar-grid">
                {dayNames.map(day => (
                    <div key={day} className="day-header">{day}</div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="day-cell empty"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const hasMeetingToday = hasMeeting(day);
                    const isTodayDay = isToday(day);
                    return (
                        <div
                            key={day}
                            className={`day-cell ${isTodayDay ? 'today' : ''} ${hasMeetingToday ? 'has-meeting' : ''}`}
                            onClick={() => handleDateClick(day)}
                        >
                            <span className="day-number">{day}</span>
                            {hasMeetingToday && (
                                <div className="meeting-dots">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="upcoming-meetings">
                <h4>📋 Upcoming Meetings</h4>
                {meetings
                    .filter(m => new Date(m.start_time) > new Date())
                    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                    .slice(0, 5)
                    .map(m => (
                        <div key={m.meeting_id} className="upcoming-item">
                            <div className="upcoming-time">
                                {new Date(m.start_time).toLocaleDateString()} at {new Date(m.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div className="upcoming-title">{m.title}</div>
                            <div className="upcoming-organizer">{m.organizer_name}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Calendar;