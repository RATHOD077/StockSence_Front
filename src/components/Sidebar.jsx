import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, TrendingUp, Briefcase, Newspaper,
  LogOut, Activity, Bitcoin, Search, Lightbulb, Target, Shield, Sparkles, BookOpen, Menu, X
} from 'lucide-react';

const navItems = [
  { to: '/dashboard',       icon: LayoutDashboard, label: 'Dashboard'      },
  { to: '/recommendations', icon: Lightbulb,       label: 'Smart Predictor'},
    { to: '/summary', icon: Sparkles, label: 'Summary' },

  { to: '/market',          icon: TrendingUp,      label: 'Market'         },
  { to: '/portfolio',       icon: Briefcase,       label: 'Portfolio'      },
  { to: '/research',        icon: Newspaper,       label: 'Research Hub'   },
  { to: '/research-library', icon: BookOpen, label: 'Research library' },
  { to: '/crypto',          icon: Bitcoin,         label: 'Crypto'         },
  { to: '/screener',        icon: Search,          label: 'Screener'       },
  { to: '/ai-advisor',           icon: Target,          label: 'AI Advisor'   },
  { to: '/trustfeed',        icon: Shield,         label: 'Trust Feed'     },
  { to: '/regulatory',        icon: Shield,         label: 'Regulatory'     },
  { to: '/risk',        icon: Shield,         label: 'Risk Analysis'     },
  { to: '/reports',        icon: Shield,         label: 'Reports'     },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  .sb-root {
    position: fixed;
    left: 0; top: 0; bottom: 0;
    width: var(--sidebar-width, 15rem);
    background: #0a0e14;
    border-right: 1px solid rgba(255,255,255,.06);
    display: flex;
    flex-direction: column;
    z-index: 100;
    font-family: 'Instrument Sans', sans-serif;
    transition: transform 0.3s ease;
  }

  /* Mobile closed state */
  @media (max-width: 48rem) {
    .sb-root {
      transform: translateX(-100%);
    }
    .sb-root.open {
      transform: translateX(0);
    }
  }

  /* Logo area */
  .sb-logo {
    padding: 1.5rem 1.25rem;
    border-bottom: 1px solid rgba(255,255,255,.06);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }
  .sb-logo-icon {
    width: 2.375rem; height: 2.375rem;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, #3b9eff 0%, #1a7ee0 100%);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0.25rem 1rem rgba(59,158,255,.35);
    flex-shrink: 0;
  }
  .sb-logo-name {
    font-family: 'DM Serif Display', serif;
    font-size: 1.2rem;
    color: #e8edf2;
    line-height: 1;
  }
  .sb-logo-tagline {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #3b9eff;
    margin-top: 0.25rem;
  }
  .sb-close-btn {
    display: none;
    margin-left: auto;
    background: none;
    border: none;
    color: #8a9ab0;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
  }
  .sb-close-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
  @media (max-width: 48rem) {
    .sb-close-btn {
      display: block;
    }
  }

  /* Nav */
  .sb-nav {
    flex: 1;
    padding: 1rem 0.75rem;
    overflow-y: auto;
  }
  .sb-nav::-webkit-scrollbar { width: 0.1875rem; }
  .sb-nav::-webkit-scrollbar-track { background: transparent; }
  .sb-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 6.1875rem; }

  .sb-nav-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #5a6878;
    padding: 0 0.75rem 0.625rem;
    display: block;
  }

  .sb-link {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.625rem 0.875rem;
    border-radius: 0.75rem;
    margin-bottom: 0.2rem;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #8a9ab0;
    border: 1px solid transparent;
    transition: all 0.18s ease;
    position: relative;
    overflow: hidden;
  }
  .sb-link:hover {
    color: #e8edf2;
    background: rgba(59,158,255,.07);
    border-color: rgba(59,158,255,.12);
  }
  .sb-link.active {
    color: #3b9eff;
    background: rgba(59,158,255,.12);
    border-color: rgba(59,158,255,.2);
    font-weight: 600;
  }
  .sb-link.active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 0.125rem;
    border-radius: 0 0.125rem 0.125rem 0;
    background: #3b9eff;
    box-shadow: 0 0 0.5rem rgba(59,158,255,.6);
  }
  .sb-link-icon {
    width: 1.125rem; height: 1.125rem;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    opacity: .7;
    transition: opacity .18s;
  }
  .sb-link:hover .sb-link-icon,
  .sb-link.active .sb-link-icon { opacity: 1; }

  /* User block */
  .sb-user {
    padding: 1rem 0.75rem;
    border-top: 1px solid rgba(255,255,255,.06);
    flex-shrink: 0;
  }
  .sb-user-card {
    background: #141b22;
    border: 1px solid rgba(255,255,255,.06);
    border-radius: 0.875rem;
    padding: 0.75rem 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    transition: border-color .2s;
  }
  .sb-user-card:hover { border-color: rgba(59,158,255,.18); }
  .sb-avatar {
    width: 2.125rem; height: 2.125rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b9eff 0%, #1a7ee0 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 0.125rem 0.625rem rgba(59,158,255,.3);
  }
  .sb-user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #e8edf2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sb-user-role {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #3b9eff;
    margin-top: 0.15rem;
  }

  .sb-logout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255,255,255,.06);
    background: transparent;
    color: #5a6878;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Instrument Sans', sans-serif;
    transition: all .18s;
  }
  .sb-logout:hover {
    background: rgba(248,113,113,.08);
    border-color: rgba(248,113,113,.2);
    color: #f87171;
  }

  /* Divider between nav groups */
  .sb-divider {
    height: 1px;
    background: rgba(255,255,255,.04);
    margin: 0.5rem 0.75rem;
  }

  /* Active glow effect in bg */
  @keyframes sbFadeIn { from { opacity: 0; transform: translateX(-0.5rem) } to { opacity: 1; transform: translateX(0) } }
  .sb-link { animation: sbFadeIn .3s ease both; }

  /* Mobile overlay styling */
  .sb-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(0.125rem);
    z-index: 90;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .sb-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  .sb-mobile-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 80;
    background: #141b22;
    border: 1px solid rgba(255,255,255,.06);
    color: #e8edf2;
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    box-shadow: 0 0.25rem 1rem rgba(0,0,0,.3);
    transition: all 0.2sease;
  }
  .sb-mobile-toggle:hover {
    background: #1c2630;
    border-color: rgba(59,158,255,.2);
  }
  @media (max-width: 48rem) {
    .sb-mobile-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

function injectSbStyles() {
  if (document.getElementById('sb-styles')) return;
  const s = document.createElement('style');
  s.id = 'sb-styles';
  s.textContent = CSS;
  document.head.appendChild(s);
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { injectSbStyles(); }, []);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button className="sb-mobile-toggle" onClick={toggleSidebar}>
        <Menu size={20} />
      </button>

      <div className={`sb-overlay ${isOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

      <aside className={`sb-root ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sb-logo">
          <div className="sb-logo-icon">
            <Activity size={20} color="#fff" />
          </div>
          <div>
            <div className="sb-logo-name">StockSense</div>
            <div className="sb-logo-tagline">Smart Finance</div>
          </div>
          <button className="sb-close-btn" onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          <span className="sb-nav-label">Navigation</span>

          {navItems.map(({ to, icon: Icon, label }, i) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeSidebar}
              className={({ isActive }) => `sb-link${isActive ? ' active' : ''}`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <span className="sb-link-icon">
                <Icon size={16} />
              </span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="sb-user">
          {user && (
            <div className="sb-user-card">
              <div className="sb-avatar">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
                <div className="sb-user-name">{user.name}</div>
                <div className="sb-user-role">
                  <Shield size={9} />
                  {user.role}
                </div>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="sb-logout">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}