import React, { useState } from 'react';
import { initialTasks, teamMembers, initialActivities } from './mockData.jsx';
import OverviewView from './OverviewView.jsx';
import MyTasksView from './MyTasksView.jsx';
import TaskListView from './TaskListView.jsx';
import TaskFormView from './TaskFormView.jsx';
import KanbanBoardView from './KanbanBoardView.jsx';
import AssignMembersView from './AssignMembersView.jsx';
import CalendarAndDeadlinesView from './CalendarAndDeadlinesView.jsx';
import TeamProgressView from './TeamProgressView.jsx';
import ReportsView from './ReportsView.jsx';

export default function Taskpage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [tasks, setTasks] = useState(initialTasks);
  const [currentUser, setCurrentUser] = useState('John Doe');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
  const [activities, setActivities] = useState(initialActivities);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', category: 'Engineering', type: 'Feature', description: '', priority: 'Medium',
    status: 'Pending', assignee: 'Unassigned', dueDate: '', attachments: '', checklistText: '',
    role: 'Contributor', workload: '5 hrs/wk', milestone: 'General'
  });

  const addActivity = (text) => {
    setActivities((prev) => [{ id: Date.now(), text, timestamp: 'Just now' }, ...prev]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgressChange = (taskId, newProgress) => {
    const val = parseInt(newProgress, 10);
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === taskId) {
          const updatedStatus = val === 100 ? 'Completed' : val > 0 ? 'In Progress' : 'Pending';
          const updatedKanban = val === 100 ? 'Completed' : val > 0 ? 'In Progress' : 'To Do';
          return {
            ...t,
            progress: val,
            status: updatedStatus,
            kanbanStatus: updatedKanban,
            completionDate: val === 100 ? new Date().toISOString().split('T')[0] : null
          };
        }
        return t;
      })
    );
  };

  const handleToggleChecklist = (taskId, itemId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === taskId && t.checklist) {
          const updatedList = t.checklist.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item
          );
          return { ...t, checklist: updatedList };
        }
        return t;
      })
    );
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const checklistItems = formData.checklistText
      ? formData.checklistText.split(',').map((item, index) => ({
          id: Date.now() + index,
          text: item.trim(),
          done: false
        }))
      : [];
    const attachmentsList = formData.attachments ? formData.attachments.split(',').map((s) => s.trim()) : [];

    if (editingId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === editingId
            ? {
                ...t,
                ...formData,
                attachments: attachmentsList.length ? attachmentsList : t.attachments,
                checklist: checklistItems.length ? checklistItems : t.checklist
              }
            : t
        )
      );
      addActivity(`Task "${formData.title}" was updated.`);
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
        kanbanStatus: formData.status === 'Completed' ? 'Completed' : formData.status === 'In Progress' ? 'In Progress' : 'To Do',
        attachments: attachmentsList,
        checklist: checklistItems,
        completionDate: formData.status === 'Completed' ? new Date().toISOString().split('T')[0] : null,
        delayReason: null,
        progress: formData.status === 'Completed' ? 100 : formData.status === 'In Progress' ? 50 : 0
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      addActivity(`New task "${formData.title}" created.`);
    }

    setFormData({
      title: '', category: 'Engineering', type: 'Feature', description: '', priority: 'Medium',
      status: 'Pending', assignee: 'Unassigned', dueDate: '', attachments: '', checklistText: '',
      role: 'Contributor', workload: '5 hrs/wk', milestone: 'General'
    });
    setActiveTab('Task List');
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    if (taskToDelete) addActivity(`Task "${taskToDelete.title}" deleted.`);
  };

  const handleEditInit = (task) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      category: task.category || 'Engineering',
      type: task.type || 'Feature',
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      assignee: task.assignee,
      dueDate: task.dueDate,
      attachments: task.attachments ? task.attachments.join(', ') : '',
      checklistText: task.checklist ? task.checklist.map((c) => c.text).join(', ') : '',
      role: task.role || 'Contributor',
      workload: task.workload || '5 hrs/wk',
      milestone: task.milestone || 'General'
    });
    setActiveTab('Create Task');
  };

  // Metrics Calculation
  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'Completed' || t.kanbanStatus === 'Completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress' || t.kanbanStatus === 'In Progress').length;
  const blockedCount = tasks.filter((t) => t.status === 'Blocked' || t.kanbanStatus === 'Blocked').length;
  const overdueCount = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const filteredTasks = tasks
    .filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === 'All' || t.priority === filterPriority;
      const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
      return matchesSearch && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === 'priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return a.title.localeCompare(b.title);
    });

  const myAssignedTasks = tasks.filter((t) => t.assignee === currentUser);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Task Management Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Track, assign, and organize team productivity across active projects.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: '', category: 'Engineering', type: 'Feature', description: '', priority: 'Medium',
              status: 'Pending', assignee: currentUser, dueDate: '', attachments: '', checklistText: '',
              role: 'Contributor', workload: '5 hrs/wk', milestone: 'General'
            });
            setActiveTab('Create Task');
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all duration-150 self-start md:self-auto"
        >
          + Create New Task
        </button>
      </div>

      <div className="flex items-center gap-1 bg-slate-200/80 p-1.5 rounded-xl mb-8 overflow-x-auto shadow-inner">
        {[
          'Overview', 'My Tasks', 'Task List', 'Create Task', 
          'Assign Members', 'Kanban Board', 'Calendar & Deadlines', 
          'Team Progress', 'Reports'
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-xs md:text-sm whitespace-nowrap transition-all duration-150 ${
              activeTab === tab
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <OverviewView
          totalTasks={totalTasks}
          completedCount={completedCount}
          inProgressCount={inProgressCount}
          blockedCount={blockedCount}
          overdueCount={overdueCount}
          completionRate={completionRate}
          activities={activities}
          setActiveTab={setActiveTab}
        />
      )}

      {activeTab === 'My Tasks' && (
        <MyTasksView
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          teamMembers={teamMembers}
          myAssignedTasks={myAssignedTasks}
          handleToggleChecklist={handleToggleChecklist}
          handleProgressChange={handleProgressChange}
        />
      )}

      {activeTab === 'Task List' && (
        <TaskListView
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filteredTasks={filteredTasks}
          setSelectedTaskDetails={setSelectedTaskDetails}
          selectedTaskDetails={selectedTaskDetails}
          handleEditInit={handleEditInit}
          handleDeleteTask={handleDeleteTask}
        />
      )}

      {activeTab === 'Create Task' && (
        <TaskFormView
          editingId={editingId}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSaveTask={handleSaveTask}
          teamMembers={teamMembers}
          setActiveTab={setActiveTab}
        />
      )}

      {activeTab === 'Assign Members' && (
        <AssignMembersView
          tasks={tasks}
          setTasks={setTasks}
          teamMembers={teamMembers}
          addActivity={addActivity}
        />
      )}

      {activeTab === 'Kanban Board' && (
  <KanbanBoardView
    tasks={tasks}
    setTasks={setTasks}
    addActivity={addActivity}
  />
)}

      {activeTab === 'Calendar & Deadlines' && (
        <CalendarAndDeadlinesView tasks={tasks} />
      )}

      {activeTab === 'Team Progress' && (
        <TeamProgressView tasks={tasks} teamMembers={teamMembers} />
      )}

      {activeTab === 'Reports' && (
        <ReportsView
          tasks={tasks}
          totalTasks={totalTasks}
          completionRate={completionRate}
          overdueCount={overdueCount}
        />
      )}
    </div>
  );
}