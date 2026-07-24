import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockFiles, mockRooms } from '../../data/mockData';
import './FileShare.css';

function FileShare() {
    const { user } = useAuth();
    const [files, setFiles] = useState(mockFiles);
    const [selectedRoom, setSelectedRoom] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const getFileIcon = (type) => {
        switch(type) {
            case 'pdf': return '📄';
            case 'image': return '🖼️';
            case 'excel': return '📊';
            case 'word': return '📝';
            case 'ppt': return '📑';
            default: return '📎';
        }
    };

    const getFileColor = (type) => {
        switch(type) {
            case 'pdf': return '#e53e3e';
            case 'image': return '#38a169';
            case 'excel': return '#38a169';
            case 'word': return '#2b6cb0';
            case 'ppt': return '#ed8936';
            default: return '#718096';
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const filteredFiles = files.filter(file => {
        const matchesRoom = selectedRoom === 'all' || file.room_id === parseInt(selectedRoom);
        const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRoom && matchesSearch;
    });

    const handleUpload = (e) => {
        e.preventDefault();
        setIsUploading(true);
        // Simulate upload
        setTimeout(() => {
            const newFile = {
                file_id: Date.now(),
                name: 'New_File.pdf',
                size: '1.2 MB',
                type: 'pdf',
                uploaded_by: user.user_id,
                uploaded_by_name: user.full_name,
                room_id: selectedRoom === 'all' ? 1 : parseInt(selectedRoom),
                uploaded_at: new Date().toISOString(),
                url: '/files/new_file.pdf'
            };
            setFiles([newFile, ...files]);
            setIsUploading(false);
        }, 1500);
    };

    const getRoomName = (roomId) => {
        const room = mockRooms.find(r => r.room_id === roomId);
        return room ? room.room_name : 'General';
    };

    return (
        <div className="files-container">
            <div className="files-header">
                <h3>📁 File Sharing</h3>
                <form onSubmit={handleUpload} className="upload-form">
                    <input type="file" id="fileUpload" style={{ display: 'none' }} />
                    <button 
                        type="button" 
                        className="btn-upload"
                        onClick={() => document.getElementById('fileUpload').click()}
                        disabled={isUploading}
                    >
                        <i className="fas fa-upload"></i> {isUploading ? 'Uploading...' : 'Upload File'}
                    </button>
                </form>
            </div>

            <div className="files-filters">
                <div className="filter-group">
                    <label>Room:</label>
                    <select 
                        value={selectedRoom} 
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Rooms</option>
                        {mockRooms.map(room => (
                            <option key={room.room_id} value={room.room_id}>
                                {room.room_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="files-grid">
                {filteredFiles.length === 0 ? (
                    <div className="no-files">
                        <div className="no-files-icon">📭</div>
                        <h3>No files found</h3>
                        <p>Upload a file to share with your team</p>
                    </div>
                ) : (
                    filteredFiles.map(file => (
                        <div key={file.file_id} className="file-card">
                            <div className="file-icon" style={{ color: getFileColor(file.type) }}>
                                {getFileIcon(file.type)}
                            </div>
                            <div className="file-info">
                                <div className="file-name" title={file.name}>
                                    {file.name}
                                </div>
                                <div className="file-meta">
                                    <span>{file.size}</span>
                                    <span>•</span>
                                    <span>{file.uploaded_by_name}</span>
                                    <span>•</span>
                                    <span>{formatDate(file.uploaded_at)}</span>
                                </div>
                                <div className="file-room">
                                    <span className="room-tag">📌 {getRoomName(file.room_id)}</span>
                                </div>
                            </div>
                            <div className="file-actions">
                                <button className="btn-download" title="Download">
                                    <i className="fas fa-download"></i>
                                </button>
                                <button className="btn-preview" title="Preview">
                                    <i className="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FileShare;