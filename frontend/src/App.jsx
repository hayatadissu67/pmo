import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Sidebar from './components/common/Sidebar';
import Chat from './components/communication/Chat';
import Discussions from './components/communication/Discussions';
import Calendar from './components/communication/Calendar';
import Notifications from './components/communication/Notifications';
import FileShare from './components/communication/FileShare';
import Search from './components/communication/Search';
import './App.css';

// --- LOGIN COMPONENT ---
function Login() {
    const { login } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = login(email, password);
        setLoading(false);
        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>🏢 PMO Control Tower</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password (use: password)" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    {error && <div className="error">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                <div className="demo-accounts">
                    <strong>Demo Accounts (password: password):</strong><br />
                    admin@pmo.com · exec@pmo.com · pm@pmo.com · dev@pmo.com
                </div>
            </div>
        </div>
    );
}

// --- PROTECTED LAYOUT (with Top Bar and Clickable Icons) ---
function ProtectedLayout({ children }) {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showChatSidebar, setShowChatSidebar] = useState(false);

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (showNotifications && !e.target.closest('.notification-dropdown') && !e.target.closest('.icon-btn')) {
                setShowNotifications(false);
            }
            if (showChatSidebar && !e.target.closest('.chat-sidebar-overlay') && !e.target.closest('.icon-btn')) {
                setShowChatSidebar(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showNotifications, showChatSidebar]);

    return (
        <div className={`app-layout ${isDark ? 'dark' : ''}`}>
            <Sidebar />
            <div className="main-content">
                {/* ===== TOP BAR ===== */}
                <div className="topbar">
                    <div className="topbar-left">
                        PMO <span>Control Tower</span>
                    </div>
                    <div className="topbar-right">
                        {/* THEME TOGGLE */}
                        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
                            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
                        </button>

                        {/* NOTIFICATIONS - CLICKABLE */}
                        <button 
                            className="icon-btn" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowNotifications(!showNotifications);
                                setShowChatSidebar(false);
                            }}
                            title="Notifications"
                        >
                            <i className="fas fa-bell"></i>
                            <span className="count">3</span>
                        </button>

                        {/* CHAT - CLICKABLE */}
                        <button 
                            className="icon-btn" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowChatSidebar(!showChatSidebar);
                                setShowNotifications(false);
                            }}
                            title="Chat"
                        >
                            <i className="fas fa-comment-dots"></i>
                            <span className="count">5</span>
                        </button>

                        {/* AVATAR - LOGOUT */}
                        <div className="avatar" onClick={logout} title="Logout">
                            {user?.full_name?.[0] || 'U'}
                        </div>
                    </div>
                </div>

                {/* ===== NOTIFICATION DROPDOWN ===== */}
                {showNotifications && (
                    <div className="notification-dropdown" onClick={(e) => e.stopPropagation()}>
                        <div className="dropdown-header">
                            <h4>🔔 Notifications</h4>
                            <button onClick={() => setShowNotifications(false)}>✕</button>
                        </div>
                        <div className="dropdown-list">
                            <div className="notif-item">
                                <div className="notif-icon">🔔</div>
                                <div className="notif-content">
                                    <div className="notif-title">You were mentioned</div>
                                    <div className="notif-text">@John Developer mentioned you in chat</div>
                                    <div className="notif-time">2 min ago</div>
                                </div>
                            </div>
                            <div className="notif-item">
                                <div className="notif-icon">📅</div>
                                <div className="notif-content">
                                    <div className="notif-title">Meeting reminder</div>
                                    <div className="notif-text">Project Alpha Sprint Review at 10:00 AM</div>
                                    <div className="notif-time">15 min ago</div>
                                </div>
                            </div>
                            <div className="notif-item">
                                <div className="notif-icon">✅</div>
                                <div className="notif-content">
                                    <div className="notif-title">Task assigned</div>
                                    <div className="notif-text">You were assigned: UI Design</div>
                                    <div className="notif-time">1 hour ago</div>
                                </div>
                            </div>
                            <div className="notif-item">
                                <div className="notif-icon">💬</div>
                                <div className="notif-content">
                                    <div className="notif-title">New message</div>
                                    <div className="notif-text">Maria: Can you review the test results?</div>
                                    <div className="notif-time">2 hours ago</div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-footer">
                            <button className="btn-view-all">View All Notifications</button>
                        </div>
                    </div>
                )}

                {/* ===== CHAT SIDEBAR DROPDOWN ===== */}
                {showChatSidebar && (
                    <div className="chat-sidebar-overlay" onClick={(e) => e.stopPropagation()}>
                        <div className="chat-sidebar-dropdown">
                            <div className="dropdown-header">
                                <h4>💬 Recent Chats</h4>
                                <button onClick={() => setShowChatSidebar(false)}>✕</button>
                            </div>
                            <div className="dropdown-list">
                                <div className="chat-item">
                                    <div className="chat-avatar">📋</div>
                                    <div className="chat-info">
                                        <div className="chat-name">Project Alpha</div>
                                        <div className="chat-preview">David: I'll update the report</div>
                                        <div className="chat-time">10:45 AM</div>
                                    </div>
                                </div>
                                <div className="chat-item">
                                    <div className="chat-avatar">🌐</div>
                                    <div className="chat-info">
                                        <div className="chat-name">General Chat</div>
                                        <div className="chat-preview">Maria: Ready for testing</div>
                                        <div className="chat-time">10:30 AM</div>
                                    </div>
                                </div>
                                <div className="chat-item">
                                    <div className="chat-avatar">💻</div>
                                    <div className="chat-info">
                                        <div className="chat-name">John Developer</div>
                                        <div className="chat-preview">Can you review the code?</div>
                                        <div className="chat-time">9:15 AM</div>
                                    </div>
                                </div>
                                <div className="chat-item">
                                    <div className="chat-avatar">🧪</div>
                                    <div className="chat-info">
                                        <div className="chat-name">Maria QA</div>
                                        <div className="chat-preview">Tests are passing ✅</div>
                                        <div className="chat-time">8:45 AM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-footer">
                                <button className="btn-view-all">View All Chats</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== PAGE CONTENT ===== */}
                {children}
            </div>
        </div>
    );
}

