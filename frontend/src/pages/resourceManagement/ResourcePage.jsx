import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import ResourceDirectoryTab from './ResourceDirectoryTab';
import ResourceAllocationTab from './ResourceAllocationTab';
import AvailabilityTab from './AvailabilityTab';
import WorkloadTab from './WorkloadTab';
import SkillsRolesTab from './SkillsRolesTab';
import ReportsTab from './ReportsTab';

export default function ResourcePage() {
  const [activeTab, setActiveTab] = useState('Overview');

  // Master Resource State
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Sarah Connor',
      role: 'Lead Fullstack Dev',
      department: 'Engineering',
      status: 'Fully Allocated',
      utilization: 100,
      activeProjects: ['E-Commerce Revamp', 'Auth API Integration'],
      workloadHours: 40,
      maxHours: 40,
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      isActive: true,
      email: 'sarah.c@company.com'
    },
    {
      id: 2,
      name: 'David Miller',
      role: 'UI/UX Designer',
      department: 'Design',
      status: 'Partially Available',
      utilization: 60,
      activeProjects: ['Mobile App Redesign'],
      workloadHours: 24,
      maxHours: 40,
      skills: ['Figma', 'User Research', 'Wireframing', 'CSS/Tailwind'],
      isActive: true,
      email: 'david.m@company.com'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      status: 'Available',
      utilization: 20,
      activeProjects: ['Server Migration'],
      workloadHours: 8,
      maxHours: 40,
      skills: ['AWS', 'Kubernetes', 'CI/CD Pipelines', 'Terraform'],
      isActive: true,
      email: 'elena.r@company.com'
    },
    {
      id: 4,
      name: 'Marcus Vance',
      role: 'Backend Developer',
      department: 'Engineering',
      status: 'On Leave',
      utilization: 0,
      activeProjects: [],
      workloadHours: 0,
      maxHours: 40,
      skills: ['Python', 'Django', 'Redis', 'GraphQL'],
      isActive: true,
      email: 'marcus.v@company.com'
    }
  ]);

  // Assignments History & Active Tracking
  const [assignments, setAssignments] = useState([
    { id: 101, employeeId: 1, employeeName: 'Sarah Connor', project: 'E-Commerce Revamp', task: 'Payment Gateway', allocatedHours: 20, assignedDate: '2026-07-10' },
    { id: 102, employeeId: 1, employeeName: 'Sarah Connor', project: 'Auth API Integration', task: 'OAuth Middleware', allocatedHours: 20, assignedDate: '2026-07-15' },
    { id: 103, employeeId: 2, employeeName: 'David Miller', project: 'Mobile App Redesign', task: 'Design System Update', allocatedHours: 24, assignedDate: '2026-07-18' },
    { id: 104, employeeId: 3, employeeName: 'Elena Rostova', project: 'Server Migration', task: 'AWS VPC Config', allocatedHours: 8, assignedDate: '2026-07-20' }
  ]);

  // Toggle Activation
  const handleToggleStatus = (id) => {
    setEmployees(employees.map((e) => (e.id === id ? { ...e, isActive: !e.isActive } : e)));
  };

  // Add Assignment
  const handleAddAssignment = (newAllocation) => {
    const empId = parseInt(newAllocation.employeeId);
    const emp = employees.find((e) => e.id === empId);

    const newEntry = {
      id: Date.now(),
      employeeId: empId,
      employeeName: emp.name,
      project: newAllocation.project,
      task: newAllocation.task || 'General Task',
      allocatedHours: parseInt(newAllocation.allocatedHours) || 0,
      assignedDate: new Date().toISOString().split('T')[0]
    };

    setAssignments([newEntry, ...assignments]);

    setEmployees(
      employees.map((e) => {
        if (e.id === empId) {
          const newHours = e.workloadHours + parseInt(newAllocation.allocatedHours);
          const newUtil = Math.min(100, Math.round((newHours / e.maxHours) * 100));
          let newStatus = e.status;
          if (newUtil >= 100) newStatus = 'Fully Allocated';
          else if (newUtil > 0) newStatus = 'Partially Available';

          const projectsSet = new Set([...e.activeProjects, newAllocation.project]);

          return {
            ...e,
            workloadHours: newHours,
            utilization: newUtil,
            status: newStatus,
            activeProjects: Array.from(projectsSet)
          };
        }
        return e;
      })
    );
  };

  // Remove Assignment
  const handleRemoveAssignment = (assignmentId) => {
    const target = assignments.find((a) => a.id === assignmentId);
    if (!target) return;

    setAssignments(assignments.filter((a) => a.id !== assignmentId));

    setEmployees(
      employees.map((e) => {
        if (e.id === target.employeeId) {
          const newHours = Math.max(0, e.workloadHours - target.allocatedHours);
          const newUtil = Math.round((newHours / e.maxHours) * 100);
          let newStatus = 'Available';
          if (newUtil >= 100) newStatus = 'Fully Allocated';
          else if (newUtil > 0) newStatus = 'Partially Available';

          return {
            ...e,
            workloadHours: newHours,
            utilization: newUtil,
            status: e.status === 'On Leave' ? 'On Leave' : newStatus
          };
        }
        return e;
      })
    );
  };

  return (
    <div style={{ padding: '32px', fontFamily: "'Segoe UI', Roboto, sans-serif", background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* Header Banner */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>Resource Management</h1>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Monitor capacity, assign projects, manage workloads, and analyze utilization.</p>
      </div>

      {/* Tabs Navigation Bar */}
      <div style={{ display: 'flex', gap: '6px', background: '#e2e8f0', padding: '6px', borderRadius: '10px', marginBottom: '28px', overflowX: 'auto' }}>
        {['Overview', 'Resource Directory', 'Resource Allocation', 'Availability', 'Workload', 'Skills & Roles', 'Reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              background: activeTab === tab ? '#ffffff' : 'transparent',
              color: activeTab === tab ? '#2563eb' : '#475569',
              boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Render Views */}
      {activeTab === 'Overview' && <OverviewTab employees={employees} assignments={assignments} onNavigate={() => setActiveTab('Resource Allocation')} />}
      {activeTab === 'Resource Directory' && <ResourceDirectoryTab employees={employees} onToggleStatus={handleToggleStatus} />}
      {activeTab === 'Resource Allocation' && <ResourceAllocationTab employees={employees} assignments={assignments} onAddAssignment={handleAddAssignment} onRemoveAssignment={handleRemoveAssignment} />}
      {activeTab === 'Availability' && <AvailabilityTab employees={employees} />}
      {activeTab === 'Workload' && <WorkloadTab employees={employees} />}
      {activeTab === 'Skills & Roles' && <SkillsRolesTab employees={employees} />}
      {activeTab === 'Reports' && <ReportsTab employees={employees} />}

    </div>
  );
}