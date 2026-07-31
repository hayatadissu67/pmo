import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
    mockRooms, 
    mockMessages, 
    mockUsers, 
    mockRoomParticipants, 
    mockUnread,
    saveMockData 
} from '../../data/mockData';
import './Chat.css';

function Chat() {
    const { user } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false); // <-- NEW: prevent double submit
    const messagesEndRef = useRef(null);

    // ===== UNREAD COUNT =====
    const getUnreadCount = (roomId) => {
        if (!user) return 0;
        const roomUnread = mockUnread[roomId] || {};
        return roomUnread[user.user_id] || 0;
    };

    // ===== LOAD ROOMS =====
    useEffect(() => {
        if (!user) return;
        setRooms(mockRooms);
        if (mockRooms && mockRooms.length > 0) {
            const firstRoom = mockRooms[0];
            setCurrentRoom(firstRoom);
            const roomMessages = mockMessages[firstRoom.room_id] || [];
            setMessages(roomMessages);
            markAsRead(firstRoom.room_id);
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
            saveMockData();
        }
    };

    // ===== ROOM SELECT =====
    const handleRoomSelect = (room) => {
        setCurrentRoom(room);
        const roomMessages = mockMessages[room.room_id] || [];
        setMessages(roomMessages);
        markAsRead(room.room_id);
    };

    // ===== SEND MESSAGE (with duplicate prevention) =====
    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log('handleSendMessage called');
        
        // ✅ Prevent double submission
        if (isSending || !newMessage.trim() || !currentRoom || !user) return;
        
        setIsSending(true); // Disable the button

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

        // Persist to localStorage
        saveMockData();

        // Update local state
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        setIsSending(false); // Re-enable the button

        // Simulate auto-reply (optional – keep it or remove it)
        setTimeout(() => {
            const replyMsg = {
                message_id: Date.now() + 1,
                room_id: currentRoom.room_id,
                sender_id: 2,
                content: "Thanks for your message! I'll get back to you shortly. 🤖",
                created_at: new Date().toISOString(),
            };
            mockMessages[currentRoom.room_id].push(replyMsg);
            
            if (!mockUnread[currentRoom.room_id]) {
                mockUnread[currentRoom.room_id] = {};
            }
            if (!mockUnread[currentRoom.room_id][user.user_id]) {
                mockUnread[currentRoom.room_id][user.user_id] = 0;
            }
            mockUnread[currentRoom.room_id][user.user_id] += 1;

            saveMockData();
            setMessages(prev => [...prev, replyMsg]);
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

    return (
        <div className="chat-container">
            {/* ===== ROOM LIST ===== */}
            <div className="room-list">
                <div className="room-list-header">
                    <h3>💬 Chats</h3>
                </div>
                <div className="room-items">
                    {rooms.length === 0 ? (
                        <div className="no-rooms-message">No rooms available.</div>
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
                                            {unread > 0 && <span className="unread-badge">{unread}</span>}
                                        </div>
                                        <div className="room-meta">
                                            {room.room_type === 'private' && <span className="badge-private">🔒</span>}
                                            {room.room_type === 'public' && <span className="badge-public">🌐</span>}
                                            <span>{getMessageCount(room.room_id)} messages</span>
                                            {unread > 0 && <span className="unread-text">({unread} unread)</span>}
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
                        <div className="chat-header">
                            <div>
                                <span className="header-avatar">{getRoomAvatar(currentRoom)}</span>
                                <span className="header-title">{getRoomName(currentRoom)}</span>
                            </div>
                        </div>

                        <div className="messages-container">
                            {messages.length === 0 ? (
                                <div className="no-messages">No messages yet. Start the conversation!</div>
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

                        <form className="message-input-container" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="message-input"
                                disabled={isSending} // <-- Disable input while sending
                            />
                            <button 
                                type="submit" 
                                className="btn-send"
                                disabled={isSending || !newMessage.trim()} // <-- Disable button
                            >
                                {isSending ? 'Sending...' : <><i className="fas fa-paper-plane"></i> Send</>}
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