// --- MAIN APP ---
function App() {
    const { user } = useAuth();

    if (!user) {
        return <Login />;
    }

    return (
        <Router>
            <ProtectedLayout>
                <Routes>
                    {/* Communication Routes */}
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/discussions" element={<Discussions />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/files" element={<FileShare />} />
                    <Route path="/search" element={<Search />} />
                    
                    {/* Other Routes */}
                    <Route path="/dashboard/*" element={<div className="panel">Dashboard</div>} />
                    <Route path="/projects/*" element={<div className="panel">Projects</div>} />
                    <Route path="/tasks/*" element={<div className="panel">Tasks</div>} />
                    <Route path="/risks" element={<div className="panel">Risks</div>} />
                    <Route path="/issues" element={<div className="panel">Issues</div>} />
                    <Route path="/changes" element={<div className="panel">Change Requests</div>} />
                    <Route path="/documents" element={<div className="panel">Documents</div>} />
                    <Route path="/templates" element={<div className="panel">Templates</div>} />
                    <Route path="/training" element={<div className="panel">Training</div>} />
                    <Route path="/courses" element={<div className="panel">Courses</div>} />
                    <Route path="/users" element={<div className="panel">Users</div>} />
                    <Route path="/settings" element={<div className="panel">Settings</div>} />
                    <Route path="/" element={<Navigate to="/chat" replace />} />
                    <Route path="*" element={<Navigate to="/chat" replace />} />
                </Routes>
            </ProtectedLayout>
        </Router>
    );
}

// --- ROOT APP (WRAPPED WITH PROVIDERS) ---
function RootApp() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default RootApp;