import { useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleBadgeClass =
    user?.role === 'ADMIN'
      ? 'bg-red-100 text-red-700'
      : 'bg-gray-100 text-gray-700';

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold text-gray-900">TaskManager</div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <span className="text-sm text-gray-700">{user.email}</span>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${roleBadgeClass}`}>
                {user.role}
              </span>
            </>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
