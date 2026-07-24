// Mock data for the communication module
export const mockUsers = [
    { user_id: 1, full_name: 'System Admin', email: 'admin@pmo.com', role: 'Admin', avatar: '🛡️' },
    { user_id: 2, full_name: 'Sarah Executive', email: 'exec@pmo.com', role: 'Executive PM', avatar: '👔' },
    { user_id: 3, full_name: 'David PM', email: 'pm@pmo.com', role: 'PM', avatar: '📋' },
    { user_id: 4, full_name: 'John Developer', email: 'dev@pmo.com', role: 'Developer', avatar: '💻' },
    { user_id: 5, full_name: 'Maria QA', email: 'qa@pmo.com', role: 'QA', avatar: '🧪' },
    { user_id: 6, full_name: 'Alex Intern', email: 'intern@pmo.com', role: 'Intern', avatar: '🎓' },
];

export const mockRooms = [
    { room_id: 1, room_name: 'General Chat', room_type: 'public', created_by: 1, created_at: '2026-01-01T10:00:00' },
    { room_id: 2, room_name: 'Project Alpha', room_type: 'private', project_id: 1, created_by: 3, created_at: '2026-03-01T09:00:00' },
    { room_id: 3, room_name: 'Project Beta', room_type: 'private', project_id: 2, created_by: 3, created_at: '2026-05-15T14:00:00' },
    { room_id: 4, room_name: 'Direct: John ↔ David', room_type: 'direct', created_by: 3, created_at: '2026-06-01T11:00:00' },
    { room_id: 5, room_name: 'Executive Updates', room_type: 'private', created_by: 2, created_at: '2026-04-01T08:00:00' },
];

export const mockMessages = {
    1: [
        { message_id: 1, room_id: 1, sender_id: 1, content: 'Welcome to the PMO Control Tower! 🚀', created_at: '2026-01-01T10:05:00' },
        { message_id: 2, room_id: 1, sender_id: 2, content: 'Excited to have this platform!', created_at: '2026-01-01T10:10:00' },
        { message_id: 3, room_id: 1, sender_id: 3, content: 'Can we schedule a kickoff meeting?', created_at: '2026-01-01T10:15:00' },
        { message_id: 4, room_id: 1, sender_id: 4, content: 'I\'m ready to start working on the tasks!', created_at: '2026-01-01T10:20:00' },
        { message_id: 5, room_id: 1, sender_id: 5, content: 'QA team is standing by for testing.', created_at: '2026-01-01T10:25:00' },
        { message_id: 6, room_id: 1, sender_id: 6, content: 'Learning a lot as an intern!', created_at: '2026-01-01T10:30:00' },
    ],
    2: [
        { message_id: 11, room_id: 2, sender_id: 3, content: 'Project Alpha kickoff meeting notes are ready.', created_at: '2026-03-01T09:15:00' },
        { message_id: 12, room_id: 2, sender_id: 4, content: '@David PM I\'ll start working on the UI designs.', created_at: '2026-03-01T09:30:00' },
        { message_id: 13, room_id: 2, sender_id: 5, content: 'QA team ready to review test plans.', created_at: '2026-03-01T09:45:00' },
        { message_id: 14, room_id: 2, sender_id: 3, content: 'Great progress everyone! Keep it up.', created_at: '2026-03-01T10:00:00' },
    ],
    3: [
        { message_id: 21, room_id: 3, sender_id: 3, content: 'Project Beta sprint planning starts tomorrow.', created_at: '2026-05-15T14:15:00' },
        { message_id: 22, room_id: 3, sender_id: 4, content: 'I\'ll prepare the tech stack documentation.', created_at: '2026-05-15T14:30:00' },
    ],
    4: [
        { message_id: 31, room_id: 4, sender_id: 3, content: 'Hey John, can you review the API design?', created_at: '2026-06-01T11:05:00' },
        { message_id: 32, room_id: 4, sender_id: 4, content: 'Sure David, I\'ll take a look today.', created_at: '2026-06-01T11:10:00' },
    ],
    5: [
        { message_id: 41, room_id: 5, sender_id: 2, content: 'Executive update: Q4 targets looking good.', created_at: '2026-04-01T08:10:00' },
        { message_id: 42, room_id: 5, sender_id: 1, content: 'Approved the budget for next quarter.', created_at: '2026-04-01T08:20:00' },
    ],
};

