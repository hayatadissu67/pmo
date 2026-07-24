import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockNotifications, mockUsers } from '../../data/mockData';
import './Notifications.css';

function Notifications() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState('all');

    const getTypeIcon = (type) => {
        switch(type) {
            case 'mention': return '🔔';
            case 'meeting': return '📅';
            case 'task': return '✅';
            case 'comment': return '💬';
            default: return '📌';
        }
    };

    const getTypeLabel = (type) => {
        switch(type) {
            case 'mention': return 'Mention';
            case 'meeting': return 'Meeting';
            case 'task': return 'Task';
            case 'comment': return 'Comment';
            default: return 'Update';
        }
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.notification_id === id ? { ...n, is_read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    };

    const filteredNotifications = filter === 'all' 
        ? notifications 
        : notifications.filter(n => n.type === filter);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div className="header-left">
                    <h3>🔔 Notifications</h3>
                    {unreadCount > 0 && (
                        <span className="unread-badge">{unreadCount} unread</span>
                    )}
                </div>
                <div className="header-right">
                    <button className="btn-mark-all" onClick={markAllAsRead}>
                        Mark all as read
                    </button>
                </div>
            </div>

            <div className="filter-tabs">
                <button 
                    className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button 
                    className={`filter-tab ${filter === 'mention' ? 'active' : ''}`}
                    onClick={() => setFilter('mention')}
                >
                    Mentions
                </button>
                <button 
                    className={`filter-tab ${filter === 'meeting' ? 'active' : ''}`}
                    onClick={() => setFilter('meeting')}
                >
                    Meetings
                </button>
                <button 
                    className={`filter-tab ${filter === 'task' ? 'active' : ''}`}
                    onClick={() => setFilter('task')}
                >
                    Tasks
                </button>
                <button 
                    className={`filter-tab ${filter === 'comment' ? 'active' : ''}`}
                    onClick={() => setFilter('comment')}
                >
                    Comments
                </button>
            </div>

            <div className="notifications-list">
                {filteredNotifications.length === 0 ? (
                    <div className="no-notifications">
                        <div className="no-notifications-icon">📭</div>
                        <h3>No notifications</h3>
                        <p>You're all caught up!</p>
                    </div>
                ) : (
                    filteredNotifications.map(notification => (
                        <div 
                            key={notification.notification_id}
                            className={`notification-item ${!notification.is_read ? 'unread' : ''}`}
                            onClick={() => markAsRead(notification.notification_id)}
                        >
                            <div className="notification-icon">
                                {getTypeIcon(notification.type)}
                            </div>
                            <div className="notification-content">
                                <div className="notification-title">{notification.title}</div>
                                <div className="notification-body">{notification.content}</div>
                                <div className="notification-meta">
                                    <span className="notification-type">{getTypeLabel(notification.type)}</span>
                                    <span>•</span>
                                    <span className="notification-time">
                                        {new Date(notification.created_at).toLocaleString()}
                                    </span>
                                    {!notification.is_read && (
                                        <span className="unread-dot">●</span>
                                    )}
                                </div>
                            </div>
                            <button 
                                className="notification-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Action would navigate to the reference
                                }}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Notifications;