import ApperIcon from '@/components/ApperIcon';

const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    { id: 'grid', icon: 'Grid3x3', label: 'Grid' },
    { id: 'list', icon: 'List', label: 'List' },
    { id: 'map', icon: 'Map', label: 'Map' }
  ];
  
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      {views.map(view => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id)}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentView === view.id
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ApperIcon name={view.icon} size={16} className="mr-2" />
          <span className="hidden sm:inline">{view.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;