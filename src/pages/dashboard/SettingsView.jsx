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

function AccountsSection() {
  const [accounts, setAccounts] = useState([
    { id: 'a1', bank: 'Chase', type: 'Checking', last4: '4821', status: 'active', isDefault: true },
  ])
  const [showModal, setShowModal] = useState(false)
  const [step, setStep]           = useState(1) // 1: search  2: connecting  3: success
  const [bankQuery, setBankQuery] = useState('')
  const [selectedBank, setSelectedBank]   = useState('')
  const [newAccountType, setNewAccountType] = useState('Checking')
  const [newLast4, setNewLast4]   = useState('')

  const openModal = () => { setStep(1); setBankQuery(''); setSelectedBank(''); setShowModal(true) }

  const handleSelectBank = (bank) => {
    setSelectedBank(bank)
    setNewLast4(String(Math.floor(1000 + Math.random() * 9000)))
    setStep(2)
    setTimeout(() => setStep(3), 1800)
  }

  const handleAdd = () => {
    setAccounts(prev => [...prev, {
      id: `a-${Date.now()}`,
      bank: selectedBank,
      type: newAccountType,
      last4: newLast4,
      status: 'active',
      isDefault: prev.length === 0,
    }])
    setShowModal(false)
  }

  const setDefault = (id) => setAccounts(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))
  const remove = (id) => setAccounts(prev => prev.filter(a => a.id !== id))

  const filtered = bankQuery.trim()
    ? MOCK_BANKS.filter(b => b.toLowerCase().includes(bankQuery.toLowerCase()))
    : MOCK_BANKS

  return (
    <>
      <SectionHeader
        title="Linked Accounts"
      />

      {/* Connected accounts */}
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
            <div style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              background: 'var(--cream-dark)', color: 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700,
            }}>
              {acct.bank[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, marginBottom: 3 }}>
                {acct.bank} {acct.type}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                  ···· {acct.last4}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.04em' }}>
                  <CheckCircle2 size={11} /> Connected
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {acct.isDefault ? (
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.08em',
                  color: 'var(--green)', border: '1px solid var(--green)',
                  padding: '3px 8px', borderRadius: 2,
                }}>DEFAULT</span>
              ) : (
                <button onClick={() => setDefault(acct.id)} style={{
                  fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.06em',
                  color: 'var(--ink-muted)', border: '1px solid var(--rule)',
                  padding: '3px 8px', borderRadius: 2,
                  background: 'none', cursor: 'pointer',
                }}>Set default</button>
              )}
              <button onClick={() => remove(acct.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--ink-muted)', display: 'flex', alignItems: 'center',
                padding: 4,
              }}
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

      <button onClick={openModal} className="btn btn-primary" style={{ gap: 8 }}>
        <Link2 size={14} /> Connect a bank account
      </button>

      {/* Connect modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(30,25,18,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'var(--cream)', border: '1px solid var(--rule)',
            width: 440, maxWidth: '92vw', padding: '32px',
            boxShadow: '0 8px 32px rgba(30,25,18,0.18)',
          }} onClick={e => e.stopPropagation()}>

            {/* Step 1 — bank search */}
            {step === 1 && (
              <>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Connect bank account</div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700 }}>Select your bank</h3>
                </div>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
                  <input
                    autoFocus
                    value={bankQuery}
                    onChange={e => setBankQuery(e.target.value)}
                    placeholder="Search banks…"
                    style={{
                      width: '100%', padding: '10px 12px 10px 34px',
                      fontFamily: 'var(--mono)', fontSize: 12,
                      background: 'var(--cream-mid)', border: '1px solid var(--rule)',
                      borderRadius: 2, outline: 'none', color: 'var(--ink)',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ maxHeight: 260, overflowY: 'auto', border: '1px solid var(--rule)', borderRadius: 2 }}>
                  {filtered.map((bank, i) => (
                    <button key={bank} onClick={() => handleSelectBank(bank)} style={{
                      width: '100%', padding: '12px 16px', textAlign: 'left',
                      background: 'none', border: 'none',
                      borderBottom: i < filtered.length - 1 ? '1px solid var(--rule)' : 'none',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-mid)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        background: 'var(--cream-dark)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: 'var(--ink)',
                      }}>{bank[0]}</div>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>{bank}</span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <div style={{ padding: '16px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)' }}>
                      No results for "{bankQuery}"
                    </div>
                  )}
                </div>
                <button onClick={() => setShowModal(false)} className="btn btn-outline" style={{ marginTop: 16, fontSize: 11 }}>Cancel</button>
              </>
            )}

            {/* Step 2 — connecting */}
            {step === 2 && (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--cream-dark)', color: 'var(--ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700,
                  margin: '0 auto 20px',
                }}>{selectedBank[0]}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                  Connecting to {selectedBank}…
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                  Verifying credentials securely
                </div>
              </div>
            )}

            {/* Step 3 — success */}
            {step === 3 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <CheckCircle2 size={40} color="var(--green)" style={{ marginBottom: 14 }} />
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
                    {selectedBank} connected
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                    ···· {newLast4}
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>
                    Account type
                  </label>
                  <select value={newAccountType} onChange={e => setNewAccountType(e.target.value)} style={{
                    width: '100%', padding: '11px 14px',
                    fontFamily: 'var(--sans)', fontSize: 14,
                    background: 'var(--cream-mid)', border: '1px solid var(--rule)',
                    borderRadius: 2, outline: 'none', color: 'var(--ink)', cursor: 'pointer',
                  }}>
                    <option>Checking</option>
                    <option>Savings</option>
                    <option>Money Market</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setShowModal(false)} className="btn btn-outline" style={{ fontSize: 11 }}>Cancel</button>
                  <button onClick={handleAdd} className="btn btn-primary" style={{ fontSize: 11, gap: 8 }}>
                    <Link2 size={13} /> Add account
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
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
