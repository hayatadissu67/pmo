import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockMessages, mockDiscussions, mockMeetings, mockRooms } from '../../data/mockData';
import './Search.css';

function Search() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('all');
    const [results, setResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setResults([]);
            return;
        }

        const term = searchTerm.toLowerCase();
        let allResults = [];

        // Search Messages
        if (searchType === 'all' || searchType === 'messages') {
            Object.values(mockMessages).forEach(roomMessages => {
                roomMessages.forEach(msg => {
                    if (msg.content.toLowerCase().includes(term)) {
                        allResults.push({
                            type: 'message',
                            id: msg.message_id,
                            content: msg.content,
                            sender: msg.sender_id,
                            created_at: msg.created_at,
                            room_id: msg.room_id,
                            match: msg.content
                        });
                    }
                });
            });
        }

        // Search Discussions
        if (searchType === 'all' || searchType === 'discussions') {
            mockDiscussions.forEach(discussion => {
                if (discussion.title.toLowerCase().includes(term)) {
                    allResults.push({
                        type: 'discussion',
                        id: discussion.discussion_id,
                        title: discussion.title,
                        created_by: discussion.created_by_name,
                        created_at: discussion.created_at,
                        match: discussion.title
                    });
                }
                discussion.comments.forEach(comment => {
                    if (comment.content.toLowerCase().includes(term)) {
                        allResults.push({
                            type: 'comment',
                            id: comment.comment_id,
                            content: comment.content,
                            author: comment.user_name,
                            discussion_id: discussion.discussion_id,
                            discussion_title: discussion.title,
                            created_at: comment.created_at,
                            match: comment.content
                        });
                    }
                });
            });
        }

        // Search Meetings
        if (searchType === 'all' || searchType === 'meetings') {
            mockMeetings.forEach(meeting => {
                if (meeting.title.toLowerCase().includes(term) || 
                    meeting.description?.toLowerCase().includes(term)) {
                    allResults.push({
                        type: 'meeting',
                        id: meeting.meeting_id,
                        title: meeting.title,
                        organizer: meeting.organizer_name,
                        start_time: meeting.start_time,
                        match: meeting.title
                    });
                }
            });
        }

        // Search Rooms
        if (searchType === 'all' || searchType === 'rooms') {
            mockRooms.forEach(room => {
                if (room.room_name.toLowerCase().includes(term)) {
                    allResults.push({
                        type: 'room',
                        id: room.room_id,
                        name: room.room_name,
                        room_type: room.room_type,
                        match: room.room_name
                    });
                }
            });
        }

        setResults(allResults.slice(0, 20));
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'message': return '💬';
            case 'discussion': return '📋';
            case 'comment': return '💭';
            case 'meeting': return '📅';
            case 'room': return '🏠';
            default: return '📌';
        }
    };

    const getTypeLabel = (type) => {
        switch(type) {
            case 'message': return 'Message';
            case 'discussion': return 'Discussion';
            case 'comment': return 'Comment';
            case 'meeting': return 'Meeting';
            case 'room': return 'Room';
            default: return 'Result';
        }
    };

    const highlightMatch = (text) => {
        if (!searchTerm) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, i) => 
            part.toLowerCase() === searchTerm.toLowerCase() 
                ? <mark key={i} className="highlight">{part}</mark> 
                : part
        );
    };

    return (
        <div className="search-container">
            <div className="search-header">
                <h3>🔍 Advanced Search</h3>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-main-input"
                    />
                    <select 
                        value={searchType} 
                        onChange={(e) => setSearchType(e.target.value)}
                        className="search-type-select"
                    >
                        <option value="all">All</option>
                        <option value="messages">Messages</option>
                        <option value="discussions">Discussions</option>
                        <option value="meetings">Meetings</option>
                        <option value="rooms">Rooms</option>
                    </select>
                    <button type="submit" className="btn-search">
                        <i className="fas fa-search"></i> Search
                    </button>
                </div>
            </form>

            <div className="search-results">
                {searchTerm && results.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3>No results found</h3>
                        <p>Try adjusting your search terms</p>
                    </div>
                )}

                {results.length > 0 && (
                    <div className="results-stats">
                        Found {results.length} results for "{searchTerm}"
                    </div>
                )}

                {results.map((result, index) => (
                    <div key={`${result.type}-${result.id}`} className="result-item">
                        <div className="result-icon">{getTypeIcon(result.type)}</div>
                        <div className="result-content">
                            <div className="result-header">
                                <span className="result-type">{getTypeLabel(result.type)}</span>
                                <span className="result-time">
                                    {result.created_at && new Date(result.created_at).toLocaleString()}
                                </span>
                            </div>
                            <div className="result-title">
                                {result.title || result.name || result.content}
                            </div>
                            <div className="result-meta">
                                {result.sender && <span>By: {result.sender}</span>}
                                {result.author && <span>By: {result.author}</span>}
                                {result.organizer && <span>By: {result.organizer}</span>}
                                {result.created_by && <span>By: {result.created_by}</span>}
                                {result.discussion_title && (
                                    <span>In: {result.discussion_title}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;