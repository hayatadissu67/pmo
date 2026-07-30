import React, { useState, useMemo } from 'react';

// Import portfolio report sub-components
import PortfolioHeader from '../../components/reports/portfolio/PortfolioHeader';
import PortfolioKPICards from '../../components/reports/portfolio/PortfolioKPICards';
import PortfolioFilter from '../../components/reports/portfolio/PortfolioFilter';
import PortfolioTable from '../../components/reports/portfolio/PortfolioTable';
import PortfolioStatusChart from '../../components/reports/portfolio/PortfolioStatusChart';
import PortfolioProgressChart from '../../components/reports/portfolio/PortfolioProgressChart';
import PortfolioHealthChart from '../../components/reports/portfolio/PortfolioHealthChart';
import PortfolioSummary from '../../components/reports/portfolio/PortfolioSummary';

// Master initial dataset
const initialProjects = [
  { code: 'PRJ-001', name: 'ERP Implementation', manager: 'Daniel Kim', sponsor: 'John Smith', status: 'In Progress', priority: 'High', progress: 75, budget: '$1.50M', startDate: 'Jan 10, 2024', endDate: 'Aug 15, 2024', health: 'green' },
  { code: 'PRJ-002', name: 'Website Redesign', manager: 'Sarah Johnson', sponsor: 'Emily Davis', status: 'In Progress', priority: 'Medium', progress: 60, budget: '$250K', startDate: 'Feb 01, 2024', endDate: 'Jun 30, 2024', health: 'green' },
  { code: 'PRJ-003', name: 'Mobile App Development', manager: 'Michael Brown', sponsor: 'David Wilson', status: 'In Progress', priority: 'High', progress: 40, budget: '$800K', startDate: 'Mar 15, 2024', endDate: 'Sep 30, 2024', health: 'amber' },
  { code: 'PRJ-004', name: 'Data Warehouse', manager: 'Chris Lee', sponsor: 'Jennifer Taylor', status: 'Completed', priority: 'High', progress: 100, budget: '$1.20M', startDate: 'Nov 01, 2023', endDate: 'Apr 30, 2024', health: 'green' },
  { code: 'PRJ-005', name: 'CRM Implementation', manager: 'Amanda Clark', sponsor: 'Robert Johnson', status: 'In Progress', priority: 'Medium', progress: 55, budget: '$600K', startDate: 'Jan 20, 2024', endDate: 'Jul 20, 2024', health: 'green' },
  { code: 'PRJ-006', name: 'Cloud Migration', manager: 'Kevin White', sponsor: 'John Smith', status: 'Delayed', priority: 'High', progress: 25, budget: '$1.00M', startDate: 'Feb 10, 2024', endDate: 'Oct 10, 2024', health: 'red' },
  { code: 'PRJ-007', name: 'Security Enhancement', manager: 'Laura Green', sponsor: 'Emily Davis', status: 'Completed', priority: 'Medium', progress: 100, budget: '$400K', startDate: 'Oct 15, 2023', endDate: 'Mar 15, 2024', health: 'green' },
  { code: 'PRJ-008', name: 'Business Intelligence', manager: 'James Wilson', sponsor: 'David Wilson', status: 'In Progress', priority: 'Medium', progress: 70, budget: '$700K', startDate: 'Dec 01, 2023', endDate: 'Jun 01, 2024', health: 'green' },
];

export default function PortfolioReportPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    manager: 'All',
    status: 'All',
    priority: 'All',
  });

  // Search handler
  const handleSearch = (term) => setSearchTerm(term);

  // Filter handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Refresh handler
  const handleRefresh = () => {
    console.log('Refreshing project report data...');
    setProjects(initialProjects);
  };

  // Export handler
  const handleExport = (format) => {
    alert(`Exporting portfolio report as ${format.toUpperCase()}...`);
  };

  // Dynamically filter projects based on search text and select dropdowns
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.manager.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesManager = filters.manager === 'All' || item.manager === filters.manager;
      const matchesStatus = filters.status === 'All' || item.status === filters.status;
      const matchesPriority = filters.priority === 'All' || item.priority === filters.priority;

      return matchesSearch && matchesManager && matchesStatus && matchesPriority;
    });
  }, [projects, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 text-slate-800">
      {/* 1. Header & Quick Actions Toolbar */}
      <PortfolioHeader title="Portfolio Report" onRefresh={handleRefresh} onExport={handleExport} />

      {/* 2. Top Summary KPI Cards Row (6 Cards) */}
      <PortfolioKPICards />

      {/* 3. Search & Multi-Filter Control Bar */}
      <PortfolioFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />

      {/* 4. Projects Overview Main Table */}
      <PortfolioTable projects={filteredProjects} />

      {/* 5. Visual Charts Grid (3 Columns on Large Screens) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortfolioStatusChart />
        <PortfolioHealthChart />
        <PortfolioProgressChart />
      </div>

      {/* 6. Portfolio Financial & Status Summary Footer */}
      <PortfolioSummary />
    </div>
  );
}