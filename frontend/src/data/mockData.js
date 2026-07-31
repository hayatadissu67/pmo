// ============================================================
// MOCK DATA – PMO Control Tower Communication Module
// With localStorage persistence
// ============================================================

// Helper: get data from localStorage, or fallback to default
const getPersistedData = (key, defaultData) => {
    const stored = localStorage.getItem(`pmo_${key}`);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return defaultData;
        }
    }
    return defaultData;
};

const setPersistedData = (key, data) => {
    localStorage.setItem(`pmo_${key}`, JSON.stringify(data));
};

// ===== DEFAULTS =====
const defaultUsers = [
    { user_id: 1, full_name: 'System Admin', email: 'admin@pmo.com', role: 'Admin', avatar: '🛡️' },
    { user_id: 2, full_name: 'Sarah Executive', email: 'exec@pmo.com', role: 'Executive PM', avatar: '👔' },
    { user_id: 3, full_name: 'David PM', email: 'pm@pmo.com', role: 'PM', avatar: '📋' },
    { user_id: 4, full_name: 'John Developer', email: 'dev@pmo.com', role: 'Developer', avatar: '💻' },
    { user_id: 5, full_name: 'Maria QA', email: 'qa@pmo.com', role: 'QA', avatar: '🧪' },
    { user_id: 6, full_name: 'Alex Intern', email: 'intern@pmo.com', role: 'Intern', avatar: '🎓' },
];

const defaultRooms = [
    { room_id: 1, room_name: 'General Chat', room_type: 'public', created_by: 1, created_at: '2026-01-01T10:00:00' },
    { room_id: 2, room_name: 'Project Alpha', room_type: 'private', project_id: 1, created_by: 3, created_at: '2026-03-01T09:00:00' },
    { room_id: 3, room_name: 'Project Beta', room_type: 'private', project_id: 2, created_by: 3, created_at: '2026-05-15T14:00:00' },
    { room_id: 4, room_name: 'Direct: John ↔ David', room_type: 'direct', created_by: 3, created_at: '2026-06-01T11:00:00' },
    { room_id: 5, room_name: 'Executive Updates', room_type: 'private', created_by: 2, created_at: '2026-04-01T08:00:00' },
];

const defaultParticipants = {
    1: [1, 2, 3, 4, 5, 6],
    2: [1, 2, 3, 4, 5],
    3: [1, 2, 3, 4, 5],
    4: [3, 4],
    5: [1, 2, 3],
};

const defaultUnread = {
    1: { 2: 2, 3: 1, 4: 0, 5: 3, 6: 0 },
    2: { 1: 0, 2: 0, 4: 1, 5: 0 },
    3: { 1: 0, 2: 0, 4: 0, 5: 0 },
    4: { 3: 0, 4: 0 },
    5: { 1: 0, 2: 0, 3: 0 },
};

const defaultMessages = {
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

// ===== EXPORT PERSISTED DATA =====
export const mockUsers = defaultUsers;
export const mockRooms = defaultRooms;
export const mockRoomParticipants = defaultParticipants;

// Persist messages and unread counts
export let mockMessages = getPersistedData('messages', defaultMessages);
export let mockUnread = getPersistedData('unread', defaultUnread);

// Helper to save changes (call after modifying mockMessages or mockUnread)
export const saveMockData = () => {
    setPersistedData('messages', mockMessages);
    setPersistedData('unread', mockUnread);
};

// Initialize default data if not present (first run)
if (!localStorage.getItem('pmo_messages')) {
    setPersistedData('messages', defaultMessages);
    setPersistedData('unread', defaultUnread);
    mockMessages = defaultMessages;
    mockUnread = defaultUnread;
}

// ===== OTHER MOCK DATA (unchanged) =====
export const mockMeetings = [ /* ... same as before ... */ ];
export const mockNotifications = [ /* ... same ... */ ];
export const mockDiscussions = [ /* ... same ... */ ];
export const mockFiles = [ /* ... same ... */ ];