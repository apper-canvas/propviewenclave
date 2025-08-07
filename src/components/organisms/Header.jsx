import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../App';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Header = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Home" size={20} className="text-white" />
            </div>
            <span className="text-xl font-display font-bold text-gray-900">PropView</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Browse
            </Link>
            <Link
              to="/map"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/map')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Map View
            </Link>
            <Link
              to="/saved"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/saved')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Saved
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user && (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {user.firstName || user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <ApperIcon name="LogOut" size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <ApperIcon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;