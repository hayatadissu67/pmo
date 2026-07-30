import React, { useState } from 'react';
import TemplateDashboardHeader from './TemplateDashboardHeader';
import AdminDashboardSidebar from './AdminDashboardSidebar';
import TemplateDetailsModal from './TemplateDetailsModal';
import CreateTemplate from './CreateTemplate';
import EditTemplate from './EditTemplate';
import DeleteTemplateModal from './DeleteTemplate';
import PreviewTemplate from './PreviewTemplate';
import UseTemplate from './UseTemplate';

export default function TemplateList() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal Control States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [modalType, setModalType] = useState(null); // 'details' | 'preview' | 'edit' | 'delete' | 'use'

  // Full PMO Templates Repository (mapped from your folder structure)
  const initialTemplates = [
    // 01_Initiation
    { id: 1, name: 'Project Charter', category: 'Initiation', fileType: 'DOCX', version: '2.0', path: 'PMO_Templates/01_Initiation/Project_Charter.docx', date: '20 July 2026', description: 'Used to officially authorize a project.' },
    { id: 2, name: 'Business Case', category: 'Initiation', fileType: 'DOCX', version: '1.2', path: 'PMO_Templates/01_Initiation/Business_Case.docx', date: '12 June 2026', description: 'Provides justification for undertaking a project.' },
    { id: 3, name: 'Project Proposal', category: 'Initiation', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/01_Initiation/Project_Proposal.docx', date: '05 May 2026', description: 'Initial pitch outline for new initiatives.' },
    { id: 4, name: 'Stakeholder Register', category: 'Initiation', fileType: 'XLSX', version: '2.0', path: 'PMO_Templates/01_Initiation/Stakeholder_Register.xlsx', date: '01 June 2026', description: 'Identifies project stakeholders and their impacts.' },
    { id: 5, name: 'Feasibility Study', category: 'Initiation', fileType: 'DOCX', version: '1.1', path: 'PMO_Templates/01_Initiation/Feasibility_Study.docx', date: '18 April 2026', description: 'Evaluates technical and operational viability.' },

    // 02_Planning
    { id: 6, name: 'Project Management Plan', category: 'Planning', fileType: 'DOCX', version: '2.1', path: 'PMO_Templates/02_Planning/Project_Management_Plan.docx', date: '10 July 2026', description: 'Master plan guiding overall project execution.' },
    { id: 7, name: 'Work Breakdown Structure', category: 'Planning', fileType: 'XLSX', version: '1.0', path: 'PMO_Templates/02_Planning/Work_Breakdown_Structure.xlsx', date: '15 June 2026', description: 'Decomposes project scope into manageable deliverables.' },
    { id: 8, name: 'Schedule Template', category: 'Planning', fileType: 'XLSX', version: '1.5', path: 'PMO_Templates/02_Planning/Schedule_Template.xlsx', date: '02 July 2026', description: 'Gantt chart and milestone tracking schedule.' },
    { id: 9, name: 'Budget Plan', category: 'Planning', fileType: 'XLSX', version: '2.0', path: 'PMO_Templates/02_Planning/Budget_Plan.xlsx', date: '11 June 2026', description: 'Financial forecasting and cost allocation sheet.' },
    { id: 10, name: 'Risk Register', category: 'Planning', fileType: 'XLSX', version: '2.0', path: 'PMO_Templates/02_Planning/Risk_Register.xlsx', date: '22 June 2026', description: 'Tracks identified risks, impacts, and responses.' },
    { id: 11, name: 'Communication Plan', category: 'Planning', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/02_Planning/Communication_Plan.docx', date: '30 May 2026', description: 'Defines communication cadence and channels.' },
    { id: 12, name: 'Resource Plan', category: 'Planning', fileType: 'XLSX', version: '1.2', path: 'PMO_Templates/02_Planning/Resource_Plan.xlsx', date: '14 May 2026', description: 'Allocates team capacity and equipment resources.' },
    { id: 13, name: 'Quality Management Plan', category: 'Planning', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/02_Planning/Quality_Management_Plan.docx', date: '08 June 2026', description: 'Standards and testing processes for deliverables.' },
    { id: 14, name: 'Procurement Plan', category: 'Planning', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/02_Planning/Procurement_Plan.docx', date: '19 June 2026', description: 'Vendor selection and contract management guidelines.' },

    // 03_Execution
    { id: 15, name: 'Task Assignment', category: 'Execution', fileType: 'XLSX', version: '1.0', path: 'PMO_Templates/03_Execution/Task_Assignment.xlsx', date: '21 July 2026', description: 'Daily task tracking and responsibility matrix.' },
    { id: 16, name: 'Meeting Minutes', category: 'Execution', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/03_Execution/Meeting_Minutes.docx', date: '24 July 2026', description: 'Standard layout for meeting summaries and action items.' },
    { id: 17, name: 'Progress Report', category: 'Execution', fileType: 'DOCX', version: '1.3', path: 'PMO_Templates/03_Execution/Progress_Report.docx', date: '20 July 2026', description: 'Weekly or bi-weekly execution updates.' },
    { id: 18, name: 'Change Request Form', category: 'Execution', fileType: 'DOCX', version: '2.0', path: 'PMO_Templates/03_Execution/Change_Request_Form.docx', date: '15 July 2026', description: 'Formal request form to modify project scope or timeline.' },
    { id: 19, name: 'Issue Log', category: 'Execution', fileType: 'XLSX', version: '1.1', path: 'PMO_Templates/03_Execution/Issue_Log.xlsx', date: '18 July 2026', description: 'Active issue tracking and resolution assignment.' },
    { id: 20, name: 'Timesheet', category: 'Execution', fileType: 'XLSX', version: '1.0', path: 'PMO_Templates/03_Execution/Timesheet.xlsx', date: '01 July 2026', description: 'Team hour logging template.' },

    // 04_Monitoring_Control
    { id: 21, name: 'Status Report', category: 'Monitoring', fileType: 'DOCX', version: '2.0', path: 'PMO_Templates/04_Monitoring_Control/Status_Report.docx', date: '25 July 2026', description: 'Regular updates on project progress and key metrics.' },
    { id: 22, name: 'KPI Dashboard', category: 'Monitoring', fileType: 'XLSX', version: '2.5', path: 'PMO_Templates/04_Monitoring_Control/KPI_Dashboard.xlsx', date: '22 July 2026', description: 'Visual key performance indicators dashboard.' },
    { id: 23, name: 'Performance Report', category: 'Monitoring', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/04_Monitoring_Control/Performance_Report.docx', date: '10 July 2026', description: 'Earned Value Management (EVM) performance analysis.' },
    { id: 24, name: 'Risk Monitoring Report', category: 'Monitoring', fileType: 'DOCX', version: '1.1', path: 'PMO_Templates/04_Monitoring_Control/Risk_Monitoring_Report.docx', date: '14 July 2026', description: 'Audit of active risk mitigations.' },
    { id: 25, name: 'Change Log', category: 'Monitoring', fileType: 'XLSX', version: '1.0', path: 'PMO_Templates/04_Monitoring_Control/Change_Log.xlsx', date: '26 July 2026', description: 'Central log for all approved and rejected scope changes.' },
    { id: 26, name: 'Audit Checklist', category: 'Monitoring', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/04_Monitoring_Control/Audit_Checklist.docx', date: '05 July 2026', description: 'PMO compliance and quality assurance checklist.' },

    // 05_Closure
    { id: 27, name: 'Project Closure Report', category: 'Closure', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/05_Closure/Project_Closure_Report.docx', date: '01 June 2026', description: 'Final project completion summary and sign-off.' },
    { id: 28, name: 'Lessons Learned', category: 'Closure', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/05_Closure/Lessons_Learned.docx', date: '10 June 2026', description: 'Post-project evaluation and knowledge transfer notes.' },
    { id: 29, name: 'Client Acceptance Form', category: 'Closure', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/05_Closure/Client_Acceptance_Form.docx', date: '15 May 2026', description: 'Formal deliverable sign-off document.' },
    { id: 30, name: 'Handover Checklist', category: 'Closure', fileType: 'DOCX', version: '1.0', path: 'PMO_Templates/05_Closure/Handover_Checklist.docx', date: '20 May 2026', description: 'Operations and support handover checklist.' },
    { id: 31, name: 'Final Financial Report', category: 'Closure', fileType: 'XLSX', version: '1.0', path: 'PMO_Templates/05_Closure/Final_Financial_Report.xlsx', date: '28 May 2026', description: 'Budget vs. actual expenditure final breakdown.' },
  ];

  const categories = ['All', 'Initiation', 'Planning', 'Execution', 'Monitoring', 'Closure'];

  // Filtering Logic
  const filteredTemplates = initialTemplates.filter(template => {
    const matchesCategory = activeCategory === 'All' || template.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Modal Handlers
  const openActionModal = (template, type) => {
    setSelectedTemplate(template);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedTemplate(null);
    setModalType(null);
  };

  const handleAdminOrHeaderAction = (action) => {
    const firstTemplate = initialTemplates[0];

    switch (action) {
      case 'upload':
      case 'create':
      case 'add-template':
        setShowCreateModal(true);
        break;
      case 'edit-template':
        openActionModal(firstTemplate, 'edit');
        break;
      case 'delete-template':
        openActionModal(firstTemplate, 'delete');
        break;
      case 'browse':
        setActiveCategory('All');
        setSearchQuery('');
        break;
      default:
        alert(`Action triggered: ${action}`);
    }
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      {/* Header Banner & Quick Actions */}
      <TemplateDashboardHeader onQuickAction={handleAdminOrHeaderAction} />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Search, Phase Filters, and Card Grid */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-bold text-gray-800 text-base uppercase tracking-wider border-b pb-2">
              STANDARDIZED TEMPLATE REPOSITORY
            </h2>

            {/* Search Input */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">🔍 Search:</span>
              <input
                type="text"
                placeholder="Search by title, phase, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Buttons */}
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Filter by Project Phase
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    [ {cat} ]
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTemplates.map(item => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-xs px-2 py-0.5 rounded font-semibold bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                      {item.fileType}
                    </span>
                  </div>

                  <h3 
                    onClick={() => openActionModal(item, 'details')}
                    className="font-bold text-gray-800 text-base cursor-pointer hover:text-blue-600 flex items-center gap-1.5 pt-1"
                  >
                    📄 {item.name}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>

                  <div className="text-xs space-y-0.5 text-gray-500 pt-1">
                    <p><span className="font-semibold text-gray-400">Version:</span> {item.version}</p>
                    <p><span className="font-semibold text-gray-400">Updated:</span> {item.date}</p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-medium">
                  <button
                    onClick={() => openActionModal(item, 'preview')}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    [ Preview ]
                  </button>
                  <button
                    onClick={() => openActionModal(item, 'use')}
                    className="text-emerald-600 hover:text-emerald-800 font-semibold"
                  >
                    [ Use ]
                  </button>
                  <button
                    onClick={() => alert(`Downloading ${item.name} (${item.path})...`)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    [ Download ]
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Admin Panel */}
        <div className="lg:col-span-1">
          <AdminDashboardSidebar onAdminAction={handleAdminOrHeaderAction} />
        </div>
      </div>

      {/* Render Active Modals */}
      {showCreateModal && <CreateTemplate onClose={() => setShowCreateModal(false)} />}
      
      {modalType === 'details' && (
        <TemplateDetailsModal 
          template={selectedTemplate} 
          onClose={closeModal} 
          onPreview={() => setModalType('preview')} 
        />
      )}
      
      {modalType === 'preview' && <PreviewTemplate template={selectedTemplate} onClose={closeModal} />}
      {modalType === 'edit' && <EditTemplate template={selectedTemplate} onClose={closeModal} />}
      {modalType === 'delete' && <DeleteTemplateModal template={selectedTemplate} onClose={closeModal} />}
      {modalType === 'use' && <UseTemplate template={selectedTemplate} onClose={closeModal} />}
    </div>
  );
}