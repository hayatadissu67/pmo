import React from 'react';

const mockMetadata = {
  reportId: 'REP-001',
  fileType: 'PDF Document',
  fileSize: '3.4 MB',
  projectRef: 'PMO Tower Project',
  createdDate: '2026-07-28 14:32:00',
  lastModified: '2026-07-29 09:10:00',
  accessLevel: 'Restricted (Internal Only)'
};

export default function ReportDetails({ details = mockMetadata }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Report Metadata</h3>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500 font-medium">Report ID:</dt>
          <dd className="font-mono text-gray-800">{details.reportId}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500 font-medium">Format:</dt>
          <dd className="text-gray-800">{details.fileType}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500 font-medium">File Size:</dt>
          <dd className="text-gray-800">{details.fileSize}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500 font-medium">Project Reference:</dt>
          <dd className="text-gray-800 font-semibold">{details.projectRef}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500 font-medium">Created:</dt>
          <dd className="text-gray-800">{details.createdDate}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500 font-medium">Last Modified:</dt>
          <dd className="text-gray-800">{details.lastModified}</dd>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between items-center">
          <dt className="text-gray-500 font-medium">Access Level:</dt>
          <dd className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded font-semibold">
            {details.accessLevel}
          </dd>
        </div>
      </dl>
    </div>
  );
}