import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockDiscussions, mockUsers } from '../../data/mockData';
import './Discussions.css';

function Discussions() {
    const { user } = useAuth();
    const [discussions, setDiscussions] = useState(mockDiscussions);
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
    const [showNewDiscussion, setShowNewDiscussion] = useState(false);

    const handleAddComment = (discussionId) => {
        if (!newComment.trim()) return;

        const updatedDiscussions = discussions.map(d => {
            if (d.discussion_id === discussionId) {
                return {
                    ...d,
                    comments: [
                        ...d.comments,
                        {
                            comment_id: Date.now(),
                            user_id: user.user_id,
                            user_name: user.full_name,
                            content: newComment,
                            created_at: new Date().toISOString(),
                        }
                    ]
                };
            }
            return d;
        });
        setDiscussions(updatedDiscussions);
        setNewComment('');
    };

    const handleCreateDiscussion = () => {
        if (!newDiscussionTitle.trim()) return;

        const newDiscussion = {
            discussion_id: Date.now(),
            title: newDiscussionTitle,
            created_by: user.user_id,
            created_by_name: user.full_name,
            project_id: null,
            project_name: 'General',
            created_at: new Date().toISOString(),
            comments: []
        };

        setDiscussions([newDiscussion, ...discussions]);
        setNewDiscussionTitle('');
        setShowNewDiscussion(false);
    };

    const getAvatar = (userId) => {
        const found = mockUsers.find(u => u.user_id === userId);
        return found ? found.avatar : '👤';
    };

    return (
        <div className="discussions-container">
            <div className="discussions-sidebar">
                <div className="discussions-header">
                    <h3>💬 Discussions</h3>
                    <button 
                        className="btn-new-discussion"
                        onClick={() => setShowNewDiscussion(!showNewDiscussion)}
                    >
                        <i className="fas fa-plus"></i> New
                    </button>
                </div>

                {showNewDiscussion && (
                    <div className="new-discussion-form">
                        <input
                            type="text"
                            placeholder="Discussion title..."
                            value={newDiscussionTitle}
                            onChange={(e) => setNewDiscussionTitle(e.target.value)}
                            className="discussion-input"
                        />
                        <div className="form-actions">
                            <button onClick={handleCreateDiscussion} className="btn-primary">
                                Create
                            </button>
                            <button onClick={() => setShowNewDiscussion(false)} className="btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="discussion-list">
                    {discussions.map(d => (
                        <div
                            key={d.discussion_id}
                            className={`discussion-item ${selectedDiscussion?.discussion_id === d.discussion_id ? 'active' : ''}`}
                            onClick={() => setSelectedDiscussion(d)}
                        >
                            <div className="discussion-title">{d.title}</div>
                            <div className="discussion-meta">
                                <span>{d.created_by_name}</span>
                                <span>•</span>
                                <span>{d.comments.length} comments</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="discussion-detail">
                {selectedDiscussion ? (
                    <>
                        <div className="discussion-header">
                            <h3>{selectedDiscussion.title}</h3>
                            <div className="discussion-info">
                                <span>Started by {selectedDiscussion.created_by_name}</span>
                                <span>•</span>
                                <span>{new Date(selectedDiscussion.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="comments-container">
                            {selectedDiscussion.comments.map(comment => (
                                <div key={comment.comment_id} className="comment">
                                    <div className="comment-avatar">
                                        {getAvatar(comment.user_id)}
                                    </div>
                                    <div className="comment-content">
                                        <div className="comment-header">
                                            <span className="comment-author">{comment.user_name}</span>
                                            <span className="comment-time">
                                                {new Date(comment.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="comment-body">{comment.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="comment-input-container">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="comment-input"
                            />
                            <button 
                                onClick={() => handleAddComment(selectedDiscussion.discussion_id)}
                                className="btn-send-comment"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="no-discussion-selected">
                        <div className="no-discussion-icon">💬</div>
                        <h3>Select a discussion</h3>
                        <p>Choose a discussion from the sidebar or create a new one</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Discussions;