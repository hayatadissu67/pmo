import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockMeetings, mockUsers } from '../../data/mockData';
import VideoMeeting from './VideoMeeting';
import './Calendar.css';

function Calendar() {
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [meetings, setMeetings] = useState(mockMeetings);
    const [showForm, setShowForm] = useState(false);
    const [activeMeeting, setActiveMeeting] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        project_id: null,
        camera: true,
        microphone: true,
        screenShare: false,
        participants: [],
    });

    // ===== ROLE-BASED PERMISSIONS =====
    const canCreateMeeting = ['Admin', 'Executive PM', 'PM'].includes(user?.role);
    const canDeleteAnyMeeting = ['Admin'].includes(user?.role);
    const canViewAllMeetings = ['Admin', 'Executive PM', 'PM'].includes(user?.role);
    const canInviteParticipants = ['Admin', 'Executive PM', 'PM'].includes(user?.role);
    const canEditAnyMeeting = ['Admin', 'Executive PM'].includes(user?.role);

    // ===== FILTER MEETINGS BASED ON ROLE =====
    const getVisibleMeetings = () => {
        if (canViewAllMeetings) {
            return meetings; // Admins, Exec PMs, PMs see all meetings
        }
        // Developers, QA, Interns only see meetings they're invited to
        return meetings.filter(m => 
            m.attendees?.includes(user?.user_id) || 
            m.organizer_id === user?.user_id
        );
    };

    const visibleMeetings = getVisibleMeetings();

    // ===== CALENDAR HELPERS =====
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
        return visibleMeetings.filter(m => {
            const meetingDate = new Date(m.start_time);
            return meetingDate.toDateString() === date.toDateString();
        });
    };

    const hasMeeting = (day) => getMeetingsForDay(day).length > 0;
    const isToday = (day) => {
        const today = new Date();
        return today.getDate() === day && 
               today.getMonth() === currentDate.getMonth() && 
               today.getFullYear() === currentDate.getFullYear();
    };

    // ===== MEETING CRUD OPERATIONS =====
    const handleCreateMeeting = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.start_time || !formData.end_time) {
            alert('Please fill in all required fields.');
            return;
        }

        // Check if user has permission to create meetings
        if (!canCreateMeeting) {
            alert('You do not have permission to create meetings.');
            return;
        }

        const newMeeting = {
            meeting_id: Date.now(),
            title: formData.title,
            description: formData.description || '',
            organizer_id: user.user_id,
            organizer_name: user.full_name,
            start_time: formData.start_time,
            end_time: formData.end_time,
            project_id: formData.project_id || null,
            status: 'scheduled',
            attendee_count: formData.participants.length,
            attendees: formData.participants.map(p => p.user_id),
            participant_details: formData.participants,
        };

        setMeetings([...meetings, newMeeting]);
        setShowForm(false);
        
        const initialSettings = {
            isMuted: !formData.microphone,
            isVideoOn: formData.camera,
            isScreenSharing: formData.screenShare,
            participants: formData.participants.map(p => p.full_name),
        };
        setActiveMeeting({ ...newMeeting, initialSettings });
        setFormData({
            title: '',
            description: '',
            start_time: '',
            end_time: '',
            project_id: null,
            camera: true,
            microphone: true,
            screenShare: false,
            participants: [],
        });
    };

    const handleDeleteMeeting = (meetingId, e) => {
        e.stopPropagation();
        if (!canDeleteAnyMeeting) {
            alert('You do not have permission to delete meetings.');
            return;
        }
        if (window.confirm('Are you sure you want to delete this meeting?')) {
            setMeetings(meetings.filter(m => m.meeting_id !== meetingId));
        }
    };

    const handleEditMeeting = (meeting, e) => {
        e.stopPropagation();
        if (!canEditAnyMeeting && meeting.organizer_id !== user?.user_id) {
            alert('You do not have permission to edit this meeting.');
            return;
        }
        // Pre-fill form with meeting data
        setFormData({
            title: meeting.title,
            description: meeting.description || '',
            start_time: meeting.start_time,
            end_time: meeting.end_time,
            project_id: meeting.project_id || null,
            camera: true,
            microphone: true,
            screenShare: false,
            participants: meeting.participant_details || [],
        });
        setShowForm(true);
        // Remove the old meeting
        setMeetings(meetings.filter(m => m.meeting_id !== meeting.meeting_id));
    };

    // ===== NAVIGATION =====
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const handleDateClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayMeetings = getMeetingsForDay(day);
        if (dayMeetings.length > 0) {
            setActiveMeeting({ 
                ...dayMeetings[0], 
                initialSettings: { 
                    isMuted: false, 
                    isVideoOn: true, 
                    isScreenSharing: false 
                } 
            });
        } else if (canCreateMeeting) {
            setShowForm(true);
            const dateStr = date.toISOString().split('T')[0];
            setFormData(prev => ({
                ...prev,
                start_time: `${dateStr}T09:00`,
                end_time: `${dateStr}T10:00`,
            }));
        } else {
            alert('You do not have permission to create meetings.');
        }
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="calendar-container">
            {/* ===== HEADER ===== */}
            <div className="calendar-header">
                <div className="calendar-nav">
                    <button className="btn-nav" onClick={prevMonth}>◀</button>
                    <span className="calendar-title">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button className="btn-nav" onClick={nextMonth}>▶</button>
                </div>
                {canCreateMeeting && (
                    <button className="btn-new-meeting" onClick={() => setShowForm(!showForm)}>
                        <i className="fas fa-video"></i> New Meeting
                    </button>
                )}
            </div>

            {/* ===== MEETING FORM (Role-based) ===== */}
            {showForm && (
                <div className="meeting-form">
                    <h4>📹 Schedule Video Meeting</h4>
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

                        {/* Video/Audio Settings */}
                        <div className="settings-row">
                            <label className="setting-label">
                                <input
                                    type="checkbox"
                                    checked={formData.camera}
                                    onChange={(e) => setFormData({...formData, camera: e.target.checked})}
                                />
                                📷 Camera On
                            </label>
                            <label className="setting-label">
                                <input
                                    type="checkbox"
                                    checked={formData.microphone}
                                    onChange={(e) => setFormData({...formData, microphone: e.target.checked})}
                                />
                                🎤 Microphone On
                            </label>
                            <label className="setting-label">
                                <input
                                    type="checkbox"
                                    checked={formData.screenShare}
                                    onChange={(e) => setFormData({...formData, screenShare: e.target.checked})}
                                />
                                🖥️ Screen Share
                            </label>
                        </div>

                        {/* Participant Management - Only for users with permission */}
                        {canInviteParticipants && (
                            <div className="participant-select">
                                <label>Invite Participants:</label>
                                <select
                                    multiple
                                    value={formData.participants.map(p => p.user_id)}
                                    onChange={(e) => {
                                        const selectedIds = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                                        const selectedUsers = mockUsers.filter(u => selectedIds.includes(u.user_id));
                                        setFormData({...formData, participants: selectedUsers});
                                    }}
                                    className="form-select"
                                >
                                    {mockUsers.filter(u => u.user_id !== user?.user_id).map(u => (
                                        <option key={u.user_id} value={u.user_id}>
                                            {u.full_name} ({u.role})
                                        </option>
                                    ))}
                                </select>
                                <div className="selected-participants">
                                    {formData.participants.map(p => (
                                        <span key={p.user_id} className="participant-tag">
                                            {p.full_name}
                                            <button type="button" onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    participants: formData.participants.filter(pp => pp.user_id !== p.user_id)
                                                });
                                            }}>✕</button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="form-actions">
                            {canCreateMeeting && (
                                <button type="submit" className="btn-primary">
                                    <i className="fas fa-video"></i> Start Meeting
                                </button>
                            )}
                            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ===== CALENDAR GRID ===== */}
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

            {/* ===== UPCOMING MEETINGS ===== */}
            <div className="upcoming-meetings">
                <h4>📋 Upcoming Meetings</h4>
                {visibleMeetings
                    .filter(m => new Date(m.start_time) > new Date())
                    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                    .slice(0, 5)
                    .map(m => {
                        const isOrganizer = m.organizer_id === user?.user_id;
                        const canEdit = canEditAnyMeeting || isOrganizer;
                        
                        return (
                            <div key={m.meeting_id} className="upcoming-item" onClick={() => {
                                setActiveMeeting({ 
                                    ...m, 
                                    initialSettings: { 
                                        isMuted: false, 
                                        isVideoOn: true, 
                                        isScreenSharing: false 
                                    } 
                                });
                            }}>
                                <div className="upcoming-time">
                                    {new Date(m.start_time).toLocaleDateString()} at {new Date(m.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                                <div className="upcoming-title">{m.title}</div>
                                <div className="upcoming-organizer">{m.organizer_name}</div>
                                <button className="btn-join">Join</button>
                                
                                {/* Edit Button - Only for users with permission */}
                                {canEdit && (
                                    <button className="btn-edit" onClick={(e) => handleEditMeeting(m, e)}>
                                        ✏️
                                    </button>
                                )}
                                
                                {/* Delete Button - Only for Admins */}
                                {canDeleteAnyMeeting && (
                                    <button className="btn-delete" onClick={(e) => handleDeleteMeeting(m.meeting_id, e)}>
                                        🗑️
                                    </button>
                                )}
                            </div>
                        );
                    })}
            </div>

            {/* ===== VIDEO MEETING MODAL ===== */}
            {activeMeeting && (
                <VideoMeeting
                    meeting={activeMeeting}
                    onClose={() => setActiveMeeting(null)}
                    initialSettings={activeMeeting.initialSettings || { isMuted: false, isVideoOn: true, isScreenSharing: false }}
                />
            )}
        </div>
    );
}

export default Calendar;