import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const MODULES = [
    { 
        name: 'Dashboard', 
        icon: '📊', 
        subs: [
            { name: 'Executive Dashboard', path: '/dashboard/exec' },
            { name: 'PM Dashboard', path: '/dashboard/pm' }
        ] 
    },
    { 
        name: 'Projects', 
        icon: '📋', 
        subs: [
            { name: 'All Projects', path: '/projects' },
            { name: 'My Projects', path: '/projects/my' },
            { name: 'Create Project', path: '/projects/create' }
        ] 
    },
    { 
        name: 'Tasks', 
        icon: '✅', 
        subs: [
            { name: 'Task Board', path: '/tasks' },
            { name: 'My Tasks', path: '/tasks/my' }
        ] 
    },
    { 
        name: 'Communication', 
        icon: '💬', 
        subs: [
            { name: 'Chat', path: '/chat' },
            { name: 'Discussions', path: '/discussions' },
            { name: 'Calendar', path: '/calendar' },
            { name: 'Notifications', path: '/notifications' },
            { name: 'File Sharing', path: '/files' },
            { name: 'Search', path: '/search' }


        ] 
    },
    { 
        name: 'Governance', 
        icon: '⚖️', 
        subs: [
            { name: 'Risks', path: '/risks' },
            { name: 'Issues', path: '/issues' },
            { name: 'Change Requests', path: '/changes' }
        ] 
    },
    { 
        name: 'Documents', 
        icon: '📄', 
        subs: [
            { name: 'Documents', path: '/documents' },
            { name: 'Templates', path: '/templates' }
        ] 
    },
    { 
        name: 'Training', 
        icon: '🎓', 
        subs: [
            { name: 'My Training', path: '/training' },
            { name: 'Course Catalog', path: '/courses' }
        ] 
    },
    { 
        name: 'Admin', 
        icon: '⚙️', 
        subs: [
            { name: 'Users', path: '/users' },
            { name: 'Settings', path: '/settings' }
        ] 
    },
    
];

function Sidebar() {
    const [expanded, setExpanded] = useState({
        'Communication': true  // Start with Communication expanded
    });
    const navigate = useNavigate();
    const location = useLocation();

    const toggleModule = (name) => {
        setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar">
            <div className="logo">
                PMO <span>Tower</span>
            </div>
            {MODULES.map(module => (
                <div key={module.name} className="module">
                    <div 
                        className="module-header" 
                        onClick={() => toggleModule(module.name)}
                    >
                        <span>{module.icon} {module.name}</span>
                        <span className="arrow">{expanded[module.name] ? '▼' : '▶'}</span>
                    </div>
                    {expanded[module.name] && (
                        <div className="sub-modules">
                            {module.subs.map(sub => (
                                <div
                                    key={sub.path}
                                    className={`sub-item ${isActive(sub.path) ? 'active' : ''}`}
                                    onClick={() => navigate(sub.path)}
                                >
                                    {sub.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;