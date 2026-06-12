import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

// ─── Theme / colors ────────────────────────────────────────────────────────────
const NAV_BLUE = '#0074BD';

// ─── Shared UI components ───────────────────────────────────────────────────────

function RobuxIcon() {
  return (
    <span style={{
      display: 'inline-block',
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: '#00a2ff',
      marginRight: 3,
      verticalAlign: 'middle',
      fontSize: 9,
      color: '#fff',
      textAlign: 'center',
      lineHeight: '14px',
      fontWeight: 700,
    }}>R</span>
  );
}

function Btn({ onClick, children, style, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: '#00a2ff',
      color: '#fff',
      border: 'none',
      borderRadius: 3,
      padding: '6px 18px',
      fontSize: 14,
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.7 : 1,
      transition: 'background 0.1s',
      ...style,
    }}
    onMouseEnter={e => !disabled && (e.currentTarget.style.background = '#0090e0')}
    onMouseLeave={e => !disabled && (e.currentTarget.style.background = '#00a2ff')}
    >
      {children}
    </button>
  );
}

function BtnSecondary({ onClick, children, style }) {
  return (
    <button onClick={onClick} style={{
      background: '#fff',
      color: '#0074BD',
      border: '1px solid #0074BD',
      borderRadius: 3,
      padding: '5px 16px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      ...style,
    }}>
      {children}
    </button>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────────

function Navbar({ user, onLoginClick }) {
  const location = useLocation();
  const [searchVal, setSearchVal] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavbarScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { url: '/games', label: 'Games' },
    { url: '/catalog', label: 'Catalog' },
    { url: '/develop', label: 'Develop' },
    { url: '/robux', label: 'ROBUX' },
  ];

  return (
    <nav style={{
      background: NAV_BLUE,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: navbarScrolled ? '0 2px 8px rgba(0,0,0,0.18)' : 'none',
      transition: 'box-shadow 0.2s',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '5px 16px 3px',
        gap: 8,
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {/* Hamburger for mobile */}
        <button
          onClick={() => setMobileMenuOpen(o => !o)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 22,
            padding: '0 4px',
            display: 'none',
            cursor: 'pointer',
          }}
          className="nav-hamburger"
          aria-label="Menu"
        >☰</button>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <svg width="118" height="30" viewBox="0 0 118 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="23" fontFamily="'Source Sans Pro',Arial,sans-serif" fontWeight="700" fontSize="26" fill="white" letterSpacing="-1">ROBLOX</text>
          </svg>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, marginLeft: 12 }} className="nav-links">
          {navLinks.map(l => (
            <Link key={l.url} to={l.url} style={{
              color: '#fff',
              fontWeight: 400,
              fontSize: 16,
              padding: '4px 10px',
              borderRadius: 4,
              background: location.pathname === l.url ? 'rgba(25,25,25,0.2)' : 'transparent',
              transition: 'background 0.1s',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(25,25,25,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = location.pathname === l.url ? 'rgba(25,25,25,0.2)' : 'transparent'}
            >{l.label}</Link>
          ))}
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search"
            style={{
              border: 'none',
              borderRadius: '3px 0 0 3px',
              padding: '4px 8px',
              fontSize: 13,
              width: 140,
              outline: 'none',
              height: 28,
            }}
          />
          <button style={{
            background: '#005a9e',
            border: 'none',
            borderRadius: '0 3px 3px 0',
            color: '#fff',
            padding: '4px 8px',
            height: 28,
            cursor: 'pointer',
            fontSize: 12,
          }}>🔍</button>
        </div>

        {/* Right side: login or user info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
          {user ? (
            <>
              <div style={{ color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                <RobuxIcon />
                <span style={{ fontWeight: 600 }}>{user.robux.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#cde',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}>
                  <img src={`https://www.gravatar.com/avatar/${user.username}?d=identicon&s=28`} alt="" style={{ width: '100%', height: '100%' }} />
                </div>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{user.username}</span>
              </div>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} style={{
                background: '#fff',
                color: '#0074BD',
                border: 'none',
                borderRadius: 3,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}>Login</button>
              <Link to="/signup" style={{
                background: '#00a2ff',
                color: '#fff',
                borderRadius: 3,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    ['/about', 'About Us'],
    ['/jobs', 'Jobs'],
    ['/info/blog', 'Blog'],
    ['/privacy', 'Privacy'],
    ['/help', 'Help'],
  ];
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #e0e0e0', padding: '20px 0' }}>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '0 15px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px', marginBottom: 12 }}>
          {links.map(([url, label]) => (
            <a key={url} href={url} style={{ fontSize: 19, fontWeight: 300, color: '#b8b8b8', lineHeight: '30px' }}
               onMouseEnter={e => e.currentTarget.style.color = '#191919'}
               onMouseLeave={e => e.currentTarget.style.color = '#b8b8b8'}>
              {label}
            </a>
          ))}
        </div>
        <p style={{ color: '#b8b8b8', fontSize: 12, lineHeight: 1.4 }}>
          ROBLOX, "Online Building Toy", characters, logos, names, and all related indicia are trademarks of{' '}
          <a href="https://corp.roblox.com" style={{ color: '#b8b8b8' }}>ROBLOX Corporation</a>, ©2016.
          Use of this site signifies your acceptance of the{' '}
          <a href="/terms" style={{ color: '#b8b8b8' }}>Terms and Conditions</a>.
        </p>
      </div>
    </footer>
  );
}

// ─── Login Modal ─────────────────────────────────────────────────────────────────

function LoginModal({ onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) { setError('Please enter your username and password.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    // Demo: any credentials work
    onLogin({ username, robux: 4825, tickets: 12, friends: 23, isPremium: false });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: '#fff', borderRadius: 6, padding: 32, width: 480, maxWidth: '95vw',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 10, right: 14,
          background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#767676',
        }}>×</button>

        <div style={{ display: 'flex', gap: 32 }}>
          {/* Login side */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 32, fontWeight: 400, marginBottom: 16, color: '#343434' }}>Login to ROBLOX</h1>
            {error && <p style={{ color: '#dc3545', fontSize: 13, marginBottom: 8 }}>{error}</p>}
            <div style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: 600, color: '#343434', marginBottom: 3, fontSize: 13 }}>Username:</p>
              <input value={username} onChange={e => setUsername(e.target.value)}
                style={{ width: '100%', border: '1px solid #c3c3c3', borderRadius: 2, padding: '4px 8px', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontWeight: 600, color: '#343434', marginBottom: 3, fontSize: 13 }}>Password:</p>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ width: '100%', border: '1px solid #c3c3c3', borderRadius: 2, padding: '4px 8px', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Btn onClick={handleLogin} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Btn>
            </div>
          </div>

          {/* Sign up side */}
          <div style={{
            flex: 1, borderLeft: '1px solid #c3c3c3', paddingLeft: 32,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          }}>
            <p style={{ fontSize: 12, color: '#343434', marginBottom: 4 }}>Not a member?</p>
            <h2 style={{ fontSize: 24, fontWeight: 400, color: '#343434', marginBottom: 20 }}>Sign Up to Build &amp; Make Friends</h2>
            <Btn style={{ width: '100%' }} onClick={() => { onClose(); window.location.href = '/signup'; }}>
              Sign Up
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────────

const PEXELS_GAME_THUMBS = [
  'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/159393/gamepad-video-games-controller-game-159393.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/163036/mario-luigi-yoshi-nintendo-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400',
];

const GAMES = [
  { id: 1, title: 'Natural Disaster Survival', creator: 'Stickmasterluke', playing: 42813, visits: '1.2B', thumb: PEXELS_GAME_THUMBS[0] },
  { id: 2, title: 'Work at a Pizza Place', creator: 'Dued1', playing: 28450, visits: '800M', thumb: PEXELS_GAME_THUMBS[1] },
  { id: 3, title: 'Jailbreak', creator: 'badcc & asimo3089', playing: 71234, visits: '2.1B', thumb: PEXELS_GAME_THUMBS[2] },
  { id: 4, title: 'Murder Mystery 2', creator: 'Nikilis', playing: 55102, visits: '1.8B', thumb: PEXELS_GAME_THUMBS[3] },
  { id: 5, title: 'Adopt Me!', creator: 'DreamCraft', playing: 193820, visits: '28B', thumb: PEXELS_GAME_THUMBS[4] },
  { id: 6, title: 'Tower of Hell', creator: 'YXcept', playing: 38741, visits: '3.4B', thumb: PEXELS_GAME_THUMBS[5] },
];

const FEED_ITEMS = [
  { id: 1, user: 'Stickmasterluke', action: 'updated a place', item: 'Natural Disaster Survival', time: '2 hours ago' },
  { id: 2, user: 'Dued1', action: 'sold a limited item', item: 'Dominus Empyreus', time: '4 hours ago' },
  { id: 3, user: 'asimo3089', action: 'joined a group', item: 'Roblox Development', time: '6 hours ago' },
  { id: 4, user: 'badcc', action: 'posted on the wall of', item: 'Jailbreak Dev', time: '8 hours ago' },
];

function HomePage({ user, onLoginClick }) {
  if (!user) {
    return <SplashPage onLoginClick={onLoginClick} />;
  }
  return <AuthHomePage user={user} />;
}

function SplashPage({ onLoginClick }) {
  return (
    <div style={{ paddingTop: 52 }}>
      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0074BD 0%, #005a9e 100%)',
        color: '#fff',
        padding: '60px 0',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 970, margin: '0 auto', padding: '0 16px' }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16, color: '#fff', letterSpacing: -1 }}>
            ROBLOX
          </h1>
          <p style={{ fontSize: 20, fontWeight: 300, marginBottom: 32, color: 'rgba(255,255,255,0.9)' }}>
            Join millions of players and discover an infinite variety of immersive worlds
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onLoginClick} style={{
              background: '#fff', color: '#0074BD', border: 'none', borderRadius: 4,
              padding: '12px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}>
              Login
            </button>
            <Link to="/signup" style={{
              background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: 4,
              padding: '10px 30px', fontSize: 16, fontWeight: 600,
            }}>
              Sign Up — It's Free!
            </Link>
          </div>
        </div>
      </div>

      {/* Popular games preview */}
      <div style={{ background: '#e3e3e3', padding: '24px 0' }}>
        <div style={{ maxWidth: 970, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 400, color: '#343434' }}>Popular Games</h2>
            <Link to="/games" style={{ fontSize: 13 }}>See all &raquo;</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {GAMES.slice(0, 6).map(g => <GameCard key={g.id} game={g} />)}
          </div>
        </div>
      </div>

      {/* Features row */}
      <div style={{ background: '#fff', padding: '40px 0' }}>
        <div style={{ maxWidth: 970, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '🎮', title: 'Play', desc: 'Explore millions of free games built by the community.' },
              { icon: '🔨', title: 'Create', desc: 'Build your own experiences with easy-to-use tools.' },
              { icon: '👥', title: 'Connect', desc: 'Make friends and play together from anywhere.' },
            ].map(f => (
              <div key={f.title} style={{ textAlign: 'center', padding: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: '#343434' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#767676', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthHomePage({ user }) {
  return (
    <div style={{ paddingTop: 52, background: '#e3e3e3', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '20px 16px' }}>
        {/* Top stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Robux', value: user.robux.toLocaleString(), icon: '💰' },
            { label: 'Friends', value: user.friends, icon: '👥' },
            { label: 'Groups', value: 4, icon: '🏛️' },
            { label: 'Collections', value: 17, icon: '🎒' },
          ].map(s => (
            <div key={s.label} style={{
              background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4,
              padding: '12px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#343434', lineHeight: 1.2 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#767676' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
          {/* Feed */}
          <div>
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, padding: 16, marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 400, borderBottom: '2px solid #e0e0e0', paddingBottom: 8, marginBottom: 12 }}>
                My Feed
              </h3>
              {FEED_ITEMS.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: 12, padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', background: '#cde',
                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 700, color: '#0074BD',
                  }}>
                    {item.user[0].toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: '#343434', lineHeight: 1.4 }}>
                      <a href="#" style={{ fontWeight: 600 }}>{item.user}</a>{' '}
                      {item.action}{' '}
                      <a href="#" style={{ fontWeight: 600 }}>{item.item}</a>
                    </p>
                    <p style={{ fontSize: 11, color: '#767676', marginTop: 2 }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular games */}
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, padding: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 400, borderBottom: '2px solid #e0e0e0', paddingBottom: 8, marginBottom: 12 }}>
                Popular Games
                <Link to="/games" style={{ fontSize: 13, float: 'right', fontWeight: 400 }}>See all »</Link>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {GAMES.slice(0, 3).map(g => <GameCard key={g.id} game={g} />)}
              </div>
            </div>
          </div>

          {/* Sidebar: friends */}
          <div>
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, borderBottom: '1px solid #e0e0e0', paddingBottom: 8 }}>
                My Friends ({user.friends})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', background: `hsl(${i * 45}, 60%, 75%)`,
                      margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, color: '#fff',
                    }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <p style={{ fontSize: 10, color: '#343434', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      Player{i + 1}
                    </p>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: i < 3 ? '#5cb85c' : '#999',
                      margin: '0 auto',
                    }} title={i < 3 ? 'Online' : 'Offline'} />
                  </div>
                ))}
              </div>
              <Link to="/friends" style={{ display: 'block', textAlign: 'center', fontSize: 13, marginTop: 12, color: '#0055b3' }}>
                View All Friends »
              </Link>
            </div>

            {/* My groups */}
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, padding: 16 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, borderBottom: '1px solid #e0e0e0', paddingBottom: 8 }}>
                My Groups
              </h4>
              {['Scripters', 'ROBLOX Fan Club', 'Builders', 'Traders United'].map(g => (
                <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, background: '#e0e8f0', borderRadius: 3, flexShrink: 0 }} />
                  <a href="#" style={{ fontSize: 13, color: '#0055b3' }}>{g}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Games Page ───────────────────────────────────────────────────────────────────

function GameCard({ game }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: 4,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'box-shadow 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.14)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ width: '100%', aspectRatio: '1.78', overflow: 'hidden', background: '#c8c8c8' }}>
        <img src={game.thumb} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '6px 8px' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#343434', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {game.title}
        </p>
        <p style={{ fontSize: 11, color: '#767676' }}>
          🟢 {game.playing.toLocaleString()} playing
        </p>
      </div>
    </div>
  );
}

