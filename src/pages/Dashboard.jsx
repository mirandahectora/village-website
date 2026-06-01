import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VillageView from './dashboard/VillageView'
import ExploreView from './dashboard/ExploreView'
import SettingsView from './dashboard/SettingsView'
import MessagesView from './dashboard/MessagesView'
import { useMobile } from '../hooks/useMobile'
import {
  Compass, Settings, LogOut, Plus, MessageSquare, ArrowRight, Camera, Monitor,
} from 'lucide-react'

export default function Dashboard() {
  const { user, villages, logout, leaveVillage, dms, startDM } = useAuth()
  const navigate = useNavigate()
  const isMobile = useMobile()
  const [activeVillage, setActiveVillage] = useState(villages?.[0]?.id || null)
  const [view, setView] = useState('village') // 'village' | 'explore' | 'create' | 'messages' | 'settings'
  const [tab, setTab] = useState('overview') // 'overview' | 'chat' | 'votes' | 'members' | 'constitution'
  const [activeDM, setActiveDM] = useState(null)

  const handleLeave = () => {
    const remaining = villages.filter(v => v.id !== activeVillage)
    if (remaining.length > 0) {
      setActiveVillage(remaining[0].id)
    } else {
      setActiveVillage(null)
      setView('explore')
    }
  }

  const handleStartDM = (person) => {
    startDM(person)
    setActiveDM(person.id)
    setView('messages')
  }

  useEffect(() => {
    if (!user) navigate('/auth')
  }, [user])

  useEffect(() => {
    if (!activeVillage && villages?.length > 0) {
      setActiveVillage(villages[0].id)
    }
  }, [villages])

  if (!user) return null

  if (isMobile) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--cream)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', textAlign: 'center',
      }}>
        <Monitor size={48} color="var(--green)" strokeWidth={1.5} style={{ marginBottom: 32 }} />
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, lineHeight: 1.15 }}>
          The Village dashboard<br />is designed for desktop.
        </h1>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.8, maxWidth: 360, marginBottom: 40 }}>
          To access your village, manage contributions, and vote on proposals, please open Village on a computer or laptop browser.
        </p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.08em', marginBottom: 32 }}>
          village.finance/dashboard
        </p>
        <button
          onClick={() => { logout(); navigate('/') }}
          style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--ink-muted)', textDecoration: 'underline', padding: 0,
          }}
        >
          Sign out
        </button>
      </div>
    )
  }

  const currentVillage = villages?.find(v => v.id === activeVillage)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--cream)' }}>

      {/* ── SIDEBAR ─────────────────────────────── */}
      <aside style={{
        width: 260, flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0,
        background: 'var(--ink)', color: 'var(--cream)',
        display: 'flex', flexDirection: 'column',
        borderRight: '1px solid rgba(196,186,168,0.1)',
        overflowY: 'auto',
        zIndex: 50,
      }}>
        {/* User */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(196,186,168,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user.photo
              ? <img src={user.photo} alt={user.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              : <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{user.avatar}</div>
            }
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500 }}>
                {user.first_name} {user.last_name}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(244,238,226,0.4)', letterSpacing: '0.06em' }}>
                {user.priority}
              </div>
            </div>
          </div>
        </div>

        {/* My villages */}
        <div style={{ padding: '20px 0', borderBottom: '1px solid rgba(196,186,168,0.1)', flex: 1 }}>
          <div style={{ padding: '0 20px 12px', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(244,238,226,0.35)', textTransform: 'uppercase' }}>
            My Villages
          </div>

          {villages?.map(v => {
            const isActive = activeVillage === v.id && view === 'village'
            const pct = Math.round((v.pooled / v.target) * 100)
            return (
              <button key={v.id} onClick={() => { setActiveVillage(v.id); setView('village'); setTab('overview') }} style={{
                width: '100%', padding: '12px 20px', textAlign: 'left',
                background: isActive ? 'rgba(244,238,226,0.06)' : 'transparent',
                border: 'none', borderLeft: `3px solid ${isActive ? (v.color === 'green' ? 'var(--green-mid)' : 'var(--terracotta)') : 'transparent'}`,
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {v.photo && (
                      <div style={{ width: 22, height: 22, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={v.photo} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    )}
                    <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--cream)', fontWeight: isActive ? 500 : 400 }}>{v.name}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(244,238,226,0.4)' }}>{pct}%</span>
                </div>
                <div style={{ height: 2, background: 'rgba(244,238,226,0.1)', borderRadius: 1 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: v.color === 'green' ? 'var(--green-mid)' : 'var(--terracotta)', borderRadius: 1 }} />
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(244,238,226,0.3)', marginTop: 4, letterSpacing: '0.04em' }}>
                  {v.members} members · {v.goal}
                </div>
              </button>
            )
          })}

          {villages?.length >= 2 ? (
            <div style={{ padding: '10px 20px' }}>
              <div style={{
                padding: '8px 10px', borderRadius: 2,
                border: '1px solid rgba(196,186,168,0.12)',
                background: 'rgba(196,186,168,0.04)',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.08em', color: 'rgba(244,238,226,0.3)', textTransform: 'uppercase', marginBottom: 3 }}>
                  Village limit reached
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(244,238,226,0.2)', letterSpacing: '0.04em' }}>
                  You can only be in up to two villages at once.
                </div>
              </div>
            </div>
          ) : (
            <>
              <button onClick={() => setView('explore')} style={{
                width: '100%', padding: '12px 20px', textAlign: 'left',
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                color: 'rgba(244,238,226,0.4)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(244,238,226,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,238,226,0.4)'}
              >
                <Plus size={14} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em' }}>Join another village</span>
              </button>

              <button onClick={() => setView('create')} style={{
                width: '100%', padding: '12px 20px', textAlign: 'left',
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                color: 'rgba(244,238,226,0.4)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(244,238,226,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,238,226,0.4)'}
              >
                <Plus size={14} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em' }}>Start a village</span>
              </button>
            </>
          )}
        </div>

        {/* Bottom nav */}
        <div style={{ padding: '12px 0', borderTop: '1px solid rgba(196,186,168,0.1)' }}>
          {[
            { id: 'explore',  icon: <Compass size={15} />,       label: 'Explore' },
            { id: 'messages', icon: <MessageSquare size={15} />, label: 'Messages', badge: dms.length || null },
            { id: 'settings', icon: <Settings size={15} />,      label: 'Settings' },
          ].map(item => (
            <button key={item.id} onClick={() => setView(item.id)} style={{
              width: '100%', padding: '11px 20px', textAlign: 'left',
              background: view === item.id ? 'rgba(244,238,226,0.06)' : 'transparent',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
              color: view === item.id ? 'var(--cream)' : 'rgba(244,238,226,0.5)',
              transition: 'color 0.15s',
            }}>
              {item.icon}
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', flex: 1 }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{
                  background: 'var(--green)', color: 'var(--cream)',
                  fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700,
                  borderRadius: 10, padding: '2px 6px', letterSpacing: '0.04em',
                }}>{item.badge}</span>
              )}
            </button>
          ))}
          <button onClick={() => { logout(); navigate('/') }} style={{
            width: '100%', padding: '11px 20px', textAlign: 'left',
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
            color: 'rgba(244,238,226,0.4)', transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--terracotta)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,238,226,0.4)'}
          >
            <LogOut size={15} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em' }}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────── */}
      <main style={{ marginLeft: 260, flex: 1, minWidth: 0 }}>
        <div key={view === 'village' ? `village-${activeVillage}` : view} className="dash-fade-in" style={{ height: '100%' }}>
          {view === 'village' && currentVillage && <VillageView village={currentVillage} tab={tab} setTab={setTab} onLeave={handleLeave} />}
          {view === 'village' && !currentVillage && <NoVillagesState onExplore={() => { setView('explore') }} onCreate={() => { setView('create') }} />}
          {view === 'explore'  && <ExploreView onStartDM={handleStartDM} />}
          {view === 'create'   && <CreateVillageView onDone={() => setView('village')} />}
          {view === 'messages' && <MessagesView activeDMId={activeDM} setActiveDMId={setActiveDM} />}
          {view === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  )
}

const CREATE_STEPS = [
  { id: 'basics',     title: 'Basics',      subtitle: 'Name your village and set its purpose' },
  { id: 'financial',  title: 'Financial',   subtitle: 'Define how money flows in and out' },
  { id: 'governance', title: 'Governance',  subtitle: 'Set the rules for decisions and votes' },
  { id: 'conduct',    title: 'Conduct',     subtitle: 'Establish expectations for members' },
  { id: 'create',     title: 'Create',      subtitle: 'Review and sign your village constitution' },
]

function CreateVillageView({ onDone }) {
  const { user, setVillages } = useAuth()
  const assignedColor = 'green'
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', handle: '', goal: 'Education Debt', location: '', description: '',
    accountType: 'hysa',
    payInFrequency: 'monthly',
    poolTarget: '',
    minContribution: '',
    payoutStructure: 'voted',
    amendmentThreshold: 'two_thirds',
    quorum: 'two_thirds',
    dishonorableExit: 'returned_no_interest',
    probationPeriod: '1_month',
    latePaymentPolicy: 'grace_7',
    exitNoticePeriod: '1_month',
    memberAdmission: 'vote_required',
    equities: 60,
    bonds: 30,
    cash: 10,
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [signerName, setSignerName] = useState(`${user?.first_name || ''} ${user?.last_name || ''}`.trim())
  const [signerDate, setSignerDate] = useState(new Date().toISOString().split('T')[0])
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleNext = () => {
    if (step === 0 && !form.name.trim()) { setNameError(true); return }
    setNameError(false)
    setStep(s => s + 1)
  }

  const handleCreate = () => {
    const newVillage = {
      id: `v-${Date.now()}`,
      name: form.name,
      handle: form.handle || `@${form.name.toLowerCase().replace(/\s+/g, '')}`,
      goal: form.goal,
      goalType: form.goal.toLowerCase().replace(/ /g, '_'),
      location: form.location,
      headline: form.description,
      photo: photoPreview || null,
      members: 1,
      maxMembers: 20,
      pooled: 0,
      target: form.poolTarget ? Number(form.poolTarget) : 50000,
      myContribution: 0,
      nextContribution: 0,
      nextDate: 'Not set',
      intervalLabel: { monthly: 'Monthly', biweekly: 'Bi-weekly', weekly: 'Weekly' }[form.payInFrequency] || 'Monthly',
      color: assignedColor,
      structure: {
        accountType: form.accountType,
        payInFrequency: form.payInFrequency,
        poolTarget: form.poolTarget ? Number(form.poolTarget) : null,
        minContribution: form.minContribution ? Number(form.minContribution) : null,
        payoutStructure: form.payoutStructure,
        amendmentThreshold: form.amendmentThreshold,
        quorum: form.quorum,
        memberAdmission: form.memberAdmission,
        dishonorableExit: form.dishonorableExit,
        probationPeriod: form.probationPeriod,
        latePaymentPolicy: form.latePaymentPolicy,
        exitNoticePeriod: form.exitNoticePeriod,
        ...(form.accountType === 'brokerage' && {
          portfolioAllocation: { equities: Number(form.equities), bonds: Number(form.bonds), cash: Number(form.cash) },
        }),
      },
      founded: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      memberList: [{ id: 'me', initials: user?.avatar || '?', name: `${user?.first_name || ''} ${user?.last_name?.[0] || ''}.`, role: 'Founder', contrib: 0, status: 'active' }],
      recentActivity: [{ type: 'join', actor: `${user?.first_name || ''} ${user?.last_name || ''}`, amount: null, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), note: 'Village created' }],
      chat: [], votes: [],
    }
    setVillages(prev => [...prev, newVillage])
    setSubmitted(true)
    setTimeout(onDone, 1200)
  }

  const inputSt = {
    width: '100%', padding: '12px 16px', fontFamily: 'var(--sans)', fontSize: 14,
    background: 'transparent', border: '1px solid var(--rule)', color: 'var(--ink)',
    outline: 'none', borderRadius: 2, boxSizing: 'border-box',
  }
  const lbl = (text, hint) => (
    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>
      {text}{hint && <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, marginLeft: 6, fontSize: 10 }}>({hint})</span>}
    </div>
  )

  const isFinalStep = step === CREATE_STEPS.length - 1
  const portfolioTotal = Number(form.equities) + Number(form.bonds) + Number(form.cash)

  return (
    <div style={{ maxWidth: 560, padding: '48px 56px' }}>

      {submitted ? (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--green)', letterSpacing: '0.06em' }}>
          Village created ✓, redirecting…
        </div>
      ) : (
        <>
          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 48 }}>
            {CREATE_STEPS.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < CREATE_STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: i < step ? 'pointer' : 'default' }}
                  onClick={() => { if (i < step) setStep(i) }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: i < step ? 'var(--green)' : i === step ? 'var(--ink)' : 'transparent',
                    border: `2px solid ${i <= step ? (i < step ? 'var(--green)' : 'var(--ink)') : 'var(--rule)'}`,
                    transition: 'all 0.2s',
                  }}>
                    {i < step
                      ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--cream)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, color: i === step ? 'var(--cream)' : 'var(--rule)', lineHeight: 1 }}>{i + 1}</span>
                    }
                  </div>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: i === step ? 'var(--ink)' : i < step ? 'var(--green)' : 'var(--rule)',
                    whiteSpace: 'nowrap', transition: 'color 0.2s',
                  }}>{s.title}</span>
                </div>
                {i < CREATE_STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: 2, marginBottom: 18, marginLeft: 8, marginRight: 8,
                    background: i < step ? 'var(--green)' : 'var(--rule)',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Step heading */}
          <div key={step} className="dash-fade-in">
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>{CREATE_STEPS[step].title}</h1>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', margin: 0 }}>
                {CREATE_STEPS[step].subtitle}
              </p>
            </div>

            {/* ── STEP 1: Basics ── */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {lbl('Village photo', 'optional')}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: -12 }}>
                  <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: '50%',
                      background: 'var(--green)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                    }}>
                      {photoPreview
                        ? <img src={photoPreview} alt="village" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontFamily: 'var(--mono)', fontSize: 20, color: 'var(--cream)', fontWeight: 600 }}>
                            {form.name ? form.name[0].toUpperCase() : 'V'}
                          </span>
                      }
                    </div>
                    <label style={{
                      position: 'absolute', inset: 0, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', cursor: 'pointer', opacity: 0, transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0}
                    >
                      <Camera size={18} color="#fff" />
                      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                    </label>
                  </div>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>
                    Upload a photo for your village
                  </span>
                </div>

                <div>
                  {lbl('Village name')}
                  <input
                    value={form.name}
                    onChange={e => { update('name', e.target.value); setNameError(false) }}
                    placeholder="e.g. New Haven Savers"
                    style={{ ...inputSt, borderColor: nameError ? 'var(--terracotta)' : 'var(--rule)' }}
                    autoFocus
                  />
                  {nameError && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', marginTop: 6, letterSpacing: '0.04em' }}>Village name is required</div>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    {lbl('Handle')}
                    <input value={form.handle} onChange={e => update('handle', e.target.value)} placeholder="@yourvillage" style={inputSt} />
                  </div>
                  <div>
                    {lbl('Location', 'optional')}
                    <input value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, State" style={inputSt} />
                  </div>
                </div>

                <div>
                  {lbl('Primary goal')}
                  <select value={form.goal} onChange={e => update('goal', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                    {['Education Debt', 'Emergency Fund', 'Home Purchase', 'Retirement', 'Small Business', 'Investment'].map(g => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  {lbl('Description', 'optional')}
                  <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={3} placeholder="What is this village working toward?" style={{ ...inputSt, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
              </div>
            )}

            {/* ── STEP 2: Financial ── */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    {lbl('Account type')}
                    <select value={form.accountType} onChange={e => update('accountType', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                      <option value="hysa">High-Yield Savings (HYSA)</option>
                      <option value="checking">Checking</option>
                      <option value="brokerage">Brokerage</option>
                    </select>
                  </div>
                  <div>
                    {lbl('Pay-in frequency')}
                    <select value={form.payInFrequency} onChange={e => update('payInFrequency', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    {lbl('Pool size goal', 'optional')}
                    <input value={form.poolTarget} onChange={e => update('poolTarget', e.target.value)} placeholder="$50,000" type="number" min="0" style={inputSt} />
                  </div>
                  <div>
                    {lbl('Min. contribution per period')}
                    <input value={form.minContribution} onChange={e => update('minContribution', e.target.value)} placeholder="$100" type="number" min="0" style={inputSt} />
                  </div>
                </div>

                <div>
                  {lbl('Payout structure')}
                  <select value={form.payoutStructure} onChange={e => update('payoutStructure', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                    <option value="rotating">Rotating (ROSCA): each member receives the full pool once per cycle</option>
                    <option value="voted">Voted allocation: members vote on who receives each payout</option>
                  </select>
                </div>

                {form.accountType === 'brokerage' && (
                  <div>
                    {lbl('Portfolio allocation', 'must total 100%')}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                      {[['equities', 'Equities %'], ['bonds', 'Bonds %'], ['cash', 'Cash %']].map(([key, label]) => (
                        <div key={key}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
                          <input type="number" min="0" max="100" value={form[key]} onChange={e => update(key, e.target.value)} style={inputSt} />
                        </div>
                      ))}
                    </div>
                    {portfolioTotal !== 100 && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', marginTop: 8, letterSpacing: '0.04em' }}>
                        Total: {portfolioTotal}% — must equal 100%
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 3: Governance ── */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    {lbl('Amendment vote threshold')}
                    <select value={form.amendmentThreshold} onChange={e => update('amendmentThreshold', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                      <option value="majority">Simple majority (&gt;50%)</option>
                      <option value="two_thirds">Two-thirds (≥67%)</option>
                      <option value="unanimous">Unanimous (100%)</option>
                    </select>
                  </div>
                  <div>
                    {lbl('Vote quorum')}
                    <select value={form.quorum} onChange={e => update('quorum', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                      <option value="any">Any member may vote</option>
                      <option value="two_thirds">2/3 of members must vote</option>
                      <option value="all">All members must vote</option>
                    </select>
                  </div>
                </div>

                <div>
                  {lbl('Member admission')}
                  <select value={form.memberAdmission} onChange={e => update('memberAdmission', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                    <option value="vote_required">Vote required for all new members</option>
                    <option value="invite_no_vote">Invited members admitted without a vote</option>
                    <option value="any_member">Any member can admit others freely</option>
                  </select>
                </div>
              </div>
            )}

            {/* ── STEP 4: Conduct ── */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    {lbl('Probationary period')}
                    <select value={form.probationPeriod} onChange={e => update('probationPeriod', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                      <option value="none">None</option>
                      <option value="1_month">1 month</option>
                      <option value="3_months">3 months</option>
                      <option value="6_months">6 months</option>
                    </select>
                  </div>
                  <div>
                    {lbl('Late payment policy')}
                    <select value={form.latePaymentPolicy} onChange={e => update('latePaymentPolicy', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                      <option value="grace_7">7-day grace period, then flagged</option>
                      <option value="immediate_penalty">Immediate penalty fee applied</option>
                      <option value="removal_3_missed">Removal after 3 consecutive missed payments</option>
                      <option value="voted">Handled by member vote</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    {lbl('Dishonorable exit protocol')}
                    <select value={form.dishonorableExit} onChange={e => update('dishonorableExit', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                      <option value="withheld">Funds withheld</option>
                      <option value="returned_no_interest">Returned without interest</option>
                      <option value="returned_with_interest">Returned with interest</option>
                    </select>
                  </div>
                  <div>
                    {lbl('Exit notice period')}
                    <select value={form.exitNoticePeriod} onChange={e => update('exitNoticePeriod', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                      <option value="immediate">Immediate (no notice required)</option>
                      <option value="1_month">1 month</option>
                      <option value="2_months">2 months</option>
                      <option value="3_months">3 months</option>
                      <option value="1_cycle">1 full contribution cycle</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 5: Create (Constitution) ── */}
            {step === 4 && (() => {
              const ACCT  = { hysa: 'High-Yield Savings (HYSA)', checking: 'Checking Account', brokerage: 'Brokerage Account' }
              const FREQ  = { weekly: 'weekly', biweekly: 'bi-weekly', monthly: 'monthly' }
              const PAYOUT_L = { rotating: 'Rotating (ROSCA)', voted: 'Voted Allocation' }
              const THRESH = { majority: 'a simple majority (>50%)', two_thirds: 'a two-thirds supermajority (≥67%)', unanimous: 'unanimous consent (100%)' }
              const QUORUM_L = { any: 'any member may cast a vote', two_thirds: 'at least two-thirds of members must vote', all: 'all members must vote' }
              const ADMIT  = { vote_required: 'requires a full village vote', invite_no_vote: 'is granted upon invitation by an existing member, without a vote', any_member: 'may be granted freely by any current member' }
              const PROB   = { none: 'no probationary period', '1_month': 'one (1) month', '3_months': 'three (3) months', '6_months': 'six (6) months' }
              const LATE   = {
                grace_7: 'A seven-day grace period applies; payments not received within this window will be flagged to all members.',
                immediate_penalty: 'An immediate penalty fee shall be assessed on any late payment.',
                removal_3_missed: 'A member shall be removed from the village upon three (3) consecutive missed payments.',
                voted: 'Consequences for late payment shall be determined by village vote on a case-by-case basis.',
              }
              const EXIT_F = {
                withheld: "that member's contributed funds shall be withheld by the village",
                returned_no_interest: "that member's contributed funds shall be returned in full, without interest",
                returned_with_interest: "that member's contributed funds shall be returned in full, with accrued interest",
              }
              const NOTICE = {
                immediate: 'no advance notice is required',
                '1_month': "one (1) month's advance notice",
                '2_months': "two (2) months' advance notice",
                '3_months': "three (3) months' advance notice",
                '1_cycle': "one (1) full contribution cycle's advance notice",
              }
              const F = ({ children }) => (
                <span style={{ fontWeight: 600, borderBottom: '1.5px solid var(--ink)', paddingBottom: 1 }}>{children}</span>
              )
              const articles = [
                {
                  title: 'Article I — Name and Purpose',
                  clauses: [
                    <>This organization shall be known as <F>{form.name || 'this village'}</F>{form.handle ? <>, identified by the handle <F>{form.handle}</F></> : ''}.</>,
                    form.location ? <>The village is based in <F>{form.location}</F>.</> : null,
                    <>The primary financial goal of this village is <F>{form.goal}</F>.</>,
                    form.description ? <>{form.description}</> : null,
                  ].filter(Boolean),
                },
                {
                  title: 'Article II — Membership',
                  clauses: [
                    <>Admission of new members <F>{ADMIT[form.memberAdmission]}</F>.</>,
                    <>New members shall serve a probationary period of <F>{PROB[form.probationPeriod]}</F>. During probation, members may not vote on binding village resolutions.</>,
                    <>The village may have a maximum of twenty (20) active members at any time.</>,
                  ],
                },
                {
                  title: 'Article III — Contributions and Banking',
                  clauses: [
                    <>Village funds shall be held in a <F>{ACCT[form.accountType]}</F> account in the name of the village.</>,
                    <>Members shall make contributions on a <F>{FREQ[form.payInFrequency]}</F> basis.</>,
                    form.minContribution
                      ? <>The minimum contribution per period is <F>${Number(form.minContribution).toLocaleString()}</F>.</>
                      : <>No minimum contribution amount has been set; members contribute as mutually agreed.</>,
                    form.poolTarget ? <>The village has set a pool target of <F>${Number(form.poolTarget).toLocaleString()}</F>.</> : null,
                    form.accountType === 'brokerage'
                      ? <>The brokerage portfolio shall be allocated as: <F>{form.equities}% equities</F>, <F>{form.bonds}% bonds</F>, and <F>{form.cash}% cash</F>.</>
                      : null,
                  ].filter(Boolean),
                },
                {
                  title: 'Article IV — Payout Structure',
                  clauses: [
                    <>This village uses a <F>{PAYOUT_L[form.payoutStructure]}</F> payout structure.</>,
                    form.payoutStructure === 'rotating'
                      ? <>Each member shall receive the full pooled amount once per contribution cycle, in a rotation order established at founding. Members who join after founding are added to the end of the rotation.</>
                      : <>Disbursements from the pool shall be proposed and authorized by member vote in accordance with this constitution.</>,
                  ],
                },
                {
                  title: 'Article V — Governance',
                  clauses: [
                    <>Amendments to this constitution require <F>{THRESH[form.amendmentThreshold]}</F>.</>,
                    <>For any vote to be binding, <F>{QUORUM_L[form.quorum]}</F>.</>,
                    <>Members in their probationary period may not vote on binding resolutions.</>,
                  ],
                },
                {
                  title: 'Article VI — Member Conduct and Exit',
                  clauses: [
                    <><F>{LATE[form.latePaymentPolicy]}</F></>,
                    <>Upon dishonorable exit or expulsion, <F>{EXIT_F[form.dishonorableExit]}</F>.</>,
                    <>A member wishing to leave in good standing must provide <F>{NOTICE[form.exitNoticePeriod]}</F> prior to their departure.</>,
                    <>Any member with a pending payout or unresolved financial obligation to the village remains bound by these terms until that obligation is settled.</>,
                  ],
                },
              ]

              const formattedDate = signerDate
                ? new Date(signerDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : ''

              return (
                <>
                  {/* Scrollable document */}
                  <div style={{
                    border: '1px solid var(--rule)',
                    padding: '48px 52px 40px',
                    maxHeight: '54vh',
                    overflowY: 'auto',
                    marginBottom: 28,
                  }}>
                    {/* Document header */}
                    <div style={{ textAlign: 'center', marginBottom: 28 }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
                        Village Constitution
                      </div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>
                        {form.name || 'Unnamed Village'}
                      </div>
                      {form.handle && (
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginBottom: 4 }}>
                          {form.handle}
                        </div>
                      )}
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                        Founded {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        {form.location ? ` · ${form.location}` : ''}
                      </div>
                    </div>

                    <div style={{ borderTop: '2px solid var(--ink)', borderBottom: '1px solid var(--rule)', height: 3, marginBottom: 28 }} />

                    {/* Preamble */}
                    <p style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.85, color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: 32 }}>
                      This constitution establishes the governing terms of{' '}
                      <span style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--ink)' }}>{form.name || 'this village'}</span>,
                      {' '}a collective savings organization. All founding and future members are bound by the provisions set forth herein. This document serves as the official record of the village's rules and structure.
                    </p>

                    {/* Articles */}
                    {articles.map((article, ai) => (
                      <div key={ai} style={{ marginBottom: 28 }}>
                        <div style={{
                          fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700,
                          marginBottom: 10, paddingBottom: 6,
                          borderBottom: '1px solid var(--rule)',
                        }}>
                          {article.title}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {article.clauses.map((clause, ci) => (
                            <div key={ci} style={{ display: 'flex', gap: 14 }}>
                              <span style={{
                                fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)',
                                flexShrink: 0, paddingTop: 3, letterSpacing: '0.04em', minWidth: 26,
                              }}>
                                {ai + 1}.{ci + 1}
                              </span>
                              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.78, color: 'var(--ink)' }}>
                                {clause}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Signature block inside the document */}
                    <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 24, marginTop: 4 }}>
                      <div style={{
                        fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700,
                        marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid var(--rule)',
                      }}>
                        Signatures
                      </div>
                      <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 24 }}>
                        By signing below, the founding member confirms having read and agreed to be bound by this Village Constitution.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'end' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                            Founding Member
                          </div>
                          <div style={{
                            fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic',
                            minHeight: 30, borderBottom: '1px solid var(--ink)',
                            paddingBottom: 4, color: signerName ? 'var(--ink)' : 'transparent',
                          }}>
                            {signerName || '—'}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                            Date
                          </div>
                          <div style={{
                            fontFamily: 'var(--mono)', fontSize: 12,
                            minHeight: 30, borderBottom: '1px solid var(--ink)',
                            paddingBottom: 4, color: 'var(--ink)',
                          }}>
                            {formattedDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sign inputs below document */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'end' }}>
                    <div>
                      {lbl('Sign with your full name')}
                      <input
                        value={signerName}
                        onChange={e => setSignerName(e.target.value)}
                        placeholder="Your full legal name"
                        style={{ ...inputSt, fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic' }}
                        autoFocus
                      />
                    </div>
                    <div>
                      {lbl('Date')}
                      <input
                        type="date"
                        value={signerDate}
                        onChange={e => setSignerDate(e.target.value)}
                        style={{ ...inputSt, fontFamily: 'var(--mono)', fontSize: 12, width: 'auto' }}
                      />
                    </div>
                  </div>
                </>
              )
            })()}

            {/* Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 40 }}>
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="btn btn-terra" style={{ fontSize: 13, padding: '14px 32px' }}>
                  ← Back
                </button>
              )}
              {isFinalStep ? (
                <button
                  onClick={handleCreate}
                  disabled={!signerName.trim()}
                  className="btn btn-primary"
                  style={{ fontSize: 13, padding: '14px 32px', opacity: !signerName.trim() ? 0.4 : 1 }}
                >
                  Create village <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={handleNext} className="btn btn-primary" style={{ fontSize: 13, padding: '14px 32px' }}>
                  Continue <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function NoVillagesState({ onExplore, onCreate }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', padding: '64px 48px', textAlign: 'center',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        border: '2px dashed var(--rule)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 32,
      }}>
        <Plus size={24} color="var(--ink-muted)" />
      </div>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        You're not in any villages yet.
      </h2>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: 380, marginBottom: 40 }}>
        Browse open villages to find a group aligned with your financial goals, or wait to be matched by the algorithm.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onExplore} className="btn btn-primary" style={{ fontSize: 14, padding: '14px 36px' }}>
          Explore Villages <Compass size={14} />
        </button>
        <button onClick={onCreate} className="btn btn-outline" style={{ fontSize: 14, padding: '14px 36px', gap: 8 }}>
          Start a Village <Plus size={14} />
        </button>
      </div>
    </div>
  )
}
