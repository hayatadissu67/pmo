export const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-700 border-red-300';
    case 'Medium':
      return 'bg-amber-100 text-amber-700 border-amber-300';
    default:
      return 'bg-emerald-100 text-emerald-700 border-emerald-300';
  }
};

export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-500 text-white';
    case 'In Progress':
      return 'bg-blue-500 text-white';
    case 'Blocked':
      return 'bg-rose-500 text-white';
    default:
      return 'bg-slate-500 text-white';
  }
};