function GamesPage() {
  const [activeTab, setActiveTab] = useState('Popular');
  const tabs = ['Popular', 'Top Rated', 'Top Earning', 'Top Favorited', 'Recently Updated'];

  return (
    <div style={{ paddingTop: 52, background: '#e3e3e3', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '20px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#343434', marginBottom: 16 }}>Games</h1>

        {/* Tabs */}
        <div style={{ borderBottom: '2px solid #c3c3c3', marginBottom: 20, display: 'flex', gap: 0 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: '6px 16px', fontSize: 13, cursor: 'pointer',
              background: activeTab === t ? '#fff' : 'transparent',
              border: activeTab === t ? '1px solid #c3c3c3' : '1px solid transparent',
              borderBottom: activeTab === t ? '2px solid #fff' : 'none',
              marginBottom: -2,
              color: activeTab === t ? '#343434' : '#767676',
              fontWeight: activeTab === t ? 600 : 400,
              borderRadius: '4px 4px 0 0',
            }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
          {GAMES.map(g => <GameCard key={g.id} game={g} />)}
          {/* Fill with more placeholder cards */}
          {Array.from({ length: 6 }, (_, i) => (
            <GameCard key={`extra-${i}`} game={{
              id: 100 + i,
              title: ['Obby Kingdom', 'Sword Fight', 'Tycoon World', 'Simulator X', 'Battle Royale', 'Roleplay City'][i],
              creator: `Creator${i + 1}`,
              playing: Math.floor(Math.random() * 50000 + 1000),
              visits: `${Math.floor(Math.random() * 900 + 100)}M`,
              thumb: PEXELS_GAME_THUMBS[i % PEXELS_GAME_THUMBS.length],
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Catalog Page ─────────────────────────────────────────────────────────────────

const CATALOG_ITEMS = [
  { id: 1, name: 'Dominus Empyreus', price: 13337, limited: true, img: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 2, name: 'Sparkle Time Fedora', price: 5000, limited: true, img: 'https://images.pexels.com/photos/1031699/pexels-photo-1031699.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 3, name: 'Classic ROBLOX Fedora', price: 10, limited: false, img: 'https://images.pexels.com/photos/1755678/pexels-photo-1755678.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 4, name: 'Blue Baseball Cap', price: 15, limited: false, img: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 5, name: 'White Hood', price: 25, limited: false, img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 6, name: 'Circuit Board Face', price: 35, limited: false, img: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 7, name: 'ROBLOX Visor', price: 8, limited: false, img: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 8, name: 'Skateboard', price: 100, limited: false, img: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 9, name: 'Wings of Freedom', price: 250, limited: false, img: 'https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 10, name: 'Topaz Hyperlaser', price: 700, limited: false, img: 'https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 11, name: 'Crimson Catface', price: 45, limited: false, img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 12, name: 'Red Bandana', price: 5, limited: false, img: 'https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

const CATALOG_CATEGORIES = ['All', 'Hats', 'Hair', 'Faces', 'Gear', 'Accessories', 'Clothing', 'Limited'];

function CatalogItemCard({ item }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4,
      overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ width: '100%', aspectRatio: 1, background: '#f5f5f5', overflow: 'hidden', position: 'relative' }}>
        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {item.limited && (
          <div style={{
            position: 'absolute', top: 4, right: 4, background: '#f90',
            color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 2,
          }}>LIMITED</div>
        )}
      </div>
      <div style={{ padding: '6px 8px' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#343434', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </p>
        <p style={{ fontSize: 12, color: '#343434', display: 'flex', alignItems: 'center', gap: 2 }}>
          <RobuxIcon />{item.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function CatalogPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Relevance');

  const filtered = CATALOG_ITEMS.filter(item => {
    if (category === 'Limited' && !item.limited) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ paddingTop: 52, background: '#e3e3e3', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '20px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#343434', marginBottom: 16 }}>Catalog</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
          {/* Sidebar filters */}
          <div>
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ background: NAV_BLUE, color: '#fff', padding: '8px 12px', fontSize: 13, fontWeight: 600 }}>
                Categories
              </div>
              {CATALOG_CATEGORIES.map(cat => (
                <div key={cat} onClick={() => setCategory(cat)} style={{
                  padding: '7px 12px', fontSize: 13, cursor: 'pointer',
                  background: category === cat ? '#e8f4ff' : '#fff',
                  color: category === cat ? '#0074BD' : '#343434',
                  fontWeight: category === cat ? 600 : 400,
                  borderBottom: '1px solid #f0f0f0',
                  transition: 'background 0.1s',
                }}>
                  {cat}
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ background: NAV_BLUE, color: '#fff', padding: '8px 12px', fontSize: 13, fontWeight: 600 }}>
                Sort By
              </div>
              {['Relevance', 'Price: Low to High', 'Price: High to Low', 'Recently Updated'].map(s => (
                <div key={s} onClick={() => setSort(s)} style={{
                  padding: '7px 12px', fontSize: 13, cursor: 'pointer',
                  background: sort === s ? '#e8f4ff' : '#fff',
                  color: sort === s ? '#0074BD' : '#343434',
                  fontWeight: sort === s ? 600 : 400,
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div>
            {/* Search bar */}
            <div style={{ marginBottom: 14, display: 'flex', gap: 8 }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search catalog..."
                style={{
                  flex: 1, border: '1px solid #c3c3c3', borderRadius: 3,
                  padding: '6px 10px', fontSize: 14, outline: 'none',
                }} />
              <Btn style={{ padding: '6px 16px' }}>Search</Btn>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
              {filtered.map(item => <CatalogItemCard key={item.id} item={item} />)}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: '#767676' }}>
                No items found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────────

function ProfilePage({ user }) {
  const [tab, setTab] = useState('Profile');
  const tabs = ['Profile', 'Collections', 'Inventory', 'Favorites', 'Friends', 'Groups', 'Creations'];

  if (!user) {
    return (
      <div style={{ paddingTop: 52, minHeight: 'calc(100vh - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 18, color: '#767676', marginBottom: 16 }}>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 52, background: '#e3e3e3', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '20px 16px' }}>
        {/* Profile header */}
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* Avatar */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: 100, height: 130, background: 'linear-gradient(135deg, #cde 0%, #a8c 100%)',
                borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 48,
              }}>👤</div>
            </div>
            {/* Info */}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 28, fontWeight: 400, color: '#343434', marginBottom: 4 }}>{user.username}</h1>
              {user.isPremium && (
                <span style={{
                  background: '#f90', color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '2px 7px', borderRadius: 10, marginBottom: 8, display: 'inline-block',
                }}>BC</span>
              )}
              <p style={{ fontSize: 13, color: '#767676', marginTop: 4, marginBottom: 12 }}>
                Member since January 2016
              </p>
              <div style={{ display: 'flex', gap: 20 }}>
                {[
                  { label: 'Friends', val: user.friends },
                  { label: 'Followers', val: 142 },
                  { label: 'Following', val: 38 },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#343434' }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: '#767676' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '2px solid #c3c3c3', marginBottom: 16, display: 'flex', flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '7px 14px', fontSize: 13, cursor: 'pointer',
              background: tab === t ? '#fff' : 'transparent',
              border: tab === t ? '1px solid #c3c3c3' : '1px solid transparent',
              borderBottom: tab === t ? '2px solid #fff' : 'none',
              marginBottom: -2,
              color: tab === t ? '#343434' : '#767676',
              fontWeight: tab === t ? 600 : 400,
              borderRadius: '4px 4px 0 0',
            }}>{t}</button>
          ))}
        </div>

        {tab === 'Profile' && (
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, borderBottom: '1px solid #e0e0e0', paddingBottom: 8 }}>About Me</h3>
            <p style={{ fontSize: 14, color: '#343434', lineHeight: 1.6 }}>
              Hi, I'm {user.username}! I love building games and trading on ROBLOX. Feel free to add me as a friend!
            </p>
          </div>
        )}

        {tab === 'Inventory' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
              {CATALOG_ITEMS.slice(0, 6).map(item => <CatalogItemCard key={item.id} item={item} />)}
            </div>
          </div>
        )}

        {tab === 'Friends' && (
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, padding: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 12 }}>
              {Array.from({ length: user.friends }, (_, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%', margin: '0 auto 6px',
                    background: `hsl(${i * 30}, 55%, 70%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontWeight: 700, color: '#fff',
                  }}>{String.fromCharCode(65 + (i % 26))}</div>
                  <p style={{ fontSize: 12, color: '#343434', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Player{i + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Develop Page ─────────────────────────────────────────────────────────────────

function DevelopPage({ user }) {
  const [activeTab, setActiveTab] = useState('Games');
  const tabs = ['Games', 'Clothing', 'Audio', 'Advertisements'];

  return (
    <div style={{ paddingTop: 52, background: '#e3e3e3', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '20px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#343434', marginBottom: 16 }}>Develop</h1>

        <div style={{ borderBottom: '2px solid #c3c3c3', marginBottom: 20, display: 'flex' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: '7px 16px', fontSize: 13, cursor: 'pointer',
              background: activeTab === t ? '#fff' : 'transparent',
              border: activeTab === t ? '1px solid #c3c3c3' : '1px solid transparent',
              borderBottom: activeTab === t ? '2px solid #fff' : 'none',
              marginBottom: -2,
              color: activeTab === t ? '#343434' : '#767676',
              fontWeight: activeTab === t ? 600 : 400,
              borderRadius: '4px 4px 0 0',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <Btn>Create New {activeTab === 'Games' ? 'Game' : activeTab === 'Clothing' ? 'Clothing' : 'Asset'}</Btn>
        </div>

        {activeTab === 'Games' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {GAMES.slice(0, 3).map(g => (
              <div key={g.id} style={{
                background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden',
              }}>
                <div style={{ width: '100%', aspectRatio: 1.78, overflow: 'hidden', background: '#c8c8c8' }}>
                  <img src={g.thumb} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '8px 12px' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{g.title}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#767676' }}>
                    <span>🟢 {g.playing.toLocaleString()}</span>
                    <span>👁️ {g.visits}</span>
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                    <BtnSecondary style={{ fontSize: 12, padding: '3px 10px' }}>Edit</BtnSecondary>
                    <BtnSecondary style={{ fontSize: 12, padding: '3px 10px' }}>Configure</BtnSecondary>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab !== 'Games' && (
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4, padding: 40, textAlign: 'center', color: '#767676' }}>
            <p style={{ fontSize: 16, marginBottom: 8 }}>No {activeTab.toLowerCase()} yet.</p>
            <p style={{ fontSize: 13 }}>Create your first asset to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Signup Page ──────────────────────────────────────────────────────────────────

function SignupPage({ onSignup }) {
  const [form, setForm] = useState({ username: '', password: '', passwordConfirm: '', birthday: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.username || !form.password) { setError('All fields are required.'); return; }
    if (form.password !== form.passwordConfirm) { setError('Passwords do not match.'); return; }
    if (form.username.length < 3) { setError('Username must be at least 3 characters.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onSignup({ username: form.username, robux: 0, tickets: 10, friends: 0, isPremium: false });
    navigate('/home');
  };

  return (
    <div style={{ paddingTop: 52, minHeight: 'calc(100vh - 52px)', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '70px 16px 40px' }}>
      <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: 40, width: 420, maxWidth: '100%' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, textAlign: 'center', marginBottom: 24, color: '#343434' }}>
          Sign Up for ROBLOX
        </h1>
        {error && <p style={{ color: '#dc3545', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        {[
          { label: 'Username', key: 'username', type: 'text' },
          { label: 'Password', key: 'password', type: 'password' },
          { label: 'Confirm Password', key: 'passwordConfirm', type: 'password' },
          { label: 'Birthday', key: 'birthday', type: 'date' },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#343434' }}>{f.label}:</p>
            <input
              type={f.type}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              style={{ width: '100%', border: '1px solid #c3c3c3', borderRadius: 3, padding: '6px 10px', fontSize: 14, outline: 'none' }}
            />
          </div>
        ))}
        <Btn style={{ width: '100%', padding: '10px', fontSize: 16, marginTop: 8 }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Btn>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#767676', marginTop: 16 }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#0055b3' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

// ─── ROBUX Page ───────────────────────────────────────────────────────────────────

function RobuxPage({ user }) {
  const packages = [
    { r: 400, price: '$4.99', bonus: 0 },
    { r: 800, price: '$9.99', bonus: 0 },
    { r: 1700, price: '$19.99', bonus: 100 },
    { r: 4500, price: '$49.99', bonus: 450 },
    { r: 10000, price: '$99.99', bonus: 1000 },
  ];

  return (
    <div style={{ paddingTop: 52, background: '#e3e3e3', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '20px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#343434', marginBottom: 8 }}>ROBUX</h1>
        {user && (
          <p style={{ fontSize: 14, color: '#343434', marginBottom: 20 }}>
            Your Balance: <RobuxIcon /><strong>{user.robux.toLocaleString()}</strong> Robux
          </p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {packages.map(pkg => (
            <div key={pkg.r} style={{
              background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6,
              padding: 20, textAlign: 'center',
            }}>
              <div style={{ fontSize: 36, marginBottom: 4 }}>💰</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#343434', marginBottom: 2 }}>
                {pkg.r.toLocaleString()}
              </div>
              <div style={{ fontSize: 13, color: '#767676', marginBottom: pkg.bonus ? 4 : 12 }}>Robux</div>
              {pkg.bonus > 0 && (
                <div style={{ fontSize: 12, color: '#5cb85c', fontWeight: 600, marginBottom: 10 }}>
                  +{pkg.bonus} bonus!
                </div>
              )}
              <Btn style={{ width: '100%', padding: '8px 0', fontSize: 15 }}>
                {pkg.price}
              </Btn>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: 24, marginTop: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 400, color: '#343434', marginBottom: 12 }}>
            Builders Club — Get Robux Every Day!
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { name: 'Classic BC', daily: 15, price: '$5.95/mo', color: '#f0a830' },
              { name: 'Turbo BC', daily: 35, price: '$11.95/mo', color: '#c0c0c0' },
              { name: 'Outrageous BC', daily: 60, price: '$19.95/mo', color: '#ffd700' },
            ].map(bc => (
              <div key={bc.name} style={{
                border: `2px solid ${bc.color}`, borderRadius: 6, padding: 16, textAlign: 'center',
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: bc.color, marginBottom: 6 }}>{bc.name}</div>
                <div style={{ fontSize: 13, color: '#343434', marginBottom: 4 }}>
                  <RobuxIcon />{bc.daily} Robux/day
                </div>
                <div style={{ fontSize: 13, color: '#767676', marginBottom: 12 }}>{bc.price}</div>
                <Btn style={{ background: bc.color, width: '100%', fontSize: 13 }}>Get {bc.name}</Btn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Not Found ────────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div style={{ paddingTop: 52, minHeight: 'calc(100vh - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 80, marginBottom: 12 }}>🔍</div>
        <h1 style={{ fontSize: 48, fontWeight: 400, color: '#343434', marginBottom: 8 }}>404</h1>
        <p style={{ fontSize: 18, color: '#767676', marginBottom: 20 }}>Page Not Found</p>
        <Link to="/" style={{
          background: '#00a2ff', color: '#fff', padding: '8px 24px',
          borderRadius: 3, fontSize: 15, fontWeight: 600,
        }}>Go Home</Link>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────────

function AppShell() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // Auto scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar user={user} onLoginClick={() => setShowLogin(true)} />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={u => setUser(u)}
        />
      )}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage user={user} onLoginClick={() => setShowLogin(true)} />} />
          <Route path="/home" element={<HomePage user={user} onLoginClick={() => setShowLogin(true)} />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/develop" element={<DevelopPage user={user} />} />
          <Route path="/robux" element={<RobuxPage user={user} />} />
          <Route path="/signup" element={<SignupPage onSignup={u => setUser(u)} />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route path="/User.aspx" element={<ProfilePage user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
