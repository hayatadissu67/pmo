import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './VideoMeeting.css';

function VideoMeeting({ meeting, onClose, initialSettings }) {
    const { user } = useAuth();
    
    // ===== ROLE-BASED PERMISSIONS =====
    const isHost = user?.user_id === meeting?.organizer_id;
    const isAdmin = user?.role === 'Admin';
    const isExecPM = user?.role === 'Executive PM';
    const canManageMeeting = isHost || isAdmin || isExecPM;
    const canRemoveParticipants = isHost || isAdmin;

    // ===== STATE =====
    const [isMuted, setIsMuted] = useState(initialSettings?.isMuted || false);
    const [isVideoOn, setIsVideoOn] = useState(initialSettings?.isVideoOn !== undefined ? initialSettings.isVideoOn : true);
    const [isScreenSharing, setIsScreenSharing] = useState(initialSettings?.isScreenSharing || false);
    const [participants, setParticipants] = useState(() => {
        const base = [
            { id: 1, name: user?.full_name || 'You', isHost: true, isVideoOn: isVideoOn, isMuted: isMuted }
        ];
        const invited = (initialSettings?.participants || []).map((p, idx) => ({
            id: idx + 2,
            name: p,
            isHost: false,
            isVideoOn: true,
            isMuted: false
        }));
        return [...base, ...invited];
    });
    const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'System', message: 'Meeting started', time: 'Now' }
    ]);
    const [newChatMessage, setNewChatMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const chatEndRef = useRef(null);

    // ===== EFFECTS =====
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // ===== CONTROLS =====
    const toggleMute = () => {
        setIsMuted(!isMuted);
        setParticipants(prev => 
            prev.map(p => p.id === 1 ? { ...p, isMuted: !isMuted } : p)
        );
    };

    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
        setParticipants(prev => 
            prev.map(p => p.id === 1 ? { ...p, isVideoOn: !isVideoOn } : p)
        );
    };

    const toggleScreenShare = () => {
        setIsScreenSharing(!isScreenSharing);
    };

    const sendChatMessage = (e) => {
        e.preventDefault();
        if (!newChatMessage.trim()) return;
        setChatMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                sender: user?.full_name || 'You',
                message: newChatMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ]);
        setNewChatMessage('');
    };

    const removeParticipant = (participantId) => {
        if (!canRemoveParticipants) {
            alert('You do not have permission to remove participants.');
            return;
        }
        if (window.confirm('Remove this participant?')) {
            setParticipants(prev => prev.filter(p => p.id !== participantId));
        }
    };

    const endMeeting = () => {
        if (!canManageMeeting) {
            alert('Only the host or an admin can end this meeting.');
            return;
        }
        if (window.confirm('Are you sure you want to end the meeting?')) {
            onClose();
        }
    };

    // ===== RENDER =====
    return (
        <div className="video-meeting-overlay">
            <div className="video-meeting-container">
                {/* HEADER */}
                <div className="meeting-header">
                    <div className="meeting-info">
                        <h3>🎥 {meeting?.title || 'Video Meeting'}</h3>
                        <span className="meeting-time">
                            {meeting?.start_time ? new Date(meeting.start_time).toLocaleString() : 'Now'}
                        </span>
                        {isHost && <span className="host-badge">⭐ Host</span>}
                        {isAdmin && <span className="admin-badge">🛡️ Admin</span>}
                    </div>
                    {canManageMeeting && (
                        <button className="btn-end-meeting" onClick={endMeeting}>
                            <i className="fas fa-phone-slash"></i> End
                        </button>
                    )}
                </div>

                {/* VIDEO GRID */}
                <div className="video-grid">
                    {isScreenSharing && (
                        <div className="screen-share-area">
                            <div className="screen-share-content">
                                <i className="fas fa-desktop"></i>
                                <span>Screen sharing is active</span>
                                {canManageMeeting && (
                                    <button className="btn-stop-sharing" onClick={toggleScreenShare}>
                                        Stop Sharing
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <div className={`participant-grid ${isScreenSharing ? 'with-screen' : ''}`}>
                        {participants.map(p => (
                            <div key={p.id} className={`participant-video ${p.isHost ? 'host' : ''}`}>
                                {p.isVideoOn ? (
                                    <div className="video-placeholder">
                                        <div className="video-avatar">
                                            {p.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="video-overlay">
                                            <span className="participant-name">
                                                {p.name} {p.isHost && '⭐'}
                                            </span>
                                            {p.isMuted && <i className="fas fa-microphone-slash"></i>}
                                            {canRemoveParticipants && !p.isHost && (
                                                <button 
                                                    className="btn-remove-participant"
                                                    onClick={() => removeParticipant(p.id)}
                                                    title="Remove participant"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="video-off">
                                        <div className="video-avatar">
                                            {p.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="video-off-label">Video Off</span>
                                        <span className="participant-name">
                                            {p.name} {p.isHost && '⭐'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="meeting-controls">
                    <button className={`control-btn ${isMuted ? 'active' : ''}`} onClick={toggleMute}>
                        <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                        <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                    </button>
                    
                    <button className={`control-btn ${isVideoOn ? '' : 'active'}`} onClick={toggleVideo}>
                        <i className={`fas ${isVideoOn ? 'fa-video' : 'fa-video-slash'}`}></i>
                        <span>{isVideoOn ? 'Stop Video' : 'Start Video'}</span>
                    </button>
                    
                    <button className={`control-btn ${isScreenSharing ? 'active' : ''}`} onClick={toggleScreenShare}>
                        <i className="fas fa-desktop"></i>
                        <span>{isScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
                    </button>
                    
                    <button className="control-btn" onClick={() => setShowChat(!showChat)}>
                        <i className="fas fa-comment"></i>
                        <span>Chat</span>
                    </button>
                    
                    {canManageMeeting && (
                        <button className="control-btn danger" onClick={endMeeting}>
                            <i className="fas fa-phone-slash"></i>
                            <span>End</span>
                        </button>
                    )}
                </div>

                {/* CHAT PANEL */}
                {showChat && (
                    <div className="meeting-chat">
                        <div className="chat-header">
                            <span>💬 Meeting Chat</span>
                            <button onClick={() => setShowChat(false)}>✕</button>
                        </div>
                        <div className="chat-messages">
                            {chatMessages.map(msg => (
                                <div key={msg.id} className="chat-msg">
                                    <div className="chat-sender">{msg.sender}</div>
                                    <div className="chat-text">{msg.message}</div>
                                    <div className="chat-time">{msg.time}</div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <form className="chat-input-form" onSubmit={sendChatMessage}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newChatMessage}
                                onChange={(e) => setNewChatMessage(e.target.value)}
                            />
                            <button type="submit">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoMeeting;