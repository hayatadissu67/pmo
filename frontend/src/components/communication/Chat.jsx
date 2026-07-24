import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockRooms, mockMessages, mockUsers } from '../../data/mockData';
import './Chat.css';

function Chat() {
    const { user } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Load rooms on mount
    useEffect(() => {
        const userRooms = mockRooms.filter(room => {
            if (room.room_type === 'public') return true;
            if (room.room_type === 'direct') {
                return room.room_name.includes(user.full_name) || 
                       room.room_name.includes('John') || 
                       room.room_name.includes('David');
            }
            return true;
        });
        setRooms(userRooms);
        if (userRooms.length > 0) {
            setCurrentRoom(userRooms[0]);
            setMessages(mockMessages[userRooms[0].room_id] || []);
        }
    }, [user]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleRoomSelect = (room) => {
        setCurrentRoom(room);
        setMessages(mockMessages[room.room_id] || []);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentRoom) return;

        const newMsg = {
            message_id: Date.now(),
            room_id: currentRoom.room_id,
            sender_id: user.user_id,
            content: newMessage,
            created_at: new Date().toISOString(),
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');

        // Simulate auto-reply (for demo)
        setTimeout(() => {
            const replyMsg = {
                message_id: Date.now() + 1,
                room_id: currentRoom.room_id,
                sender_id: 2,
                content: "Thanks for your message! I'll get back to you shortly. 🤖",
                created_at: new Date().toISOString(),
            };
            setMessages(prev => [...prev, replyMsg]);
        }, 2000);
    };

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
            const otherName = names.find(n => !n.includes(user.full_name));
            const found = mockUsers.find(u => u.full_name === otherName);
            return found ? found.avatar : '👤';
        }
        return '💬';
    };

    const getRoomName = (room) => {
        if (room.room_type === 'direct') {
            const names = room.room_name.replace('Direct: ', '').split(' ↔ ');
            const otherName = names.find(n => !n.includes(user.full_name));
            return otherName || room.room_name;
        }
        return room.room_name;
    };

    return (
        <div className="chat-container">
            {/* Room List */}
            <div className="room-list">
                <div className="room-list-header">
                    <h3>💬 Chats</h3>
                </div>
                <div className="room-items">
                    {rooms.map(room => (
                        <div
                            key={room.room_id}
                            className={`room-item ${currentRoom?.room_id === room.room_id ? 'active' : ''}`}
                            onClick={() => handleRoomSelect(room)}
                        >
                            <span className="room-avatar">{getRoomAvatar(room)}</span>
                            <div className="room-info">
                                <div className="room-name">{getRoomName(room)}</div>
                                <div className="room-meta">
                                    {room.room_type === 'private' && <span className="badge-private">🔒</span>}
                                    {room.room_type === 'public' && <span className="badge-public">🌐</span>}
                                    {mockMessages[room.room_id]?.length || 0} messages
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
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
                            {messages.map(msg => {
                                const isOwn = msg.sender_id === user.user_id;
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
                            })}
                            <div ref={messagesEndRef} />
                        </div>

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