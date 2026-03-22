import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VillageView from './dashboard/VillageView'
import ExploreView from './dashboard/ExploreView'
import SettingsView from './dashboard/SettingsView'
import MessagesView from './dashboard/MessagesView'
import {
  Compass, Settings, LogOut, Plus, MessageSquare, ArrowRight, Camera,
} from 'lucide-react'

export default function Dashboard() {
  const { user, villages, logout, leaveVillage, dms, startDM } = useAuth()
  const navigate = useNavigate()
  const [activeVillage, setActiveVillage] = useState(villages?.[0]?.id || null)
  const [view, setView] = useState('village') // 'village' | 'explore' | 'messages' | 'settings'
  const [tab, setTab] = useState('overview') // 'overview' | 'chat' | 'votes' | 'members'
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
        {view === 'village' && currentVillage && <VillageView village={currentVillage} tab={tab} setTab={setTab} onLeave={handleLeave} />}
        {view === 'village' && !currentVillage && <NoVillagesState onExplore={() => { setView('explore') }} onCreate={() => { setView('create') }} />}
        {view === 'explore'  && <ExploreView onStartDM={handleStartDM} />}
        {view === 'create'   && <CreateVillageView onDone={() => setView('village')} />}
        {view === 'messages' && <MessagesView activeDMId={activeDM} setActiveDMId={setActiveDM} />}
        {view === 'settings' && <SettingsView />}
      </main>
    </div>
  )
}

function CreateVillageView({ onDone }) {
  const { user, setVillages } = useAuth()
  const assignedColor = 'green'
  const [form, setForm] = useState({
    name: '', handle: '', goal: 'Education Debt', location: '', description: '',
    // Structure
    accountType: 'hysa',
    payInFrequency: 'monthly',
    poolTarget: '',
    minContribution: '',
    payoutStructure: 'voted',
    amendmentThreshold: 'two_thirds',
    quorum: 'two_thirds',
    dishonourableExit: 'returned_no_interest',
    probationPeriod: '1_month',
    latePaymentPolicy: 'grace_7',
    exitNoticePeriod: '1_month',
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleCreate = () => {
    if (!form.name.trim()) return
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
        minContribution: form.minContribution ? Number(form.minContribution) : null,
        payoutStructure: form.payoutStructure,
        amendmentThreshold: form.amendmentThreshold,
        quorum: form.quorum,
        dishonourableExit: form.dishonourableExit,
        probationPeriod: form.probationPeriod,
        latePaymentPolicy: form.latePaymentPolicy,
        exitNoticePeriod: form.exitNoticePeriod,
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
  const label = (text, hint) => (
    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>
      {text}{hint && <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, marginLeft: 6, fontSize: 10 }}>({hint})</span>}
    </div>
  )

  return (
    <div style={{ maxWidth: 600, padding: '48px 56px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40 }}>Start a Village</h1>

      {submitted ? (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--green)', letterSpacing: '0.06em' }}>
          Village created ✓, redirecting…
        </div>
      ) : (
        <>
          {/* Profile picture */}
          <div style={{ marginBottom: 28 }}>
            {label('Village photo', 'optional')}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: assignedColor === 'green' ? 'var(--green)' : 'var(--terracotta)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
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
          </div>

          <div style={{ marginBottom: 20 }}>
            {label('Village name')}
            <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. New Haven Savers" style={inputSt} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              {label('Handle')}
              <input value={form.handle} onChange={e => update('handle', e.target.value)} placeholder="@yourvillage" style={inputSt} />
            </div>
            <div>
              {label('Location', 'optional')}
              <input value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, State" style={inputSt} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            {label('Primary goal')}
            <select value={form.goal} onChange={e => update('goal', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
              {['Education Debt', 'Emergency Fund', 'Home Purchase', 'Retirement', 'Small Business', 'Investment'].map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            {label('Description', 'optional')}
            <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={3} placeholder="What is this village working toward?" style={{ ...inputSt, resize: 'vertical', lineHeight: 1.6 }} />
          </div>

          {/* ── Village Structure ─────────────────── */}
          <div style={{ margin: '36px 0 28px', borderTop: '1px solid var(--rule)', paddingTop: 32 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Village Structure</div>

            {/* Account + frequency */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                {label('Account type')}
                <select value={form.accountType} onChange={e => update('accountType', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                  <option value="hysa">High-Yield Savings (HYSA)</option>
                  <option value="checking">Checking</option>
                  <option value="brokerage">Brokerage</option>
                </select>
              </div>
              <div>
                {label('Pay-in frequency')}
                <select value={form.payInFrequency} onChange={e => update('payInFrequency', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Pool target + min contribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                {label('Pool size goal', 'optional')}
                <input value={form.poolTarget} onChange={e => update('poolTarget', e.target.value)} placeholder="$50,000" type="number" min="0" style={inputSt} />
              </div>
              <div>
                {label('Min. contribution per period')}
                <input value={form.minContribution} onChange={e => update('minContribution', e.target.value)} placeholder="$100" type="number" min="0" style={inputSt} />
              </div>
            </div>

            {/* Payout structure */}
            <div style={{ marginBottom: 20 }}>
              {label('Payout structure')}
              <select value={form.payoutStructure} onChange={e => update('payoutStructure', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                <option value="rotating">Rotating (ROSCA): each member receives the full pool once per cycle</option>
                <option value="voted">Voted allocation: members vote on who receives each payout</option>
                <option value="proportional">Proportional draw: payouts split by contribution share</option>
              </select>
            </div>

            {/* Amendment threshold + quorum */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                {label('Amendment vote threshold')}
                <select value={form.amendmentThreshold} onChange={e => update('amendmentThreshold', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                  <option value="majority">Simple majority (&gt;50%)</option>
                  <option value="two_thirds">Two-thirds (≥67%)</option>
                  <option value="unanimous">Unanimous (100%)</option>
                </select>
              </div>
              <div>
                {label('Vote quorum')}
                <select value={form.quorum} onChange={e => update('quorum', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                  <option value="any">Any member may vote</option>
                  <option value="two_thirds">2/3 of members must vote</option>
                  <option value="all">All members must vote</option>
                </select>
              </div>
            </div>

            {/* Dishonourable exit + probation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                {label('Dishonourable exit protocol')}
                <select value={form.dishonourableExit} onChange={e => update('dishonourableExit', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                  <option value="withheld">Funds withheld</option>
                  <option value="returned_no_interest">Returned without interest</option>
                  <option value="returned_with_interest">Returned with interest</option>
                </select>
              </div>
              <div>
                {label('Probationary period')}
                <select value={form.probationPeriod} onChange={e => update('probationPeriod', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                  <option value="none">None</option>
                  <option value="1_month">1 month</option>
                  <option value="3_months">3 months</option>
                  <option value="6_months">6 months</option>
                </select>
              </div>
            </div>

            {/* Late payment policy + exit notice */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
              <div>
                {label('Late payment policy')}
                <select value={form.latePaymentPolicy} onChange={e => update('latePaymentPolicy', e.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                  <option value="grace_7">7-day grace period, then flagged</option>
                  <option value="immediate_penalty">Immediate penalty fee applied</option>
                  <option value="removal_3_missed">Removal after 3 consecutive missed payments</option>
                  <option value="voted">Handled by member vote</option>
                </select>
              </div>
              <div>
                {label('Exit notice period')}
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

          <button onClick={handleCreate} className="btn btn-primary" style={{ fontSize: 13, padding: '14px 32px' }}>
            Create village <ArrowRight size={14} />
          </button>
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
