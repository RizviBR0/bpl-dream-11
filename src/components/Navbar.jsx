import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTeam } from '../context/TeamContext';
import { toast } from 'react-toastify';
import dollarImg from '../assets/dollar_1.svg';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Fixture', to: '/fixture' },
  { name: 'Teams', to: '/teams' },
  { name: 'Schedules', to: '/schedules' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { coin } = useTeam();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.info('Signed out. See you next time! 👋');
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 justify-between border-none flex-wrap gap-2 py-3">
      <NavLink to="/">
        <img className="h-20" src={logo} alt="BPL Dream 11" />
      </NavLink>

      <div className="flex justify-center items-center gap-6 flex-wrap">
        {user && (
          <ul className="hidden gap-6 sm:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-base transition ${isActive
                      ? 'text-[#131313] font-semibold'
                      : 'text-[#131313]/60 hover:text-[#131313]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-3">
          {user && (
            <button className="flex justify-center items-center space-x-2 w-fit border border-[#131313]/10 rounded-lg px-3 py-2">
              <span className="font-bold text-lg">{coin.toLocaleString()} Coins</span>
              <img className="w-5" src={dollarImg} alt="Coins" />
            </button>
          )}

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 border border-[#131313]/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-[#131313]/5 transition"
              >
                <FaUser className="text-[#131313]/60 text-lg" />
                <span className="text-lg font-semibold text-[#131313] max-w-24 truncate hidden sm:block">
                  {user.displayName || user.email}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-48 p-2 shadow-lg border border-[#131313]/10 mt-1"
              >
                <li className="menu-title text-xs text-[#131313]/50 px-3 py-1 truncate">
                  {user.email}
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 font-semibold">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-[#131313] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#131313]/80 transition text-sm"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;