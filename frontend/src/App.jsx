import React from 'react';
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

// --- PROTECTED LAYOUT (with Top Bar INSIDE main-content) ---
function ProtectedLayout({ children }) {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className={`app-layout ${isDark ? 'dark' : ''}`}>
            <Sidebar />
            <div className="main-content">
                {/* ===== TOP BAR - NOW INSIDE main-content ===== */}
                <div className="topbar">
                    <div className="topbar-left">
                        PMO <span>Control Tower</span>
                    </div>
                    <div className="topbar-right">
                        {/* THEME TOGGLE BUTTON */}
                        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
                            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
                        </button>
                        <button className="icon-btn">
                            <i className="fas fa-bell"></i>
                            <span className="count">3</span>
                        </button>
                        <button className="icon-btn">
                            <i className="fas fa-comment-dots"></i>
                            <span className="count">5</span>
                        </button>
                        <div className="avatar" onClick={logout} title="Logout">
                            {user?.full_name?.[0] || 'U'}
                        </div>
                    </div>
                </div>
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