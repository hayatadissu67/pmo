import React, { useState } from 'react';

// Dashboard Components
import ReportsOverview from './ReportsOverview';
import ReportsStatistics from './ReportsStatistics';
import TotalReports from './TotalReports';
import RecentReports from './RecentReports';
import ReportStatus from './ReportStatus';
import QuickActions from './QuickActions';
import ReportSummary from './ReportSummary';

// All Reports Components
import ReportsList from './ReportsList';
import ViewReport from './ViewReport';
import SearchReports from './SearchReports';
import FilterReports from './FilterReports';
import SortReports from './SortReports';
import ReportDetails from './ReportDetails';

// Portfolio Components
import PortfolioList from './PortfolioList';
import PortfolioOverview from './PortfolioOverview';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioProgress from './PortfolioProgress';
import PortfolioBudget from './PortfolioBudget';
import PortfolioRisks from './PortfolioRisks';

// Template Components
import TemplateList from './TemplateList';
import CreateTemplate from './CreateTemplate';
import EditTemplate from './EditTemplate';
import DeleteTemplate from './DeleteTemplate';
import PreviewTemplate from './PreviewTemplate';
import UseTemplate from './UseTemplate';

// Generate Reports Components
import SelectProject from './SelectProject';
import SelectPortfolio from './SelectPortfolio';
import SelectTemplate from './SelectTemplate';
import SelectDateRange from './SelectDateRange';
import GenerateReport from './GenerateReport';
import ReportPreview from './ReportPreview';

// Report History Components
import PreviouslyGenerated from './PreviouslyGenerated';
import DownloadHistory from './DownloadHistory';
import SharedReports from './SharedReports';
import ArchivedReports from './ArchivedReports';
import ReportActivity from './ReportActivity';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [sortBy, setSortBy] = useState('date');

  const [genData, setGenData] = useState({
    projectId: '',
    portfolioId: '',
    templateId: '',
    dateRange: { start: '', end: '' }
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">PMO Control Tower - Reports</h1>
        <p className="text-sm text-gray-500">Centralized reporting engine for portfolios, statuses, and audit history.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-lg px-4 pt-2 shadow-sm gap-2 overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'all-reports', label: 'All Reports' },
          { id: 'portfolio', label: 'Portfolio' },
          { id: 'templates', label: 'Templates' },
          { id: 'generate', label: 'Generate Reports' },
          { id: 'history', label: 'Report History' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* View Panels */}
      <div className="space-y-6">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TotalReports />
              <ReportStatus />
              <QuickActions onNavigate={setActiveTab} />
            </div>
            <ReportsOverview />
            <ReportsStatistics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentReports onSelect={setSelectedReport} />
              <ReportSummary />
            </div>
          </div>
        )}

        {/* All Reports */}
        {activeTab === 'all-reports' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
              <SearchReports query={searchQuery} setQuery={setSearchQuery} />
              <div className="flex gap-3 w-full md:w-auto">
                <FilterReports filter={filterType} setFilter={setFilterType} />
                <SortReports sort={sortBy} setSort={setSortBy} />
              </div>
            </div>
            <ReportsList 
              query={searchQuery} 
              filter={filterType} 
              sort={sortBy} 
              onSelectReport={setSelectedReport} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ViewReport report={selectedReport} />
              <ReportDetails report={selectedReport} />
            </div>
          </div>
        )}

        {/* Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <PortfolioOverview />
            <PortfolioList />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PortfolioPerformance />
              <PortfolioProgress />
              <PortfolioBudget />
            </div>
            <PortfolioRisks />
          </div>
        )}

        {/* Templates */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Document Templates</h2>
                <p className="text-sm text-gray-500">Standardized report structures and forms.</p>
              </div>
              <CreateTemplate />
            </div>
            <TemplateList onSelectTemplate={setSelectedTemplate} selectedId={selectedTemplate?.id} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PreviewTemplate template={selectedTemplate} />
              <EditTemplate template={selectedTemplate} />
              <DeleteTemplate template={selectedTemplate} />
            </div>
            <UseTemplate template={selectedTemplate} onGenerate={() => setActiveTab('generate')} />
          </div>
        )}

        {/* Generate Reports */}
        {activeTab === 'generate' && (
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-3">Generate Custom Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectProject value={genData.projectId} onChange={(v) => setGenData({...genData, projectId: v})} />
              <SelectPortfolio value={genData.portfolioId} onChange={(v) => setGenData({...genData, portfolioId: v})} />
              <SelectTemplate value={genData.templateId} onChange={(v) => setGenData({...genData, templateId: v})} />
              <SelectDateRange value={genData.dateRange} onChange={(v) => setGenData({...genData, dateRange: v})} />
            </div>
            <GenerateReport genData={genData} />
            <ReportPreview genData={genData} />
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <PreviouslyGenerated />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DownloadHistory />
              <SharedReports />
            </div>
            <ArchivedReports />
            <ReportActivity />
          </div>
        )}
      </div>
    </div>
  );
}