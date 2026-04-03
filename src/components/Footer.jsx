import { useMobile } from '../hooks/useMobile'

export default function Footer() {
  const year = new Date().getFullYear()
  const isMobile = useMobile()

  return (
    <footer style={{
      borderTop: '1px solid var(--rule)',
      background: 'var(--ink)',
      color: 'var(--cream)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: isMobile ? '20px 24px' : '20px 32px',
        borderTop: '1px solid rgba(196,186,168,0.2)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 12 : 0,
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(244,238,226,0.3)', letterSpacing: '0.06em' }}>
          © {year} Village Finance, Corp. / Yale, New Haven CT
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Cookies'].map(l => (
            <a key={l} href="#" style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
              color: 'rgba(244,238,226,0.3)', textDecoration: 'none',
            }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
