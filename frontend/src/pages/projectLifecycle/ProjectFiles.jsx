import React, { useState } from 'react';

export default function ProjectFiles({ projectCode }) {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Project_Charter_Signed.pdf',
      category: 'Governance',
      uploadedBy: 'Sarah Jenkins (PMO Lead)',
      size: '2.4 MB',
      uploadDate: '2026-07-10',
    },
    {
      id: '2',
      name: 'System_Architecture_v1.2.png',
      category: 'Technical Specification',
      uploadedBy: 'Alex Mercer (PM)',
      size: '5.1 MB',
      uploadDate: '2026-07-14',
    },
    {
      id: '3',
      name: 'API_Contract_Database_Schema.docx',
      category: 'Development',
      uploadedBy: 'John Doe (Dev)',
      size: '1.8 MB',
      uploadDate: '2026-07-18',
    },
  ]);

  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState('Technical Specification');
  const [uploadedBy, setUploadedBy] = useState('');

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!fileName) return;

    const newFile = {
      id: Date.now().toString(),
      name: fileName.endsWith('.pdf') || fileName.endsWith('.png') || fileName.endsWith('.docx') 
        ? fileName 
        : `${fileName}.pdf`,
      category,
      uploadedBy: uploadedBy || 'Project Member',
      size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
    };

    setFiles([newFile, ...files]);
    setFileName('');
    setUploadedBy('');
  };

  const handleDelete = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Project Files & Documents</h2>
          <p className="text-xs text-slate-500">
            Repository for project charters, architecture specs, and deliverables for <span className="font-bold text-blue-600">{projectCode}</span>
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
          📁 {files.length} Attachments
        </span>
      </div>

      {/* Upload File Form */}
      <form onSubmit={handleFileUpload} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
        <div className="sm:col-span-1">
          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Document Name</label>
          <input
            type="text"
            required
            placeholder="e.g. SRS_Requirements_v2"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Governance">Governance / Charter</option>
            <option value="Technical Specification">Technical Architecture</option>
            <option value="Development">Development & API</option>
            <option value="Quality Assurance">Testing & QA</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Uploaded By</label>
          <input
            type="text"
            placeholder="e.g. Developer Name"
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
        >
          📤 Attach File
        </button>
      </form>

      {/* Files List Table */}
      <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase text-[10px]">
              <th className="p-3">File Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Uploaded By</th>
              <th className="p-3">Date</th>
              <th className="p-3">Size</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {files.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-400">
                  No files uploaded for this project yet.
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                    <span>
                      {file.name.endsWith('.pdf')
                        ? '📄'
                        : file.name.endsWith('.png') || file.name.endsWith('.jpg')
                        ? '🖼️'
                        : '📝'}
                    </span>
                    <span>{file.name}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-md border border-blue-100">
                      {file.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{file.uploadedBy}</td>
                  <td className="p-3 text-slate-500">{file.uploadDate}</td>
                  <td className="p-3 font-mono text-slate-500">{file.size}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => alert(`Downloading ${file.name}...`)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg transition-colors"
                    >
                      ⬇ Download
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold rounded-lg transition-colors"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}