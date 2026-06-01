import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { INCOME_VARS, DEBT_VARS, ASSET_VARS } from '../Auth'
import { User, Bell, Shield, Save, DollarSign, Plus, X, Camera, Landmark, Link2, Unlink2, CheckCircle2, Search } from 'lucide-react'

const SECTIONS = [
  { id: 'profile',   icon: <User size={14} />,        label: 'Profile' },
  { id: 'financial', icon: <DollarSign size={14} />,  label: 'Financial Data' },
  { id: 'accounts',  icon: <Landmark size={14} />,    label: 'Accounts' },
  { id: 'notifications', icon: <Bell size={14} />,   label: 'Notifications' },
  { id: 'security',  icon: <Shield size={14} />,      label: 'Security' },
]

export default function SettingsView() {
  const { user } = useAuth()
  const [active, setActive] = useState('profile')

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Settings sidebar */}
      <div style={{
        width: 220, flexShrink: 0,
        borderRight: '1px solid var(--rule)',
        padding: '32px 0',
      }}>
        <div style={{ padding: '0 24px 16px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Settings
        </div>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            width: '100%', padding: '11px 24px', textAlign: 'left',
            background: active === s.id ? 'var(--cream-mid)' : 'transparent',
            border: 'none',
            borderLeft: `3px solid ${active === s.id ? 'var(--green)' : 'transparent'}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
            color: active === s.id ? 'var(--ink)' : 'var(--ink-muted)',
            transition: 'all 0.15s',
          }}>
            {s.icon}{s.label}
          </button>
        ))}
      </div>

      {/* Settings content */}
      <div style={{ flex: 1, padding: '40px 56px', maxWidth: 660 }}>
        {active === 'profile'       && <ProfileSection user={user} />}
        {active === 'financial'     && <FinancialSection />}
        {active === 'accounts'      && <AccountsSection />}
        {active === 'notifications' && <NotificationsSection />}
        {active === 'security'      && <SecuritySection />}
      </div>
    </div>
  )
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
      <h2 style={{ fontSize: 24, marginBottom: 8 }}>{title}</h2>
      {sub && <p style={{ fontFamily: 'var(--sans)', color: 'var(--ink-muted)', fontSize: 15 }}>{sub}</p>}
    </div>
  )
}

function FieldGroup({ label, children, hint }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>
        {label}
      </label>
      {children}
      {hint && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', marginTop: 6, letterSpacing: '0.04em' }}>{hint}</div>}
    </div>
  )
}

const inputSt = {
  width: '100%', padding: '12px 16px',
  fontFamily: 'var(--sans)', fontSize: 15,
  background: 'transparent', border: '1px solid var(--rule)',
  color: 'var(--ink)', outline: 'none', borderRadius: 2,
}

function ProfileSection({ user }) {
  const [saved, setSaved] = useState(false)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  return (
    <>
      <SectionHeader title="Your Profile" />

      {/* Profile picture */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--rule)' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--green)', color: 'var(--cream)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700,
          }}>
            {user.avatar}
          </div>
          <label style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 24, height: 24, borderRadius: '50%',
            background: 'var(--ink)', color: 'var(--cream)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', border: '2px solid var(--cream)',
          }}>
            <Camera size={11} />
            <input type="file" accept="image/*" style={{ display: 'none' }} />
          </label>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
            {user.first_name} {user.last_name}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginBottom: 10 }}>
            {user.handle}
          </div>
          <label className="btn btn-outline" style={{ fontSize: 10, padding: '6px 14px', cursor: 'pointer' }}>
            Upload photo
            <input type="file" accept="image/*" style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FieldGroup label="First name">
          <input defaultValue={user.first_name} style={inputSt} placeholder="Benito"/>
        </FieldGroup>
        <FieldGroup label="Last name">
          <input defaultValue={user.last_name} style={inputSt} placeholder="Martinez" />
        </FieldGroup>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FieldGroup label="Handle">
          <input defaultValue={user.handle} style={inputSt} placeholder="@yourhandle" />
        </FieldGroup>
        <FieldGroup label="Location">
          <input defaultValue={user.location} style={inputSt} placeholder="City, State" />
        </FieldGroup>
      </div>

      <FieldGroup label="Bio">
        <textarea
          defaultValue={user.headline}
          rows={3}
          style={{ ...inputSt, resize: 'vertical', lineHeight: 1.6, fontFamily: 'var(--sans)', fontSize: 14 }}
          placeholder="Introduce yourself and your financial goals…"
        />
      </FieldGroup>

      <FieldGroup label="Primary financial goal">
        <select defaultValue={user.priority} style={{ ...inputSt, cursor: 'pointer' }}>
          {['Education Debt', 'Emergency Fund', 'Home Purchase', 'Retirement', 'Investment', 'Business'].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </FieldGroup>

      <div style={{ marginTop: 8, paddingTop: 24, borderTop: '1px solid var(--rule)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={save} className="btn btn-primary" style={{ gap: 8 }}>
          <Save size={14} /> {saved ? 'Saved!' : 'Save changes'}
        </button>
        {saved && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.06em' }}>Profile updated</span>}
      </div>
    </>
  )
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    contributions: true, votes: true, chat: false,
    allocations: true, newMembers: false, digest: true,
  })
  const toggle = k => setPrefs(p => ({ ...p, [k]: !p[k] }))

  const items = [
    { key: 'contributions', label: 'Contribution reminders'},
    { key: 'votes',         label: 'New votes'},
    { key: 'allocations',   label: 'Fund allocations'},
    { key: 'chat',          label: 'Chat messages'},
    { key: 'newMembers',    label: 'New member joins'},
    { key: 'digest',        label: 'Weekly digest'},
  ]

  return (
    <>
      <SectionHeader title="Notifications"/>
      {items.map((item, i) => (
        <div key={item.key} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 0',
          borderBottom: i < items.length - 1 ? '1px solid var(--rule)' : 'none',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>{item.sub}</div>
          </div>
          <Toggle on={prefs[item.key]} onToggle={() => toggle(item.key)} />
        </div>
      ))}
    </>
  )
}

function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      width: 44, height: 24, borderRadius: 12,
      background: on ? 'var(--green)' : 'var(--cream-dark)',
      border: 'none', cursor: 'pointer',
      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        background: 'white',
        position: 'absolute', top: 3,
        left: on ? 23 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  )
}

function SecuritySection() {
  const { user } = useAuth()
  const [pwSaved, setPwSaved]       = useState(false)
  const [contactSaved, setContactSaved] = useState(false)

  return (
    <>
      <SectionHeader title="Security"/>

      {/* Password */}
      <div style={{ marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--rule)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
          Change password
        </div>
        <FieldGroup label="Current password">
          <input type="password" placeholder="••••••••" style={inputSt} />
        </FieldGroup>
        <FieldGroup label="New password">
          <input type="password" placeholder="Min. 8 characters" style={inputSt} />
        </FieldGroup>
        <FieldGroup label="Confirm new password">
          <input type="password" placeholder="Repeat new password" style={inputSt} />
        </FieldGroup>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => { setPwSaved(true); setTimeout(() => setPwSaved(false), 2000) }}>
            Update password
          </button>
          {pwSaved && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.06em' }}>Password updated</span>}
        </div>
      </div>

      {/* Contact info */}
      <div style={{ marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--rule)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
          Contact information
        </div>
        <FieldGroup label="Email address">
          <input type="email" defaultValue={user?.email} style={inputSt} />
        </FieldGroup>
        <FieldGroup label="Phone number" hint="Optional. Used for account recovery only.">
          <input type="tel" defaultValue={user?.phone} placeholder="+1 (555) 000-0000" style={inputSt} />
        </FieldGroup>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => { setContactSaved(true); setTimeout(() => setContactSaved(false), 2000) }}>
            Save changes
          </button>
          {contactSaved && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.06em' }}>Contact info updated</span>}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 40 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--terracotta)' }}>
          Danger zone
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 20 }}>
          Permanently delete your account and all associated data. This cannot be undone. You must leave all villages before deleting your account.
        </p>
        <button className="btn" style={{
          background: 'transparent', color: 'var(--terracotta)',
          border: '1px solid var(--terracotta)', fontSize: 11,
        }}>
          Delete account
        </button>
      </div>
    </>
  )
}

const MOCK_BANKS = [
  'Ally Bank', 'American Express', 'Bank of America', 'Capital One',
  'Chase', 'Citibank', 'Discover', 'Marcus by Goldman Sachs',
  'Navy Federal', 'PNC Bank', 'SoFi', 'TD Bank', 'US Bank', 'Wells Fargo',
]

const POPULAR_BANKS = ['Chase', 'Bank of America', 'Wells Fargo', 'Capital One', 'Citibank', 'TD Bank', 'US Bank', 'PNC Bank']

const BANK_COLORS = {
  'Chase': '#117ACA', 'Bank of America': '#E31837', 'Wells Fargo': '#D71E28',
  'Capital One': '#004977', 'Citibank': '#003B8E', 'TD Bank': '#34B233',
  'US Bank': '#0A2B6F', 'PNC Bank': '#F58025', 'Ally Bank': '#6E2B8C',
  'SoFi': '#7B68EE', 'American Express': '#007BC1', 'Discover': '#E55C00',
  'Navy Federal': '#002244', 'Marcus by Goldman Sachs': '#171717',
}

function randLast4() { return String(Math.floor(1000 + Math.random() * 9000)) }

function BankLogo({ bank, size = 36 }) {
  const color = BANK_COLORS[bank] || '#5A5446'
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--sans)', fontSize: Math.round(size * 0.38), fontWeight: 700,
    }}>
      {bank[0]}
    </div>
  )
}

function PlaidModal({ onClose, onConnected }) {
  const [step, setStep] = useState(0) // 0: intro  1: search  2: oauth  3: select  4: success
  const [query, setQuery] = useState('')
  const [selectedBank, setSelectedBank] = useState(null)
  const [fakeAccounts, setFakeAccounts] = useState([])
  const [selectedIds, setSelectedIds] = useState(new Set())

  const filtered = query.trim()
    ? MOCK_BANKS.filter(b => b.toLowerCase().includes(query.toLowerCase()))
    : MOCK_BANKS

  const handlePickBank = (bank) => {
    setSelectedBank(bank)
    setStep(2)
  }

  const handleOAuth = () => {
    const accounts = [
      { id: `a-${Date.now()}-1`, type: 'Checking', last4: randLast4() },
      { id: `a-${Date.now()}-2`, type: 'Savings',  last4: randLast4() },
    ]
    setFakeAccounts(accounts)
    setSelectedIds(new Set(accounts.map(a => a.id)))
    setStep(3)
  }

  const toggleId = (id) => setSelectedIds(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const handleLink = () => {
    onConnected(fakeAccounts.filter(a => selectedIds.has(a.id)).map(a => ({
      ...a, bank: selectedBank, status: 'active', isDefault: false,
    })))
    setStep(4)
  }

  const bankColor = selectedBank ? (BANK_COLORS[selectedBank] || '#5A5446') : 'var(--green)'
  const W = { width: '100%', padding: '14px', border: 'none', borderRadius: 6, fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{
        width: 460, height: 580, background: '#fff', borderRadius: 12,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
      }} onClick={e => e.stopPropagation()}>

        {/* ── Step 0: Intro ── */}
        {step === 0 && (
          <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Landmark size={22} color="#fff" />
                </div>
                <div style={{ display: 'flex', gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#ddd' }} />)}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: '#f2f4f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Landmark size={22} color="#888" />
                </div>
              </div>
              <h2 style={{ fontFamily: 'var(--sans)', fontSize: 21, fontWeight: 700, textAlign: 'center', marginBottom: 10, color: '#111' }}>
                Connect a bank account
              </h2>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#777', textAlign: 'center', lineHeight: 1.7, marginBottom: 36 }}>
                Village uses bank-grade encryption to securely read your account data. Your login credentials are never stored or shared.
              </p>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  '256-bit AES encryption on all data in transit',
                  'Village never stores your bank credentials',
                  'Read-only access — no transfers permitted',
                  'Disconnect at any time from Settings',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#eef6ee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={11} color="var(--green)" />
                    </div>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#555' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '16px 32px 28px' }}>
              <button onClick={() => setStep(1)} style={{ ...W, background: 'var(--green)', color: '#fff', marginBottom: 8 }}>Continue</button>
              <button onClick={onClose} style={{ ...W, background: 'none', color: '#aaa', padding: '8px', fontSize: 13 }}>Cancel</button>
            </div>
          </>
        )}

        {/* ── Step 1: Search ── */}
        {step === 1 && (
          <>
            <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <button onClick={() => setStep(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 18, lineHeight: 1, padding: '0 4px' }}>←</button>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, color: '#111', flex: 1 }}>Select your bank</span>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', display: 'flex' }}><X size={18} /></button>
              </div>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#bbb', pointerEvents: 'none' }} />
                <input
                  autoFocus value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search 12,000+ institutions"
                  style={{
                    width: '100%', padding: '10px 12px 10px 36px', boxSizing: 'border-box',
                    fontFamily: 'var(--sans)', fontSize: 14,
                    background: '#f5f5f5', border: '1.5px solid transparent',
                    borderRadius: 8, outline: 'none', color: '#111',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--green)'}
                  onBlur={e => e.target.style.borderColor = 'transparent'}
                />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {!query.trim() && (
                <>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                    Popular
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
                    {POPULAR_BANKS.map(bank => (
                      <button key={bank} onClick={() => handlePickBank(bank)} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                        padding: '14px 6px', background: '#fafafa',
                        border: '1px solid #efefef', borderRadius: 10, cursor: 'pointer',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.borderColor = '#ddd' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.borderColor = '#efefef' }}
                      >
                        <BankLogo bank={bank} size={30} />
                        <span style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 500, color: '#444', textAlign: 'center', lineHeight: 1.3 }}>
                          {bank.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                    All institutions
                  </div>
                </>
              )}
              {filtered.map((bank, i) => (
                <button key={bank} onClick={() => handlePickBank(bank)} style={{
                  width: '100%', padding: '11px 4px', textAlign: 'left', background: 'none', border: 'none',
                  borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <BankLogo bank={bank} size={36} />
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#111', fontWeight: 500 }}>{bank}</span>
                  <span style={{ marginLeft: 'auto', color: '#ccc', fontSize: 18, lineHeight: 1 }}>›</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: '48px 0', textAlign: 'center', fontFamily: 'var(--sans)', fontSize: 14, color: '#aaa' }}>
                  No results for "{query}"
                </div>
              )}
            </div>

            <div style={{ padding: '8px 24px 10px', borderTop: '1px solid #f5f5f5', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: '#ccc' }}>Secured by Village · Bank-grade encryption</span>
            </div>
          </>
        )}

        {/* ── Step 2: OAuth redirect ── */}
        {step === 2 && selectedBank && (
          <>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 18, lineHeight: 1, padding: '0 4px' }}>←</button>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, color: '#111', flex: 1 }}>{selectedBank}</span>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', display: 'flex' }}><X size={18} /></button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px' }}>
              <BankLogo bank={selectedBank} size={72} />
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: 19, fontWeight: 700, color: '#111', marginTop: 20, marginBottom: 8, textAlign: 'center' }}>
                {selectedBank}
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#777', textAlign: 'center', lineHeight: 1.7, marginBottom: 12 }}>
                You'll be redirected to {selectedBank} to securely authorize read-only access. Village will not see your login credentials.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', background: '#f5f5f5', borderRadius: 20,
              }}>
                <Shield size={11} color="#999" />
                <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: '#999' }}>
                  Read-only · No transfers
                </span>
              </div>
            </div>

            <div style={{ padding: '16px 32px 28px' }}>
              <button onClick={handleOAuth} style={{ ...W, background: bankColor, color: '#fff', marginBottom: 8 }}>
                Continue to {selectedBank}
              </button>
              <button onClick={() => setStep(1)} style={{ ...W, background: 'none', color: '#aaa', padding: '8px', fontSize: 13 }}>
                Choose a different bank
              </button>
            </div>

            <div style={{ padding: '0 24px 10px', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: '#ccc' }}>Secured by Village · Bank-grade encryption</span>
            </div>
          </>
        )}

        {/* ── Step 3: Account selection ── */}
        {step === 3 && (
          <>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <BankLogo bank={selectedBank} size={26} />
              <span style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, color: '#111', flex: 1 }}>Select accounts to link</span>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', display: 'flex' }}><X size={18} /></button>
            </div>

            <div style={{ flex: 1, padding: '20px 24px' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#999', marginBottom: 18 }}>
                Select which {selectedBank} accounts you'd like to connect to Village.
              </p>
              {fakeAccounts.map(acct => {
                const on = selectedIds.has(acct.id)
                return (
                  <button key={acct.id} onClick={() => toggleId(acct.id)} style={{
                    width: '100%', padding: '15px 16px', marginBottom: 10,
                    background: on ? '#f0f7f0' : '#fafafa',
                    border: `1.5px solid ${on ? 'var(--green)' : '#efefef'}`,
                    borderRadius: 10, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      border: `2px solid ${on ? 'var(--green)' : '#ccc'}`,
                      background: on ? 'var(--green)' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {on && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 2 }}>
                        {selectedBank} {acct.type}
                      </div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#999' }}>···· {acct.last4}</div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div style={{ padding: '16px 32px 28px' }}>
              <button
                onClick={handleLink} disabled={selectedIds.size === 0}
                style={{ ...W, background: selectedIds.size > 0 ? 'var(--green)' : '#ddd', color: '#fff', cursor: selectedIds.size > 0 ? 'pointer' : 'default' }}
              >
                Link {selectedIds.size} account{selectedIds.size !== 1 ? 's' : ''}
              </button>
            </div>
          </>
        )}

        {/* ── Step 4: Success ── */}
        {step === 4 && (
          <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#eef6ee', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <CheckCircle2 size={36} color="var(--green)" />
              </div>
              <h2 style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 8, textAlign: 'center' }}>
                Account{selectedIds.size !== 1 ? 's' : ''} linked
              </h2>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#777', textAlign: 'center', lineHeight: 1.7, marginBottom: 28 }}>
                {selectedIds.size} account{selectedIds.size !== 1 ? 's' : ''} from {selectedBank} connected successfully.
              </p>
              <div style={{ width: '100%' }}>
                {fakeAccounts.filter(a => selectedIds.has(a.id)).map(acct => (
                  <div key={acct.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#f9f9f9', borderRadius: 10, marginBottom: 8 }}>
                    <BankLogo bank={selectedBank} size={32} />
                    <div>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: '#111' }}>{selectedBank} {acct.type}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#aaa' }}>···· {acct.last4}</div>
                    </div>
                    <CheckCircle2 size={16} color="var(--green)" style={{ marginLeft: 'auto' }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '16px 32px 28px' }}>
              <button onClick={onClose} style={{ ...W, background: 'var(--green)', color: '#fff' }}>Done</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function AccountsSection() {
  const [accounts, setAccounts] = useState([
    { id: 'a1', bank: 'Chase', type: 'Checking', last4: '4821', status: 'active', isDefault: true },
  ])
  const [showModal, setShowModal] = useState(false)

  const handleConnected = (newAccts) => {
    setAccounts(prev => [
      ...prev,
      ...newAccts.map((a, i) => ({ ...a, isDefault: prev.length === 0 && i === 0 })),
    ])
  }

  const setDefault = (id) => setAccounts(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))
  const remove = (id) => setAccounts(prev => prev.filter(a => a.id !== id))

  return (
    <>
      <SectionHeader title="Linked Accounts" />

      {accounts.length === 0 && (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.04em', marginBottom: 24 }}>
          No accounts linked yet.
        </div>
      )}
      <div style={{ marginBottom: 28 }}>
        {accounts.map((acct, i) => (
          <div key={acct.id} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '16px 0',
            borderBottom: i < accounts.length - 1 ? '1px solid var(--rule)' : 'none',
          }}>
            <BankLogo bank={acct.bank} size={42} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, marginBottom: 3 }}>
                {acct.bank} {acct.type}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>···· {acct.last4}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.04em' }}>
                  <CheckCircle2 size={11} /> Connected
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {acct.isDefault ? (
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.08em', color: 'var(--green)', border: '1px solid var(--green)', padding: '3px 8px', borderRadius: 2 }}>
                  DEFAULT
                </span>
              ) : (
                <button onClick={() => setDefault(acct.id)} style={{
                  fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.06em',
                  color: 'var(--ink-muted)', border: '1px solid var(--rule)',
                  padding: '3px 8px', borderRadius: 2, background: 'none', cursor: 'pointer',
                }}>Set default</button>
              )}
              <button onClick={() => remove(acct.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex', padding: 4 }}
                title="Disconnect account"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--terracotta)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
              >
                <Unlink2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ gap: 8 }}>
        <Link2 size={14} /> Connect a bank account
      </button>

      {showModal && <PlaidModal onClose={() => setShowModal(false)} onConnected={handleConnected} />}
    </>
  )
}

function FinancialSection() {
  const { user, updateFinancial } = useAuth()
  const initial = user?.financial || { income: [], debts: [], assets: [] }
  const [income, setIncome] = useState(initial.income)
  const [debts, setDebts]   = useState(initial.debts)
  const [assets, setAssets] = useState(initial.assets)
  const [saved, setSaved]   = useState(false)

  const save = () => {
    updateFinancial({ income, debts, assets })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <SectionHeader title="Financial Data"/>
      <FinancialGroup label="Income sources"    vars={INCOME_VARS} entries={income} onChange={setIncome} />
      <FinancialGroup label="Debt obligations"  vars={DEBT_VARS}   entries={debts}  onChange={setDebts} />
      <FinancialGroup label="Assets & net worth" vars={ASSET_VARS} entries={assets} onChange={setAssets} />
      <div style={{ paddingTop: 24, borderTop: '1px solid var(--rule)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={save} className="btn btn-primary" style={{ gap: 8 }}>
          <Save size={14} /> {saved ? 'Saved!' : 'Save changes'}
        </button>
        {saved && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.06em' }}>Financial data updated</span>}
      </div>
    </>
  )
}

function FinancialGroup({ label, vars, entries, onChange }) {
  const add    = () => onChange([...entries, { key: vars[0].key, amount: '' }])
  const remove = i  => onChange(entries.filter((_, idx) => idx !== i))
  const update = (i, field, val) => onChange(entries.map((e, idx) => idx === i ? { ...e, [field]: val } : e))

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
        {label}
      </div>
      {entries.length === 0 && (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em', marginBottom: 12 }}>
        </div>
      )}
      {entries.map((entry, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <select
            value={entry.key}
            onChange={e => update(i, 'key', e.target.value)}
            style={{ flex: 2, padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: 11, background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 2, outline: 'none', color: 'var(--ink)' }}
          >
            {vars.map(v => <option key={v.key} value={v.key}>{v.label}</option>)}
          </select>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-muted)' }}>$</span>
            <input
              type="number"
              value={entry.amount}
              onChange={e => update(i, 'amount', e.target.value)}
              placeholder="0"
              style={{ width: '100%', padding: '10px 12px 10px 24px', fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 2, outline: 'none', color: 'var(--ink)', boxSizing: 'border-box' }}
            />
          </div>
          <button onClick={() => remove(i)} style={{ width: 36, height: 40, background: 'none', border: '1px solid var(--rule)', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 2 }}>
            <X size={13} />
          </button>
        </div>
      ))}
      <button onClick={add} className="btn btn-outline" style={{ fontSize: 10, padding: '7px 14px', marginTop: 4 }}>
        <Plus size={12} /> Add entry
      </button>
    </div>
  )
}