export const mockMeetings = [
    { 
        meeting_id: 1, 
        title: 'Project Alpha Sprint Review', 
        description: 'Review sprint progress and plan next steps',
        organizer_id: 3, 
        organizer_name: 'David PM',
        start_time: '2026-07-22T10:00:00', 
        end_time: '2026-07-22T11:00:00',
        project_id: 1,
        project_name: 'Project Alpha',
        status: 'scheduled',
        attendee_count: 8,
        attendees: [1, 2, 3, 4, 5]
    },
    { 
        meeting_id: 2, 
        title: 'PMO Monthly Sync', 
        description: 'Monthly alignment meeting with all PMs',
        organizer_id: 2, 
        organizer_name: 'Sarah Executive',
        start_time: '2026-07-23T14:00:00', 
        end_time: '2026-07-23T15:30:00',
        project_id: null,
        project_name: null,
        status: 'scheduled',
        attendee_count: 15,
        attendees: [1, 2, 3, 4, 5, 6]
    },
    { 
        meeting_id: 3, 
        title: 'Project Beta Standup', 
        description: 'Daily standup for Project Beta team',
        organizer_id: 3, 
        organizer_name: 'David PM',
        start_time: '2026-07-24T09:00:00', 
        end_time: '2026-07-24T09:15:00',
        project_id: 2,
        project_name: 'Project Beta',
        status: 'scheduled',
        attendee_count: 5,
        attendees: [3, 4, 5]
    },
];

export const mockNotifications = [
    { 
        notification_id: 1, 
        user_id: 4, 
        type: 'mention', 
        title: 'You were mentioned',
        content: '@John Developer mentioned you in Project Alpha chat',
        reference_id: 12,
        reference_type: 'message',
        is_read: false,
        created_at: '2026-07-21T09:30:00'
    },
    { 
        notification_id: 2, 
        user_id: 4, 
        type: 'meeting', 
        title: 'Meeting invitation',
        content: 'You have been invited to Project Alpha Sprint Review',
        reference_id: 1,
        reference_type: 'meeting',
        is_read: false,
        created_at: '2026-07-20T16:00:00'
    },
    { 
        notification_id: 3, 
        user_id: 4, 
        type: 'task', 
        title: 'Task assigned',
        content: 'You were assigned a new task: UI Design',
        reference_id: 1,
        reference_type: 'task',
        is_read: true,
        created_at: '2026-07-20T10:00:00'
    },
];

export const mockDiscussions = [
    {
        discussion_id: 1,
        title: 'API Design Review',
        created_by: 4,
        created_by_name: 'John Developer',
        project_id: 1,
        project_name: 'Project Alpha',
        created_at: '2026-07-20T11:00:00',
        comments: [
            { comment_id: 1, user_id: 4, user_name: 'John Developer', content: 'I\'ve completed the API design draft. Please review.', created_at: '2026-07-20T11:05:00' },
            { comment_id: 2, user_id: 5, user_name: 'Maria QA', content: 'The endpoints look good. I\'ll start writing tests.', created_at: '2026-07-20T11:30:00' },
            { comment_id: 3, user_id: 3, user_name: 'David PM', content: 'Can we add pagination to the list endpoint?', created_at: '2026-07-20T12:00:00' },
        ]
    },
];
// Add to the end of the file
export const mockFiles = [
    {
        file_id: 1,
        name: 'Project_Alpha_Report.pdf',
        size: '2.4 MB',
        type: 'pdf',
        uploaded_by: 3,
        uploaded_by_name: 'David PM',
        room_id: 2, // Project Alpha room
        uploaded_at: '2026-07-20T14:30:00',
        url: '/files/project_alpha_report.pdf'
    },
    {
        file_id: 2,
        name: 'UI_Mockup_v2.png',
        size: '1.8 MB',
        type: 'image',
        uploaded_by: 4,
        uploaded_by_name: 'John Developer',
        room_id: 2,
        uploaded_at: '2026-07-21T10:15:00',
        url: '/files/ui_mockup_v2.png'
    },
    {
        file_id: 3,
        name: 'Q4_Budget.xlsx',
        size: '856 KB',
        type: 'excel',
        uploaded_by: 2,
        uploaded_by_name: 'Sarah Executive',
        room_id: 5, // Executive Updates room
        uploaded_at: '2026-07-19T09:00:00',
        url: '/files/q4_budget.xlsx'
    },
];