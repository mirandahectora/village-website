import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { to: '/',           label: 'Home' },
    { to: '/about',      label: 'About' },
    { to: '/investors',  label: 'Investors' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(244,238,226,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      transition: 'all 0.3s',
      height: 72,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 32px',
        height: '100%', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <VillageLogo />
          <span style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '0.02em' }}>Village</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none',
              color: loc.pathname === l.to ? 'var(--green)' : 'var(--ink)',
              borderBottom: loc.pathname === l.to ? '1px solid var(--green)' : '1px solid transparent',
              paddingBottom: 2, transition: 'color 0.2s',
            }}>{l.label}</Link>
          ))}

          {user ? (
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 11, gap: 7 }}>
              <LayoutDashboard size={13} /> Dashboard
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to="/auth?mode=signup" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 11 }}>
                Join
              </Link>
              <Link to="/auth" className="btn btn-terra" style={{ padding: '10px 20px', fontSize: 11 }}>
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

function VillageLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {[0,1,2].map(row => [0,1,2].map(col => {
        const colors = [
          ['var(--green)','var(--green)','var(--terracotta)'],
          ['var(--green)','var(--cream-dark)','var(--green)'],
          ['var(--terracotta)','var(--green)','var(--green)'],
        ]
        return (
          <rect key={`${row}-${col}`} x={col*10} y={row*10} width={8} height={8} rx={1} fill={colors[row][col]} />
        )
      }))}
    </svg>
  )
}
