import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
    mockRooms, 
    mockMessages, 
    mockUsers, 
    mockRoomParticipants, 
    mockUnread 
} from '../../data/mockData';
import './Chat.css';

function Chat() {
    const { user } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // ===== DEBUG: Log user and data =====
    console.log('🔍 Current user:', user);
    console.log('🔍 All mockRooms:', mockRooms);
    console.log('🔍 All mockRoomParticipants:', mockRoomParticipants);

    // ===== GET UNREAD COUNT FOR CURRENT USER =====
    const getUnreadForRoom = (roomId) => {
        const roomUnread = mockUnread[roomId] || {};
        return roomUnread[user?.user_id] || 0;
    };

    // ===== LOAD ROOMS =====
    useEffect(() => {
        if (!user) return;

        // Filter rooms based on user's role and participants
        const userRooms = mockRooms.filter(room => {
            // Public rooms are visible to everyone
            if (room.room_type === 'public') return true;

            // Direct chats: show if user's name is in the room name
            if (room.room_type === 'direct') {
                return room.room_name.includes(user.full_name) || 
                       room.room_name.includes('John') || 
                       room.room_name.includes('David');
            }

            // Private rooms: check if user is in the participants list
            const participants = mockRoomParticipants[room.room_id] || [];
            return participants.includes(user.user_id);
        });

        console.log('🔍 Filtered rooms:', userRooms);

        // If no rooms found, fallback to all rooms (temporary fix)
        if (userRooms.length === 0) {
            console.warn('⚠️ No rooms found! Falling back to all rooms.');
            setRooms(mockRooms);
            if (mockRooms.length > 0) {
                setCurrentRoom(mockRooms[0]);
                const roomMessages = mockMessages[mockRooms[0].room_id] || [];
                setMessages(roomMessages);
                markAsRead(mockRooms[0].room_id);
            }
        } else {
            setRooms(userRooms);
            if (userRooms.length > 0) {
                setCurrentRoom(userRooms[0]);
                const roomMessages = mockMessages[userRooms[0].room_id] || [];
                setMessages(roomMessages);
                markAsRead(userRooms[0].room_id);
            }
        }
    }, [user]);

    // ===== SCROLL TO BOTTOM =====
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // ===== MARK AS READ =====
    const markAsRead = (roomId) => {
        if (!roomId || !user) return;
        if (mockUnread[roomId]) {
            mockUnread[roomId][user.user_id] = 0;
        }
        // Refresh room list to update unread badges
        setRooms([...rooms]);
    };

    // ===== ROOM SELECT =====
    const handleRoomSelect = (room) => {
        setCurrentRoom(room);
        const roomMessages = mockMessages[room.room_id] || [];
        setMessages(roomMessages);
        markAsRead(room.room_id);
    };

    // ===== SEND MESSAGE =====
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentRoom || !user) return;

        // Create new message
        const newMsg = {
            message_id: Date.now(),
            room_id: currentRoom.room_id,
            sender_id: user.user_id,
            content: newMessage,
            created_at: new Date().toISOString(),
        };

        // Add to mockMessages
        if (!mockMessages[currentRoom.room_id]) {
            mockMessages[currentRoom.room_id] = [];
        }
        mockMessages[currentRoom.room_id].push(newMsg);

        // Update unread counts for all participants except sender
        const participants = mockRoomParticipants[currentRoom.room_id] || [];
        participants.forEach(participantId => {
            if (participantId !== user.user_id) {
                if (!mockUnread[currentRoom.room_id]) {
                    mockUnread[currentRoom.room_id] = {};
                }
                if (!mockUnread[currentRoom.room_id][participantId]) {
                    mockUnread[currentRoom.room_id][participantId] = 0;
                }
                mockUnread[currentRoom.room_id][participantId] += 1;
            }
        });

        // Update local state
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        // Refresh room list to update unread counts
        setRooms([...rooms]);

        // Simulate auto-reply (for demo)
        setTimeout(() => {
            const replyMsg = {
                message_id: Date.now() + 1,
                room_id: currentRoom.room_id,
                sender_id: 2, // Sarah Executive (auto-reply)
                content: "Thanks for your message! I'll get back to you shortly. 🤖",
                created_at: new Date().toISOString(),
            };
            mockMessages[currentRoom.room_id].push(replyMsg);
            // Mark as unread for current user (since it's from someone else)
            if (!mockUnread[currentRoom.room_id]) {
                mockUnread[currentRoom.room_id] = {};
            }
            if (!mockUnread[currentRoom.room_id][user.user_id]) {
                mockUnread[currentRoom.room_id][user.user_id] = 0;
            }
            mockUnread[currentRoom.room_id][user.user_id] += 1;
            setMessages(prev => [...prev, replyMsg]);
            setRooms([...rooms]);
        }, 1500);
    };

    // ===== HELPERS =====
    const getUserName = (senderId) => {
        const found = mockUsers.find(u => u.user_id === senderId);
        return found ? found.full_name : 'Unknown User';
    };

    const getAvatar = (senderId) => {
        const found = mockUsers.find(u => u.user_id === senderId);
        return found ? found.avatar : '👤';
    };

    const getRoomAvatar = (room) => {
        if (room.room_type === 'direct') {
            const names = room.room_name.replace('Direct: ', '').split(' ↔ ');
            const otherName = names.find(n => !n.includes(user?.full_name || ''));
            const found = mockUsers.find(u => u.full_name === otherName);
            return found ? found.avatar : '👤';
        }
        return '💬';
    };

    const getRoomName = (room) => {
        if (room.room_type === 'direct') {
            const names = room.room_name.replace('Direct: ', '').split(' ↔ ');
            const otherName = names.find(n => !n.includes(user?.full_name || ''));
            return otherName || room.room_name;
        }
        return room.room_name;
    };

    const getMessageCount = (roomId) => {
        return (mockMessages[roomId] || []).length;
    };

    const getUnreadCount = (roomId) => {
        if (!user) return 0;
        const roomUnread = mockUnread[roomId] || {};
        return roomUnread[user.user_id] || 0;
    };

    // ===== DEBUG: Temporary button to show debug info =====
    const debugInfo = () => {
        console.log('🔍 Current user:', user);
        console.log('🔍 All rooms:', mockRooms);
        console.log('🔍 Participants:', mockRoomParticipants);
        console.log('🔍 Filtered rooms:', rooms);
        alert('Check console for debug info!');
    };

    return (
        <div className="chat-container">
            {/* DEBUG BUTTON (remove later) */}
            <button 
                onClick={debugInfo}
                style={{ 
                    position: 'fixed', 
                    bottom: '10px', 
                    right: '10px', 
                    zIndex: 9999, 
                    padding: '6px 12px', 
                    background: '#e53e3e', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                }}
            >
                🐛 Debug
            </button>

            {/* ===== ROOM LIST ===== */}
            <div className="room-list">
                <div className="room-list-header">
                    <h3>💬 Chats</h3>
                </div>
                <div className="room-items">
                    {rooms.length === 0 ? (
                        <div style={{ padding: '16px', color: '#a0aec0', textAlign: 'center' }}>
                            No rooms available.
                        </div>
                    ) : (
                        rooms.map(room => {
                            const unread = getUnreadCount(room.room_id);
                            return (
                                <div
                                    key={room.room_id}
                                    className={`room-item ${currentRoom?.room_id === room.room_id ? 'active' : ''}`}
                                    onClick={() => handleRoomSelect(room)}
                                >
                                    <span className="room-avatar">{getRoomAvatar(room)}</span>
                                    <div className="room-info">
                                        <div className="room-name">
                                            {getRoomName(room)}
                                            {unread > 0 && (
                                                <span className="unread-badge">{unread}</span>
                                            )}
                                        </div>
                                        <div className="room-meta">
                                            {room.room_type === 'private' && <span className="badge-private">🔒</span>}
                                            {room.room_type === 'public' && <span className="badge-public">🌐</span>}
                                            <span>{getMessageCount(room.room_id)} messages</span>
                                            {unread > 0 && (
                                                <span className="unread-text">({unread} unread)</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* ===== CHAT AREA ===== */}
            <div className="chat-area">
                {currentRoom ? (
                    <>
                        {/* Chat Header */}
                        <div className="chat-header">
                            <div>
                                <span className="header-avatar">{getRoomAvatar(currentRoom)}</span>
                                <span className="header-title">{getRoomName(currentRoom)}</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="messages-container">
                            {messages.length === 0 ? (
                                <div style={{ textAlign: 'center', color: '#a0aec0', padding: '40px' }}>
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                messages.map(msg => {
                                    const isOwn = msg.sender_id === user?.user_id;
                                    return (
                                        <div key={msg.message_id} className={`message ${isOwn ? 'own' : 'other'}`}>
                                            {!isOwn && (
                                                <div className="message-avatar">
                                                    {getAvatar(msg.sender_id)}
                                                </div>
                                            )}
                                            <div className="message-content">
                                                {!isOwn && (
                                                    <div className="message-sender">
                                                        {getUserName(msg.sender_id)}
                                                    </div>
                                                )}
                                                <div className="message-bubble">
                                                    {msg.content}
                                                    <div className="message-time">
                                                        {new Date(msg.created_at).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <form className="message-input-container" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="message-input"
                            />
                            <button type="submit" className="btn-send">
                                <i className="fas fa-paper-plane"></i> Send
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <div className="no-chat-icon">💬</div>
                        <h3>Select a chat</h3>
                        <p>Choose a room from the sidebar to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;