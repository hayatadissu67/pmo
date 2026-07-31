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
    const [previewFile, setPreviewFile] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

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
                url: '/files/new_file.pdf',
                content: 'This is a sample PDF content. (Preview simulation)'
            };
            setFiles([newFile, ...files]);
            setIsUploading(false);
        }, 1500);
    };

    const getRoomName = (roomId) => {
        const room = mockRooms.find(r => r.room_id === roomId);
        return room ? room.room_name : 'General';
    };

    // ===== PREVIEW HANDLER =====
    const handlePreview = (file) => {
        setPreviewFile(file);
        setShowPreview(true);
    };

    const closePreview = () => {
        setShowPreview(false);
        setPreviewFile(null);
    };

    // ===== RENDER PREVIEW CONTENT =====
    const renderPreviewContent = () => {
        if (!previewFile) return null;

        const fileType = previewFile.type;

        // Image preview
        if (fileType === 'image') {
            return (
                <div className="preview-image-container">
                    <img 
                        src={previewFile.url || 'https://via.placeholder.com/600x400?text=Image+Preview'} 
                        alt={previewFile.name}
                        className="preview-image"
                    />
                </div>
            );
        }

        // PDF preview (using iframe)
        if (fileType === 'pdf') {
            return (
                <div className="preview-pdf-container">
                    <iframe 
                        src={previewFile.url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'} 
                        title={previewFile.name}
                        className="preview-pdf"
                    />
                </div>
            );
        }

        // Excel/Spreadsheet preview (simulated table)
        if (fileType === 'excel') {
            return (
                <div className="preview-excel-container">
                    <table className="preview-table">
                        <thead>
                            <tr>
                                <th>Column A</th>
                                <th>Column B</th>
                                <th>Column C</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr>
                            <tr><td>Data 4</td><td>Data 5</td><td>Data 6</td></tr>
                            <tr><td>Data 7</td><td>Data 8</td><td>Data 9</td></tr>
                        </tbody>
                    </table>
                    <div className="preview-note">📊 Excel preview (sample data)</div>
                </div>
            );
        }

        // Word/Document preview (simulated text)
        if (fileType === 'word') {
            return (
                <div className="preview-word-container">
                    <div className="preview-document-content">
                        <h3>{previewFile.name}</h3>
                        <p>This is a preview of the document content. In a real application, the actual document text would be displayed here.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            );
        }

        // Default text preview
        return (
            <div className="preview-text-container">
                <pre className="preview-text">
                    {previewFile.content || 'No preview available for this file type.'}
                </pre>
            </div>
        );
    };

    return (
        <div className="files-container">
            {/* ===== HEADER ===== */}
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

            {/* ===== FILTERS ===== */}
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

            {/* ===== FILES GRID ===== */}
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
                                <button 
                                    className="btn-download" 
                                    title="Download"
                                    onClick={() => alert(`Downloading ${file.name}`)}
                                >
                                    <i className="fas fa-download"></i>
                                </button>
                                <button 
                                    className="btn-preview" 
                                    title="Preview"
                                    onClick={() => handlePreview(file)}
                                >
                                    <i className="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ===== PREVIEW MODAL ===== */}
            {showPreview && previewFile && (
                <div className="preview-modal-overlay" onClick={closePreview}>
                    <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="preview-modal-header">
                            <h4>
                                <span className="preview-icon">{getFileIcon(previewFile.type)}</span>
                                {previewFile.name}
                            </h4>
                            <button className="preview-close-btn" onClick={closePreview}>
                                ✕
                            </button>
                        </div>
                        <div className="preview-modal-body">
                            {renderPreviewContent()}
                        </div>
                        <div className="preview-modal-footer">
                            <span className="preview-file-meta">
                                Size: {previewFile.size} • Uploaded: {formatDate(previewFile.uploaded_at)} • By: {previewFile.uploaded_by_name}
                            </span>
                            <button 
                                className="btn-download-preview" 
                                onClick={() => alert(`Downloading ${previewFile.name}`)}
                            >
                                <i className="fas fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileShare;